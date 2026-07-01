'use client'

import { useState } from 'react'
import { Course } from '@/types/database'
import { useRealtimeCourses } from '@/hooks/useRealtimeCourses'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import Link from 'next/link'

export function CoursesClient({ initialCourses, userId }: { initialCourses: Course[], userId: string }) {
  const courses = useRealtimeCourses(initialCourses, userId)
  const [isInserting, setIsInserting] = useState(false)
  const [insertError, setInsertError] = useState<string | null>(null)
  const supabase = getSupabaseBrowserClient()

  const handleNewCourse = async () => {
    setIsInserting(true)
    setInsertError(null)

    const { data, error } = await supabase
      .from('courses')
      .insert({
        user_id: userId,
        title: 'Untitled Course',
        description: '',
        status: 'draft',
      })
      .select()
      .single()

    if (error) {
      setInsertError(error.message)
      setIsInserting(false)
    } else if (data) {
      // Navigate to the newly created course builder page
      window.location.href = `/courses/${data.id}/edit`
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Your Courses</h1>
        <button 
          onClick={handleNewCourse}
          disabled={isInserting}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isInserting ? 'Creating...' : 'New Course'}
        </button>
      </div>

      {insertError && (
        <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
          Failed to create course: {insertError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isInserting && !insertError && (
          <div className="border border-dashed border-gray-300 p-5 rounded-xl flex flex-col gap-3 opacity-50 bg-gray-50">
             <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
             <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
             <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>
        )}

        {courses.map(course => (
          <div key={course.id} className="border border-gray-200 p-5 rounded-xl shadow-sm bg-white flex flex-col gap-3 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start gap-4">
               <h2 className="font-semibold text-lg line-clamp-1 text-gray-900">{course.title}</h2>
               <span className={`px-2 py-1 rounded text-xs uppercase tracking-wider font-medium flex-shrink-0 ${
                 course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
               }`}>
                 {course.status}
               </span>
             </div>
             
             <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
               {course.description || 'No description provided.'}
             </p>
             
             <div className="mt-auto pt-4 flex gap-3 border-t border-gray-100">
                <Link 
                  href={`/courses/${course.id}/edit`}
                  className="text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors text-center"
                >
                  Edit
                </Link>
                {course.status === 'published' && course.video_url && (
                  <a 
                    href={course.video_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors text-center flex-1"
                  >
                    Watch Video
                  </a>
                )}
             </div>
          </div>
        ))}
        
        {!isInserting && courses.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            You don't have any courses yet. Click "New Course" to get started!
          </div>
        )}
      </div>
    </div>
  )
}
