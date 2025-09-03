-- Create custom user claims table
CREATE TABLE IF NOT EXISTS public.user_claims (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    claim TEXT NOT NULL,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to get a specific user claim
CREATE OR REPLACE FUNCTION public.get_claim(uid UUID, claim TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
  DECLARE
    claim_value JSONB;
  BEGIN
    SELECT value INTO claim_value FROM public.user_claims WHERE id = uid AND public.user_claims.claim = get_claim.claim;
    RETURN claim_value;
  END;
$$;

-- Function to get all claims for a user
CREATE OR REPLACE FUNCTION public.get_claims(uid UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
  DECLARE
    claims JSONB;
  BEGIN
    SELECT jsonb_object_agg(claim, value) INTO claims FROM public.user_claims WHERE id = uid;
    RETURN claims;
  END;
$$;

-- Function to set a user claim
CREATE OR REPLACE FUNCTION public.set_claim(uid UUID, claim TEXT, value JSONB)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
  BEGIN
    INSERT INTO public.user_claims (id, claim, value)
    VALUES (uid, claim, value)
    ON CONFLICT (id, claim) DO UPDATE SET value = excluded.value;
    RETURN 'Claim set';
  END;
$$;

-- Function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
  BEGIN
    RETURN (SELECT public.get_claim(auth.uid(), 'is_admin')) = 'true'::jsonb;
  END;
$$;

-- Create users table for public profile data
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to sync public.users with auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
  BEGIN
    INSERT INTO public.users (id, email)
    VALUES (new.id, new.email);
    RETURN new;
  END;
$$;

-- Trigger to call handle_new_user on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create Pages table
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Blocks table
CREATE TABLE IF NOT EXISTS public.blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    block_type TEXT NOT NULL,
    title TEXT,
    content TEXT,
    image_url TEXT,
    updated_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Allow all access to admins" ON public.pages;
DROP POLICY IF EXISTS "Allow read access to everyone" ON public.pages;
DROP POLICY IF EXISTS "Allow all access to admins" ON public.blocks;
DROP POLICY IF EXISTS "Allow read access to everyone" ON public.blocks;
DROP POLICY IF EXISTS "Allow individual read access" ON public.users;


-- RLS Policies for `pages` table
CREATE POLICY "Allow all access to admins"
ON public.pages FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Allow read access to everyone"
ON public.pages FOR SELECT
USING (true);


-- RLS Policies for `blocks` table
CREATE POLICY "Allow all access to admins"
ON public.blocks FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Allow read access to everyone"
ON public.blocks FOR SELECT
USING (true);

-- RLS Policies for `users` table
CREATE POLICY "Allow individual read access"
ON public.users FOR SELECT
USING (auth.uid() = id OR public.is_admin());


-- Seed initial data if tables are empty
DO $$
DECLARE
    home_page_id UUID;
    sobre_page_id UUID;
    fundos_page_id UUID;
    gv_page_id UUID;
    contato_page_id UUID;
BEGIN
    -- Seed Pages
    IF NOT EXISTS (SELECT 1 FROM public.pages) THEN
        INSERT INTO public.pages (slug, title, description) VALUES
        ('home', 'Página Inicial', 'Página principal do site Aquila Fund FCR.') RETURNING id INTO home_page_id;

        INSERT INTO public.pages (slug, title, description) VALUES
        ('sobre', 'Sobre Nós', 'Conteúdo da página sobre a empresa.') RETURNING id INTO sobre_page_id;

        INSERT INTO public.pages (slug, title, description) VALUES
        ('fundos', 'Nossos Fundos', 'Detalhes sobre os fundos de investimento.') RETURNING id INTO fundos_page_id;

        INSERT INTO public.pages (slug, title, description) VALUES
        ('golden-visa', 'Golden Visa', 'Informações sobre o programa Golden Visa.') RETURNING id INTO gv_page_id;

        INSERT INTO public.pages (slug, title, description) VALUES
        ('contato', 'Contato', 'Informações de contato e formulário.') RETURNING id INTO contato_page_id;
    END IF;

    -- Seed Blocks for Home Page
    -- This part is left empty to avoid overwriting user content on subsequent runs.
    -- Admin can add blocks via the CMS.
END $$;
