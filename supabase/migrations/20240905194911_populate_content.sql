-- supabase/migrations/YYYYMMDDHHMMSS_add_solucoes_page.sql

-- Adiciona a página "Soluções Tailor Made"
DO $$
DECLARE
    solucoes_page_id uuid;
BEGIN
    -- Inserir a página 'solucoes-tailor-made' se ela não existir
    INSERT INTO pages (id, slug, title, description)
    VALUES (gen_random_uuid(), 'solucoes-tailor-made', 'Soluções Tailor Made', 'Conectamos investidores a ativos únicos em Portugal, com soluções de investimento personalizadas para o seu perfil e objetivos.')
    ON CONFLICT (slug) DO NOTHING
    RETURNING id INTO solucoes_page_id;

    -- Se a página foi inserida (ou seja, o ID não é nulo), adiciona os blocos
    IF solucoes_page_id IS NOT NULL THEN
        -- Bloco de conteúdo principal para a página
        INSERT INTO blocks (page_id, order_index, block_type, title, content, sub_content) VALUES
        (
            solucoes_page_id,
            1,
            'solucoes-hero',
            'Soluções Tailor Made',
            'No mercado de investimentos, opções não faltam. Mas quando se trata de potencializar retornos com inteligência e exclusividade, é preciso ir além do comum.',
            '<ul><li>Aproveitar ativos exclusivos, fora do alcance do investidor tradicional.</li><li>Moldar sua estratégia de acordo com sua realidade.</li><li>Garantir que seu patrimônio esteja em sintonia com seus objetivos de longo prazo.</li><li>Acessar investimentos sólidos no mercado europeu, com benefícios únicos.</li></ul><p>Não se trata apenas de investir, mas de construir uma experiência personalizada, que coloca você no centro das decisões.</p>'
        );
    END IF;
END $$;
