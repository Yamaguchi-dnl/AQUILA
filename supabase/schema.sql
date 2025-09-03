
-- ### CONFIGURAÇÃO INICIAL ###

-- 1. Cria a tabela para armazenar dados públicos dos usuários
CREATE TABLE if not exists users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE
);

-- 2. Função para sincronizar a tabela `users` com `auth.users`
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger para executar a função `handle_new_user`
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ### TABELAS DO SITE ###

-- 1. Cria a tabela `pages`
CREATE TABLE if not exists pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Cria a tabela `blocks`
CREATE TABLE if not exists blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  order_index INT NOT NULL,
  block_type TEXT NOT NULL,
  title TEXT,
  content TEXT,
  image_url TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ### FUNÇÃO PARA ATUALIZAR `updated_at` ###
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para `blocks`
CREATE OR REPLACE TRIGGER handle_blocks_update
  BEFORE UPDATE ON public.blocks
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();


-- ### BUCKET DE IMAGENS ###
-- Cria o bucket para as imagens do site com acesso público
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- ### POLÍTICAS DE SEGURANÇA (RLS) ###

-- Habilita RLS para as tabelas
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas se existirem
DROP POLICY IF EXISTS "Read access for everyone" ON pages;
DROP POLICY IF EXISTS "Admin insert/update/delete pages" ON pages;
DROP POLICY IF EXISTS "Read access for everyone" ON blocks;
DROP POLICY IF EXISTS "Admin insert/update/delete blocks" ON blocks;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin full access on site-images" ON storage.objects;

-- Políticas para a tabela `pages`
CREATE POLICY "Read access for everyone" ON pages
FOR SELECT USING (true);

CREATE POLICY "Admin insert/update/delete pages" ON pages
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.is_admin = true
  )
);

-- Políticas para a tabela `blocks`
CREATE POLICY "Read access for everyone" ON blocks
FOR SELECT USING (true);

CREATE POLICY "Admin insert/update/delete blocks" ON blocks
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.is_admin = true
  )
);

-- Políticas para o Storage `site-images`
CREATE POLICY "Allow admin full access on site-images" ON storage.objects
FOR ALL
USING (
    bucket_id = 'site-images' AND
    EXISTS (
        SELECT 1 FROM users WHERE users.id = auth.uid() AND users.is_admin = true
    )
)
WITH CHECK (
    bucket_id = 'site-images' AND
    EXISTS (
        SELECT 1 FROM users WHERE users.id = auth.uid() AND users.is_admin = true
    )
);


-- ### DADOS INICIAIS (SEED) ###

-- Limpa dados existentes para evitar duplicatas
DELETE FROM blocks;
DELETE FROM pages;

-- Cria as páginas
INSERT INTO pages (slug, title) VALUES
('home', 'Página Inicial'),
('sobre', 'Sobre Nós'),
('golden-visa', 'Golden Visa'),
('investimentos', 'Investimentos')
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Cria os blocos para a página 'home'
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
(
  (SELECT id FROM pages WHERE slug = 'home'), 1, 'hero',
  'Investimentos Inteligentes para o seu Futuro',
  '<p>Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.</p>',
  'https://ik.imagekit.io/leosmc2zb/3493.jpg?updatedAt=1756315204824'
),
(
  (SELECT id FROM pages WHERE slug = 'home'), 2, 'about-summary',
  'Seu capital, nossa expertise',
  'A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM). Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State. Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.',
  'https://ik.imagekit.io/leosmc2zb/5573.jpg'
),
(
  (SELECT id FROM pages WHERE slug = 'home'), 3, 'funds-summary',
  'Nossos Fundos de Investimento',
  '<p>Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.</p>',
  NULL
),
(
  (SELECT id FROM pages WHERE slug = 'home'), 4, 'why-portugal',
  'Por que investir em Portugal?',
  NULL,
  NULL
),
(
  (SELECT id FROM pages WHERE slug = 'home'), 5, 'golden-visa-summary',
  'O caminho para Portugal com o Golden Visa',
  '<p>O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.</p>',
  'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'
),
(
  (SELECT id FROM pages WHERE slug = 'home'), 6, 'investment-cycle',
  'Entenda o ciclo completo do seu investimento',
  '<p>Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.</p>',
  NULL
),
(
  (SELECT id FROM pages WHERE slug = 'home'), 7, 'investment-strategy',
  'Estratégia de investimento: o caminho para o sucesso',
  NULL,
  'https://ik.imagekit.io/leosmc2zb/3550%20(1).jpg?updatedAt=1756312096783'
),
(
  (SELECT id FROM pages WHERE slug = 'home'), 8, 'contact-summary',
  'Pronto para investir em Portugal?',
  '<p>Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.</p>',
  NULL
);

-- Cria os blocos para a página 'sobre'
INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
(
    (SELECT id FROM pages WHERE slug = 'sobre'), 1, 'mission', 'Sobre a Aquila Fund FCR',
    '<p>A Aquila Fund FCR nasceu há dois anos com a visão de ser uma <strong>plataforma de investimentos diferenciada</strong>, focada em oferecer <strong>soluções inovadoras para investidores de alta renda</strong>. Desde o início, temos nos dedicado a construir um legado de <strong>confiança, transparência e excelência</strong> no mercado financeiro português.</p><p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem <strong>valor real e sustentável</strong> para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.</p><p>Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos relacionamentos duradouros baseados na confiança e no compromisso com resultados.</p>',
    'https://ik.imagekit.io/leosmc2zb/5573.jpg'
),
(
    (SELECT id FROM pages WHERE slug = 'sobre'), 2, 'partners', 'Nossos Parceiros Estratégicos',
    '<p>Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.</p>',
    NULL
);

    