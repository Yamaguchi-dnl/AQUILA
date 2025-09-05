-- supabase/migrations/2_populate_content.sql

DO $$
DECLARE
    equipa_page_id uuid;
    fundos_page_id uuid;
BEGIN
    -- Inserir página 'equipa' se não existir e obter o ID
    INSERT INTO pages (id, slug, title, description)
    VALUES (gen_random_uuid(), 'equipa', 'Nossa Equipa', 'Conheça a equipe de liderança da Aquila Fund FCR, especialistas com vasta experiência no mercado financeiro global.')
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description
    RETURNING id INTO equipa_page_id;

    -- Inserir blocos para a página 'equipa'
    INSERT INTO blocks (page_id, order_index, block_type, title, content) VALUES
    (equipa_page_id, 1, 'equipa-hero', 'Nossa Equipa', 'Especialistas dedicados a transformar desafios em oportunidades e aspirações em conquistas.');

    -- Inserir página 'fundos' se não existir e obter o ID
    INSERT INTO pages (id, slug, title, description)
    VALUES (gen_random_uuid(), 'fundos', 'Fundos de Investimento', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.')
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description
    RETURNING id INTO fundos_page_id;

    -- Inserir blocos para a página 'fundos'
    INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content) VALUES
    (fundos_page_id, 1, 'fundos-header', 'Nossos Fundos', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.', NULL),
    (fundos_page_id, 2, 'fund-aquila-wheels', 'Aquila Wheels', 'Paixão, Performance e Potencial.', '<p>O Aquila Wheels é um fundo de investimento inovador que transforma a paixão por carros clássicos e icônicos em uma estratégia financeira sólida e rentável. Focado na aquisição e gestão de veículos de alto valor, o fundo aproveita a valorização histórica desse mercado.</p>'),
    (fundos_page_id, 3, 'fund-aquila-hotel-invest', 'Aquila Hotel Invest', 'Investimento estratégico no coração do turismo de luxo.', '<p>O Hotel Invest é um fundo de capital de risco que investe na gestão hoteleira de luxo em Portugal. Com foco em hotéis de luxo, o investimento busca alta rentabilidade e distribuição anual de dividendos isentos de impostos, alinhando-se ao sucesso do turismo português.</p>');

END $$;
