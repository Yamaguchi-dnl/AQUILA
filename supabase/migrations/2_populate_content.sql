-- Adicionar as páginas principais se não existirem
INSERT INTO public.pages (title, slug, description)
VALUES 
    ('Nossa Equipa', 'equipa', 'Conheça a equipe de liderança da Aquila Fund FCR, especialistas com vasta experiência no mercado financeiro global.'),
    ('Fundos de Investimento', 'fundos', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.')
ON CONFLICT (slug) DO NOTHING;

-- Adicionar os blocos de conteúdo para as páginas
DO $$
DECLARE
    equipa_page_id UUID;
    fundos_page_id UUID;
BEGIN
    -- Obter os IDs das páginas
    SELECT id INTO equipa_page_id FROM public.pages WHERE slug = 'equipa';
    SELECT id INTO fundos_page_id FROM public.pages WHERE slug = 'fundos';

    -- Limpar blocos existentes para evitar duplicados (opcional, mas bom para re-executar)
    DELETE FROM public.blocks WHERE page_id IN (equipa_page_id, fundos_page_id);

    -- Inserir blocos para a página "Nossa Equipa"
    IF equipa_page_id IS NOT NULL THEN
        INSERT INTO public.blocks (page_id, order_index, block_type, title, content)
        VALUES
            (equipa_page_id, 1, 'equipa-hero', 'Nossa Equipa', 'Especialistas dedicados a transformar desafios em oportunidades e aspirações em conquistas.');
    END IF;
    
    -- Inserir blocos para a página "Fundos de Investimento"
    IF fundos_page_id IS NOT NULL THEN
        INSERT INTO public.blocks (page_id, order_index, block_type, title, content, sub_content)
        VALUES
            (fundos_page_id, 1, 'fundos-header', 'Nossos Fundos', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.', NULL),
            (fundos_page_id, 2, 'fund-aquila-wheels', 'Aquila Wheels', 'O Aquila Wheels é um fundo de investimento inovador que transforma a paixão por carros clássicos e icônicos em uma estratégia financeira sólida e rentável.', '<p>Focado na aquisição e gestão de veículos de alto valor, o fundo aproveita a valorização histórica desse mercado, que na última década, valorizou impressionantes 193%.</p><p>A Aquila combina conhecimento de mercado, análise de dados e parcerias estratégicas globais para selecionar veículos com maior potencial de valorização. Além disso, o fundo é 100% elegível ao Golden Visa português, permitindo que investidores obtenham residência europeia por meio de um ativo tangível e exclusivo.</p>'),
            (fundos_page_id, 3, 'fund-aquila-hotel-invest', 'Aquila Hotel Invest', 'O Aquila Hotel Invest é um fundo de capital de risco com investimento em empresas de gestão hoteleira, focado na aquisição e gestão de hotéis de luxo em Portugal.', '<p>O Hotel Invest é um fundo de capital de risco que investe na gestão hoteleira de luxo em Portugal. Com foco em hotéis de luxo, o investimento busca alta rentabilidade e distribuição anual de dividendos isentos de impostos, alinhando-se ao sucesso do turismo português e oferecendo benefícios significativos aos investidores.</p><p>O fundo visa angariar 100 milhões de euros para investimento na empresa de gestão hoteleira Estoril 8023 SA, que atualmente gerencia 7 hotéis de luxo em Portugal, com o objetivo de expandir para 30 operações hoteleiras em 4 anos.</p>');
    END IF;

END $$;
