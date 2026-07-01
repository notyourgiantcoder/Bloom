import { useState, useEffect, useRef } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'

export type SaveStatus = 'idle' | 'editing' | 'saving' | 'saved' | 'error'

export function useAutosave(
  data: Record<string, unknown>,
  courseId: string,
  delay: number = 1500
) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const supabase = getSupabaseBrowserClient()
  
  // Track initial mount to avoid saving right when the component loads
  const isInitialMount = useRef(true)
  
  // Stringify data for stable dependency comparison
  const dataString = JSON.stringify(data)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (!courseId) return

    setSaveStatus('editing')

    const timeoutId = setTimeout(async () => {
      setSaveStatus('saving')
      
      const attemptSave = async (retry: boolean) => {
        // We use JSON.parse to get the snapshot of data at the time the timeout resolves
        const dataToSave = JSON.parse(dataString)
        
        const { error } = await supabase
          .from('courses')
          .update(dataToSave)
          .eq('id', courseId)

        if (error) {
          if (!retry) {
            setSaveStatus('error')
            // Retry once after 3 seconds
            setTimeout(() => {
              attemptSave(true)
            }, 3000)
          } else {
            setSaveStatus('error')
          }
        } else {
          setSaveStatus('saved')
        }
      }

      attemptSave(false)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [dataString, courseId, delay, supabase])

  return [saveStatus, setSaveStatus] as const
}
