-- Apaga as tabelas se já existirem para evitar conflitos
DROP TABLE IF EXISTS public.blocks;
DROP TABLE IF EXISTS public.pages;

-- Cria a tabela de Páginas
CREATE TABLE public.pages (
    id UUID PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cria a tabela de Blocos de Conteúdo
CREATE TABLE public.blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    block_type TEXT NOT NULL,
    title TEXT,
    content TEXT,
    sub_content TEXT NULL, -- Coluna que faltava
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID
);

-- Inserir as páginas
INSERT INTO public.pages (id, slug, title, description) VALUES
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 'home', 'Home', 'Página inicial do site Aquila Fund.'),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'sobre', 'Sobre', 'Página sobre a Aquila Fund.'),
('2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'golden-visa', 'Golden Visa', 'Página sobre o Golden Visa.'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7f8g', 'trabalhe-conosco', 'Trabalhe Conosco', 'Página de carreiras.');


-- Inserir os blocos para a página HOME
INSERT INTO public.blocks (page_id, order_index, block_type, title, content, image_url) VALUES
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 1, 'hero', 'Investimentos <span class="text-primary">Inteligentes</span> <span class="block">para o seu Futuro</span>', 'Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.', NULL),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 2, 'about-summary', 'Seu capital, nossa expertise', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 3, 'funds-summary', 'Nossos Fundos de Investimento', 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.', NULL),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 4, 'why-portugal', 'Por que investir<br/>em Portugal?', NULL, NULL),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 5, 'golden-visa-summary', 'O caminho para Portugal com o Golden Visa', 'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 6, 'investment-cycle', 'Entenda o ciclo completo do seu investimento', 'Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.', NULL),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 7, 'investment-strategy', 'Estratégia de investimento: o caminho para o sucesso', NULL, NULL),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 8, 'contact-summary', 'Pronto para investir em Portugal?', 'Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.', NULL);

-- Inserir os blocos para a página SOBRE
INSERT INTO public.blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
(
    '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 
    1, 
    'sobre-hero', 
    'Sobre a Aquila Fund FCR', 
    'Construindo um legado de confiança, transparência e excelência.',
    'https://ik.imagekit.io/leosmc2zb/5573.jpg',
    '<p>A nossa missão é conectar investidores a oportunidades únicas no mercado português, oferecendo uma gestão de ativos transparente, segura e com alto potencial de retorno. Atuamos com um profundo conhecimento local e uma perspectiva global, garantindo que cada decisão de investimento seja fundamentada em análises rigorosas e alinhada com os objetivos dos nossos clientes.</p><p>Valorizamos a confiança, a integridade e a excelência. Estes são os pilares que sustentam a nossa relação com os investidores e parceiros, e que guiam a nossa busca incessante por resultados superiores.</p>'
),
(
    '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 
    2, 
    'sobre-partners', 
    'Nossos Parceiros Estratégicos', 
    'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.',
    NULL,
    NULL
);

INSERT INTO public.blocks (page_id, order_index, block_type, title, content) VALUES
(
    '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 
    3, 
    'partner-fundbox', 
    'FundBox',
    '<p>A FundBox é a sociedade gestora dos fundos da Aquila, uma das maiores administradoras de fundos de Portugal, registrada e supervisionada pelo Banco de Portugal e pela CMVM. Com uma vasta experiência e uma reputação de excelência, a FundBox garante uma gestão profissional, transparente e em conformidade com as mais rigorosas normas regulatórias, oferecendo segurança e confiança aos nossos investidores.</p>'
),
(
    '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 
    4, 
    'partner-btg',
    'BTG Pactual',
    '<p>O BTG Pactual é o banco depositário dos fundos da Aquila, o maior banco de investimentos da América Latina. A parceria com o BTG Pactual assegura que os ativos dos nossos fundos sejam mantidos com a máxima segurança e governança, seguindo os mais elevados padrões da indústria financeira global. Esta colaboração reforça o nosso compromisso com a proteção do capital dos nossos investidores.</p>'
);

-- Inserir os blocos para a página GOLDEN VISA
INSERT INTO public.blocks (page_id, order_index, block_type, title, content, image_url) VALUES
(
    '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
    1,
    'gv-hero',
    'Golden Visa Portugal',
    'Seu passaporte para a Europa através de investimentos de valor.',
    NULL
),
(
    '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
    2,
    'gv-benefits',
    'Benefícios de um Futuro Europeu',
    'O programa Golden Visa de Portugal é um dos mais procurados do mundo, oferecendo um caminho claro para a residência e cidadania europeia em troca de um investimento qualificado no país.',
    'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'
),
(
    '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
    3,
    'gv-process',
    'Etapas do Processo',
    NULL,
    NULL
),
(
    '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
    4,
    'gv-funds',
    'Fundos Elegíveis para Golden Visa',
    'Invista em ativos de alta performance enquanto garante seu futuro na Europa. Conheça nossos fundos qualificados para o programa.',
    NULL
),
(
    '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
    5,
    'gv-faq',
    'Perguntas Frequentes',
    NULL,
    NULL
);


-- Inserir os blocos para a página TRABALHE CONOSCO
INSERT INTO public.blocks (page_id, order_index, block_type, title, content) VALUES
(
    '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7f8g',
    1,
    'tc-hero',
    'Trabalhe Conosco',
    'Procuramos talentos excepcionais que partilhem da nossa paixão por excelência e inovação no mercado financeiro.'
),
(
    '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7f8g',
    2,
    'tc-form',
    'Envie sua Candidatura',
    'Se você é um profissional motivado e busca desafios, gostaríamos de conhecer você.'
);
