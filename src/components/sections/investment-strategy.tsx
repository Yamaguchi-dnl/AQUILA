import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, TrendingUp, Award } from "lucide-react";
import { AnimatedSection } from "../shared/animated-section";

const strategySteps = [
    {
        icon: Lightbulb,
        title: "Origem de negócios",
        description: "Nossa expertise e nossa vasta rede de relacionamentos nos permitem identificar mercados relevantes e oportunidades atraentes de investimentos."
    },
    {
        icon: Target,
        title: "Seleção e Due Diligence",
        description: "Realizamos uma análise rigorosa e rápida das perspectivas de aquisição para alcançar acordos de compra e venda vinculativos em tempo hábil."
    },
    {
        icon: TrendingUp,
        title: "Criação de valor",
        description: "Implementamos estratégias sólidas em cada subfundo para otimizar o valor dos ativos e potencializar o retorno dos investimentos."
    },
    {
        icon: Award,
        title: "Exit",
        description: "Possuímos habilidades comprovadas em transações e um histórico de múltiplas saídas bem-sucedidas, garantindo que o momento certo para a venda seja identificado e executado."
    }
];

export function InvestmentStrategy() {
  return (
    <section id="investment-strategy" className="bg-gradient-to-r from-[#121e34] to-[#22385e] text-primary-foreground rounded-t-3xl pb-48 shadow-md">
      <div className="container">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground font-bold">Estratégia de investimento: o caminho para o sucesso</h2>
          </div>
        </AnimatedSection>
        <div className="mt-24 flex items-center justify-center">
            <div className="strategy-cards-container">
                {strategySteps.map((step, index) => (
                    <div key={index} className="strategy-card rounded-bl-lg rounded-tr-lg p-0.5 hover:bg-gradient-to-r from-highlight to-highlight/80">
                        <div className="bg-card rounded-bl-lg rounded-tr-lg h-full p-6 flex flex-col justify-center text-center">
                            <step.icon className="h-10 w-10 text-primary mb-4 mx-auto" />
                            <h3 className="text-xl text-primary font-bold font-headline">{step.title}</h3>
                            <p className="text-muted-foreground mt-2 text-sm">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
