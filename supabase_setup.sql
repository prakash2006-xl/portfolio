-- ==========================================
-- 1. DATABASE SETUP (app_state)
-- ==========================================

-- Create the application state table
CREATE TABLE IF NOT EXISTS public.app_state (
  id TEXT PRIMARY KEY,
  state JSONB
);

-- Enable Row Level Security (RLS) on the table
ALTER TABLE public.app_state ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read the app state
CREATE POLICY "Allow public read-only access" ON public.app_state
  FOR SELECT
  USING (true);

-- Create a policy to allow ONLY authenticated users to insert/update the app state
CREATE POLICY "Allow authenticated users to insert/update" ON public.app_state
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');


-- ==========================================
-- 2. STORAGE SETUP (portfolio-assets)
-- ==========================================

-- Create the storage bucket for image uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage objects is already handled by Supabase by default

-- Allow public read-only access to assets in the bucket
CREATE POLICY "Allow public read-only access to assets" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'portfolio-assets');

-- Allow authenticated users to upload, update, and delete assets
CREATE POLICY "Allow authenticated users to modify assets" ON storage.objects
  FOR ALL
  USING (
    bucket_id = 'portfolio-assets' AND 
    auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'portfolio-assets' AND 
    auth.role() = 'authenticated'
  );
