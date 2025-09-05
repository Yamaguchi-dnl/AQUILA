-- supabase/migrations/YYYYMMDDHHMMSS_populate_all_pages_content.sql

DO $$
DECLARE
    home_page_id uuid;
    sobre_page_id uuid;
    equipa_page_id uuid;
    fundos_page_id uuid;
    golden_visa_page_id uuid;
    solucoes_page_id uuid;
BEGIN
    -- Insert pages and get their IDs, only if they don't exist
    INSERT INTO pages (id, slug, title, description)
    VALUES (gen_random_uuid(), 'home', 'Aquila Fund FCR - Home', 'Página inicial da Aquila Fund FCR.')
    ON CONFLICT (slug) DO NOTHING;
    SELECT id INTO home_page_id FROM pages WHERE slug = 'home';

    INSERT INTO pages (id, slug, title, description)
    VALUES (gen_random_uuid(), 'sobre', 'Sobre a Aquila Fund FCR', 'Conheça a história, missão e os parceiros estratégicos da Aquila Fund FCR.')
    ON CONFLICT (slug) DO NOTHING;
    SELECT id INTO sobre_page_id FROM pages WHERE slug = 'sobre';
    
    INSERT INTO pages (id, slug, title, description)
    VALUES (gen_random_uuid(), 'equipa', 'Nossa Equipa', 'Conheça a equipe de liderança da Aquila Fund FCR.')
    ON CONFLICT (slug) DO NOTHING;
    SELECT id INTO equipa_page_id FROM pages WHERE slug = 'equipa';

    INSERT INTO pages (id, slug, title, description)
    VALUES (gen_random_uuid(), 'fundos', 'Fundos de Investimento', 'Explore nosso portfólio de fundos de investimento em Portugal.')
    ON CONFLICT (slug) DO NOTHING;
    SELECT id INTO fundos_page_id FROM pages WHERE slug = 'fundos';

    INSERT INTO pages (id, slug, title, description)
    VALUES (gen_random_uuid(), 'golden-visa', 'Golden Visa Portugal', 'Descubra como obter residência europeia através do programa Golden Visa de Portugal.')
    ON CONFLICT (slug) DO NOTHING;
    SELECT id INTO golden_visa_page_id FROM pages WHERE slug = 'golden-visa';

    INSERT INTO pages (id, slug, title, description)
    VALUES (gen_random_uuid(), 'solucoes-tailor-made', 'Soluções Tailor Made', 'Conectamos investidores a ativos únicos em Portugal, com soluções de investimento personalizadas.')
    ON CONFLICT (slug) DO NOTHING;
    SELECT id INTO solucoes_page_id FROM pages WHERE slug = 'solucoes-tailor-made';


    -- Insert blocks only if they don't exist for that page and block_type
    -- HOME PAGE BLOCKS
    IF home_page_id IS NOT NULL THEN
        INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content)
        SELECT home_page_id, 1, 'hero', 'Investimentos <span class="text-primary">Inteligentes</span> <span class="block">para o seu Futuro</span>', 'Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.', NULL, NULL
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = home_page_id AND block_type = 'hero');

        INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content)
        SELECT home_page_id, 2, 'about-summary', 'Seu capital, nossa expertise', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg', NULL
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = home_page_id AND block_type = 'about-summary');
        
        INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content)
        SELECT home_page_id, 3, 'funds-summary', 'Nossos Fundos de Investimento', 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.', NULL, NULL
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = home_page_id AND block_type = 'funds-summary');

        INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content)
        SELECT home_page_id, 4, 'why-portugal', 'Por que investir<br/>em Portugal?', NULL, NULL, NULL
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = home_page_id AND block_type = 'why-portugal');

        INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content)
        SELECT home_page_id, 5, 'golden-visa-summary', 'O caminho para Portugal com o Golden Visa', 'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg', NULL
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = home_page_id AND block_type = 'golden-visa-summary');

        INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content)
        SELECT home_page_id, 6, 'investment-cycle', 'Entenda o ciclo completo do seu investimento', 'Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.', NULL, NULL
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = home_page_id AND block_type = 'investment-cycle');

        INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content)
        SELECT home_page_id, 7, 'investment-strategy', 'Estratégia de investimento: o caminho para o sucesso', NULL, 'https://ik.imagekit.io/leosmc2zb/3550%20(1).jpg?updatedAt=1756312096783', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = home_page_id AND block_type = 'investment-strategy');

        INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content)
        SELECT home_page_id, 8, 'contact-summary', 'Pronto para investir em Portugal?', 'Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.', NULL, NULL
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = home_page_id AND block_type = 'contact-summary');
    END IF;

    -- SOBRE PAGE BLOCKS
    IF sobre_page_id IS NOT NULL THEN
        INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content, image_url)
        SELECT sobre_page_id, 1, 'sobre-hero', 'Sobre a Aquila Fund FCR', 'Construindo um legado de confiança, transparência e excelência.', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = sobre_page_id AND block_type = 'sobre-hero');

        INSERT INTO blocks (page_id, order_index, block_type, title, content)
        SELECT sobre_page_id, 2, 'sobre-partners', 'Nossos Parceiros Estratégicos', 'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = sobre_page_id AND block_type = 'sobre-partners');

        INSERT INTO blocks (page_id, order_index, block_type, title, content)
        SELECT sobre_page_id, 3, 'partner-fundbox', 'FundBox', '<p>A FundBox é uma entidade de gestão de ativos independente, focada em fornecer uma infraestrutura robusta para a gestão de fundos de investimento. Eles são responsáveis por toda a operação administrativa e regulatória dos nossos fundos, garantindo conformidade e eficiência.</p>'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = sobre_page_id AND block_type = 'partner-fundbox');

        INSERT INTO blocks (page_id, order_index, block_type, title, content)
        SELECT sobre_page_id, 4, 'partner-btg', 'BTG Pactual', '<p>O BTG Pactual, o maior banco de investimentos da América Latina, atua como o depositário dos fundos da Aquila. Esta parceria assegura que todos os ativos dos nossos fundos sejam mantidos com a máxima segurança e transparência, auditados por uma instituição de renome global.</p>'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = sobre_page_id AND block_type = 'partner-btg');
    END IF;

    -- EQUIPA PAGE BLOCKS
    IF equipa_page_id IS NOT NULL THEN
        INSERT INTO blocks (page_id, order_index, block_type, title, content)
        SELECT equipa_page_id, 1, 'equipa-hero', 'Nossa Equipa', 'Especialistas dedicados a transformar desafios em oportunidades e aspirações em conquistas.'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = equipa_page_id AND block_type = 'equipa-hero');
    END IF;

    -- FUNDOS PAGE BLOCKS
    IF fundos_page_id IS NOT NULL THEN
        INSERT INTO blocks (page_id, order_index, block_type, title, content)
        SELECT fundos_page_id, 1, 'fundos-header', 'Nossos Fundos', 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = fundos_page_id AND block_type = 'fundos-header');

        INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content)
        SELECT fundos_page_id, 2, 'fund-aquila-wheels', 'Aquila Wheels', 'Paixão por clássicos, estratégia de valor.', '<p>O Aquila Wheels é um fundo de investimento inovador que transforma a paixão por carros clássicos e icônicos em uma estratégia financeira sólida e rentável. Focado na aquisição e gestão de veículos de alto valor, o fundo aproveita a valorização histórica desse mercado, que na última década, valorizou impressionantes 193%.</p><p>A Aquila combina conhecimento de mercado, análise de dados e parcerias estratégicas globais para selecionar veículos com maior potencial de valorização. Além disso, o fundo é 100% elegível ao Golden Visa português, permitindo que investidores obtenham residência europeia por meio de um ativo tangível e exclusivo.</p>'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = fundos_page_id AND block_type = 'fund-aquila-wheels');

        INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content)
        SELECT fundos_page_id, 3, 'fund-aquila-hotel-invest', 'Aquila Hotel Invest', 'Investimento estratégico no turismo de luxo.', '<p>O Hotel Invest é um fundo de capital de risco que investe na gestão hoteleira de luxo em Portugal. Com foco em hotéis de luxo, o investimento busca alta rentabilidade e distribuição anual de dividendos isentos de impostos, alinhando-se ao sucesso do turismo português e oferecendo benefícios significativos aos investidores.</p><p>O fundo visa angariar 100 milhões de euros para investimento na empresa de gestão hoteleira Estoril 8023 SA, que atualmente gerencia 7 hotéis de luxo em Portugal, com o objetivo de expandir para 30 operações hoteleiras em 4 anos.</p>'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = fundos_page_id AND block_type = 'fund-aquila-hotel-invest');
    END IF;

    -- GOLDEN VISA PAGE BLOCKS
    IF golden_visa_page_id IS NOT NULL THEN
        INSERT INTO blocks (page_id, order_index, block_type, title, content)
        SELECT golden_visa_page_id, 1, 'golden-visa-header', 'Golden Visa Portugal', 'Seu passaporte para a Europa através de investimentos de valor.'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = golden_visa_page_id AND block_type = 'golden-visa-header');

        INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url)
        SELECT golden_visa_page_id, 2, 'golden-visa-benefits', 'Benefícios de um Futuro Europeu', 'O programa Golden Visa de Portugal é um dos mais procurados do mundo, oferecendo um caminho claro para a residência e cidadania europeia em troca de um investimento qualificado no país.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = golden_visa_page_id AND block_type = 'golden-visa-benefits');

        INSERT INTO blocks (page_id, order_index, block_type, title)
        SELECT golden_visa_page_id, 3, 'golden-visa-process', 'Etapas do Processo'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = golden_visa_page_id AND block_type = 'golden-visa-process');

        INSERT INTO blocks (page_id, order_index, block_type, title, content)
        SELECT golden_visa_page_id, 4, 'golden-visa-eligible-funds', 'Fundos Elegíveis para Golden Visa', 'Invista em ativos de alta performance enquanto garante seu futuro na Europa. Conheça nossos fundos qualificados para o programa.'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = golden_visa_page_id AND block_type = 'golden-visa-eligible-funds');

        INSERT INTO blocks (page_id, order_index, block_type, title)
        SELECT golden_visa_page_id, 5, 'golden-visa-faq', 'Perguntas Frequentes'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = golden_visa_page_id AND block_type = 'golden-visa-faq');
    END IF;

    -- SOLUCOES TAILOR MADE PAGE BLOCKS
    IF solucoes_page_id IS NOT NULL THEN
        INSERT INTO blocks (page_id, order_index, block_type, title, content)
        SELECT solucoes_page_id, 1, 'solucoes-header', 'Soluções Tailor Made', 'No mercado de investimentos, opções não faltam. Mas quando se trata de potencializar retornos com inteligência e exclusividade, é preciso ir além do comum.'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = solucoes_page_id AND block_type = 'solucoes-header');

        INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content)
        SELECT solucoes_page_id, 2, 'solucoes-content', 'Conexões de Valor para Investidores Únicos', 'A Aquila Fund FCR conecta investidores a ativos únicos em Portugal, cuidadosamente selecionados e organizados em estruturas que respeitam seu perfil, seus objetivos e o cenário de mercado.', 'https://ik.imagekit.io/leosmc2zb/6109119.jpg', '<p>Não se trata apenas de investir, mas de construir uma experiência personalizada, que coloca você no centro das decisões.</p>'
        WHERE NOT EXISTS (SELECT 1 FROM blocks WHERE page_id = solucoes_page_id AND block_type = 'solucoes-content');
    END IF;

END $$;
