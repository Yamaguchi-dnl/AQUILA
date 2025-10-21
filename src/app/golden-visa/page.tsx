
import { getPageContentBySlug, findBlock } from "@/lib/data-loader";
import { fundsData } from "@/lib/data";
import { goldenVisaFaqs } from "@/lib/data";
import GoldenVisaClient from "./golden-visa-client";

export const metadata = {
  title: "Golden Visa Portugal",
  description: "Descubra como obter residência europeia através do programa Golden Visa de Portugal, investindo em nossos fundos elegíveis.",
};

const benefits = [
    "Direito de viver, trabalhar e estudar em Portugal",
    "Livre circulação no Espaço Schengen (27 países europeus)",
    "Reagrupamento familiar, estendendo os benefícios ao cônjuge, filhos e pais",
    "Acesso a sistemas de saúde e educação de alta qualidade",
    "Requisito de permanência mínima flexível (média de 7 dias por ano)",
    "Caminho para a cidadania portuguesa e passaporte europeu após 5 anos",
];

const processSteps = [
    { title: "Consulta Inicial", description: "Fale com nossos especialistas para avaliar seu perfil e objetivos." },
    { title: "Escolha do Fundo", description: "Selecione um de nossos fundos elegíveis, como o Aquila Wheels ou Hotel Invest." },
    { title: "Processo de Investimento", description: "Realize o investimento e obtenha a declaração necessária do gestor do fundo." },
    { title: "Aplicação ao Golden Visa", description: "Com o suporte de advogados parceiros, submeta sua aplicação online ao AIMA." },
    { title: "Biometria e Emissão", description: "Agende e compareça à sua entrevista biométrica para finalizar o processo e receber seu cartão de residência." },
];

export default async function GoldenVisaPage() {
    const eligibleFunds = fundsData.filter(f => f.detalhes.elegibilidadeGoldenVisa);
    // A chamada a getPageContentBySlug foi removida para evitar erros quando o slug não existe no CMS.
    // O componente GoldenVisaClient já possui textos alternativos para os blocos.
    const blocks: any[] = [];
    
    const headerBlock = findBlock(blocks, 'golden-visa-header');
    const benefitsBlock = findBlock(blocks, 'golden-visa-benefits');
    const processBlock = findBlock(blocks, 'golden-visa-process');
    const eligibleFundsBlock = findBlock(blocks, 'golden-visa-eligible-funds');
    const faqBlock = findBlock(blocks, 'golden-visa-faq');

    return (
        <GoldenVisaClient
            headerBlock={headerBlock}
            benefitsBlock={benefitsBlock}
            processBlock={processBlock}
            eligibleFundsBlock={eligibleFundsBlock}
            faqBlock={faqBlock}
            eligibleFunds={eligibleFunds}
            benefits={benefits}
            processSteps={processSteps}
            faqs={goldenVisaFaqs}
        />
    );
}
