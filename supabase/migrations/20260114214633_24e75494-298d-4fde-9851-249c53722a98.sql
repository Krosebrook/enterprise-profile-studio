-- Create folders table first
CREATE TABLE public.knowledge_base_folders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  parent_id UUID REFERENCES public.knowledge_base_folders(id) ON DELETE CASCADE,
  color TEXT DEFAULT 'blue',
  icon TEXT DEFAULT 'folder',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint on folder name per user and parent
CREATE UNIQUE INDEX idx_folders_user_parent_name ON public.knowledge_base_folders(user_id, COALESCE(parent_id, '00000000-0000-0000-0000-000000000000'::uuid), name);

-- Enable RLS
ALTER TABLE public.knowledge_base_folders ENABLE ROW LEVEL SECURITY;

-- Users can view their own folders
CREATE POLICY "Users can view their own folders" 
ON public.knowledge_base_folders 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own folders
CREATE POLICY "Users can create their own folders" 
ON public.knowledge_base_folders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own folders
CREATE POLICY "Users can update their own folders" 
ON public.knowledge_base_folders 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own folders
CREATE POLICY "Users can delete their own folders" 
ON public.knowledge_base_folders 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for folder timestamp updates
CREATE TRIGGER update_folders_updated_at
BEFORE UPDATE ON public.knowledge_base_folders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Now add the folder_id column to documents
ALTER TABLE public.knowledge_base_documents 
ADD COLUMN folder_id UUID REFERENCES public.knowledge_base_folders(id) ON DELETE SET NULL;