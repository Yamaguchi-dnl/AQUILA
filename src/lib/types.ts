export type Fund = {
  slug: string;
  nome: string;
  subtitulo: string;
  descricaoHtml: string;
  detalhes: {
    tipo: string;
    dimensao: string;
    prazo: string;
    investimentoInicial: string;
    movimentacaoMinima: string;
    retornoEsperado?: string;
    elegibilidadeGoldenVisa: boolean;
    parceria?: string;
  };
  beneficios: string[];
  hoteis?: {
    nome: string;
    localizacao: string;
    imagem: string;
    dataAiHint: string;
  }[];
  status: "ativo" | "em_breve";
};

export type TeamMember = {
  nome: string;
  cargo: string;
  bioHtml: string;
  foto: string;
  dataAiHint: string;
  ordem: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type NavSubItem = {
  href: string;
  label: string;
  description: string;
};

export type NavItem = {
  href?: string;
  label: string;
  subItems?: NavSubItem[];
};
