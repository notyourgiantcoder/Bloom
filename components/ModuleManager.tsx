'use client'

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import { Module, ModuleFile, ModuleWithFiles } from '@/types/database'
import {
  MdAdd, MdFolder, MdDragIndicator, MdMoreVert, MdExpandMore, MdChevronRight,
  MdPictureAsPdf, MdVideocam, MdImage, MdAudiotrack, MdDescription, MdAttachFile,
  MdDelete, MdEdit, MdCloudUpload
} from 'react-icons/md'
import {
  DndContext, DragOverlay, closestCenter, rectIntersection, KeyboardSensor, PointerSensor,
  useSensor, useSensors, useDroppable, DragStartEvent, DragOverEvent, DragEndEvent, UniqueIdentifier
} from '@dnd-kit/core'
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export type FileUploadState = {
  id: string
  fileName: string
  progress: number
  status: 'uploading' | 'error' | 'success'
  moduleId: string
}

interface ModuleManagerProps {
  courseId: string
  userId: string
  initialModules: ModuleWithFiles[]
  onSaveIndicatorChange?: (status: 'idle' | 'editing' | 'saving' | 'saved' | 'error') => void
}

const STORAGE_BUCKET = 'module-files'

// --- Helpers ---
function getFileType(mimeType: string): ModuleFile['file_type'] {
  if (mimeType === 'application/pdf') return 'pdf'
  if (['video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo'].includes(mimeType)) return 'video'
  if (['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg', 'image/svg+xml'].includes(mimeType)) return 'image'
  if (['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4'].includes(mimeType)) return 'audio'
  if ([
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ].includes(mimeType)) return 'document'
  return 'other'
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function FileIcon({ type }: { type: ModuleFile['file_type'] }) {
  const icons: Record<string, { icon: React.ReactNode; color: string }> = {
    pdf: { icon: <MdPictureAsPdf className="text-lg" />, color: 'text-red-500' },
    video: { icon: <MdVideocam className="text-lg" />, color: 'text-purple-500' },
    image: { icon: <MdImage className="text-lg" />, color: 'text-blue-500' },
    audio: { icon: <MdAudiotrack className="text-lg" />, color: 'text-green-500' },
    document: { icon: <MdDescription className="text-lg" />, color: 'text-orange-500' },
    other: { icon: <MdAttachFile className="text-lg" />, color: 'text-gray-500' },
  }
  const { icon, color } = icons[type] || icons.other
  return <span className={`${color} flex-shrink-0`}>{icon}</span>
}

// Drag item metadata carried on each sortable/droppable node
type DragData =
  | { type: 'module' }
  | { type: 'file'; moduleId: string }
  | { type: 'module-dropzone'; moduleId: string }

// ============================================
// MAIN COMPONENT
// ============================================

export const ModuleManager = forwardRef<{ addExternalFile: (file: ModuleFile) => void }, ModuleManagerProps>(
function ModuleManager({ courseId, userId, initialModules, onSaveIndicatorChange }, ref) {
  const [modules, setModules] = useState<ModuleWithFiles[]>(initialModules || [])
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(initialModules?.map(m => m.id) ?? []))
  const [uploadStates, setUploadStates] = useState<FileUploadState[]>([])
  const [addingModule, setAddingModule] = useState(false)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [activeType, setActiveType] = useState<'module' | 'file' | null>(null)

  // Snapshot of modules taken at drag start, so onDragEnd can diff
  // "which module did this file start in" vs "where did it end up".
  const dragStartModulesRef = useRef<ModuleWithFiles[]>([])

  const supabase = getSupabaseBrowserClient()

  // Expose method for BuilderClient to inject files directly into state
  useImperativeHandle(ref, () => ({
    addExternalFile: (file: ModuleFile) => {
      setModules(prev => prev.map(m => {
        if (m.id !== file.module_id) return m
        if (m.files.find(f => f.id === file.id)) return m
        return { ...m, files: [...m.files, file].sort((a, b) => a.position - b.position) }
      }))
      // Auto-expand the module that received the file
      setExpandedIds(prev => new Set(prev).add(file.module_id))
    }
  }))

  useEffect(() => {
    setModules(initialModules || [])
  }, [initialModules])

  // Realtime: modules
  useEffect(() => {
    if (!courseId) return
    const channel = supabase
      .channel(`modules-${courseId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'modules', filter: `course_id=eq.${courseId}` }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const newMod = payload.new as Module
          setModules(prev => {
            if (prev.find(m => m.id === newMod.id)) return prev
            return [...prev, { ...newMod, files: [] }].sort((a, b) => a.position - b.position)
          })
        } else if (payload.eventType === 'UPDATE') {
          const upMod = payload.new as Module
          setModules(prev => prev.map(m => m.id === upMod.id ? { ...m, ...upMod } : m).sort((a, b) => a.position - b.position))
        } else if (payload.eventType === 'DELETE') {
          const delId = (payload.old as Module).id
          setModules(prev => prev.filter(m => m.id !== delId))
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [courseId, supabase])

  // Realtime: module_files
  useEffect(() => {
    if (!courseId) return
    const channel = supabase
      .channel(`module-files-${courseId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'module_files', filter: `course_id=eq.${courseId}` }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const newFile = payload.new as ModuleFile
          setModules(prev => prev.map(m => {
            if (m.id !== newFile.module_id) return m
            if (m.files.find(f => f.id === newFile.id)) return m
            return { ...m, files: [...m.files, newFile].sort((a, b) => a.position - b.position) }
          }))
        } else if (payload.eventType === 'UPDATE') {
          const upFile = payload.new as ModuleFile
          setModules(prev => {
            // Handle the file possibly having moved to a different module_id
            const stripped = prev.map(m => ({ ...m, files: m.files.filter(f => f.id !== upFile.id) }))
            return stripped.map(m => m.id === upFile.module_id
              ? { ...m, files: [...m.files, upFile].sort((a, b) => a.position - b.position) }
              : m)
          })
        } else if (payload.eventType === 'DELETE') {
          const delId = payload.old.id
          setModules(prev => prev.map(m => ({
            ...m,
            files: m.files.filter(f => f.id !== delId)
          })))
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [courseId, supabase])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // --- Module CRUD ---

  const addModule = async () => {
    setAddingModule(true)
    const tempId = `temp-${crypto.randomUUID()}`
    const position = modules.length > 0 ? Math.max(...modules.map(m => m.position)) + 1 : 0
    const optimistic: ModuleWithFiles = {
      id: tempId,
      course_id: courseId,
      title: 'Untitled module',
      position,
      created_at: new Date().toISOString(),
      files: [],
    }
    setModules(prev => [...prev, optimistic])

    const { data, error } = await supabase
      .from('modules')
      .insert({ course_id: courseId, title: 'Untitled module', position })
      .select()
      .single()

    setAddingModule(false)

    if (error || !data) {
      console.error("Failed to add module to database:", error);
      alert(`Database error adding module: ${error?.message || 'Unknown error'}`);
      setModules(prev => prev.filter(m => m.id !== tempId))
      return
    }
    setModules(prev => {
      // If Realtime already inserted this module, just drop the temp entry
      if (prev.find(m => m.id === data.id)) {
        return prev.filter(m => m.id !== tempId)
      }
      // Otherwise swap the temp entry for the real one
      return prev.map(m => m.id === tempId ? { ...(data as Module), files: [] } : m)
    })
    setExpandedIds(prev => new Set(prev).add(data.id))
  }

  const renameModule = async (moduleId: string, title: string) => {
    setModules(prev => prev.map(m => m.id === moduleId ? { ...m, title } : m))
    onSaveIndicatorChange?.('saving')
    const { error } = await supabase.from('modules').update({ title }).eq('id', moduleId)
    onSaveIndicatorChange?.(error ? 'error' : 'saved')
  }

  const deleteModule = async (moduleId: string) => {
    const prevModules = modules
    setModules(prev => prev.filter(m => m.id !== moduleId))
    const { error } = await supabase.from('modules').delete().eq('id', moduleId)
    if (error) setModules(prevModules)
  }

  const toggleExpanded = (moduleId: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(moduleId)) next.delete(moduleId)
      else next.add(moduleId)
      return next
    })
  }

  // --- File CRUD ---

  const uploadFiles = async (moduleId: string, fileList: FileList) => {
    const files = Array.from(fileList)
    for (const file of files) {
      const uploadId = crypto.randomUUID()
      setUploadStates(prev => [...prev, { id: uploadId, fileName: file.name, progress: 0, status: 'uploading', moduleId }])

      const progressTimer = setInterval(() => {
        setUploadStates(prev => prev.map(u => u.id === uploadId && u.progress < 90
          ? { ...u, progress: u.progress + 10 }
          : u))
      }, 200)

      const path = `${userId}/${courseId}/${moduleId}/${crypto.randomUUID()}-${file.name}`
      const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file)
      clearInterval(progressTimer)

      if (uploadError) {
        setUploadStates(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'error', progress: 0 } : u))
        continue
      }

      const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
      const module = modules.find(m => m.id === moduleId)
      const position = module && module.files.length > 0 ? Math.max(...module.files.map(f => f.position)) + 1 : 0

      const { data: fileRow, error: insertError } = await supabase
        .from('module_files')
        .insert({
          module_id: moduleId,
          course_id: courseId,
          name: file.name,
          file_url: urlData.publicUrl,
          file_type: getFileType(file.type),
          file_size: file.size,
          position,
        })
        .select()
        .single()

      if (insertError || !fileRow) {
        setUploadStates(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'error', progress: 0 } : u))
        continue
      }

      setUploadStates(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'success', progress: 100 } : u))
      setModules(prev => prev.map(m => m.id === moduleId
        ? { ...m, files: m.files.find(f => f.id === fileRow.id) ? m.files : [...m.files, fileRow as ModuleFile] }
        : m))

      setTimeout(() => {
        setUploadStates(prev => prev.filter(u => u.id !== uploadId))
      }, 2000)
    }
  }

  const renameFile = async (fileId: string, name: string) => {
    setModules(prev => prev.map(m => ({ ...m, files: m.files.map(f => f.id === fileId ? { ...f, name } : f) })))
    await supabase.from('module_files').update({ name }).eq('id', fileId)
  }

  const deleteFile = async (moduleId: string, file: ModuleFile) => {
    const prevModules = modules
    setModules(prev => prev.map(m => m.id === moduleId ? { ...m, files: m.files.filter(f => f.id !== file.id) } : m))

    const path = file.file_url.split(`${STORAGE_BUCKET}/`)[1]
    if (path) await supabase.storage.from(STORAGE_BUCKET).remove([path])

    const { error } = await supabase.from('module_files').delete().eq('id', file.id)
    if (error) setModules(prevModules)
  }

  // --- Drag and drop (modules + cross-module files) ---

  const findFileContainer = (id: UniqueIdentifier, list: ModuleWithFiles[]) =>
    list.find(m => m.files.some(f => f.id === id))

  const persistModulePositions = async (ordered: ModuleWithFiles[]) => {
    const results = await Promise.all(ordered.map((m, index) =>
      supabase.from('modules').update({ position: index }).eq('id', m.id)
    ))
    const error = results.find(r => r.error)?.error
    if (error) {
      console.error("Failed to persist module positions:", error)
      alert(`Database error reordering modules: ${error.message}`)
    }
  }

  const persistFilePositions = async (moduleId: string, ordered: ModuleFile[], moduleChanged: boolean) => {
    await Promise.all(ordered.map((f, index) =>
      supabase.from('module_files')
        .update(moduleChanged && f.module_id === moduleId ? { position: index, module_id: moduleId } : { position: index })
        .eq('id', f.id)
    ))
  }

  const handleDragStart = (event: DragStartEvent) => {
    dragStartModulesRef.current = modules
    const data = event.active.data.current as DragData | undefined
    setActiveId(event.active.id)
    setActiveType(data?.type === 'file' ? 'file' : 'module')
  }

  // Live re-parenting: as a file is dragged over a different module
  // (or its empty dropzone), move it into that module's files array
  // immediately so the UI reflects where it will land.
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeData = active.data.current as DragData | undefined
    if (activeData?.type !== 'file') return // only files re-parent; modules just reorder on drop

    const overData = over.data.current as DragData | undefined
    const activeModuleId = activeData.moduleId

    let targetModuleId: string | null = null
    if (overData?.type === 'file') targetModuleId = overData.moduleId
    else if (overData?.type === 'module-dropzone') targetModuleId = overData.moduleId
    if (!targetModuleId || targetModuleId === activeModuleId) return

    setModules(prev => {
      const sourceModule = prev.find(m => m.id === activeModuleId)
      const targetModule = prev.find(m => m.id === targetModuleId)
      const movingFile = sourceModule?.files.find(f => f.id === active.id)
      if (!sourceModule || !targetModule || !movingFile) return prev

      const newSourceFiles = sourceModule.files.filter(f => f.id !== active.id)

      let newTargetFiles: ModuleFile[]
      if (overData?.type === 'file') {
        const overIndex = targetModule.files.findIndex(f => f.id === over.id)
        newTargetFiles = [...targetModule.files]
        newTargetFiles.splice(overIndex, 0, { ...movingFile, module_id: targetModuleId! })
      } else {
        newTargetFiles = [...targetModule.files, { ...movingFile, module_id: targetModuleId! }]
      }

      return prev.map(m => {
        if (m.id === sourceModule.id) return { ...m, files: newSourceFiles }
        if (m.id === targetModule.id) return { ...m, files: newTargetFiles }
        return m
      })
    })
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setActiveType(null)
    if (!over) return

    const activeData = active.data.current as DragData | undefined

    // --- Module reorder ---
    if (activeData?.type === 'module') {
      if (active.id === over.id) return
      const oldIndex = modules.findIndex(m => m.id === active.id)
      const newIndex = modules.findIndex(m => m.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return
      const reordered = arrayMove(modules, oldIndex, newIndex)
      setModules(reordered)
      await persistModulePositions(reordered)
      return
    }

    // --- File reorder (possibly cross-module) ---
    if (activeData?.type === 'file') {
      const startModule = findFileContainer(active.id, dragStartModulesRef.current)
      const currentModule = findFileContainer(active.id, modules) // after any live re-parenting in onDragOver
      if (!startModule || !currentModule) return

      // If dropped directly on another file within the (now current) same module, do a final same-list reorder
      const overData = over.data.current as DragData | undefined
      let finalFiles = currentModule.files
      if (overData?.type === 'file' && over.id !== active.id) {
        const overModule = findFileContainer(over.id, modules)
        if (overModule?.id === currentModule.id) {
          const oldIndex = currentModule.files.findIndex(f => f.id === active.id)
          const newIndex = currentModule.files.findIndex(f => f.id === over.id)
          if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            finalFiles = arrayMove(currentModule.files, oldIndex, newIndex)
            setModules(prev => prev.map(m => m.id === currentModule.id ? { ...m, files: finalFiles } : m))
          }
        }
      }

      const moduleChanged = startModule.id !== currentModule.id

      if (moduleChanged) {
        // Persist source module's remaining positions, and target module's positions + new module_id
        const sourceRemaining = startModule.files.filter(f => f.id !== active.id)
        await Promise.all([
          persistFilePositions(startModule.id, sourceRemaining, false),
          persistFilePositions(currentModule.id, finalFiles, true),
        ])
      } else {
        await persistFilePositions(currentModule.id, finalFiles, false)
      }
    }
  }

  const activeFile = activeType === 'file'
    ? modules.flatMap(m => m.files).find(f => f.id === activeId) ?? null
    : null
  const activeModule = activeType === 'module'
    ? modules.find(m => m.id === activeId) ?? null
    : null

  // Prevent hydration mismatch: @dnd-kit generates random IDs on the server
  // that don't match the client, causing React to silently discard the tree.
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return (
      <div className="flex flex-col gap-3 h-full overflow-y-auto p-4">
        <p className="text-sm text-gray-400">Loading modules…</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto p-4">
      <DndContext
        id="course-builder-dnd"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
          {modules.map(module => (
            <ModuleItem
              key={module.id}
              module={module}
              isExpanded={expandedIds.has(module.id)}
              onToggleExpand={() => toggleExpanded(module.id)}
              onRename={(title) => renameModule(module.id, title)}
              onDelete={() => deleteModule(module.id)}
              onUploadFiles={(files) => uploadFiles(module.id, files)}
              onRenameFile={renameFile}
              onDeleteFile={(file) => deleteFile(module.id, file)}
              uploadStates={uploadStates.filter(u => u.moduleId === module.id)}
              onSaveIndicatorChange={onSaveIndicatorChange}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeFile && (
            <div className="flex items-center gap-2 rounded-md border border-blue-300 bg-white px-2 py-1.5 shadow-lg">
              <FileIcon type={activeFile.file_type} />
              <span className="text-sm text-gray-700">{activeFile.name}</span>
            </div>
          )}
          {activeModule && (
            <div className="flex items-center gap-2 rounded-lg border border-blue-300 bg-white px-3 py-2 shadow-lg">
              <MdFolder className="text-lg text-amber-500" />
              <span className="text-sm font-medium">{activeModule.title}</span>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <button
        onClick={addModule}
        disabled={addingModule}
        className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50"
      >
        <MdAdd className="text-lg" />
        {addingModule ? 'Adding module…' : 'Add module'}
      </button>
    </div>
  )
})

// ============================================
// MODULE ITEM COMPONENT (Sortable + Droppable)
// ============================================

function ModuleItem({
  module,
  isExpanded,
  onToggleExpand,
  onRename,
  onDelete,
  onUploadFiles,
  onRenameFile,
  onDeleteFile,
  uploadStates,
  onSaveIndicatorChange,
}: {
  module: ModuleWithFiles
  isExpanded: boolean
  onToggleExpand: () => void
  onRename: (title: string) => void
  onDelete: () => void
  onUploadFiles: (files: FileList) => void
  onRenameFile: (id: string, name: string) => void
  onDeleteFile: (file: ModuleFile) => void
  uploadStates: FileUploadState[]
  onSaveIndicatorChange?: (status: 'idle' | 'editing' | 'saving' | 'saved' | 'error') => void
}) {
  const dragData: DragData = { type: 'module' }
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: module.id,
    data: dragData,
  })
  const [title, setTitle] = useState(module.title)
  const [menuOpen, setMenuOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => setTitle(module.title), [module.title])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    onSaveIndicatorChange?.('editing')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onRename(value)
    }, 800)
  }

  return (
    <div ref={setNodeRef} style={style} className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center gap-2 px-3 py-2">
        <button {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing">
          <MdDragIndicator className="text-lg" />
        </button>
        <button onClick={onToggleExpand} className="text-gray-500 hover:text-gray-700">
          {isExpanded ? <MdExpandMore className="text-lg" /> : <MdChevronRight className="text-lg" />}
        </button>
        <MdFolder className="text-lg text-amber-500 flex-shrink-0" />
        <input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="flex-1 bg-transparent text-sm font-medium outline-none focus:underline"
        />
        <span className="text-xs text-gray-400">{module.files.length} file{module.files.length === 1 ? '' : 's'}</span>
        <div className="relative">
          <button onClick={() => setMenuOpen(o => !o)} className="text-gray-400 hover:text-gray-600">
            <MdMoreVert className="text-lg" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-10 mt-1 w-32 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              <button
                onClick={() => { setMenuOpen(false); onDelete() }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
              >
                <MdDelete className="text-base" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100 px-3 py-2">
          <SortableContext items={module.files.filter(f => ['pdf', 'video'].includes(f.file_type)).map(f => f.id)} strategy={verticalListSortingStrategy}>
            {module.files.filter(f => ['pdf', 'video'].includes(f.file_type)).length > 0 ? (
              <div className="flex flex-col gap-1">
                {module.files.filter(f => ['pdf', 'video'].includes(f.file_type)).map(file => (
                  <FileItem
                    key={file.id}
                    file={file}
                    onRename={onRenameFile}
                    onDelete={() => onDeleteFile(file)}
                  />
                ))}
              </div>
            ) : (
              <EmptyModuleDropzone moduleId={module.id} />
            )}
          </SortableContext>

          {uploadStates.map(u => (
            <div key={u.id} className="flex items-center gap-2 px-2 py-1 text-xs text-gray-500">
              <span className="flex-1 truncate">{u.fileName}</span>
              {u.status === 'uploading' && (
                <div className="h-1 w-24 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full bg-blue-500 transition-all" style={{ width: `${u.progress}%` }} />
                </div>
              )}
              {u.status === 'error' && <span className="text-red-500">Failed</span>}
              {u.status === 'success' && <span className="text-green-500">Done</span>}
            </div>
          ))}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 flex items-center gap-2 rounded-md border border-dashed border-gray-300 px-3 py-2 text-xs text-gray-500 hover:border-gray-400 hover:bg-gray-50"
          >
            <MdCloudUpload className="text-base" />
            Add files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) onUploadFiles(e.target.files)
              e.target.value = ''
            }}
          />
        </div>
      )}
    </div>
  )
}

