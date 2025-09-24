
import { getPageContentBySlug, findBlock } from "@/lib/data-loader";
import { fundsData } from "@/lib/data";
import FundosClient from "./fundos-client";

export const metadata = {
  title: "Fundos de Investimento",
  description: "Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa nos setores de carros clássicos, hotelaria e imobiliário.",
};

export default async function FundosPage() {
  const blocks = await getPageContentBySlug('fundos');
  const headerBlock = findBlock(blocks, 'fundos-header');

  return (
    <FundosClient
        headerBlock={headerBlock}
        allBlocks={blocks}
        fundsData={fundsData}
    />
  );
}
