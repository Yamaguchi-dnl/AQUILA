-- Apaga tabelas existentes para garantir um estado limpo
DROP TABLE IF EXISTS "blocks";
DROP TABLE IF EXISTS "pages";
DROP TABLE IF EXISTS "users";

-- Cria a tabela de usuários customizada
CREATE TABLE "users" (
    "id" uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    "email" text,
    "is_admin" boolean DEFAULT false
);

-- Função para popular a tabela de usuários automaticamente
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

-- Trigger para executar a função quando um novo usuário se registra no Auth
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Cria a tabela de páginas
CREATE TABLE "pages" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "slug" text UNIQUE NOT NULL,
    "title" text,
    "description" text,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now(),
    "updated_by" uuid REFERENCES public.users(id)
);

-- Cria a tabela de blocos de conteúdo
CREATE TABLE "blocks" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "page_id" uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    "order_index" integer NOT NULL,
    "block_type" text NOT NULL,
    "title" text,
    "content" text,
    "image_url" text,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now(),
    "updated_by" uuid REFERENCES public.users(id)
);

-- Habilita RLS para as tabelas
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas se existirem, para evitar conflitos
DROP POLICY IF EXISTS "Allow read access for all users" ON public.pages;
DROP POLICY IF EXISTS "Allow admin full access" ON public.pages;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.blocks;
DROP POLICY IF EXISTS "Allow admin full access" ON public.blocks;
DROP POLICY IF EXISTS "Allow users to view their own data" ON public.users;
DROP POLICY IF EXISTS "Allow admin full access to users" ON public.users;


-- Função auxiliar para checar se o usuário é admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT is_admin
    FROM public.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- POLÍTICAS PARA A TABELA 'pages'
-- 1. Qualquer pessoa pode visualizar as páginas.
CREATE POLICY "Allow read access for all users" ON public.pages
FOR SELECT USING (true);

-- 2. Apenas administradores podem inserir, atualizar e deletar páginas.
CREATE POLICY "Allow admin full access" ON public.pages
FOR ALL USING (is_admin()) WITH CHECK (is_admin());


-- POLÍTICAS PARA A TABELA 'blocks'
-- 1. Qualquer pessoa pode visualizar os blocos.
CREATE POLICY "Allow read access for all users" ON public.blocks
FOR SELECT USING (true);

-- 2. Apenas administradores podem inserir, atualizar e deletar blocos.
CREATE POLICY "Allow admin full access" ON public.blocks
FOR ALL USING (is_admin()) WITH CHECK (is_admin());


-- POLÍTICAS PARA A TABELA 'users'
-- 1. Usuários podem ver seus próprios dados
CREATE POLICY "Allow users to view their own data" ON public.users
FOR SELECT USING (auth.uid() = id);

-- 2. Admins podem ver todos os usuários
CREATE POLICY "Allow admin to view all users" ON public.users
FOR SELECT USING (is_admin());


-- Insere dados iniciais
-- (Isso deve ser executado após um usuário admin ser criado manualmente ou via script)
-- INSERT INTO public.users (id, email, is_admin) VALUES ('your-admin-user-uuid', 'admin@example.com', true);

INSERT INTO public.pages (slug, title, description) VALUES
('home', 'Página Inicial', 'A página principal do site.'),
('sobre', 'Sobre Nós', 'Conheça nossa história e missão.'),
('fundos', 'Investimentos', 'Explore nossos fundos de investimento.'),
('golden-visa', 'Golden Visa', 'Descubra como obter seu Golden Visa.'),
('equipa', 'Nossa Equipa', 'Conheça a nossa equipa de especialistas.'),
('trabalhe-conosco', 'Trabalhe Conosco', 'Vagas abertas na Aquila.'),
('contato', 'Contato', 'Fale conosco.');
