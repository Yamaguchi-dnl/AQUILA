
DO $$
DECLARE
    equipa_page_id uuid;
    fundos_page_id uuid;
BEGIN
    -- Insere a página 'equipa' apenas se ela não existir
    INSERT INTO pages (id, slug, title, description)
    SELECT gen_random_uuid(), 'equipa', 'Nossa Equipa', 'Conheça a equipe de liderança da Aquila Fund FCR, especialistas com vasta experiência no mercado financeiro global.'
    WHERE NOT EXISTS (SELECT 1 FROM pages WHERE slug = 'equipa');

    -- Insere a página 'fundos' apenas se ela não existir
    INSERT INTO pages (id, slug, title, description)
    SELECT gen_random_uuid(), 'fundos', 'Fundos de Investimento', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.'
    WHERE NOT EXISTS (SELECT 1 FROM pages WHERE slug = 'fundos');

    -- Obtém os IDs das páginas
    SELECT id INTO equipa_page_id FROM pages WHERE slug = 'equipa' LIMIT 1;
    SELECT id INTO fundos_page_id FROM pages WHERE slug = 'fundos' LIMIT 1;

    -- Insere blocos para a página 'equipa' apenas se existirem e os blocos não
    IF equipa_page_id IS NOT NULL THEN
        -- Bloco do cabeçalho da página Equipa
        INSERT INTO blocks (page_id, order_index, block_type, title, content)
        SELECT equipa_page_id, 1, 'equipa-hero', 'Nossa Equipa', 'Especialistas dedicados a transformar desafios em oportunidades e aspirações em conquistas.'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = equipa_page_id AND block_type = 'equipa-hero');
    END IF;

    -- Insere blocos para a página 'fundos' apenas se existirem e os blocos não
    IF fundos_page_id IS NOT NULL THEN
        -- Bloco do cabeçalho da página Fundos
        INSERT INTO blocks (page_id, order_index, block_type, title, content)
        SELECT fundos_page_id, 1, 'fundos-header', 'Nossos Fundos', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = fundos_page_id AND block_type = 'fundos-header');

        -- Bloco para o fundo Aquila Wheels
        INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content)
        SELECT fundos_page_id, 2, 'fund-aquila-wheels', 'Aquila Wheels', 'Fundo de investimento em carros clássicos', '<p>O Aquila Wheels é um fundo de investimento inovador que transforma a paixão por carros clássicos e icônicos em uma estratégia financeira sólida e rentável. Focado na aquisição e gestão de veículos de alto valor, o fundo aproveita a valorização histórica desse mercado, que na última década, valorizou impressionantes 193%.</p><p>A Aquila combina conhecimento de mercado, análise de dados e parcerias estratégicas globais para selecionar veículos com maior potencial de valorização. Além disso, o fundo é 100% elegível ao Golden Visa português, permitindo que investidores obtenham residência europeia por meio de um ativo tangível e exclusivo.</p>'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = fundos_page_id AND block_type = 'fund-aquila-wheels');
        
        -- Bloco para o fundo Aquila Hotel Invest
        INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content)
        SELECT fundos_page_id, 3, 'fund-aquila-hotel-invest', 'Aquila Hotel Invest', 'Fundo de investimento em hotelaria de luxo', '<p>O Hotel Invest é um fundo de capital de risco que investe na gestão hoteleira de luxo em Portugal. Com foco em hotéis de luxo, o investimento busca alta rentabilidade e distribuição anual de dividendos isentos de impostos, alinhando-se ao sucesso do turismo português e oferecendo benefícios significativos aos investidores.</p><p>O fundo visa angariar 100 milhões de euros para investimento na empresa de gestão hoteleira Estoril 8023 SA, que atualmente gerencia 7 hotéis de luxo em Portugal, com o objetivo de expandir para 30 operações hoteleiras em 4 anos.</p>'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = fundos_page_id AND block_type = 'fund-aquila-hotel-invest');
    END IF;

END $$;
