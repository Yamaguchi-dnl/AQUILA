-- Corrigir o slug da página de investimentos para 'fundos' para corresponder à rota do site.
UPDATE pages
SET slug = 'fundos', title = 'Fundos de Investimento', description = 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.'
WHERE slug = 'investimentos';


DO $$
DECLARE
    home_page_id UUID;
    sobre_page_id UUID;
    golden_visa_page_id UUID;
BEGIN
    -- Obter os IDs das páginas
    SELECT id INTO home_page_id FROM pages WHERE slug = 'home';
    SELECT id INTO sobre_page_id FROM pages WHERE slug = 'sobre';
    SELECT id INTO golden_visa_page_id FROM pages WHERE slug = 'golden-visa';

    -- Limpar blocos existentes para evitar duplicados ao executar o seed várias vezes
    DELETE FROM blocks WHERE page_id IN (home_page_id, sobre_page_id, golden_visa_page_id);

    -- =========================================================================================
    -- =============================== BLOCOS DA PÁGINA HOME ===================================
    -- =========================================================================================

    -- Bloco Hero
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (home_page_id, 1, 'hero', 'Investimentos <span class="text-primary">Inteligentes</span> <span class="block">para o seu Futuro</span>', 'Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.', NULL, NULL);

    -- Bloco About Summary
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (home_page_id, 2, 'about-summary', 'Seu capital, nossa expertise', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg', NULL);
    
    -- Bloco Funds Summary
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (home_page_id, 3, 'funds-summary', 'Nossos Fundos de Investimento', 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.', NULL, NULL);

    -- Bloco Why Portugal
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (home_page_id, 4, 'why-portugal', 'Por que investir<br/>em Portugal?', NULL, NULL, NULL);
    
    -- Bloco Golden Visa Summary
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (home_page_id, 5, 'golden-visa-summary', 'O caminho para Portugal com o Golden Visa', 'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg', NULL);

    -- Bloco Investment Cycle
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (home_page_id, 6, 'investment-cycle', 'Entenda o ciclo completo do seu investimento', 'Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.', NULL, NULL);

    -- Bloco Investment Strategy
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (home_page_id, 7, 'investment-strategy', 'Estratégia de investimento: o caminho para o sucesso', NULL, NULL, NULL);
    
    -- Bloco Contact Summary
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (home_page_id, 8, 'contact-summary', 'Pronto para investir em Portugal?', 'Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.', NULL, NULL);

    -- =========================================================================================
    -- =============================== BLOCOS DA PÁGINA SOBRE ==================================
    -- =========================================================================================

    -- Bloco Sobre Hero
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (sobre_page_id, 1, 'sobre-hero', 'Sobre a Aquila Fund FCR', 'Construindo um legado de confiança, transparência e excelência.', 'https://ik.imagekit.io/leosmc2zb/5573.jpg', '<p>Fundada com a missão de democratizar o acesso a investimentos de alta performance em Portugal, a Aquila Fund FCR destaca-se pela sua abordagem centrada no investidor. Combinamos expertise local com uma visão global para identificar e estruturar oportunidades únicas em setores resilientes e de alto crescimento.</p><p>Nossa filosofia baseia-se em três pilares: <strong>Segurança</strong>, com estruturas de investimento robustas e reguladas pela CMVM; <strong>Rentabilidade</strong>, buscando retornos consistentes e acima da média de mercado; e <strong>Transparência</strong>, mantendo nossos investidores sempre informados sobre a performance e as estratégias adotadas.</p>');

    -- Bloco Sobre Partners
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (sobre_page_id, 2, 'sobre-partners', 'Nossos Parceiros Estratégicos', 'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.', NULL, NULL);
    
    -- Bloco Partner FundBox
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (sobre_page_id, 3, 'partner-fundbox', 'FundBox', '<p>A FundBox é uma sociedade gestora de organismos de investimento alternativo, especializada em capital de risco e empreendedorismo. Com uma equipe experiente e dedicada, a FundBox foca em investir em projetos e empresas com alto potencial de crescimento, oferecendo suporte estratégico e financeiro para impulsionar o desenvolvimento e a inovação em diversos setores.</p>', NULL, NULL);
    
    -- Bloco Partner BTG
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
    (sobre_page_id, 4, 'partner-btg', 'BTG Pactual', '<p>O BTG Pactual é o maior banco de investimentos da América Latina, oferecendo uma vasta gama de serviços financeiros, incluindo investment banking, wealth management e asset management. Reconhecido por sua excelência e solidez, o BTG Pactual atua como um parceiro fundamental, fornecendo a estrutura de custódia e depósito para os fundos da Aquila, garantindo segurança e conformidade de nível internacional.</p>', NULL, NULL);

END $$;
