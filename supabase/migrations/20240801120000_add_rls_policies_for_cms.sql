-- Habilita a Row Level Security (RLS) para as tabelas, se ainda não estiver habilitado.
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas para evitar conflitos.
DROP POLICY IF EXISTS "Enable public read access" ON public.pages;
DROP POLICY IF EXISTS "Enable admin full access" ON public.pages;
DROP POLICY IF EXISTS "Enable public read access" ON public.blocks;
DROP POLICY IF EXISTS "Enable admin full access" ON public.blocks;

--
-- Políticas para a tabela "pages"
--
-- 1. Permite que qualquer pessoa (público) leia as páginas.
CREATE POLICY "Enable public read access" ON public.pages
FOR SELECT USING (true);

-- 2. Permite que administradores tenham acesso total (criar, ler, atualizar, apagar).
CREATE POLICY "Enable admin full access" ON public.pages
FOR ALL USING (
  (SELECT auth.uid() IN ( SELECT id FROM public.users WHERE is_admin = true ))
) WITH CHECK (
  (SELECT auth.uid() IN ( SELECT id FROM public.users WHERE is_admin = true ))
);


--
-- Políticas para a tabela "blocks"
--
-- 1. Permite que qualquer pessoa (público) leia os blocos de conteúdo.
CREATE POLICY "Enable public read access" ON public.blocks
FOR SELECT USING (true);

-- 2. Permite que administradores tenham acesso total (criar, ler, atualizar, apagar).
CREATE POLICY "Enable admin full access" ON public.blocks
FOR ALL USING (
  (SELECT auth.uid() IN ( SELECT id FROM public.users WHERE is_admin = true ))
) WITH CHECK (
  (SELECT auth.uid() IN ( SELECT id FROM public.users WHERE is_admin = true ))
);
