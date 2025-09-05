import type { Fund, TeamMember, FaqItem, NavItem } from './types';

export const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { 
    label: 'Sobre',
    subItems: [
      { href: '/sobre', label: 'Sobre Nós', description: 'Conheça nossa história e missão.' },
      { href: '/equipa', label: 'Nossa Equipa', description: 'Conheça os especialistas por trás da Aquila.' },
      { href: '/trabalhe-conosco', label: 'Trabalhe Conosco', description: 'Faça parte da nossa equipe de talentos.' },
    ]
  },
  { href: '/fundos', label: 'Investimentos' },
  { href: '/golden-visa', label: 'Golden Visa' },
  { href: '/contato', label: 'Contato' },
];

export const fundsData: Fund[] = [
  {
    slug: 'aquila-wheels',
    nome: 'Aquila Wheels',
    subtitulo: 'O Aquila Wheels é um fundo de investimento inovador que transforma a paixão por carros clássicos e icônicos em uma estratégia financeira sólida e rentável.',
    imagemResumo: 'https://ik.imagekit.io/leosmc2zb/1331.jpg?updatedAt=1756868086309',
    descricaoHtml: `<p>O Aquila Wheels é um fundo de investimento inovador que transforma a paixão por carros clássicos e icônicos em uma estratégia financeira sólida e rentável. Focado na aquisição e gestão de veículos de alto valor, o fundo aproveita a valorização histórica desse mercado, que na última década, valorizou impressionantes 193%.</p><p>A Aquila combina conhecimento de mercado, análise de dados e parcerias estratégicas globais para selecionar veículos com maior potencial de valorização. Além disso, o fundo é 100% elegível ao Golden Visa português, permitindo que investidores obtenham residência europeia por meio de um ativo tangível e exclusivo.</p>`,
    detalhes: {
      tipo: 'Fundo de capital de risco fechado',
      dimensao: '€20 milhões',
      prazo: '8 anos',
      investimentoInicial: '€100 mil',
      movimentacaoMinima: '€100 mil',
      retornoEsperado: '12% após fees',
      elegibilidadeGoldenVisa: true,
    },
    beneficios: [
      'Ativo de prestígio — mercado projetado em US$ 51,3 bilhões/ano.',
      'Portfólio seletivo — veículos raros, risco controlado.',
      'Liquidez otimizada — avaliação semestral.',
      'Marcas selecionadas — Porsche, Ferrari, Mercedes etc.',
    ],
    status: 'ativo',
  },
  {
    slug: 'aquila-hotel-invest',
    nome: 'Aquila Hotel Invest',
    subtitulo: 'O Aquila Hotel Invest é um fundo de capital de risco com investimento em empresas de gestão hoteleira, focado na aquisição e gestão de hotéis de luxo em Portugal.',
    imagemResumo: 'https://ik.imagekit.io/leosmc2zb/L08zbS8tME0zWnJTbS9TTzdTbk1qbm0vZlpGRFNuLVNOWkZaS01qYVM3U1pNbXhnejY2UXR6dGRrcg.webp',
    descricaoHtml: `<p>O Hotel Invest é um fundo de capital de risco que investe na gestão hoteleira de luxo em Portugal. Com foco em hotéis de luxo, o investimento busca alta rentabilidade e distribuição anual de dividendos isentos de impostos, alinhando-se ao sucesso do turismo português e oferecendo benefícios significativos aos investidores.</p><p>O fundo visa angariar 100 milhões de euros para investimento na empresa de gestão hoteleira Estoril 8023 SA, que atualmente gerencia 7 hotéis de luxo em Portugal, com o objetivo de expandir para 30 operações hoteleiras em 4 anos.</p>`,
    detalhes: {
      tipo: 'Fundo de capital de risco fechado',
      dimensao: '€100 milhões',
      prazo: '8 anos',
      investimentoInicial: '€100 mil',
      movimentacaoMinima: '€100 mil',
      retornoEsperado: 'mínimo de 10% ao ano',
      elegibilidadeGoldenVisa: true,
    },
    beneficios: [
      'Turismo em ascensão — crescimento até 15% a.a.',
      'Números recordes — projeção de 30 milhões de turistas até 2030.',
      'Renda isenta de impostos — dividendos livres de tributação.',
      'Alto potencial de retorno — retorno mínimo estimado de 50% ao final do 8º ano.',
    ],
    hoteis: [
      { nome: 'Valverde Lisboa Hotel & Garden', localizacao: 'Centro de Lisboa', imagem: { src: 'https://ik.imagekit.io/leosmc2zb/valverde-hotel-facade.jpg', v: 2 }, dataAiHint: 'luxury hotel facade' },
      { nome: 'Valverde Sintra Palácio de Seteais', localizacao: 'Sintra, Lisboa', imagem: { src: 'https://ik.imagekit.io/leosmc2zb/L08zbS8tME0zWnJTbS9TTzdTbk1qbm0vZlpGRFNuLVNOWkZaS01qYVM3U1pNbXhnejY2UXR6dGRrcg.webp?updatedAt=1756822978399', v: 2 }, dataAiHint: 'historic palace hotel' },
      { nome: 'Valverde Santar Hotel & SPA', localizacao: 'Santar, Viseu', imagem: { src: 'https://ik.imagekit.io/leosmc2zb/hotel-spa-valverde-santar.jpg', v: 2 }, dataAiHint: 'hotel spa interior' },
      { nome: 'Hotel Intercontinental Estoril', localizacao: 'Cascais', imagem: { src: 'https://ik.imagekit.io/leosmc2zb/IC-Cascais-Estoril.jpg', v: 3 }, dataAiHint: 'coastal hotel view' },
      { nome: 'Palácio Condes de Azevedo', localizacao: 'Centro do Porto', imagem: { src: 'https://ik.imagekit.io/leosmc2zb/62159451.jpg', v: 1 }, dataAiHint: 'historic hotel facade' },
    ],
    status: 'ativo',
  },
];

