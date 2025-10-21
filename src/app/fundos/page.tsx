
import { getPageContentBySlug, findBlock } from "@/lib/data-loader";
import { fundsData } from "@/lib/data";
import FundosClient from "./fundos-client";

export const metadata = {
  title: "Fundos de Investimento",
  description: "Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa nos setores de carros clássicos, hotelaria e imobiliário.",
};

export default async function FundosPage() {
  // A página 'fundos' não existe no CMS, esta chamada causa o erro.
  // No entanto, as descrições de cada fundo vêm de lá.
  // Vamos carregar os blocos da página 'home' temporariamente, que é onde estão
  const blocks = await getPageContentBySlug('home');
  const headerBlock = findBlock(blocks, 'fundos-header');

  return (
    <FundosClient
        headerBlock={headerBlock}
        allBlocks={blocks}
        fundsData={fundsData}
    />
  );
}
