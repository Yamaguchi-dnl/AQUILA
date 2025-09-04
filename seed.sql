-- Apaga tabelas existentes se necessário (ignora erros se não existirem)
DROP TABLE IF EXISTS blocks;
DROP TABLE IF EXISTS pages;

-- 1. Criação da tabela 'pages'
-- Armazena as páginas principais do site que podem ter conteúdo dinâmico.
CREATE TABLE pages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE pages IS 'Tabela para armazenar as páginas do site (ex: home, sobre).';

-- 2. Criação da tabela 'blocks'
-- Armazena os blocos de conteúdo individuais que compõem cada página.
CREATE TABLE blocks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    order_index INT NOT NULL DEFAULT 0,
    block_type TEXT NOT NULL,
    title TEXT,
    content TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by uuid REFERENCES auth.users(id)
);
COMMENT ON TABLE blocks IS 'Blocos de conteúdo associados a cada página.';

-- 3. Inserção dos dados iniciais (Seed Data)

-- Insere as páginas
INSERT INTO pages (id, slug, title, description) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'home', 'Página Inicial', 'Conteúdo da página principal do site Aquila.'),
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'sobre', 'Sobre Nós', 'Conteúdo da página Sobre a Aquila.');

-- Blocos da Página Inicial (Home)
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 1, 'about-summary', 'Seu capital, nossa expertise', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 2, 'funds-summary', 'Nossos Fundos de Investimento', 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.', NULL),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 3, 'why-portugal', 'Por que investir em Portugal?', 'Benefícios como diversificação global, proteção patrimonial e acesso ao passaporte europeu.', NULL),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 4, 'golden-visa-summary', 'O caminho para Portugal com o Golden Visa', 'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 5, 'investment-cycle', 'Entenda o ciclo completo do seu investimento', 'Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos.', NULL),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 6, 'investment-strategy', 'Estratégia de investimento: o caminho para o sucesso', 'Nossa expertise e vasta rede de relacionamentos nos permitem identificar e selecionar as melhores oportunidades de investimento.', 'https://ik.imagekit.io/leosmc2zb/3550%20(1).jpg?updatedAt=1756312096783'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 7, 'contact-summary', 'Pronto para investir em Portugal?', 'Preencha o formulário para agendar uma reunião com nossa equipe e conhecer as oportunidades.', NULL);

-- Blocos da Página Sobre
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', 1, 'intro', 'Nossa Essência', '<p>A Aquila Fund FCR nasceu há dois anos com a visão de ser uma <strong>plataforma de investimentos diferenciada</strong>, focada em oferecer <strong>soluções inovadoras para investidores de alta renda</strong>.</p><p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem <strong>valor real e sustentável</strong> para nossos clientes.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', 2, 'partners', 'Nossos Parceiros Estratégicos', 'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.', NULL),
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', 3, 'team', 'Liderança Experiente', 'Nossa equipe é composta por especialistas com décadas de experiência no mercado financeiro global.', NULL);
