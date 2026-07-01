import { requireAuth } from "@/lib/supabase/auth-helpers"
import { getSupabaseServerClient } from "@/lib/supabase/server-client"
import { CoursesClient } from "./CoursesClient"
import { Course } from "@/types/database"

export default async function CoursesPage() {
  const { user } = await requireAuth()
  const supabase = await getSupabaseServerClient()

  // Initial server-side fetch for fast first load
  const { data: initialCourses } = await supabase
    .from('courses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <CoursesClient 
        initialCourses={(initialCourses as Course[]) || []} 
        userId={user.id} 
      />
    </div>
  )
}
