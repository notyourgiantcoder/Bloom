'use client'

import { useState, useEffect, useRef } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import { Module, ModuleFile, ModuleWithFiles } from '@/types/database'
import {
  MdAdd, MdFolder, MdDragIndicator, MdMoreVert, MdExpandMore, MdChevronRight,
  MdPictureAsPdf, MdVideocam, MdImage, MdAudiotrack, MdDescription, MdAttachFile, MdRefresh
} from 'react-icons/md'
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent
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

// --- Helpers ---
function getFileType(mimeType: string): ModuleFile['file_type'] {
  if (mimeType === 'application/pdf') return 'pdf'
  if (['video/mp4','video/quicktime','video/webm','video/x-msvideo'].includes(mimeType)) return 'video'
  if (['image/jpeg','image/png','image/gif','image/webp','image/svg','image/svg+xml'].includes(mimeType)) return 'image'
  if (['audio/mpeg','audio/wav','audio/ogg','audio/mp4'].includes(mimeType)) return 'audio'
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

export function ModuleManager({ courseId, userId, initialModules, onSaveIndicatorChange }: ModuleManagerProps) {
  const [modules, setModules] = useState<ModuleWithFiles[]>(initialModules || [])
  const supabase = getSupabaseBrowserClient()

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
            const exists = prev.find(m => m.id === newMod.id)
            if (exists) return prev
            return [...prev, { ...newMod, files: [] }].sort((a, b) => a.position - b.position)
          })
        } else if (payload.eventType === 'UPDATE') {
          const upMod = payload.new as Module
          setModules(prev => prev.map(m => m.id === upMod.id ? { ...upMod, files: m.files } : m).sort((a, b) => a.position - b.position))
        } else if (payload.eventType === 'DELETE') {
          const delId = (payload.old as Module).id
          setModules(prev => prev.filter(m => m.id !== delId))
        }
      })
     
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
            const exists = m.files.find(f => f.id === newFile.id)
            if (exists) return m
            return { ...m, files: [...m.files, newFile].sort((a, b) => a.position - b.position) }
          }))
        } else if (payload.eventType === 'UPDATE') {
          const upFile = payload.new as ModuleFile
          setModules(prev => prev.map(m => m.id === upFile.module_id ? { ...m, files: m.files.map(f => f.id === upFile.id ? upFile : f).sort((a, b) => a.position - b.position) } : m))
        } else if (payload.eventType === 'DELETE') {
          const delFile = payload.old as ModuleFile
          setModules(prev => prev.map(m => m.id === delFile.module_id ? { ...m, files: m.files.filter(f => f.id !== delFile.id) } : m))
        }
      })

    return () => { supabase.removeChannel(channel) }
  }, [courseId, supabase])

  // State for optimistic module
  const [optimisticModule, setOptimisticModule] = useState<ModuleWithFiles | null>(null)
  // File upload states
  const [uploadStates, setUploadStates] = useState<FileUploadState[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setModules(prev => {
      const oldIndex = prev.findIndex(m => m.id === active.id)
      const newIndex = prev.findIndex(m => m.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return prev
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  return <div>ModuleManager Placeholder - Implementation in progress</div>
}

// ============================================
// FILE ITEM COMPONENT (Sortable)
// ============================================

function FileItem({
  file,
  isOptimistic,
  onRename,
  onDelete,
}: {
  file: ModuleFile
  isOptimistic: boolean
  onRename: (id: string, name: string) => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: file.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {file.name}
    </div>
  )
}
