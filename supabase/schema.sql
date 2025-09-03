
-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS "blocks";
DROP TABLE IF EXISTS "pages";

-- Create the pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create the blocks table
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  order_index INT NOT NULL,
  block_type TEXT NOT NULL,
  title TEXT,
  content TEXT,
  image_url TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add a column to track the last editor on a page for the dashboard
ALTER TABLE blocks
ADD COLUMN updated_at_proxy timestamptz DEFAULT now();

-- Create a function to update the proxy column
CREATE OR REPLACE FUNCTION update_updated_at_proxy()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at_proxy = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the proxy column
CREATE TRIGGER on_block_update
  BEFORE UPDATE ON blocks
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_proxy();


-- Seed initial data

-- Insert pages
INSERT INTO pages (slug, title) VALUES
('home', 'Página Inicial'),
('sobre', 'Sobre Nós'),
('golden-visa', 'Golden Visa'),
('contato', 'Contato');

-- Home Page Blocks
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
((SELECT id FROM pages WHERE slug = 'home'), 1, 'hero', 'Investimentos Inteligentes para o seu Futuro', 'Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.', 'https://ik.imagekit.io/leosmc2zb/3493.jpg?updatedAt=1756315204824'),
((SELECT id FROM pages WHERE slug = 'home'), 2, 'about-summary', 'Seu capital, nossa expertise', '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
((SELECT id FROM pages WHERE slug = 'home'), 3, 'funds-summary', 'Nossos Fundos de Investimento', 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.', NULL),
((SELECT id FROM pages WHERE slug = 'home'), 4, 'why-portugal', 'Por que investir em Portugal?', NULL, NULL),
((SELECT id FROM pages WHERE slug = 'home'), 5, 'golden-visa-summary', 'O caminho para Portugal com o Golden Visa', 'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.', 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'),
((SELECT id FROM pages WHERE slug = 'home'), 6, 'investment-cycle', 'Entenda o ciclo completo do seu investimento', 'Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.', NULL),
((SELECT id FROM pages WHERE slug = 'home'), 7, 'investment-strategy', 'Estratégia de investimento: o caminho para o sucesso', NULL, 'https://ik.imagekit.io/leosmc2zb/3550%20(1).jpg?updatedAt=1756312096783'),
((SELECT id FROM pages WHERE slug = 'home'), 8, 'contact-summary', 'Pronto para investir em Portugal?', 'Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.', NULL);


-- About Page Blocks
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
((SELECT id FROM pages WHERE slug = 'sobre'), 1, 'hero', 'Sobre a Aquila Fund FCR', 'Construindo um legado de confiança, transparência e excelência.', NULL),
((SELECT id FROM pages WHERE slug = 'sobre'), 2, 'texto', 'Nossa Essência', '<p>A Aquila Fund FCR nasceu há dois anos com a visão de ser uma <strong>plataforma de investimentos diferenciada</strong>, focada em oferecer <strong>soluções inovadoras para investidores de alta renda</strong>. Desde o início, temos nos dedicado a construir um legado de <strong>confiança, transparência e excelência</strong> no mercado financeiro português.</p><p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem <strong>valor real e sustentável</strong> para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.</p><p>Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos relacionamentos duradouros baseados na confiança e no compromisso com resultados.</p>', 'https://ik.imagekit.io/leosmc2zb/5573.jpg'),
((SELECT id FROM pages WHERE slug = 'sobre'), 3, 'parceiros', 'Nossos Parceiros Estratégicos', 'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.', NULL);


-- Golden Visa Page Blocks
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
((SELECT id FROM pages WHERE slug = 'golden-visa'), 1, 'hero', 'Golden Visa Portugal', 'Seu passaporte para a Europa através de investimentos de valor.', NULL),
((SELECT id FROM pages WHERE slug = 'golden-visa'), 2, 'beneficios', 'Benefícios de um Futuro Europeu', 'O programa Golden Visa de Portugal é um dos mais procurados do mundo, oferecendo um caminho claro para a residência e cidadania europeia em troca de um investimento qualificado no país.', NULL),
((SELECT id FROM pages WHERE slug = 'golden-visa'), 3, 'fundos-elegiveis', 'Fundos Elegíveis para Golden Visa', 'Invista em ativos de alta performance enquanto garante seu futuro na Europa. Conheça nossos fundos qualificados para o programa.', NULL),
((SELECT id FROM pages WHERE slug = 'golden-visa'), 4, 'faq', 'Perguntas Frequentes', NULL, NULL);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Read access for everyone" ON pages;
DROP POLICY IF EXISTS "Read access for everyone" ON blocks;
DROP POLICY IF EXISTS "Admin insert/update/delete pages" ON pages;
DROP POLICY IF EXISTS "Admin insert/update/delete blocks" ON blocks;

-- Policies for 'pages' table
CREATE POLICY "Read access for everyone" ON pages
FOR SELECT USING (true);

CREATE POLICY "Admin insert/update/delete pages" ON pages
FOR ALL USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
) WITH CHECK (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- Policies for 'blocks' table
CREATE POLICY "Read access for everyone" ON blocks
FOR SELECT USING (true);

CREATE POLICY "Admin insert/update/delete blocks" ON blocks
FOR ALL USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
) WITH CHECK (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- Function to set the updated_by field automatically
CREATE OR REPLACE FUNCTION set_updated_by()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before insert or update on blocks
DROP TRIGGER IF EXISTS on_block_change ON blocks;
CREATE TRIGGER on_block_change
  BEFORE INSERT OR UPDATE ON blocks
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_by();
