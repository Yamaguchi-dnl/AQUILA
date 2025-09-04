-- Apaga as tabelas se elas já existirem para um começo limpo.
-- A cláusula "CASCADE" remove também quaisquer objetos dependentes.
DROP TABLE IF EXISTS blocks CASCADE;
DROP TABLE IF EXISTS pages CASCADE;

-- Cria a tabela `pages` para armazenar informações sobre cada página do site.
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cria a tabela `blocks` para armazenar os blocos de conteúdo de cada página.
CREATE TABLE blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    block_type TEXT NOT NULL, -- Ex: 'hero', 'about-summary', 'investment-strategy'
    title TEXT,
    content TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Adicionando uma coluna para armazenar o ID do usuário que fez a atualização.
    -- Esta coluna é opcional para o seed, mas útil para o futuro.
    -- Presume que você tem uma tabela `users` no schema `auth`.
    updated_by UUID REFERENCES auth.users(id)
);

-- Insere as páginas iniciais
INSERT INTO pages (slug, title, description) VALUES
('home', 'Página Inicial', 'Página principal da Aquila Fund FCR.'),
('sobre', 'Sobre Nós', 'Página com informações sobre a Aquila Fund FCR.');

-- Variáveis para armazenar os IDs das páginas criadas
DO $$
DECLARE
    home_page_id UUID;
    sobre_page_id UUID;
BEGIN
    -- Obter os IDs das páginas que acabamos de inserir
    SELECT id INTO home_page_id FROM pages WHERE slug = 'home';
    SELECT id INTO sobre_page_id FROM pages WHERE slug = 'sobre';

    -- Inserir blocos de conteúdo para a PÁGINA HOME
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
    (home_page_id, 1, 'about-summary', 'Seu capital, nossa expertise', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
    (home_page_id, 2, 'stats-card', 'Estatísticas', NULL, NULL), -- Bloco para estatísticas, sem conteúdo direto
    (home_page_id, 3, 'funds-summary', 'Nossos Fundos de Investimento', 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.', NULL),
    (home_page_id, 4, 'why-portugal', 'Por que investir em Portugal?', NULL, NULL), -- Bloco para o carrossel de benefícios
    (home_page_id, 5, 'golden-visa-summary', 'O caminho para Portugal com o Golden Visa', '<p>O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.</p>', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'),
    (home_page_id, 6, 'investment-cycle', 'Entenda o ciclo completo do seu investimento', '<p>Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.</p>', NULL),
    (home_page_id, 7, 'investment-strategy', 'Estratégia de investimento: o caminho para o sucesso', NULL, 'https://ik.imagekit.io/leosmc2zb/3550%20(1).jpg?updatedAt=1756312096783'),
    (home_page_id, 8, 'contact-summary', 'Pronto para investir em Portugal?', '<p>Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.</p>', NULL);

    -- Inserir blocos de conteúdo para a PÁGINA SOBRE
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
    (sobre_page_id, 1, 'main-content', 'Sobre a Aquila Fund FCR', '<p>A Aquila Fund FCR nasceu há dois anos com a visão de ser uma <strong>plataforma de investimentos diferenciada</strong>, focada em oferecer <strong>soluções inovadoras para investidores de alta renda</strong>. Desde o início, temos nos dedicado a construir um legado de <strong>confiança, transparência e excelência</strong> no mercado financeiro português.</p><p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem <strong>valor real e sustentável</strong> para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.</p><p>Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos relacionamentos duradouros baseados na confiança e no compromisso com resultados.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
    (sobre_page_id, 2, 'partners-section', 'Nossos Parceiros Estratégicos', '<p>Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.</p>', NULL),
    (sobre_page_id, 3, 'partner-card', 'FundBox', '<p>Nossos fundos são geridos pela FundBox, empresa de investimento independente líder em Portugal que gera ativamente cerca de €420 milhões em ativos sob gestão. A FundBox oferece estruturação e execução de transações de primeira classe, livre de qualquer agenda conflitante, e com envolvimento ativo de executivos senhores ao longo de todo o processo de investimento.</p>', NULL),
    (sobre_page_id, 4, 'partner-card', 'BTG Pactual', '<p>Para facilitar o acesso aos nossos fundos, estabelecemos uma parceria exclusiva com o BTG Pactual. Nossos clientes podem investir mantendo seus ativos no Brasil como garantia, sem a necessidade de transferir capital para o exterior, ideal para quem busca diversificação internacional sem desmobilizar seus investimentos atuais.</p>', NULL),
    (sobre_page_id, 5, 'team-summary', 'Liderança Experiente', '<p>Nossa equipe é composta por especialistas com décadas de experiência no mercado financeiro global, dedicados a maximizar o potencial dos seus investimentos.</p>', NULL);

END $$;
