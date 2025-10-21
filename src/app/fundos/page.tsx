
import { fundsData } from "@/lib/data";
import FundosClient from "./fundos-client";

export const metadata = {
  title: "Fundos de Investimento",
  description: "Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa nos setores de carros clássicos, hotelaria e imobiliário.",
};

export default async function FundosPage() {
  // A página de fundos não depende de conteúdo dinâmico do CMS.
  // A chamada a getPageContentBySlug foi removida para evitar erros caso a página 'home' não exista.
  // O componente FundosClient já possui textos alternativos.
  return (
    <FundosClient
        headerBlock={null}
        allBlocks={[]}
        fundsData={fundsData}
    />
  );
}
