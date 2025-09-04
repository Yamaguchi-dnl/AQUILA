
-- Apaga os dados antigos para evitar duplicados ao re-executar o script.
-- A ordem é importante para respeitar as chaves estrangeiras.
DELETE FROM blocks;
DELETE FROM pages;

-- Insere as páginas na tabela 'pages'.
-- O 'id' é definido manualmente para ser previsível e facilitar a associação dos blocos.
INSERT INTO pages (id, slug, title, description) VALUES
('f9d2f6d7-8c6a-4b1e-8e2b-7e6c5a4d3b2a', 'home', 'Página Principal', 'Conteúdo da página principal (Home).'),
('a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'sobre', 'Sobre a Aquila', 'Conteúdo da página Sobre Nós.'),
('b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'golden-visa', 'Golden Visa', 'Conteúdo da página Golden Visa.'),
('c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7f8g', 'trabalhe-conosco', 'Trabalhe Conosco', 'Conteúdo da página Trabalhe Conosco.');

-- Insere os blocos de conteúdo na tabela 'blocks', associando cada um à sua respectiva página.

-- ==================================================
-- BLOCOS DA PÁGINA 'HOME'
-- page_id: 'f9d2f6d7-8c6a-4b1e-8e2b-7e6c5a4d3b2a'
-- ==================================================

INSERT INTO blocks (page_id, block_type, title, content, image_url, order_index) VALUES
(
  'f9d2f6d7-8c6a-4b1e-8e2b-7e6c5a4d3b2a',
  'hero',
  'Investimentos <span class="text-primary">Inteligentes</span> <span class="block">para o seu Futuro</span>',
  'Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.',
  'https://ik.imagekit.io/leosmc2zb/3493.jpg?updatedAt=1756315204824',
  1
),
(
  'f9d2f6d7-8c6a-4b1e-8e2b-7e6c5a4d3b2a',
  'about-summary',
  'Seu capital, nossa expertise',
  '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>',
  'https://ik.imagekit.io/leosmc2zb/5573.jpg',
  2
),
(
  'f9d2f6d7-8c6a-4b1e-8e2b-7e6c5a4d3b2a',
  'funds-summary',
  'Nossos Fundos de Investimento',
  'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.',
  NULL,
  3
),
(
  'f9d2f6d7-8c6a-4b1e-8e2b-7e6c5a4d3b2a',
  'why-portugal',
  'Por que investir<br/>em Portugal?',
  NULL,
  NULL,
  4
),
(
  'f9d2f6d7-8c6a-4b1e-8e2b-7e6c5a4d3b2a',
  'golden-visa-summary',
  'O caminho para Portugal com o Golden Visa',
  'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.',
  'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg',
  5
),
(
  'f9d2f6d7-8c6a-4b1e-8e2b-7e6c5a4d3b2a',
  'investment-cycle',
  'Entenda o ciclo completo do seu investimento',
  'Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.',
  NULL,
  6
),
(
  'f9d2f6d7-8c6a-4b1e-8e2b-7e6c5a4d3b2a',
  'investment-strategy',
  'Estratégia de investimento: o caminho para o sucesso',
  NULL,
  NULL,
  7
),
(
  'f9d2f6d7-8c6a-4b1e-8e2b-7e6c5a4d3b2a',
  'contact-summary',
  'Pronto para investir em Portugal?',
  'Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.',
  NULL,
  8
);


-- ==================================================
-- BLOCOS DA PÁGINA 'SOBRE'
-- page_id: 'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d'
-- ==================================================

INSERT INTO blocks (page_id, block_type, title, content, image_url, order_index, sub_content) VALUES
(
  'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  'sobre-hero',
  'Sobre a Aquila Fund FCR',
  'Construindo um legado de confiança, transparência e excelência.',
  'https://ik.imagekit.io/leosmc2zb/5573.jpg',
  1,
  '<h4>Nossa Missão</h4><p>Gerar valor sustentável para os nossos investidores através de estratégias de investimento inovadoras e seguras, com um foco especial em ativos que não só proporcionam retorno financeiro, mas também contribuem para o crescimento da economia portuguesa.</p><h4>Nossa Visão</h4><p>Ser a principal plataforma de investimentos alternativos em Portugal, reconhecida pela excelência na gestão, transparência total e por ser o parceiro de confiança para investidores que buscam diversificação internacional e acesso à residência europeia.</p>'
),
(
  'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  'sobre-partners',
  'Nossos Parceiros Estratégicos',
  'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.',
  NULL,
  2,
  NULL
),
(
  'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  'partner-fundbox',
  'FundBox',
  'A FundBox é a Sociedade Gestora dos fundos Aquila. Com uma vasta experiência e um profundo conhecimento do mercado português, a FundBox garante uma gestão profissional, independente e rigorosa, alinhada com as melhores práticas internacionais e totalmente regulada pela CMVM (Comissão do Mercado de Valores Mobiliários).',
  NULL,
  3,
  NULL
),
(
  'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  'partner-btg',
  'BTG Pactual',
  'O BTG Pactual é o banco depositário dos fundos Aquila. Sendo o maior banco de investimentos da América Latina, a sua participação confere uma camada adicional de segurança e credibilidade às nossas operações, assegurando que os ativos dos nossos investidores são mantidos com os mais altos padrões de governança.',
  NULL,
  4,
  NULL
);


-- ==================================================
-- BLOCOS DA PÁGINA 'GOLDEN VISA'
-- page_id: 'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e'
-- ==================================================

INSERT INTO blocks (page_id, block_type, title, content, image_url, order_index, sub_content) VALUES
(
  'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
  'gv-hero',
  'Golden Visa Portugal',
  'O seu caminho para a Europa através de investimentos de valor.',
  NULL,
  1,
  'Seu passaporte para a Europa através de investimentos de valor.' -- Mapeado para pretitle no componente
),
(
  'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
  'gv-benefits',
  'Benefícios de um Futuro Europeu',
  '<p>O programa Golden Visa de Portugal é um dos mais procurados do mundo, oferecendo um caminho claro para a residência e cidadania europeia em troca de um investimento qualificado no país.</p><ul><li>Direito de viver, trabalhar e estudar em Portugal</li><li>Livre circulação no Espaço Schengen (27 países europeus)</li><li>Reagrupamento familiar, estendendo os benefícios ao cônjuge, filhos e pais</li><li>Acesso a sistemas de saúde e educação de alta qualidade</li><li>Requisito de permanência mínima flexível (média de 7 dias por ano)</li><li>Caminho para a cidadania portuguesa e passaporte europeu após 5 anos</li></ul>',
  'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg',
  2,
  NULL
),
(
  'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
  'gv-process',
  'Etapas do Processo',
  '[{"title": "Consulta Inicial", "description": "Fale com nossos especialistas para avaliar seu perfil e objetivos."}, {"title": "Escolha do Fundo", "description": "Selecione um de nossos fundos elegíveis, como o Aquila Wheels ou Hotel Invest."}, {"title": "Processo de Investimento", "description": "Realize o investimento e obtenha a declaração necessária do gestor do fundo."}, {"title": "Aplicação ao Golden Visa", "description": "Com o suporte de advogados parceiros, submeta sua aplicação online ao AIMA."}, {"title": "Biometria e Emissão", "description": "Agende e compareça à sua entrevista biométrica para finalizar o processo e receber seu cartão de residência."}]',
  NULL,
  3,
  NULL
),
(
  'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
  'gv-funds',
  'Fundos Elegíveis para Golden Visa',
  'Invista em ativos de alta performance enquanto garante seu futuro na Europa. Conheça nossos fundos qualificados para o programa.',
  NULL,
  4,
  NULL
),
(
  'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
  'gv-faq-legal',
  'Perguntas Frequentes',
  NULL, -- Conteúdo do FAQ vem de data.ts, mas o bloco pode controlar o título.
  NULL,
  5,
  NULL
);

-- ==================================================
-- BLOCOS DA PÁGINA 'TRABALHE CONOSCO'
-- page_id: 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7f8g'
-- ==================================================

INSERT INTO blocks (page_id, block_type, title, content, order_index, sub_content) VALUES
(
  'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7f8g',
  'trabalhe-hero',
  'Trabalhe Conosco',
  'Procuramos talentos excepcionais que partilhem da nossa paixão por excelência e inovação no mercado financeiro.',
  1,
  'Junte-se à nossa equipa' -- Mapeado para pretitle no componente
);
