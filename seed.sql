-- Apaga dados existentes para evitar duplicados (opcional, mas recomendado para um novo começo)
DELETE FROM blocks;
DELETE FROM pages;

-- Insere as páginas principais
INSERT INTO pages (id, slug, title, description) VALUES
('b1a3e3c5-9b0d-4a1e-8c3b-2f6d1e4c5a6b', 'home', 'Página Principal', 'Conteúdo da página principal da Aquila.'),
('c2b4f4d6-0c1e-5b2f-9d4c-3g7e2f5d6b7c', 'sobre', 'Página Sobre Nós', 'Conteúdo da página Sobre Nós.');

-- BLOCKS FOR HOME PAGE --
-- Use o ID 'b1a3e3c5-9b0d-4a1e-8c3b-2f6d1e4c5a6b' para a página 'home'

-- Bloco: about-summary (Resumo Sobre)
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
('b1a3e3c5-9b0d-4a1e-8c3b-2f6d1e4c5a6b', 1, 'about-summary', 'Seu capital, nossa expertise', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg');

-- Bloco: why-portugal (Por que Portugal?)
INSERT INTO blocks (page_id, order_index, block_type, title, content) VALUES
('b1a3e3c5-9b0d-4a1e-8c3b-2f6d1e4c5a6b', 2, 'why-portugal', 'Por que investir em Portugal?', '...');

-- Bloco: golden-visa-summary (Resumo Golden Visa)
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
('b1a3e3c5-9b0d-4a1e-8c3b-2f6d1e4c5a6b', 3, 'golden-visa-summary', 'O caminho para Portugal com o Golden Visa', '<p>O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.</p>', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg');

-- Bloco: investment-cycle (Ciclo de Investimento)
INSERT INTO blocks (page_id, order_index, block_type, title, content) VALUES
('b1a3e3c5-9b0d-4a1e-8c3b-2f6d1e4c5a6b', 4, 'investment-cycle', 'Entenda o ciclo completo do seu investimento', '<p>Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.</p>');

-- Bloco: investment-strategy (Estratégia de Investimento)
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
('b1a3e3c5-9b0d-4a1e-8c3b-2f6d1e4c5a6b', 5, 'investment-strategy', 'Estratégia de investimento: o caminho para o sucesso', '...', 'https://ik.imagekit.io/leosmc2zb/3550%20(1).jpg?updatedAt=1756312096783');

-- Bloco: contact-summary (Resumo Contato)
INSERT INTO blocks (page_id, order_index, block_type, title, content) VALUES
('b1a3e3c5-9b0d-4a1e-8c3b-2f6d1e4c5a6b', 6, 'contact-summary', 'Pronto para investir em Portugal?', '<p>Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.</p>');


-- BLOCKS FOR SOBRE PAGE --
-- Use o ID 'c2b4f4d6-0c1e-5b2f-9d4c-3g7e2f5d6b7c' para a página 'sobre'

-- Bloco: about-main (Conteúdo principal Sobre)
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
('c2b4f4d6-0c1e-5b2f-9d4c-3g7e2f5d6b7c', 1, 'about-main', 'Sobre a Aquila Fund FCR', '<p>A Aquila Fund FCR nasceu há dois anos com a visão de ser uma <strong>plataforma de investimentos diferenciada</strong>, focada em oferecer <strong>soluções inovadoras para investidores de alta renda</strong>. Desde o início, temos nos dedicado a construir um legado de <strong>confiança, transparência e excelência</strong> no mercado financeiro português.</p><p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem <strong>valor real e sustentável</strong> para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.</p><p>Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos relacionamentos duradouros baseados na confiança e no compromisso com resultados.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg');

-- Bloco: partners (Parceiros)
INSERT INTO blocks (page_id, order_index, block_type, title, content) VALUES
('c2b4f4d6-0c1e-5b2f-9d4c-3g7e2f5d6b7c', 2, 'partners', 'Nossos Parceiros Estratégicos', 'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.');

-- Bloco: partner-fundbox
INSERT INTO blocks (page_id, order_index, block_type, title, content) VALUES
('c2b4f4d6-0c1e-5b2f-9d4c-3g7e2f5d6b7c', 3, 'partner-fundbox', 'FundBox', '<p>Nossos fundos são geridos pela FundBox, empresa de investimento independente líder em Portugal que gera ativamente cerca de €420 milhões em ativos sob gestão. A FundBox oferece estruturação e execução de transações de primeira classe, livre de qualquer agenda conflitante, e com envolvimento ativo de executivos senhores ao longo de todo o processo de investimento.</p>');

-- Bloco: partner-btg
INSERT INTO blocks (page_id, order_index, block_type, title, content) VALUES
('c2b4f4d6-0c1e-5b2f-9d4c-3g7e2f5d6b7c', 4, 'partner-btg', 'BTG Pactual', '<p>Para facilitar o acesso aos nossos fundos, estabelecemos uma parceria exclusiva com o BTG Pactual. Nossos clientes podem investir mantendo seus ativos no Brasil como garantia, sem a necessidade de transferir capital para o exterior, ideal para quem busca diversificação internacional sem desmobilizar seus investimentos atuais.</p>');
