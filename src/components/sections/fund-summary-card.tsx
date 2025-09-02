
import { Card, CardContent } from "@/components/ui/card";
import type { Fund } from "@/lib/types";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type FundSummaryCardProps = {
    fund: Fund;
};

export function FundSummaryCard({ fund }: FundSummaryCardProps) {
    return (
        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl border border-transparent hover:border-primary">
            <div className="relative overflow-hidden">
                <Image 
                    src={`https://picsum.photos/600/350?random=${fund.slug}`}
                    alt={`Imagem do fundo ${fund.nome}`}
                    width={600}
                    height={350}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="investment theme"
                />
                {fund.detalhes.elegibilidadeGoldenVisa && (
                    <Badge variant="destructive" className="absolute top-4 right-4 text-sm py-1 px-3">GOLDEN VISA</Badge>
                )}
            </div>
            <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline text-3xl text-primary uppercase">{fund.nome}</h3>
                
                <div className="flex gap-2 my-4">
                    {fund.detalhes.retornoEsperado && <Badge variant="outline" className="border-green-500 bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-300">{fund.detalhes.retornoEsperado}</Badge>}
                    {fund.detalhes.investimentoInicial && <Badge variant="outline" className="border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">{fund.detalhes.investimentoInicial}</Badge>}
                </div>

                <p className="text-muted-foreground flex-grow">{fund.subtitulo}</p>

                {fund.beneficios.length > 0 && (
                    <ul className="my-6 space-y-3">
                       {fund.beneficios.slice(0, 3).map((beneficio, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-muted-foreground">{beneficio}</span>
                            </li>
                       ))}
                    </ul>
                )}
                
                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <Button asChild size="lg">
                        <Link href={`/fundos#${fund.slug}`}>Saber Mais</Link>
                    </Button>
                     <Button asChild size="lg" variant="outline">
                        <Link href="/contato">Investir Agora</Link>
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
}
