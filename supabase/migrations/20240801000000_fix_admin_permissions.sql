-- Habilita a RLS para as tabelas se ainda não estiver habilitada
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas para evitar conflitos
DROP POLICY IF EXISTS "Allow public read access" ON public.pages;
DROP POLICY IF EXISTS "Allow admin full access" ON public.pages;
DROP POLICY IF EXISTS "Allow public read access" ON public.blocks;
DROP POLICY IF EXISTS "Allow admin full access" ON public.blocks;

-- Cria política de leitura pública para a tabela de páginas
CREATE POLICY "Allow public read access"
ON public.pages
FOR SELECT
USING (true);

-- Cria política de acesso total para administradores na tabela de páginas
CREATE POLICY "Allow admin full access"
ON public.pages
FOR ALL
USING ((auth.jwt()->>'is_admin')::boolean = true)
WITH CHECK ((auth.jwt()->>'is_admin')::boolean = true);

-- Cria política de leitura pública para a tabela de blocos
CREATE POLICY "Allow public read access"
ON public.blocks
FOR SELECT
USING (true);

-- Cria política de acesso total para administradores na tabela de blocos
CREATE POLICY "Allow admin full access"
ON public.blocks
FOR ALL
USING ((auth.jwt()->>'is_admin')::boolean = true)
WITH CHECK ((auth.jwt()->>'is_admin')::boolean = true);
