
import { Card } from "@/components/ui/card";
import type { Fund } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FundSummaryCardProps = {
    fund: Fund;
};

export function FundSummaryCard({ fund }: FundSummaryCardProps) {
    return (
        <Link href={`/fundos#${fund.slug}`} className="group block h-full">
            <Card className="overflow-hidden relative flex flex-col justify-end transition-all duration-300 border border-transparent hover:border-primary h-full min-h-[400px] md:min-h-[500px]">
                <Image 
                    src={fund.imagemResumo || `https://picsum.photos/600/350?random=${fund.slug}`}
                    alt={`Imagem do fundo ${fund.nome}`}
                    fill
                    className={cn(
                        "w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110",
                        fund.slug === 'aquila-real-estate' ? 'object-center' : 'object-bottom'
                    )}
                    data-ai-hint="investment theme"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Overlay com descrição que aparece no hover */}
                <div className="absolute inset-0 p-6 flex items-center justify-center text-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-primary-foreground/90 text-base">{fund.subtitulo}</p>
                </div>

                {/* Nome do fundo sempre visível */}
                <div className="relative p-6 transition-transform duration-300 group-hover:-translate-y-4">
                    <h3 className="font-headline text-3xl text-white uppercase">{fund.nome}</h3>
                </div>
            </Card>
        </Link>
    );
}
