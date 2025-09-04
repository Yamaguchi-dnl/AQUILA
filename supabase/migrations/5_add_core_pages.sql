-- Adiciona as páginas "Investimentos" (fundos) e "Nossa Equipa" (equipa)
-- para que possam ser geridas no painel de administração.

-- Garante que o slug é único antes de inserir para evitar erros em execuções repetidas.
INSERT INTO pages (slug, title, description)
SELECT 'fundos', 'Investimentos', 'Gerencie o conteúdo da página de Fundos/Investimentos.'
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE slug = 'fundos');

INSERT INTO pages (slug, title, description)
SELECT 'equipa', 'Nossa Equipa', 'Gerencie o conteúdo da página da Equipa.'
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE slug = 'equipa');
