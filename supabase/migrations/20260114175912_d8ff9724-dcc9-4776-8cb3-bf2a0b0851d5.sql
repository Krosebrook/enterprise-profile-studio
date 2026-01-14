-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'editor', 'viewer');

-- Create profile status enum
CREATE TYPE public.profile_status AS ENUM ('draft', 'published', 'archived');

-- Create profiles table for user metadata
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create enterprise profiles table
CREATE TABLE public.enterprise_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  status profile_status NOT NULL DEFAULT 'draft',
  company_info JSONB DEFAULT '{}',
  branding JSONB DEFAULT '{}',
  services JSONB DEFAULT '[]',
  team JSONB DEFAULT '[]',
  compliance JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profile revisions table for version history
CREATE TABLE public.profile_revisions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.enterprise_profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  revision_number INTEGER NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics events table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.enterprise_profiles(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enterprise_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.user_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Enterprise profiles policies
CREATE POLICY "Users can view their own enterprise profiles" 
ON public.enterprise_profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create enterprise profiles" 
ON public.enterprise_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enterprise profiles" 
ON public.enterprise_profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own enterprise profiles" 
ON public.enterprise_profiles FOR DELETE 
USING (auth.uid() = user_id);

-- Published profiles are viewable by anyone
CREATE POLICY "Published profiles are publicly viewable" 
ON public.enterprise_profiles FOR SELECT 
USING (status = 'published');

-- Profile revisions policies
CREATE POLICY "Users can view their own profile revisions" 
ON public.profile_revisions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create revisions for their profiles" 
ON public.profile_revisions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Analytics events policies
CREATE POLICY "Users can view their own analytics" 
ON public.analytics_events FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create analytics events" 
ON public.analytics_events FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create indexes for performance
CREATE INDEX idx_enterprise_profiles_user_id ON public.enterprise_profiles(user_id);
CREATE INDEX idx_enterprise_profiles_status ON public.enterprise_profiles(status);
CREATE INDEX idx_enterprise_profiles_slug ON public.enterprise_profiles(slug);
CREATE INDEX idx_profile_revisions_profile_id ON public.profile_revisions(profile_id);
CREATE INDEX idx_analytics_events_profile_id ON public.analytics_events(profile_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enterprise_profiles_updated_at
BEFORE UPDATE ON public.enterprise_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();