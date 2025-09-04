import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { Fund } from "@/lib/types";
import { InterestFormDialog } from "../forms/interest-form";

type FundCardProps = {
  fund: Fund;
};

export function FundCard({ fund }: FundCardProps) {
  const isComingSoon = fund.status === "em_breve";

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader>
        <div className="aspect-video relative mb-4">
             <Image 
                src={fund.imagemResumo || `https://picsum.photos/400/225?random=${fund.slug}`} 
                alt={fund.nome}
                fill
                className="object-cover rounded-t-lg"
                data-ai-hint="abstract investment"
            />
             {fund.detalhes.elegibilidadeGoldenVisa && (
                <Badge className="absolute top-2 right-2" variant="destructive">Golden Visa</Badge>
            )}
        </div>
        <CardTitle className="font-headline text-2xl">{fund.nome}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">{fund.subtitulo}</p>
      </CardContent>
      <CardFooter>
        {isComingSoon ? (
          <InterestFormDialog fundName={fund.nome} />
        ) : (
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/fundos#${fund.slug}`}>
              Saber Mais <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
