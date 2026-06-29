-- User Profile Table
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  tagline TEXT,
  bio TEXT,
  resume_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT, -- For detailed project case studies
  images TEXT[] DEFAULT '{}',
  video_url TEXT,
  github_url TEXT,
  live_url TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills Table
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 100),
  icon_url TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Experience Table
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Sections Config (For dynamic CMS builder)
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  visible BOOLEAN DEFAULT TRUE,
  position INTEGER NOT NULL,
  layout_type TEXT DEFAULT 'grid',
  animation_type TEXT DEFAULT 'fade-up',
  settings_json JSONB DEFAULT '{}'::jsonb
);

-- Media Library (Cloudinary references)
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  type TEXT NOT NULL, -- image, video, document
  cloudinary_id TEXT,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Settings
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  theme TEXT DEFAULT 'dark',
  primary_color TEXT DEFAULT '#00E5FF',
  secondary_color TEXT DEFAULT '#7C3AED',
  background_color TEXT DEFAULT '#050816',
  cursor_effect TEXT DEFAULT 'default',
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}'
);

-- Set up Row Level Security (RLS)
-- Example: Allow public read access, but only authenticated admin can modify
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profile FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profile FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile." ON profile FOR UPDATE USING (auth.uid() = user_id);

-- (Apply similar RLS policies to other tables based on role requirements)
