-- Adicionar as páginas principais se elas não existirem
INSERT INTO pages (id, slug, title, description) VALUES
(gen_random_uuid(), 'equipa', 'Nossa Equipa', 'Conheça a equipe de liderança da Aquila Fund FCR, especialistas com vasta experiência no mercado financeiro global.'),
(gen_random_uuid(), 'fundos', 'Nossos Fundos', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.')
ON CONFLICT (slug) DO NOTHING;

-- Variáveis para os IDs das páginas
DO $$
DECLARE
    equipa_page_id UUID;
    fundos_page_id UUID;
BEGIN
    -- Obter os IDs das páginas
    SELECT id INTO equipa_page_id FROM pages WHERE slug = 'equipa';
    SELECT id INTO fundos_page_id FROM pages WHERE slug = 'fundos';

    -- Adicionar blocos de conteúdo para a página 'Nossa Equipa'
    INSERT INTO blocks (page_id, order_index, block_type, title, content) VALUES
    (equipa_page_id, 1, 'equipa-hero', 'Nossa Equipa', 'Especialistas dedicados a transformar desafios em oportunidades e aspirações em conquistas.')
    ON CONFLICT (page_id, block_type) DO NOTHING;

    -- Adicionar blocos de conteúdo para a página 'Fundos'
    INSERT INTO blocks (page_id, order_index, block_type, title, content) VALUES
    (fundos_page_id, 1, 'fundos-header', 'Nossos Fundos', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.'),
    (fundos_page_id, 2, 'fund-aquila-wheels', 'Aquila Wheels', 'O Aquila Wheels é um fundo de investimento inovador que transforma a paixão por carros clássicos e icônicos em uma estratégia financeira sólida e rentável.'),
    (fundos_page_id, 3, 'fund-aquila-hotel-invest', 'Aquila Hotel Invest', 'O Aquila Hotel Invest é um fundo de capital de risco com investimento em empresas de gestão hoteleira, focado na aquisição e gestão de hotéis de luxo em Portugal.')
    ON CONFLICT (page_id, block_type) DO NOTHING;
END $$;
