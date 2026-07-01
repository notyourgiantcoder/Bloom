-- ========================================
-- Run this SQL in Supabase SQL Editor
-- ========================================

-- 1. Add cover_url and content columns to courses table
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS cover_url TEXT DEFAULT NULL;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS content TEXT DEFAULT NULL;

-- 2. Create modules table
CREATE TABLE IF NOT EXISTS public.modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled Module',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable RLS on modules
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies for modules (same pattern as courses)
CREATE POLICY "Users can view their own modules"
  ON public.modules FOR SELECT
  USING (
    course_id IN (
      SELECT id FROM public.courses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert modules for their courses"
  ON public.modules FOR INSERT
  WITH CHECK (
    course_id IN (
      SELECT id FROM public.courses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own modules"
  ON public.modules FOR UPDATE
  USING (
    course_id IN (
      SELECT id FROM public.courses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own modules"
  ON public.modules FOR DELETE
  USING (
    course_id IN (
      SELECT id FROM public.courses WHERE user_id = auth.uid()
    )
  );

-- 5. Enable Realtime on modules table
ALTER PUBLICATION supabase_realtime ADD TABLE public.modules;

-- 6. Create 'covers' storage bucket (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('covers', 'covers', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage policy: allow authenticated users to upload covers
CREATE POLICY "Authenticated users can upload covers"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'covers');

CREATE POLICY "Anyone can view covers"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'covers');

CREATE POLICY "Users can update their own covers"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'covers');

CREATE POLICY "Users can delete their own covers"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'covers');

-- 8. Create 'videos' storage bucket (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- 9. Storage policies for videos bucket
CREATE POLICY "Authenticated users can upload videos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Anyone can view videos"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'videos');

CREATE POLICY "Users can update their own videos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'videos');

CREATE POLICY "Users can delete their own videos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'videos');

-- 10. Create lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Enable RLS on lessons
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- 12. RLS policies for lessons
CREATE POLICY "Users can view their own lessons"
  ON public.lessons FOR SELECT
  USING (
    module_id IN (
      SELECT id FROM public.modules WHERE course_id IN (
        SELECT id FROM public.courses WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can insert lessons for their modules"
  ON public.lessons FOR INSERT
  WITH CHECK (
    module_id IN (
      SELECT id FROM public.modules WHERE course_id IN (
        SELECT id FROM public.courses WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update their own lessons"
  ON public.lessons FOR UPDATE
  USING (
    module_id IN (
      SELECT id FROM public.modules WHERE course_id IN (
        SELECT id FROM public.courses WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can delete their own lessons"
  ON public.lessons FOR DELETE
  USING (
    module_id IN (
      SELECT id FROM public.modules WHERE course_id IN (
        SELECT id FROM public.courses WHERE user_id = auth.uid()
      )
    )
  );

-- 13. Enable Realtime on lessons table
ALTER PUBLICATION supabase_realtime ADD TABLE public.lessons;

-- 14. Create 'lessons' storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('lessons', 'lessons', true)
ON CONFLICT (id) DO NOTHING;

-- 15. Storage policies for lessons bucket
CREATE POLICY "Authenticated users can upload lessons"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'lessons');

CREATE POLICY "Anyone can view lessons"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'lessons');

CREATE POLICY "Users can update their own lessons"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'lessons');

CREATE POLICY "Users can delete their own lessons"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'lessons');
