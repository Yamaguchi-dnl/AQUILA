import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Search, ShieldCheck, DollarSign } from "lucide-react";
import { AnimatedSection } from "../shared/animated-section";

const strategySteps = [
    {
        icon: Zap,
        title: "Origem de negócios",
        description: "Nossa expertise e nossa vasta rede de relacionamentos nos permitem identificar mercados relevantes e oportunidades atraentes de investimentos."
    },
    {
        icon: Search,
        title: "Seleção e Due Diligence",
        description: "Realizamos uma análise rigorosa e rápida das perspectivas de aquisição para alcançar acordos de compra e venda vinculativos em tempo hábil."
    },
    {
        icon: ShieldCheck,
        title: "Criação de valor",
        description: "Implementamos estratégias sólidas em cada subfundo para otimizar o valor dos ativos e potencializar o retorno dos investimentos."
    },
    {
        icon: DollarSign,
        title: "Exit",
        description: "Possuímos habilidades comprovadas em transações e um histórico de múltiplas saídas bem-sucedidas, garantindo que o momento certo para a venda seja identificado e executado."
    }
];

export function InvestmentStrategy() {
  return (
    <section id="investment-strategy" className="bg-primary text-primary-foreground rounded-t-3xl pb-48 shadow-md">
      <div className="container">
        <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground font-bold">Estratégia de investimento: o caminho para o sucesso</h2>
        </div>
        </AnimatedSection>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strategySteps.map((step, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="bg-transparent border-0 shadow-none text-center">
                    <CardHeader className="items-center">
                        <div className="bg-primary-foreground text-primary p-4 rounded-full mb-2">
                            <step.icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-xl text-primary-foreground font-bold">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-primary-foreground/80">{step.description}</p>
                    </CardContent>
                </Card>
                </AnimatedSection>
            ))}
        </div>
      </div>
    </section>
  );
}
