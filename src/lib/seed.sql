
-- Habilita o RLS (Row-Level Security) se ainda não estiver habilitado
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;

-- Limpa os dados existentes para evitar duplicados
TRUNCATE TABLE public.pages, public.blocks RESTART IDENTITY CASCADE;

-- Insere as páginas
INSERT INTO public.pages (id, slug, title, description) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'home', 'Página Inicial', 'Página principal do site Aquila Fund FCR.'),
('b1ffcc88-8d1a-3fe7-ab5c-5ac8ad270b22', 'sobre', 'Sobre Nós', 'Página com informações sobre a Aquila Fund FCR.'),
('c2dddd77-7e2b-2ed6-ba4d-4bd79c161c33', 'golden-visa', 'Golden Visa', 'Página sobre o Golden Visa em Portugal.'),
('d3eeee66-6f3c-1fd5-cb3e-3ce68b052d44', 'trabalhe-conosco', 'Trabalhe Conosco', 'Página para envio de candidaturas.');

-- Inserir blocos para a página HOME
INSERT INTO public.blocks (page_id, order_index, block_type, title, content, image_url) VALUES
-- Bloco HERO
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    1,
    'hero',
    'Investimentos <span class="text-primary">Inteligentes</span> <span class="block">para o seu Futuro</span>',
    'Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.',
    NULL
),
-- Bloco ABOUT-SUMMARY
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    2,
    'about-summary',
    'Seu capital, nossa expertise',
    '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>',
    'https://ik.imagekit.io/leosmc2zb/5573.jpg'
),
-- Bloco FUNDS-SUMMARY
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    3,
    'funds-summary',
    'Nossos Fundos de Investimento',
    'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.',
    NULL
),
-- Bloco WHY-PORTUGAL
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    4,
    'why-portugal',
    'Por que investir<br/>em Portugal?',
    NULL,
    NULL
),
-- Bloco GOLDEN-VISA-SUMMARY
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    5,
    'golden-visa-summary',
    'O caminho para Portugal com o Golden Visa',
    'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.',
    'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'
),
-- Bloco INVESTMENT-CYCLE
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    6,
    'investment-cycle',
    'Entenda o ciclo completo do seu investimento',
    'Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.',
    NULL
),
-- Bloco INVESTMENT-STRATEGY
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    7,
    'investment-strategy',
    'Estratégia de investimento: o caminho para o sucesso',
    NULL,
    NULL
),
-- Bloco CONTACT-SUMMARY
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    8,
    'contact-summary',
    'Pronto para investir em Portugal?',
    'Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.',
    NULL
);

-- Inserir blocos para a página SOBRE
INSERT INTO public.blocks (page_id, order_index, block_type, title, content, image_url, sub_content) VALUES
-- Bloco SOBRE-HERO
(
    'b1ffcc88-8d1a-3fe7-ab5c-5ac8ad270b22',
    1,
    'sobre-hero',
    'Sobre a Aquila Fund FCR',
    'Construindo um legado de confiança, transparência e excelência.',
    'https://ik.imagekit.io/leosmc2zb/5573.jpg',
    '<p>Na Aquila Fund FCR, acreditamos que o sucesso financeiro se baseia em uma base sólida de confiança, transparência e expertise. Nossa missão é oferecer aos investidores brasileiros uma plataforma segura e rentável para diversificação internacional de seus portfólios, com um foco especial em oportunidades no mercado português.</p><p>Com um profundo conhecimento do ambiente de negócios em Portugal e uma equipe de especialistas dedicados, estamos comprometidos em guiar nossos clientes em cada etapa do processo, garantindo que seus investimentos não apenas gerem retornos sólidos, mas também abram portas para novas oportunidades, incluindo o cobiçado Golden Visa.</p>'
),
-- Bloco SOBRE-PARTNERS
(
    'b1ffcc88-8d1a-3fe7-ab5c-5ac8ad270b22',
    2,
    'sobre-partners',
    'Nossos Parceiros Estratégicos',
    'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.',
    NULL,
    NULL
),
-- Bloco PARTNER-FUNDBOX
(
    'b1ffcc88-8d1a-3fe7-ab5c-5ac8ad270b22',
    3,
    'partner-fundbox',
    'FundBox',
    '<p>A FundBox é uma sociedade gestora de fundos de capital de risco independente, registrada na CMVM, que oferece serviços de excelência na gestão e administração de fundos. Com uma abordagem flexível e rigorosa, a FundBox garante a conformidade e a eficiência operacional dos nossos fundos, proporcionando tranquilidade aos investidores.</p>',
    NULL,
    NULL
),
-- Bloco PARTNER-BTG
(
    'b1ffcc88-8d1a-3fe7-ab5c-5ac8ad270b22',
    4,
    'partner-btg',
    'BTG Pactual',
    '<p>O BTG Pactual é o maior banco de investimentos da América Latina, atuando como o banco depositário de todos os fundos da Aquila. Sua robustez e reputação internacional asseguram a máxima segurança na custódia dos ativos, seguindo as mais altas práticas de governança e compliance do mercado financeiro global.</p>',
    NULL,
    NULL
);

-- Inserir blocos para a página GOLDEN-VISA
INSERT INTO public.blocks (page_id, order_index, block_type, title, content, image_url) VALUES
-- Bloco GOLDEN-VISA-HEADER
(
    'c2dddd77-7e2b-2ed6-ba4d-4bd79c161c33',
    1,
    'page-header',
    'Golden Visa Portugal',
    'Seu passaporte para a Europa através de investimentos de valor.',
    NULL
),
-- Bloco BENEFITS-SECTION
(
    'c2dddd77-7e2b-2ed6-ba4d-4bd79c161c33',
    2,
    'benefits-section',
    'Benefícios de um Futuro Europeu',
    'O programa Golden Visa de Portugal é um dos mais procurados do mundo, oferecendo um caminho claro para a residência e cidadania europeia em troca de um investimento qualificado no país.',
    'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'
),
-- Bloco PROCESS-SECTION
(
    'c2dddd77-7e2b-2ed6-ba4d-4bd79c161c33',
    3,
    'process-section',
    'Etapas do Processo',
    'Consulta Inicial, Escolha do Fundo, Processo de Investimento, Aplicação ao Golden Visa, Biometria e Emissão.',
    NULL
),
-- Bloco ELIGIBLE-FUNDS
(
    'c2dddd77-7e2b-2ed6-ba4d-4bd79c161c33',
    4,
    'eligible-funds',
    'Fundos Elegíveis para Golden Visa',
    'Invista em ativos de alta performance enquanto garante seu futuro na Europa. Conheça nossos fundos qualificados para o programa.',
    NULL
);

-- Inserir blocos para a página TRABALHE-CONOSCO
INSERT INTO public.blocks (page_id, order_index, block_type, title, content, image_url) VALUES
-- Bloco TRABALHE-HEADER
(
    'd3eeee66-6f3c-1fd5-cb3e-3ce68b052d44',
    1,
    'page-header',
    'Trabalhe Conosco',
    'Procuramos talentos excepcionais que partilhem da nossa paixão por excelência e inovação no mercado financeiro.',
    NULL
),
-- Bloco APPLICATION-FORM
(
    'd3eeee66-6f3c-1fd5-cb3e-3ce68b052d44',
    2,
    'application-form',
    'Envie sua Candidatura',
    'Se você é um profissional motivado e busca desafios, gostaríamos de conhecer você.',
    NULL
);
