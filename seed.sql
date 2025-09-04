
-- Apaga os dados existentes para evitar duplicados
DELETE FROM blocks;
DELETE FROM pages;

-- Declaração de variáveis para os IDs das páginas
DO $$
DECLARE
    home_page_id uuid;
    sobre_page_id uuid;
BEGIN
    -- Inserir as páginas e obter os seus IDs
    INSERT INTO pages (slug, title, description) VALUES
    ('home', 'Página Inicial', 'Página principal do site Aquila Fund FCR.') RETURNING id INTO home_page_id;

    INSERT INTO pages (slug, title, description) VALUES
    ('sobre', 'Sobre Nós', 'Página com informações sobre a Aquila Fund FCR.') RETURNING id INTO sobre_page_id;

    -- Inserir os blocos de conteúdo para a PÁGINA INICIAL (HOME)
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
    (
        home_page_id,
        1,
        'about-summary',
        'Seu capital, nossa expertise',
        '<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>',
        'https://ik.imagekit.io/leosmc2zb/5573.jpg'
    );

    -- Inserir os blocos de conteúdo para a PÁGINA SOBRE
    INSERT INTO blocks (page_id, order_index, block_type, title, content, image_url) VALUES
    (
        sobre_page_id,
        1,
        'about-intro',
        'Sobre a Aquila Fund FCR',
        '<p>A Aquila Fund FCR nasceu há dois anos com a visão de ser uma <strong>plataforma de investimentos diferenciada</strong>, focada em oferecer <strong>soluções inovadoras para investidores de alta renda</strong>. Desde o início, temos nos dedicado a construir um legado de <strong>confiança, transparência e excelência</strong> no mercado financeiro português.</p><p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem <strong>valor real e sustentável</strong> para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.</p><p>Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos relacionamentos duradouros baseados na confiança e no compromisso com resultados.</p>',
        'https://ik.imagekit.io/leosmc2zb/5573.jpg'
    ),
    (
        sobre_page_id,
        2,
        'strategic-partner-fundbox',
        'FundBox',
        '<p>Nossos fundos são geridos pela FundBox, empresa de investimento independente líder em Portugal que gera ativamente cerca de €420 milhões em ativos sob gestão. A FundBox oferece estruturação e execução de transações de primeira classe, livre de qualquer agenda conflitante, e com envolvimento ativo de executivos senhores ao longo de todo o processo de investimento.</p>',
        null
    ),
    (
        sobre_page_id,
        3,
        'strategic-partner-btg',
        'BTG Pactual',
        '<p>Para facilitar o acesso aos nossos fundos, estabelecemos uma parceria exclusiva com o BTG Pactual. Nossos clientes podem investir mantendo seus ativos no Brasil como garantia, sem a necessidade de transferir capital para o exterior, ideal para quem busca diversificação internacional sem desmobilizar seus investimentos atuais.</p>',
        null
    );

END $$;
