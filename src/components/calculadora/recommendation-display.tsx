"use client";

import { fundsData } from "@/lib/data";
import { FundCard } from "@/components/shared/fund-card";
import { Button } from "@/components/ui/button";

type RecommendationDisplayProps = {
  recommendation: {
    recommendations: {
      fundSlug: string;
      justification: string;
    }[];
  };
  onReset: () => void;
};

export function RecommendationDisplay({ recommendation, onReset }: RecommendationDisplayProps) {
  const recommendedSlugs = recommendation.recommendations.map(r => r.fundSlug);
  const recommendedFunds = fundsData.filter(fund => recommendedSlugs.includes(fund.slug));

  return (
    <div className="text-center">
      <h2 className="font-headline text-3xl text-primary font-bold">Sua Recomendação Personalizada</h2>
      <p className="mt-2 text-muted-foreground">Com base em suas respostas, estes são os fundos que mais se alinham ao seu perfil.</p>
      
      <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {recommendation.recommendations.map(rec => {
          const fund = fundsData.find(f => f.slug === rec.fundSlug);
          if (!fund) return null;
          return (
            <div key={rec.fundSlug}>
                <FundCard fund={fund} />
                <div className="mt-4 p-4 bg-background rounded-md text-sm text-center">
                    <p className="font-semibold text-foreground">Justificativa:</p>
                    <p className="text-muted-foreground">{rec.justification}</p>
                </div>
            </div>
          );
        })}
      </div>
      
      {recommendedFunds.length === 0 && (
         <div className="mt-8 p-8 bg-background rounded-lg text-center">
            <p className="text-muted-foreground">Não foi possível encontrar uma recomendação ideal com base nas suas respostas. Um de nossos especialistas pode ajudar a encontrar a melhor solução.</p>
        </div>
      )}

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild>
          <a href="/contato">Fale com um Especialista</a>
        </Button>
        <Button size="lg" variant="outline" onClick={onReset}>
          Refazer Análise
        </Button>
      </div>
    </div>
  );
}
