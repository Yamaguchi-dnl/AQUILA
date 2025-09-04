-- Apaga as tabelas se já existirem para garantir um começo limpo.
-- A cláusula "CASCADE" remove também quaisquer objetos dependentes.
DROP TABLE IF EXISTS blocks CASCADE;
DROP TABLE IF EXISTS pages CASCADE;

-- Cria a tabela "pages" para armazenar as diferentes páginas do site.
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL, -- Identificador amigável para URL (ex: "sobre", "home")
    title TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cria a tabela "blocks" para armazenar os blocos de conteúdo de cada página.
CREATE TABLE blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE, -- Chave estrangeira para a tabela de páginas
    order_index INTEGER NOT NULL DEFAULT 0, -- Ordem em que os blocos aparecem na página
    block_type TEXT NOT NULL, -- Tipo de bloco para identificação no código (ex: "hero", "about-summary")
    title TEXT,
    content TEXT,
    sub_content TEXT, -- Campo adicional para conteúdo secundário (HTML permitido)
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id) -- Opcional: rastrear quem atualizou
);

-- Habilitar Row Level Security (RLS) para segurança
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso: permitir leitura pública, mas restringir escrita a admins
CREATE POLICY "Allow public read access on pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Allow public read access on blocks" ON blocks FOR SELECT USING (true);
CREATE POLICY "Allow admin access to all operations on pages" ON pages FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Allow admin access to all operations on blocks" ON blocks FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');


-- INSERÇÃO DE DADOS PARA AS PÁGINAS

-- IDs pré-definidos para facilitar a associação
DO $$
DECLARE
    home_page_id UUID := 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';
    sobre_page_id UUID := 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e';
    golden_visa_page_id UUID := 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f';
    trabalhe_conosco_page_id UUID := 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a';
BEGIN

-- Inserir as páginas na tabela 'pages'
INSERT INTO pages (id, slug, title, description) VALUES
(home_page_id, 'home', 'Página Inicial', 'Página principal da Aquila Fund FCR.'),
(sobre_page_id, 'sobre', 'Sobre Nós', 'Página sobre a empresa Aquila Fund FCR.'),
(golden_visa_page_id, 'golden-visa', 'Golden Visa', 'Informações sobre o Golden Visa em Portugal.'),
(trabalhe_conosco_page_id, 'trabalhe-conosco', 'Trabalhe Conosco', 'Página de carreiras da Aquila Fund FCR.');

