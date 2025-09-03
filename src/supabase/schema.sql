-- Create pages table
CREATE TABLE IF NOT EXISTS public.pages (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    slug text NOT NULL UNIQUE,
    title text,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by uuid REFERENCES auth.users(id)
);

-- Create blocks table
CREATE TABLE IF NOT EXISTS public.blocks (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    page_id uuid NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
    order_index integer NOT NULL,
    block_type text NOT NULL,
    title text,
    content text,
    image_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by uuid REFERENCES auth.users(id)
);

-- Create users table to store public user data
CREATE TABLE IF NOT EXISTS public.users (
  id uuid NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  is_admin boolean DEFAULT false
);

-- Function to get user admin status
CREATE OR REPLACE FUNCTION public.is_admin_user(user_id uuid)
RETURNS boolean AS $$
DECLARE
  is_admin_status boolean;
BEGIN
  SELECT is_admin INTO is_admin_status FROM public.users WHERE id = user_id;
  RETURN is_admin_status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, is_admin)
  VALUES (new.id, false);
  return new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new user creation in auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable RLS for pages and blocks
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to prevent errors on re-run
DROP POLICY IF EXISTS "Allow all users to read pages" ON public.pages;
DROP POLICY IF EXISTS "Allow admins to manage pages" ON public.pages;
DROP POLICY IF EXISTS "Allow all users to read blocks" ON public.blocks;
DROP POLICY IF EXISTS "Allow admins to manage blocks" ON public.blocks;
DROP POLICY IF EXISTS "Allow users to view their own data" ON public.users;
DROP POLICY IF EXISTS "Allow admins to view all user data" ON public.users;

-- Create policies for pages table
CREATE POLICY "Allow all users to read pages"
ON public.pages FOR SELECT
USING (true);

CREATE POLICY "Allow admins to manage pages"
ON public.pages FOR ALL
USING (public.is_admin_user(auth.uid()))
WITH CHECK (public.is_admin_user(auth.uid()));

-- Create policies for blocks table
CREATE POLICY "Allow all users to read blocks"
ON public.blocks FOR SELECT
USING (true);

CREATE POLICY "Allow admins to manage blocks"
ON public.blocks FOR ALL
USING (public.is_admin_user(auth.uid()))
WITH CHECK (public.is_admin_user(auth.uid()));

-- Create policies for users table
CREATE POLICY "Allow users to view their own data"
ON public.users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Allow admins to view all user data"
ON public.users FOR SELECT
USING (public.is_admin_user(auth.uid()));

-- Seed Data --
-- For this to work, you need to sign up a user in your app first
-- and then replace 'your-admin-user-uuid' with the actual user ID from the auth.users table.
-- Then, run the two INSERT statements below.

-- INSERT INTO public.users (id, is_admin) 
-- VALUES ('your-admin-user-uuid', true)
-- ON CONFLICT (id) DO UPDATE SET is_admin = true;

-- INSERT INTO public.pages (slug, title, description, updated_by) VALUES
-- ('home', 'Página Inicial', 'Conteúdo da página inicial.', 'your-admin-user-uuid'),
-- ('sobre', 'Sobre Nós', 'Informações sobre a empresa.', 'your-admin-user-uuid'),
-- ('fundos', 'Fundos de Investimento', 'Detalhes sobre nossos fundos.', 'your-admin-user-uuid'),
-- ('golden-visa', 'Golden Visa', 'Informações sobre o Golden Visa.', 'your-admin-user-uuid'),
-- ('contato', 'Contato', 'Formulário de contato e informações.', 'your-admin-user-uuid')
-- ON CONFLICT (slug) DO NOTHING;

-- INSERT INTO public.blocks (page_id, order_index, block_type, title, content, updated_by) VALUES
-- ((SELECT id FROM public.pages WHERE slug = 'home'), 1, 'hero', 'Hero Section', '<h1>Bem-vindo à Aquila</h1>', 'your-admin-user-uuid'),
-- ((SELECT id FROM public.pages WHERE slug = 'sobre'), 1, 'texto-imagem', 'Nossa História', '<p>Desde 2022...</p>', 'your-admin-user-uuid'),
-- ((SELECT id FROM public.pages WHERE slug = 'golden-visa'), 1, 'faq', 'Perguntas Frequentes', '...', 'your-admin-user-uuid'),
-- ((SELECT id FROM public.pages WHERE slug = 'golden-visa'), 2, 'cta', 'Fale Conosco', '<p>Pronto para começar?</p>', 'your-admin-user-uuid'),
-- ((SELECT id FROM public.pages WHERE slug = 'golden-visa'), 3, 'fundos-elegiveis', 'Fundos Elegíveis', '...', 'your-admin-user-uuid');