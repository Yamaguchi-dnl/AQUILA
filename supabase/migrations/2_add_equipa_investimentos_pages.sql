-- Adicionar a página "Nossa Equipa"
INSERT INTO public.pages (slug, title, description)
VALUES ('equipa', 'Nossa Equipa', 'Página que apresenta a equipa da Aquila Fund FCR.')
ON CONFLICT (slug) DO NOTHING;

-- Adicionar a página "Investimentos" (que corresponde a /fundos)
INSERT INTO public.pages (slug, title, description)
VALUES ('fundos', 'Investimentos', 'Página que detalha os fundos de investimento da Aquila Fund FCR.')
ON CONFLICT (slug) DO NOTHING;