// Droppable placeholder shown when a module has no files, so it can
// still receive a file dragged over from another module.
function EmptyModuleDropzone({ moduleId }: { moduleId: string }) {
  const dragData: DragData = { type: 'module-dropzone', moduleId }
  const { setNodeRef, isOver } = useDroppable({ id: `dropzone-${moduleId}`, data: dragData })

  return (
    <div
      ref={setNodeRef}
      className={`rounded-md border border-dashed px-3 py-4 text-center text-xs transition-colors ${isOver ? 'border-blue-400 bg-blue-50 text-blue-500' : 'border-gray-200 text-gray-400'
        }`}
    >
      Drop files here
    </div>
  )
}

// ============================================
// FILE ITEM COMPONENT (Sortable)
// ============================================

function FileItem({
  file,
  onRename,
  onDelete,
}: {
  file: ModuleFile
  onRename: (id: string, name: string) => void
  onDelete: () => void
}) {
  const dragData: DragData = { type: 'file', moduleId: file.module_id }
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.id,
    data: dragData,
  })
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(file.name)

  useEffect(() => setName(file.name), [file.name])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.3 : 1,
  }

  const commitRename = () => {
    setEditing(false)
    if (name.trim() && name !== file.name) onRename(file.id, name.trim())
    else setName(file.name)
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-50">
      <button {...attributes} {...listeners} className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing">
        <MdDragIndicator className="text-base" />
      </button>
      <FileIcon type={file.file_type} />
      {editing ? (
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') { setName(file.name); setEditing(false) } }}
          className="flex-1 border-b border-blue-400 bg-transparent text-sm outline-none"
        />
      ) : (
        <span onClick={() => setEditing(true)} className="flex-1 cursor-text truncate text-sm text-gray-700">
          {file.name}
        </span>
      )}
      <span className="text-xs text-gray-400">{formatFileSize(file.file_size)}</span>
      <button onClick={() => setEditing(true)} className="text-gray-300 hover:text-gray-500">
        <MdEdit className="text-sm" />
      </button>
      <button onClick={onDelete} className="text-gray-300 hover:text-red-500">
        <MdDelete className="text-sm" />
      </button>
    </div>
  )
}