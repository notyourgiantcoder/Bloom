-- Run this in Supabase Dashboard → SQL Editor
-- Adds an RLS policy to allow users to insert their own profile row

CREATE POLICY "Users can insert their own profile."
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);
