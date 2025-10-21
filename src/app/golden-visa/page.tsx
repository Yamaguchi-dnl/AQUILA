
import { fundsData } from "@/lib/data";
import { goldenVisaFaqs } from "@/lib/data";
import GoldenVisaClient from "./golden-visa-client";

export const metadata = {
  title: "Golden Visa Portugal",
  description: "Descubra como obter residência europeia através do programa Golden Visa de Portugal, investindo em nossos fundos elegíveis.",
};

const benefits = [
    "Liberdade de residência: Direito de residir, estudar e trabalhar em Portugal para você e toda a sua família.",
    "Acesso à Europa: Entrada livre em Portugal e em todo o Espaço Schengen, composto por 27 países europeus, sem a necessidade de visto.",
    "Caminho para a cidadania: Possibilidade de solicitar a Residência Permanente e a nacionalidade portuguesa após 5 anos.",
    "Vantagens fiscais: Os titulares do Golden Visa não têm qualquer impacto fiscal a nível pessoal em Portugal, tornando-o ainda mais atrativo."
];

const processSteps = [
    { title: "Investimento inicial", description: "Subscrição de €500.000 em fundos portugueses elegíveis e realização do processo KYC para validação do investidor." },
    { title: "Candidatura online", description: "Envio da solicitação pela plataforma oficial, com pagamento da taxa administrativa." },
    { title: "Pré-aprovação", description: "Análise do pedido pelo Immigration Office e verificação do cumprimento dos requisitos do Golden Visa." },
    { title: "Coleta biométrica", description: "Comparecimento de investidores e familiares ao serviço de imigração para registro dos dados biométricos." },
    { title: "Aprovação final", description: "Revisão da documentação original, aprovação e pagamento das taxas de residência e entrega." },
];

export default async function GoldenVisaPage() {
    const eligibleFunds = fundsData.filter(f => f.detalhes.elegibilidadeGoldenVisa);
    
    const headerBlock = null;
    const benefitsBlock = null;
    const processBlock = null;
    const eligibleFundsBlock = null;
    const faqBlock = null;

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
