-- Create the 'pages' table
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the 'blocks' table
CREATE TABLE IF NOT EXISTS blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    block_type TEXT NOT NULL,
    title TEXT,
    content TEXT,
    sub_content TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Clear existing data to avoid duplicates on re-seeding
DELETE FROM blocks;
DELETE FROM pages;

-- Insert pages
INSERT INTO pages (slug, title, description) VALUES
('home', 'Página Principal', 'Conteúdo da página principal do site da Aquila.'),
('sobre', 'Sobre Nós', 'Conteúdo da página Sobre Nós.');

-- Get page IDs to associate blocks
DO $$
DECLARE
    home_page_id UUID;
    sobre_page_id UUID;
BEGIN
    SELECT id INTO home_page_id FROM pages WHERE slug = 'home';
    SELECT id INTO sobre_page_id FROM pages WHERE slug = 'sobre';

    -- Insert blocks for 'home' page
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url)
    VALUES
        (home_page_id, 1, 'hero', 'Investimentos <span class="text-primary">Inteligentes</span> <span class="block">para o seu Futuro</span>', 'Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.', NULL),
        (home_page_id, 2, 'about-summary', 'Seu capital, nossa expertise', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
        (home_page_id, 3, 'funds-summary', 'Nossos Fundos de Investimento', 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.', NULL),
        (home_page_id, 4, 'why-portugal', 'Por que investir<br/>em Portugal?', NULL, NULL),
        (home_page_id, 5, 'golden-visa-summary', 'O caminho para Portugal com o Golden Visa', 'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'),
        (home_page_id, 6, 'investment-cycle', 'Entenda o ciclo completo do seu investimento', 'Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.', NULL),
        (home_page_id, 7, 'investment-strategy', 'Estratégia de investimento: o caminho para o sucesso', NULL, NULL),
        (home_page_id, 8, 'contact-summary', 'Pronto para investir em Portugal?', 'Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.', NULL);

    -- Insert blocks for 'sobre' page
    INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content, image_url)
    VALUES
        (sobre_page_id, 1, 'sobre-hero', 'Sobre a Aquila Fund FCR', 'Construindo um legado de confiança, transparência e excelência.', '<p>A Aquila Fund FCR nasceu há dois anos com a visão de ser uma <strong>plataforma de investimentos diferenciada</strong>, focada em oferecer <strong>soluções inovadoras para investidores de alta renda</strong>. Desde o início, temos nos dedicado a construir um legado de <strong>confiança, transparência e excelência</strong> no mercado financeiro português.</p><p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem <strong>valor real e sustentável</strong> para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.</p><p>Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos relacionamentos duradouros baseados na confiança e no compromisso com resultados.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
        (sobre_page_id, 2, 'sobre-partners', 'Nossos Parceiros Estratégicos', 'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.', NULL, NULL),
        (sobre_page_id, 3, 'partner-fundbox', 'FundBox', '<p>Nossos fundos são geridos pela FundBox, empresa de investimento independente líder em Portugal que gera ativamente cerca de €420 milhões em ativos sob gestão. A FundBox oferece estruturação e execução de transações de primeira classe, livre de qualquer agenda conflitante, e com envolvimento ativo de executivos senhores ao longo de todo o processo de investimento.</p>', NULL, NULL),
        (sobre_page_id, 4, 'partner-btg', 'BTG Pactual', '<p>Para facilitar o acesso aos nossos fundos, estabelecemos uma parceria exclusiva com o BTG Pactual. Nossos clientes podem investir mantendo seus ativos no Brasil como garantia, sem a necessidade de transferir capital para o exterior, ideal para quem busca diversificação internacional sem desmobilizar seus investimentos atuais.</p>', NULL, NULL);
END $$;
