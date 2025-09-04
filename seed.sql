-- seed.sql
-- Este script popula as tabelas 'pages' e 'blocks' com o conteúdo inicial do site Aquila.
-- Para executar, copie e cole este conteúdo no SQL Editor do seu projeto Supabase e clique em "RUN".

-- Garante que começamos com tabelas limpas para evitar duplicados.
-- Se preferir não apagar os dados existentes, pode remover estas linhas.
DELETE FROM blocks;
DELETE FROM pages;


-- 1. Inserir as páginas que queremos gerir
INSERT INTO public.pages (id, slug, title, description) VALUES
    ('a1b2c3d4-0001-0001-0001-000000000001', 'home', 'Página Inicial', 'Conteúdo da página principal (landing page)'),
    ('a1b2c3d4-0002-0002-0002-000000000002', 'sobre', 'Sobre Nós', 'Conteúdo da página Sobre a Aquila');

-- Variáveis para os UUIDs das páginas para facilitar a leitura
DO $$
DECLARE
    home_page_id uuid := 'a1b2c3d4-0001-0001-0001-000000000001';
    sobre_page_id uuid := 'a1b2c3d4-0002-0002-0002-000000000002';
BEGIN

-- 2. Inserir os blocos de conteúdo para a PÁGINA PRINCIPAL (home)

-- Bloco: about-summary (Quem Somos - Resumo)
INSERT INTO public.blocks (page_id, order_index, block_type, title, content, image_url) VALUES
(
    home_page_id,
    1,
    'about-summary',
    'Seu capital, nossa expertise',
    '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>',
    'https://ik.imagekit.io/leosmc2zb/5573.jpg'
);

-- Bloco: why-portugal (Carousel de benefícios)
-- O conteúdo aqui é mais estrutural, então o título é o principal. O frontend irá renderizar o carousel.
INSERT INTO public.blocks (page_id, order_index, block_type, title, content) VALUES
(
    home_page_id,
    2,
    'why-portugal',
    'Por que investir em Portugal?',
    'Esta seção renderiza um carrossel de benefícios que estão definidos no código do componente.'
);

-- Bloco: golden-visa-summary (Resumo do Golden Visa)
INSERT INTO public.blocks (page_id, order_index, block_type, title, content, image_url) VALUES
(
    home_page_id,
    3,
    'golden-visa-summary',
    'O caminho para Portugal com o Golden Visa',
    '<p>O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.</p>',
    'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'
);


-- 3. Inserir os blocos de conteúdo para a PÁGINA SOBRE

-- Bloco: sobre-intro (Introdução da página Sobre)
INSERT INTO public.blocks (page_id, order_index, block_type, title, content, image_url) VALUES
(
    sobre_page_id,
    1,
    'sobre-intro',
    'Sobre a Aquila Fund FCR',
    '<div><p>A Aquila Fund FCR nasceu há dois anos com a visão de ser uma <strong>plataforma de investimentos diferenciada</strong>, focada em oferecer <strong>soluções inovadoras para investidores de alta renda</strong>. Desde o início, temos nos dedicado a construir um legado de <strong>confiança, transparência e excelência</strong> no mercado financeiro português.</p><p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem <strong>valor real e sustentável</strong> para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.</p><p>Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos relacionamentos duradouros baseados na confiança e no compromisso com resultados.</p></div>',
    'https://ik.imagekit.io/leosmc2zb/5573.jpg'
);

-- Bloco: parceiros (Parceiros Estratégicos)
INSERT INTO public.blocks (page_id, order_index, block_type, title, content) VALUES
(
    sobre_page_id,
    2,
    'parceiros',
    'Nossos Parceiros Estratégicos',
    '<p>Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.</p>'
);

-- Bloco: parceiro-fundbox (Card do parceiro FundBox)
INSERT INTO public.blocks (page_id, order_index, block_type, title, content) VALUES
(
    sobre_page_id,
    3,
    'parceiro-card',
    'FundBox',
    '<p>Nossos fundos são geridos pela FundBox, empresa de investimento independente líder em Portugal que gera ativamente cerca de €420 milhões em ativos sob gestão. A FundBox oferece estruturação e execução de transações de primeira classe, livre de qualquer agenda conflitante, e com envolvimento ativo de executivos senhores ao longo de todo o processo de investimento.</p>'
);

-- Bloco: parceiro-btg (Card do parceiro BTG Pactual)
INSERT INTO public.blocks (page_id, order_index, block_type, title, content) VALUES
(
    sobre_page_id,
    4,
    'parceiro-card',
    'BTG Pactual',
    '<p>Para facilitar o acesso aos nossos fundos, estabelecemos uma parceria exclusiva com o BTG Pactual. Nossos clientes podem investir mantendo seus ativos no Brasil como garantia, sem a necessidade de transferir capital para o exterior, ideal para quem busca diversificação internacional sem desmobilizar seus investimentos atuais.</p>'
);


END $$;

RAISE NOTICE 'Seed data for Aquila site inserted successfully.';
