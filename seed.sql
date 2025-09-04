-- Apaga as tabelas existentes se elas existirem para começar do zero.
DROP TABLE IF EXISTS blocks;
DROP TABLE IF EXISTS pages;

-- Cria a tabela 'pages' para armazenar as diferentes páginas do site.
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cria a tabela 'blocks' para armazenar os blocos de conteúdo de cada página.
CREATE TABLE blocks (
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

-- Inserção das páginas na tabela 'pages'
INSERT INTO pages (id, slug, title, description) VALUES
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 'home', 'Página Inicial', 'Página principal do site Aquila.'),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'sobre', 'Sobre Nós', 'Página com informações sobre a Aquila.'),
('b1c2d3e4-f5a6-b7c8-d9e0-f1a2b3c4d5e6', 'golden-visa', 'Golden Visa', 'Informações sobre o programa Golden Visa.'),
('c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'trabalhe-conosco', 'Trabalhe Conosco', 'Página de carreiras.');

-- Inserção dos blocos de conteúdo para a página 'home'
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
((SELECT id FROM pages WHERE slug = 'home'), 1, 'hero', 'Investimentos <span class="text-primary">Inteligentes</span> <span class="block">para o seu Futuro</span>', 'Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.', NULL),
((SELECT id FROM pages WHERE slug = 'home'), 2, 'about-summary', 'Seu capital, nossa expertise', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
((SELECT id FROM pages WHERE slug = 'home'), 3, 'funds-summary', 'Nossos Fundos de Investimento', 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.', NULL),
((SELECT id FROM pages WHERE slug = 'home'), 4, 'why-portugal', 'Por que investir<br/>em Portugal?', NULL, NULL),
((SELECT id FROM pages WHERE slug = 'home'), 5, 'golden-visa-summary', 'O caminho para Portugal com o Golden Visa', 'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'),
((SELECT id FROM pages WHERE slug = 'home'), 6, 'investment-cycle', 'Entenda o ciclo completo do seu investimento', 'Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.', NULL),
((SELECT id FROM pages WHERE slug = 'home'), 7, 'investment-strategy', 'Estratégia de investimento: o caminho para o sucesso', NULL, NULL),
((SELECT id FROM pages WHERE slug = 'home'), 8, 'contact-summary', 'Pronto para investir em Portugal?', 'Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.', NULL);

-- Inserção dos blocos de conteúdo para a página 'sobre'
INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content, image_url) VALUES
((SELECT id FROM pages WHERE slug = 'sobre'), 1, 'sobre-hero', 'Sobre a Aquila Fund FCR', 'Construindo um legado de confiança, transparência e excelência.', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, registrada e regulada pela Comissão do Mercado de Valores Mobiliários (CMVM), focada em oferecer soluções de investimento de alto valor para clientes que buscam diversificação internacional, proteção patrimonial e acesso ao Golden Visa.</p><p>Nossa missão é conectar investidores a oportunidades únicas no mercado português, combinando expertise local com uma visão global. Atuamos com rigor, transparência e um compromisso inabalável com a geração de valor sustentável para nossos parceiros e clientes.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
((SELECT id FROM pages WHERE slug = 'sobre'), 2, 'sobre-partners', 'Nossos Parceiros Estratégicos', 'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.', NULL, NULL),
((SELECT id FROM pages WHERE slug = 'sobre'), 3, 'partner-fundbox', 'FundBox', '<p>A FundBox é a nossa Sociedade Gestora, responsável pela administração e gestão dos fundos. Com uma equipe de especialistas dedicados, a FundBox garante que todas as operações sigam as mais rigorosas normas de compliance e regulação da CMVM, oferecendo segurança e profissionalismo em cada etapa do processo de investimento.</p>', NULL, NULL),
((SELECT id FROM pages WHERE slug = 'sobre'), 4, 'partner-btg', 'BTG Pactual', '<p>O BTG Pactual, o maior banco de investimentos da América Latina, atua como o banco depositário dos nossos fundos. Esta parceria estratégica assegura que os ativos dos nossos investidores sejam mantidos com a máxima segurança e integridade, sob a custódia de uma instituição financeira de renome mundial.</p>', NULL, NULL);

-- Inserção dos blocos para a página 'golden-visa'
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
((SELECT id FROM pages WHERE slug = 'golden-visa'), 1, 'gv-hero', 'Golden Visa Portugal', 'Seu passaporte para a Europa através de investimentos de valor.', NULL),
((SELECT id FROM pages WHERE slug = 'golden-visa'), 2, 'gv-benefits', 'Benefícios de um Futuro Europeu', 'O programa Golden Visa de Portugal é um dos mais procurados do mundo, oferecendo um caminho claro para a residência e cidadania europeia em troca de um investimento qualificado no país.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'),
((SELECT id FROM pages WHERE slug = 'golden-visa'), 3, 'gv-steps', 'Etapas do Processo', NULL, NULL),
((SELECT id FROM pages WHERE slug = 'golden-visa'), 4, 'gv-funds', 'Fundos Elegíveis para Golden Visa', 'Invista em ativos de alta performance enquanto garante seu futuro na Europa. Conheça nossos fundos qualificados para o programa.', NULL),
((SELECT id FROM pages WHERE slug = 'golden-visa'), 5, 'gv-faq', 'Perguntas Frequentes', NULL, NULL);

-- Inserção dos blocos para a página 'trabalhe-conosco'
INSERT INTO blocks (page_id, order_index, block_type, title, content) VALUES
((SELECT id FROM pages WHERE slug = 'trabalhe-conosco'), 1, 'join-us-hero', 'Trabalhe Conosco', 'Procuramos talentos excepcionais que partilhem da nossa paixão por excelência e inovação no mercado financeiro.'),
((SELECT id FROM pages WHERE slug = 'trabalhe-conosco'), 2, 'join-us-form', 'Envie sua Candidatura', 'Se você é um profissional motivado e busca desafios, gostaríamos de conhecer você.');
