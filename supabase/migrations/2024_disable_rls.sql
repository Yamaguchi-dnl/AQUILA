-- Desativa a Segurança a Nível de Linha (RLS) para as tabelas.
-- Isto irá permitir todas as operações (leitura, escrita, exclusão)
-- para qualquer pessoa que tenha a chave de API (anon key),
-- que é o comportamento padrão quando o RLS está desativado.

-- Remove as políticas existentes, se houver alguma
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."blocks";
DROP POLICY IF EXISTS "Enable insert for authenticated admin users" ON "public"."blocks";
DROP POLICY IF EXISTS "Enable update for authenticated admin users" ON "public"."blocks";
DROP POLICY IF EXISTS "Enable delete for authenticated admin users" ON "public"."blocks";

-- Desativa o RLS para a tabela 'blocks'
ALTER TABLE public.blocks DISABLE ROW LEVEL SECURITY;

-- Desativa o RLS para a tabela 'pages'
ALTER TABLE public.pages DISABLE ROW LEVEL SECURITY;
