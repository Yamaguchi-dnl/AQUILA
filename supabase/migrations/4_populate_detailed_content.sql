-- Apaga todos os blocos existentes para evitar duplicados ao executar este script
DELETE FROM blocks;

-- Insere o conteúdo da página 'Equipa'
WITH page AS (
  SELECT id FROM pages WHERE slug = 'equipa'
)
INSERT INTO blocks (page_id, order_index, block_type, title, content)
SELECT 
  id,
  1,
  'equipa-header',
  'Nossa Equipa',
  '<p>Especialistas dedicados a transformar desafios em oportunidades e aspirações em conquistas.</p>'
FROM page;

-- Insere o conteúdo da página 'Fundos' (Investimentos)
WITH page AS (
  SELECT id FROM pages WHERE slug = 'fundos'
)
INSERT INTO blocks (page_id, order_index, block_type, title, content)
SELECT 
  id,
  1,
  'fundos-header',
  'Nossos Fundos',
  '<p>Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.</p>'
FROM page;

-- Insere o bloco detalhado para o fundo 'Aquila Wheels'
WITH page AS (
  SELECT id FROM pages WHERE slug = 'fundos'
)
INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content)
SELECT 
  id,
  2,
  'fund-details-wheels',
  'Aquila Wheels',
  '<p>O Aquila Wheels é um fundo de investimento inovador que transforma a paixão por carros clássicos e icônicos em uma estratégia financeira sólida e rentável. Focado na aquisição e gestão de veículos de alto valor, o fundo aproveita a valorização histórica desse mercado, que na última década, valorizou impressionantes 193%.</p><p>A Aquila combina conhecimento de mercado, análise de dados e parcerias estratégicas globais para selecionar veículos com maior potencial de valorização. Além disso, o fundo é 100% elegível ao Golden Visa português, permitindo que investidores obtenham residência europeia por meio de um ativo tangível e exclusivo.</p>',
  '<ul><li>Ativo de prestígio — mercado projetado em US$ 51,3 bilhões/ano.</li><li>Portfólio seletivo — veículos raros, risco controlado.</li><li>Liquidez otimizada — avaliação semestral.</li><li>Marcas selecionadas — Porsche, Ferrari, Mercedes etc.</li></ul>'
FROM page;

-- Insere o bloco detalhado para o fundo 'Aquila Hotel Invest'
WITH page AS (
  SELECT id FROM pages WHERE slug = 'fundos'
)
INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content)
SELECT 
  id,
  3,
  'fund-details-hotel',
  'Aquila Hotel Invest',
  '<p>O Hotel Invest é um fundo de capital de risco que investe na gestão hoteleira de luxo em Portugal. Com foco em hotéis de luxo, o investimento busca alta rentabilidade e distribuição anual de dividendos isentos de impostos, alinhando-se ao sucesso do turismo português e oferecendo benefícios significativos aos investidores.</p><p>O fundo visa angariar 100 milhões de euros para investimento na empresa de gestão hoteleira Estoril 8023 SA, que atualmente gerencia 7 hotéis de luxo em Portugal, com o objetivo de expandir para 30 operações hoteleiras em 4 anos.</p>',
  '<ul><li>Turismo em ascensão — crescimento até 15% a.a.</li><li>Números recordes — projeção de 30 milhões de turistas até 2030.</li><li>Renda isenta de impostos — dividendos livres de tributação.</li><li>Alto potencial de retorno — retorno mínimo estimado de 50% ao final do 8º ano.</li></ul>'
FROM page;

-- Insere o bloco detalhado para o fundo 'Aquila Real Estate'
WITH page AS (
  SELECT id FROM pages WHERE slug = 'fundos'
)
INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content)
SELECT 
  id,
  4,
  'fund-details-realestate',
  'Aquila Real State',
  '<p>Com uma dimensão de €60 milhões, o Aquila Real Estate se especializa em ativos imobiliários localizados em áreas privilegiadas e/ou no mercado de residências de marca. Essa estrategia visa proporcionar retornos moderados ajustados ao risco, minimizando a exposição ao risco para nossos investidores.</p><p>O fundo aloca 60% do seu capital em propriedades que geram renda e valorização, com investimentos garantidos por ativos imobiliários. Além disso, até 40% do capital será investido no International Hospitality Fund.</p>',
  '<ul><li>Segurança patrimonial — garantias em ativos imobiliários.</li><li>Localização estratégica — áreas privilegiadas, alta liquidez.</li><li>Diversificação inteligente — até 40% no International Hospitality Fund.</li><li>Perfil de risco moderado — estabilidade e previsibilidade.</li></ul>'
FROM page;

-- Insere o bloco para o fundo 'Aquila Agro' (Em Breve)
WITH page AS (
  SELECT id FROM pages WHERE slug = 'fundos'
)
INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content)
SELECT 
  id,
  5,
  'fund-details-agro',
  'Aquila Agro',
  '<p>O setor agrícola em Portugal apresenta um potencial de crescimento robusto, impulsionado pela inovação tecnológica e pela crescente demanda global por produtos de alta qualidade. O Aquila Agro será estruturado para capitalizar sobre estas oportunidades, focando em projetos sustentáveis e de alto valor agregado.</p>',
  'Em Breve'
FROM page;