export const teamData: TeamMember[] = [
  {
    nome: 'Luís Assis Teixeira',
    cargo: 'CEO & Founder',
    bioHtml: '<p>Com mais de 20 anos de experiência no mercado financeiro, Luís é especialista em gestão de ativos e private equity. Liderou operações em bancos de investimento globais antes de fundar a Aquila para oferecer soluções de investimento mais alinhadas com as necessidades dos investidores de alta renda.</p>',
    foto: { src: 'https://ik.imagekit.io/leosmc2zb/Luis-Assis-Teixeira-251x300.jpg', v: 1 },
    dataAiHint: 'male executive portrait',
    ordem: 1,
  },
  {
    nome: 'Diana Bizzarro',
    cargo: 'Chief Investment Officer',
    bioHtml: '<p>Diana possui um profundo conhecimento em análise de risco e mercados de capitais. É responsável pela estratégia de alocação de ativos e pela seleção de oportunidades de investimento em todos os fundos da Aquila, garantindo um portfólio diversificado e de alta performance.</p>',
    foto: { src: 'https://picsum.photos/400/400?random=11', v: 1 },
    dataAiHint: 'female executive portrait',
    ordem: 2,
  },
  {
    nome: 'Pedro Mendes Leal',
    cargo: 'Head of Real Estate',
    bioHtml: '<p>Pedro lidera a divisão imobiliária, trazendo uma vasta experiência em desenvolvimento e gestão de ativos de grande escala em Portugal. Sua visão estratégica é fundamental para o sucesso do fundo Aquila Real Estate.</p>',
    foto: { src: 'https://ik.imagekit.io/leosmc2zb/Captura-de-Tela-2024-07-27-as-11.47.14-e1723138903909-300x300.png', v: 1 },
    dataAiHint: 'male professional smiling',
    ordem: 3,
  },
  {
    nome: 'Luiz Godinho Lopes',
    cargo: 'Head of Alternative Investments',
    bioHtml: '<p>Apaixonado por ativos não convencionais, Luiz é a força motriz por trás do Aquila Wheels. Sua expertise em mercados de nicho e bens de luxo permite à Aquila explorar novas fronteiras de rentabilidade.</p>',
    foto: { src: 'https://ik.imagekit.io/leosmc2zb/Captura-de-Tela-2024-07-27-as-11.47.20-e1723138867854-300x300.png', v: 1 },
    dataAiHint: 'male professional glasses',
    ordem: 4,
  },
  {
    nome: 'Michael Maxwell',
    cargo: 'Head of Hospitality',
    bioHtml: '<p>Michael tem uma carreira internacional em gestão hoteleira de luxo. Ele supervisiona o fundo Aquila Hotel Invest, focando na expansão do portfólio e na maximização do retorno através de uma gestão de excelência.</p>',
    foto: { src: 'https://ik.imagekit.io/leosmc2zb/Michael-Maxwell-251x300.jpg', v: 2 },
    dataAiHint: 'professional man suit',
    ordem: 5,
  },
  {
    nome: 'Tânia Marreiros Silva',
    cargo: 'Head of Legal & Compliance',
    bioHtml: '<p>Tânia garante que todas as operações da Aquila estejam em conformidade com as mais rigorosas regulamentações financeiras. Sua experiência jurídica é vital para a segurança e transparência dos investimentos.</p>',
    foto: { src: 'https://ik.imagekit.io/leosmc2zb/Tania-Marreiros-Silva-251x300.jpg', v: 1 },
    dataAiHint: 'female professional glasses',
    ordem: 6,
  },
];

export const goldenVisaFaqs: FaqItem[] = [
    {
      question: "Quais fundos da Aquila são elegíveis para o Golden Visa?",
      answer: "Atualmente, os fundos Aquila Wheels e Aquila Hotel Invest são 100% elegíveis para o programa Golden Visa de Portugal, permitindo que investidores obtenham residência europeia."
    },
    {
      question: "Qual é o valor mínimo de investimento para o Golden Visa através de fundos?",
      answer: "O investimento mínimo requerido pelo governo português para a aplicação ao Golden Visa através de fundos de investimento qualificados é de €500.000. No entanto, nossos fundos possuem um investimento inicial de €100.000, e podemos estruturar a aplicação para atender aos requisitos."
    },
    {
      question: "Quais são as principais vantagens do Golden Visa português?",
      answer: "Os benefícios incluem o direito de viver, trabalhar e estudar em Portugal, livre circulação no Espaço Schengen, a possibilidade de reagrupamento familiar e a elegibilidade para solicitar a cidadania portuguesa após 5 anos."
    },
    {
      question: "Preciso morar em Portugal para manter meu Golden Visa?",
      answer: "Não. O programa exige uma permanência mínima em Portugal de apenas 7 dias no primeiro ano e 14 dias nos subsequentes períodos de dois anos, tornando-o ideal para investidores que não desejam residir permanentemente no país."
    }
];
