import { getPageContentBySlug, findBlock } from "@/lib/data-loader";
import SolucoesTailorMadeClient from "./solucoes-tailor-made-client";

export const metadata = {
  title: "Soluções Tailor Made",
  description: "Conectamos investidores a ativos únicos em Portugal, com soluções de investimento personalizadas para o seu perfil e objetivos.",
};

export default async function SolucoesTailorMadePage() {
  const blocks = await getPageContentBySlug('solucoes-tailor-made');
  const headerBlock = findBlock(blocks, 'solucoes-header');
  const contentBlock = findBlock(blocks, 'solucoes-content');

  return (
    <SolucoesTailorMadeClient
      headerBlock={headerBlock}
      contentBlock={contentBlock}
    />
  );
}
