-- 1. Habilitar a Segurança a Nível de Linha (RLS) para as tabelas
alter table public.pages enable row level security;
alter table public.blocks enable row level security;

-- 2. Remover políticas antigas, se existirem (para garantir um estado limpo)
drop policy if exists "Permitir acesso de leitura público para blocos" on public.blocks;
drop policy if exists "Permitir acesso de leitura público para páginas" on public.pages;
drop policy if exists "Permitir acesso total para administradores" on public.blocks;
drop policy if exists "Permitir acesso total para administradores" on public.pages;


-- 3. Criar Políticas de Leitura (SELECT) - Acesso Público
-- Permite que qualquer pessoa (visitantes do site) leia os dados das páginas e dos blocos.
create policy "Permitir acesso de leitura público para páginas"
on public.pages for select
to public
using (true);

create policy "Permitir acesso de leitura público para blocos"
on public.blocks for select
to public
using (true);


-- 4. Criar Políticas de Escrita (INSERT, UPDATE, DELETE) - Apenas para Administradores
-- A função `auth.uid()` retorna o ID do usuário logado.
-- `auth.jwt() ->> 'user_metadata'` extrai os metadados do token do usuário.
-- A verificação `(auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'` checa se o usuário é admin.

-- Política para a tabela 'pages' (geralmente só administradores editam)
create policy "Permitir acesso total para administradores"
on public.pages for all
to authenticated
using ((auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true)
with check ((auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true);

-- Política para a tabela 'blocks'
create policy "Permitir acesso total para administradores"
on public.blocks for all
to authenticated
using ((auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true)
with check ((auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true);

-- Mensagem de Confirmação:
-- As políticas de RLS foram aplicadas.
-- Agora, a leitura é pública e a escrita (inserir, atualizar, deletar)
-- é restrita a usuários autenticados com `is_admin = true` nos seus metadados.
