import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Search, ShieldCheck, DollarSign } from "lucide-react";

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
    <section id="investment-strategy" className="bg-primary text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground">Estratégia de investimento: o caminho para o sucesso</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strategySteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                    <div className="bg-primary-foreground text-primary p-4 rounded-full mb-4">
                        <step.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-headline text-xl text-primary-foreground">{step.title}</h3>
                    <p className="text-primary-foreground/80 mt-2">{step.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
