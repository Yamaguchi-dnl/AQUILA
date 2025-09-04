-- supabase/migrations/3_populate_equipa_investimentos_pages.sql

-- Certifica-se que as páginas existem antes de tentar adicionar blocos a elas.
-- Nota: O slug 'fundos' é usado aqui porque corresponde à estrutura de URL do site (ex: /fundos),
-- embora o título da página possa ser "Investimentos".
INSERT INTO pages (id, slug, title, description)
VALUES
    ('c8f1a8c0-8a5b-4c4f-9e7b-2d3f4e6a1b9c', 'equipa', 'Nossa Equipa', 'Conheça a equipe de liderança da Aquila Fund FCR, especialistas com vasta experiência no mercado financeiro global.'),
    ('d9g2b9d1-9b6c-5d5g-1f8c-3e4g5h7j2k9l', 'fundos', 'Investimentos', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.')
ON CONFLICT (slug) DO NOTHING;


-- Popular conteúdo para a página "Nossa Equipa" (slug: equipa)
-- Bloco de Cabeçalho da Página de Equipa
INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content)
VALUES
    ((SELECT id FROM pages WHERE slug = 'equipa'), 1, 'equipa-hero', 'Nossa Equipa', 'Conheça os nossos especialistas', 'Especialistas dedicados a transformar desafios em oportunidades e aspirações em conquistas.');

-- Bloco que representa a lista de membros da equipe.
-- O frontend irá ler este bloco e depois buscar os dados detalhados da equipe.
INSERT INTO blocks (page_id, order_index, block_type, title, content)
VALUES
    ((SELECT id FROM pages WHERE slug = 'equipa'), 2, 'equipa-list', 'Membros da Equipa', 'Esta seção renderiza a lista de todos os membros da equipe de forma dinâmica a partir dos dados pré-definidos no sistema.');


-- Popular conteúdo para a página "Investimentos" (slug: fundos)
-- Bloco de Cabeçalho da Página de Fundos
INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content)
VALUES
    ((SELECT id FROM pages WHERE slug = 'fundos'), 1, 'fundos-hero', 'Nossos Fundos', 'Conheça as oportunidades', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.');

-- Bloco que representa a lista de fundos.
-- O frontend irá ler este bloco e depois buscar os dados detalhados dos fundos.
INSERT INTO blocks (page_id, order_index, block_type, title, content)
VALUES
    ((SELECT id FROM pages WHERE slug = 'fundos'), 2, 'fundos-list', 'Lista de Fundos', 'Esta seção renderiza a lista de todos os fundos de investimento de forma dinâmica a partir dos dados pré-definidos no sistema.');
