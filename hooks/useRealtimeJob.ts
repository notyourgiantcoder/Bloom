import { useState, useEffect } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import { RenderJob } from '@/types/database'

export function useRealtimeJob(initialJob: RenderJob | null, courseId: string) {
  const [job, setJob] = useState<RenderJob | null>(initialJob)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    if (!courseId) return

    const channelName = `job-${courseId}-${Date.now()}`
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'render_jobs',
          filter: `course_id=eq.${courseId}`,
        },
        (payload) => {
          const updatedJob = payload.new as RenderJob
          setJob(updatedJob)
        }
      )
      // If we did want to catch the initial job creation via realtime, we'd add an INSERT listener here.
      // But adhering to the spec which says "UPDATE event handler only (no INSERT/DELETE needed here)".
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [courseId, supabase])

  return job
}
