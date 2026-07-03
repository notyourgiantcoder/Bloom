import { useState, useEffect, useCallback } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import { Module, ModuleFile, ModuleWithFiles } from '@/types/database'

// --- Types ---

export type FileUploadState = {
  id: string
  fileName: string
  progress: number
  status: 'uploading' | 'error' | 'success'
  moduleId: string
}

export type UseModulesReturn = {
  modules: ModuleWithFiles[]
  addModule: () => Promise<void>
  updateModuleTitle: (id: string, title: string) => Promise<void>
  deleteModule: (id: string) => Promise<void>
  reorderModules: (newOrder: ModuleWithFiles[]) => Promise<void>
  addFiles: (moduleId: string, files: File[]) => Promise<void>
  deleteFile: (moduleId: string, fileId: string) => Promise<void>
  reorderFiles: (moduleId: string, newOrder: ModuleFile[]) => Promise<void>
  uploadStates: FileUploadState[]
}

// --- Helpers ---

function getFileType(mimeType: string): ModuleFile['file_type'] {
  if (mimeType === 'application/pdf') return 'pdf'
  if ([
    'video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo'
  ].includes(mimeType)) return 'video'
  if ([
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg', 'image/svg+xml'
  ].includes(mimeType)) return 'image'
  if ([
    'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4'
  ].includes(mimeType)) return 'audio'
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

// --- Hook ---

export function useModules(
  courseId: string,
  userId: string,
  initialModules: ModuleWithFiles[]
): UseModulesReturn {
  const supabase = getSupabaseBrowserClient()
  const [modules, setModules] = useState<ModuleWithFiles[]>(initialModules)
  const [uploadStates, setUploadStates] = useState<FileUploadState[]>([])

  // Keep modules in sync if initialModules prop changes (server hydration)
  useEffect(() => {
    setModules(initialModules)
  }, [initialModules])

  // --- Realtime: Modules ---
  useEffect(() => {
    if (!courseId) return

    const channelName = `modules-${courseId}`

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'modules',
          filter: `course_id=eq.${courseId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMod = payload.new as Module
            setModules((prev) => {
              const exists = prev.find((m) => m.id === newMod.id)
              if (exists) return prev
              const updated = [...prev, { ...newMod, files: [] }]
              return updated.sort((a, b) => a.position - b.position)
            })
          } else if (payload.eventType === 'UPDATE') {
            const upMod = payload.new as Module
            setModules((prev) => {
              const updated = prev.map((m) =>
                m.id === upMod.id ? { ...m, ...upMod } : m
              )
              return updated.sort((a, b) => a.position - b.position)
            })
          } else if (payload.eventType === 'DELETE') {
            const delId = (payload.old as Module).id
            setModules((prev) => prev.filter((m) => m.id !== delId))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [courseId, supabase])

  // --- Realtime: Module Files ---
  useEffect(() => {
    if (!courseId) return

    const channelName = `module-files-${courseId}`

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'module_files',
          filter: `course_id=eq.${courseId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newFile = payload.new as ModuleFile
            setModules((prev) => {
              return prev.map((m) => {
                if (m.id !== newFile.module_id) return m
                const exists = m.files.find((f) => f.id === newFile.id)
                if (exists) return m
                const updatedFiles = [...m.files, newFile].sort(
                  (a, b) => a.position - b.position
                )
                return { ...m, files: updatedFiles }
              })
            })
          } else if (payload.eventType === 'UPDATE') {
            const upFile = payload.new as ModuleFile
            setModules((prev) => {
              return prev.map((m) => {
                if (m.id !== upFile.module_id) return m
                const updatedFiles = m.files
                  .map((f) => (f.id === upFile.id ? upFile : f))
                  .sort((a, b) => a.position - b.position)
                return { ...m, files: updatedFiles }
              })
            })
          } else if (payload.eventType === 'DELETE') {
            const delFile = payload.old as ModuleFile
            setModules((prev) => {
              return prev.map((m) => {
                if (m.id !== delFile.module_id) return m
                return {
                  ...m,
                  files: m.files.filter((f) => f.id !== delFile.id),
                }
              })
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [courseId, supabase])

  // --- Actions ---

  const addModule = useCallback(async () => {
    const maxPosition =
      modules.length > 0 ? Math.max(...modules.map((m) => m.position)) : 0
    const newPosition = maxPosition + 1000

    // Optimistic
    const tempId = 'optimistic-' + Date.now()
    const optimisticModule: ModuleWithFiles = {
      id: tempId,
      course_id: courseId,
      title: 'Untitled Module',
      position: newPosition,
      created_at: new Date().toISOString(),
      files: [],
    }

    setModules((prev) => [...prev, optimisticModule])

    const { error } = await supabase.from('modules').insert({
      course_id: courseId,
      title: 'Untitled Module',
      position: newPosition,
    })

    if (error) {
      setModules((prev) => prev.filter((m) => m.id !== tempId))
      throw error
    }
  }, [modules, courseId, supabase])

  const updateModuleTitle = useCallback(
    async (id: string, title: string) => {
      setModules((prev) =>
        prev.map((m) => (m.id === id ? { ...m, title } : m))
      )
      const { error } = await supabase
        .from('modules')
        .update({ title })
        .eq('id', id)
      if (error) {
        // Revert not easily done without backup; minimal approach
        throw error
      }
    },
    [supabase]
  )

  const deleteModule = useCallback(
    async (id: string) => {
      const backup = [...modules]
      setModules((prev) => prev.filter((m) => m.id !== id))

      const { error } = await supabase.from('modules').delete().eq('id', id)
      if (error) {
        setModules(backup)
        throw error
      }
    },
    [modules, supabase]
  )

  const reorderModules = useCallback(
    async (newOrder: ModuleWithFiles[]) => {
      const backup = [...modules]
      setModules(newOrder)

      const updates = newOrder.map((m, i) => ({
        id: m.id,
        position: i * 1000,
      }))

      const promises = updates.map((u) =>
        supabase.from('modules').update({ position: u.position }).eq('id', u.id)
      )

      try {
        await Promise.all(promises)
      } catch (err) {
        setModules(backup)
        throw err
      }
    },
    [modules, supabase]
  )

  // --- File Upload ---

  const FILE_SIZE_LIMIT = 5 * 1024 * 1024 * 1024 // 5GB

  const uploadFile = useCallback(
    async (moduleId: string, file: File) => {
      if (file.size > FILE_SIZE_LIMIT) {
        throw new Error('File too large. Maximum size is 5GB.')
      }

      const uploadId = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

      setUploadStates((prev) => [
        ...prev,
        {
          id: uploadId,
          fileName: file.name,
          progress: 0,
          status: 'uploading',
          moduleId,
        },
      ])

      const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
      const fileName = `course-files/${userId}/${courseId}/${moduleId}/${uniqueId}-${file.name}`
      const bucketName = 'course-files'

      try {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file)

        if (uploadError) throw uploadError

        setUploadStates((prev) =>
          prev.map((u) => (u.id === uploadId ? { ...u, progress: 100 } : u))
        )

        const { data: signedUrlData } = await supabase.storage
          .from(bucketName)
          .createSignedUrl(fileName, 60 * 60 * 24 * 365) // 1 year

        const signedUrl = signedUrlData?.signedUrl || ''

        // Determine position
        const mod = modules.find((m) => m.id === moduleId)
        const maxPos = mod?.files.length
          ? Math.max(...mod.files.map((f) => f.position))
          : 0
        const newPos = maxPos + 1000

        const { error: insertError } = await supabase.from('module_files').insert({
          module_id: moduleId,
          course_id: courseId,
          name: file.name,
          file_url: signedUrl,
          file_type: getFileType(file.type),
          file_size: file.size,
          position: newPos,
        })

        if (insertError) throw insertError

        setUploadStates((prev) => prev.filter((u) => u.id !== uploadId))
      } catch (err) {
        setUploadStates((prev) =>
          prev.map((u) =>
            u.id === uploadId ? { ...u, status: 'error' } : u
          )
        )
        throw err
      }
    },
    [courseId, userId, modules, supabase]
  )

  const addFiles = useCallback(
    async (moduleId: string, files: File[]) => {
      const promises = files.map((file) => uploadFile(moduleId, file))
      await Promise.all(promises)
    },
    [uploadFile]
  )

  const deleteFile = useCallback(
    async (moduleId: string, fileId: string) => {
      const backup = [...modules]

      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId
            ? { ...m, files: m.files.filter((f) => f.id !== fileId) }
            : m
        )
      )

      const { error } = await supabase
        .from('module_files')
        .delete()
        .eq('id', fileId)

      if (error) {
        setModules(backup)
        throw error
      }
    },
    [modules, supabase]
  )

  const reorderFiles = useCallback(
    async (moduleId: string, newOrder: ModuleFile[]) => {
      const backup = [...modules]

      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, files: newOrder } : m
        )
      )

      const updates = newOrder.map((f, i) => ({
        id: f.id,
        position: i * 1000,
      }))

      try {
        await Promise.all(
          updates.map((u) =>
            supabase
              .from('module_files')
              .update({ position: u.position })
              .eq('id', u.id)
          )
        )
      } catch (err) {
        setModules(backup)
        throw err
      }
    },
    [modules, supabase]
  )

  return {
    modules,
    addModule,
    updateModuleTitle,
    deleteModule,
    reorderModules,
    addFiles,
    deleteFile,
    reorderFiles,
    uploadStates,
  }
}

export { getFileType, formatFileSize }
