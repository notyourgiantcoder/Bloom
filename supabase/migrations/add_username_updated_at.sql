-- Run this in Supabase Dashboard → SQL Editor
-- Adds a column to track when the username was last updated

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
