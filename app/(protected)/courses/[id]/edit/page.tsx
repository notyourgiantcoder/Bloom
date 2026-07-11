import { requireAuth } from "@/lib/supabase/auth-helpers"
import { getSupabaseServerClient } from "@/lib/supabase/server-client"
import { Course, ModuleWithFiles } from "@/types/database"
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

  const { data: initialModules } = await supabase
    .from('modules')
    .select('*')
    .eq('course_id', id)
    .order('position', { ascending: true })

  const { data: moduleFiles } = await supabase
    .from('module_files')
    .select('*')
    .eq('course_id', id)
    .in('file_type', ['pdf', 'video'])
    .order('position', { ascending: true })

  const modulesWithFiles = (initialModules || []).map((m): ModuleWithFiles => ({
    ...m,
    files: (moduleFiles || []).filter(f => f.module_id === m.id)
  }))

  return (
    <BuilderClient
      initialCourse={course as Course}
      initialModules={modulesWithFiles}
    />
  )
}