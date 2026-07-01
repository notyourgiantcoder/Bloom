import { requireAuth } from "@/lib/supabase/auth-helpers"
import { getSupabaseServerClient } from "@/lib/supabase/server-client"
import { Course, RenderJob } from "@/types/database"
import { BuilderClient } from "./BuilderClient"
import { notFound } from "next/navigation"

export default async function CourseBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await requireAuth()
  const supabase = await getSupabaseServerClient()
  const { id } = await params

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single()

  if (!course || course.user_id !== user.id) {
    notFound()
  }

  const { data: job } = await supabase
    .from('render_jobs')
    .select('*')
    .eq('course_id', id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const { data: initialModules } = await supabase
    .from('modules')
    .select('*')
    .eq('course_id', id)
    .order('position', { ascending: true })

  return (
    <BuilderClient
      initialCourse={course as Course}
      initialJob={(job as RenderJob) || null}
      initialModules={initialModules || []}
    />
  )
}