-- Inserir os blocos de conteúdo para a página 'HOME'
INSERT INTO blocks (page_id, block_type, title, content, image_url) VALUES
(home_page_id, 'hero', 'Investimentos <span class="text-primary">Inteligentes</span> <span class="block">para o seu Futuro</span>', 'Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.', NULL),
(home_page_id, 'about-summary', 'Seu capital, nossa expertise', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
(home_page_id, 'funds-summary', 'Nossos Fundos de Investimento', 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.', NULL),
(home_page_id, 'why-portugal', 'Por que investir<br/>em Portugal?', NULL, NULL),
(home_page_id, 'golden-visa-summary', 'O caminho para Portugal com o Golden Visa', 'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'),
(home_page_id, 'investment-cycle', 'Entenda o ciclo completo do seu investimento', 'Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.', NULL),
(home_page_id, 'investment-strategy', 'Estratégia de investimento: o caminho para o sucesso', NULL, NULL),
(home_page_id, 'contact-summary', 'Pronto para investir em Portugal?', 'Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.', NULL);

-- Inserir os blocos de conteúdo para a página 'SOBRE'
INSERT INTO blocks (page_id, block_type, title, content, sub_content, image_url) VALUES
(sobre_page_id, 'sobre-hero', 'Sobre a Aquila Fund FCR', 'Construindo um legado de confiança, transparência e excelência.', '<p>A Aquila Fund FCR é uma plataforma de investimentos de valor em Portugal, nascida da união de especialistas com décadas de experiência no mercado financeiro global. A nossa missão é simples: criar pontes seguras e rentáveis para investidores que buscam diversificação internacional, proteção patrimonial e acesso a oportunidades exclusivas, como o Golden Visa.</p><p>Operamos com base em quatro pilares: transparência total, gestão de risco rigorosa, inovação em produtos de investimento e um compromisso inabalável com o sucesso dos nossos clientes. Cada fundo é gerido por uma equipa dedicada, focada em maximizar o retorno enquanto mitiga os riscos inerentes a cada setor.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
(sobre_page_id, 'sobre-partners', 'Nossos Parceiros Estratégicos', 'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.', NULL, NULL),
(sobre_page_id, 'partner-fundbox', 'FundBox', '<p>A FundBox é a sociedade gestora dos fundos da Aquila, uma das mais conceituadas e respeitadas de Portugal. Com um profundo conhecimento do ambiente regulatório e uma vasta experiência na estruturação e gestão de fundos de capital de risco, a FundBox garante que as nossas operações sigam os mais elevados padrões de governança, conformidade e transparência. A sua supervisão rigorosa é um selo de segurança e confiança para os nossos investidores.</p>', NULL, NULL),
(sobre_page_id, 'partner-btg', 'BTG Pactual', '<p>O BTG Pactual, o maior banco de investimentos da América Latina, atua como o banco depositário dos nossos fundos. Esta parceria estratégica assegura que todos os ativos dos fundos sejam mantidos e transacionados com a máxima segurança, eficiência e solidez institucional. A robustez e a reputação do BTG Pactual no mercado financeiro global oferecem uma camada adicional de proteção e credibilidade para o capital dos nossos clientes, garantindo a segregação e a custódia adequada dos ativos.</p>', NULL, NULL);

-- Inserir os blocos de conteúdo para a página 'GOLDEN VISA'
INSERT INTO blocks (page_id, block_type, title, content, image_url) VALUES
(golden_visa_page_id, 'gv-hero', 'Golden Visa Portugal', 'O seu caminho para a Europa através de investimentos de valor.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'),
(golden_visa_page_id, 'gv-benefits', 'Benefícios de um Futuro Europeu', 'O programa Golden Visa de Portugal é um dos mais procurados do mundo, oferecendo um caminho claro para a residência e cidadania europeia em troca de um investimento qualificado no país.', NULL),
(golden_visa_page_id, 'gv-process', 'Etapas do Processo', 'Desde a consulta inicial até à emissão do seu cartão de residência, o processo é estruturado para ser claro e eficiente.', NULL),
(golden_visa_page_id, 'gv-funds', 'Fundos Elegíveis para Golden Visa', 'Invista em ativos de alta performance enquanto garante seu futuro na Europa. Conheça nossos fundos qualificados para o programa.', NULL),
(golden_visa_page_id, 'gv-faq', 'Perguntas Frequentes', 'Esclareça as suas principais dúvidas sobre o programa Golden Visa.', NULL),
(golden_visa_page_id, 'gv-legal-notice', 'Aviso Legal', 'As informações nesta página são para fins informativos e não constituem aconselhamento jurídico ou fiscal. As condições e regulamentos do programa Golden Visa estão sujeitos a alterações pelo governo português. Recomendamos consultar um advogado de imigração para obter aconselhamento específico à sua situação.', NULL);

-- Inserir os blocos de conteúdo para a página 'TRABALHE CONOSCO'
INSERT INTO blocks (page_id, block_type, title, content) VALUES
(trabalhe_conosco_page_id, 'tc-header', 'Trabalhe Conosco', 'Procuramos talentos excepcionais que partilhem da nossa paixão por excelência e inovação no mercado financeiro.'),
(trabalhe_conosco_page_id, 'tc-form-intro', 'Envie sua Candidatura', 'Se você é um profissional motivado e busca desafios, gostaríamos de conhecer você.');

END $$;
