import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, ShieldCheck, TrendingUp, Handshake, Sun, Euro } from "lucide-react";
import { AnimatedSection } from "../shared/animated-section";

const benefits = [
    { 
        icon: Globe, 
        title: "Diversificação global",
        description: "Expanda seu portfólio, reduzindo riscos e buscando novas oportunidades de crescimento."
    },
    { 
        icon: ShieldCheck, 
        title: "Proteção patrimonial",
        description: "Garanta a segurança de seus ativos em um ambiente econômico e jurídico estável."
    },
    { 
        icon: TrendingUp, 
        title: "Mercado promissor",
        description: "Participe do crescimento de um dos mercados mais dinâmicos e atraentes da Europa."
    },
    { 
        icon: Handshake, 
        title: "Passaporte europeu",
        description: "Obtenha residência e cidadania em Portugal, abrindo portas para a União Europeia e seus benefícios."
    },
    { 
        icon: Euro, 
        title: "Benefícios fiscais",
        description: "Aproveite incentivos fiscais e regimes especiais para investidores não residentes."
    },
    { 
        icon: Sun, 
        title: "Qualidade de vida",
        description: "Desfrute de um país com excelente infraestrutura, segurança e cultura rica."
    }
];

export function WhyPortugal() {
  return (
    <section id="why-portugal" className="bg-gradient-to-r from-[#121e34] to-[#22385e] text-primary-foreground">
      <div className="container">
        <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground">Por que investir em Portugal?</h2>
        </div>
        </AnimatedSection>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                <Card className="bg-transparent border-primary-foreground/20 text-primary-foreground shadow-none hover:bg-primary-foreground/5 transition-colors duration-300 h-full">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="bg-primary-foreground/10 text-primary-foreground p-3 rounded-full">
                            <benefit.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="font-headline text-xl font-bold text-primary-foreground">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-primary-foreground/80">{benefit.description}</p>
                    </CardContent>
                </Card>
                </AnimatedSection>
            ))}
        </div>
      </div>
    </section>
  );
}
