-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Read access for everyone" ON public.pages;
DROP POLICY IF EXISTS "Admin full access on pages" ON public.pages;
DROP POLICY IF EXISTS "Read access for everyone" ON public.blocks;
DROP POLICY IF EXISTS "Admin full access on blocks" ON public.blocks;

-- Enable RLS on tables if not already enabled
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;

-- ---------------------------
-- Policies for 'pages' table
-- ---------------------------

-- 1. Allow public read access to everyone
CREATE POLICY "Read access for everyone"
ON public.pages
FOR SELECT
USING (true);

-- 2. Allow admin users full access (insert, update, delete)
CREATE POLICY "Admin full access on pages"
ON public.pages
FOR ALL
USING ((auth.role() = 'authenticated' AND (SELECT is_admin FROM public.users WHERE id = auth.uid())))
WITH CHECK ((auth.role() = 'authenticated' AND (SELECT is_admin FROM public.users WHERE id = auth.uid())));


-- ---------------------------
-- Policies for 'blocks' table
-- ---------------------------

-- 1. Allow public read access to everyone
CREATE POLICY "Read access for everyone"
ON public.blocks
FOR SELECT
USING (true);

-- 2. Allow admin users full access (insert, update, delete)
CREATE POLICY "Admin full access on blocks"
ON public.blocks
FOR ALL
USING ((auth.role() = 'authenticated' AND (SELECT is_admin FROM public.users WHERE id = auth.uid())))
WITH CHECK ((auth.role() = 'authenticated' AND (SELECT is_admin FROM public.users WHERE id = auth.uid())));