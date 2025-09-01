import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, TrendingUp, Award } from "lucide-react";
import { AnimatedSection } from "../shared/animated-section";

const strategySteps = [
    {
        icon: Lightbulb,
        title: "Origem de negócios",
        description: "Identificamos mercados e oportunidades de investimento através de nossa expertise e vasta rede de contatos."
    },
    {
        icon: Target,
        title: "Seleção e Due Diligence",
        description: "Análise rigorosa e ágil para garantir os melhores acordos de aquisição e venda."
    },
    {
        icon: TrendingUp,
        title: "Criação de valor",
        description: "Otimizamos o valor dos ativos com estratégias sólidas para potencializar o retorno de cada subfundo."
    },
    {
        icon: Award,
        title: "Exit",
        description: "Histórico de saídas bem-sucedidas, garantindo a execução no momento certo para maximizar o retorno."
    }
];

export function InvestmentStrategy() {
  return (
    <section id="investment-strategy" className="bg-primary text-primary-foreground pb-24">
      <div className="container">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.1] text-primary-foreground uppercase">Estratégia de investimento: o caminho para o sucesso</h2>
          </div>
        </AnimatedSection>
        <div className="mt-24 flex items-center justify-center">
            <div className="strategy-cards-container">
                {strategySteps.map((step, index) => (
                    <div key={index} className="strategy-card rounded-bl-lg rounded-tr-lg p-0.5 hover:bg-gradient-to-r from-highlight to-highlight/80">
                        <div className="bg-card/10 rounded-bl-lg rounded-tr-lg h-full p-6 flex flex-col justify-center text-center">
                            <step.icon className="h-10 w-10 text-primary-foreground mb-4 mx-auto" />
                            <h3 className="text-xl text-primary-foreground font-headline uppercase">{step.title}</h3>
                            <p className="text-primary-foreground/80 mt-2 text-sm">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
