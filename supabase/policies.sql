-- Apaga as políticas antigas para evitar conflitos
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."pages";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."blocks";
DROP POLICY IF EXISTS "Enable all access for admins" ON "public"."pages";
DROP POLICY IF EXISTS "Enable all access for admins" ON "public"."blocks";

-- Ativa a Segurança em Nível de Linha (RLS)
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PARA A TABELA 'PAGES'
-- 1. Permite que qualquer pessoa (mesmo não autenticada) leia as páginas.
CREATE POLICY "Enable read access for all users" ON "public"."pages"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- 2. Permite que administradores façam qualquer coisa (criar, ler, atualizar, deletar).
CREATE POLICY "Enable all access for admins" ON "public"."pages"
FOR ALL
TO authenticated
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
)
WITH CHECK (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);


-- POLÍTICAS PARA A TABELA 'BLOCKS'
-- 1. Permite que qualquer pessoa (mesmo não autenticada) leia os blocos.
CREATE POLICY "Enable read access for all users" ON "public"."blocks"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- 2. Permite que administradores façam qualquer coisa (criar, ler, atualizar, deletar).
CREATE POLICY "Enable all access for admins" ON "public"."blocks"
FOR ALL
TO authenticated
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
)
WITH CHECK (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);
