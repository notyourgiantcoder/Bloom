export type Course = {
  id: string
  user_id: string
  title: string
  description: string | null
  pdf_url: string | null
  video_url: string | null
  cover_url: string | null
  content: string | null
  status: 'draft' | 'published'
  created_at: string
}

export type RenderJob = {
  id: string
  user_id: string
  course_id: string
  status: 'queued' | 'processing_pipeline' | 'manifest_ready' | 'rendering_video' | 'complete' | 'failed'
  progress: number
  error_message: string | null
  manifest_url: string | null
  video_url: string | null
  created_at: string
}

export type Module = {
  id: string
  course_id: string
  title: string
  position: number
  created_at: string
}

export type Lesson = {
  id: string
  module_id: string
  title: string
  type: 'video' | 'pdf'
  file_url: string
  position: number
  created_at: string
}
