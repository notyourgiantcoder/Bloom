import { useState, useEffect } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import { Course } from '@/types/database'

export function useRealtimeCourses(initialCourses: Course[], userId: string) {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  
  // We recreate the Supabase client inside the hook so it works client-side.
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    if (!userId) return

    const channelName = `courses-${userId}-${Date.now()}`
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'courses',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newCourse = payload.new as Course
            setCourses((prev) => [newCourse, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            const updatedCourse = payload.new as Course
            setCourses((prev) =>
              prev.map((course) =>
                course.id === updatedCourse.id ? updatedCourse : course
              )
            )
          } else if (payload.eventType === 'DELETE') {
            const deletedCourseId = payload.old.id
            setCourses((prev) =>
              prev.filter((course) => course.id !== deletedCourseId)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])

  return courses
}
