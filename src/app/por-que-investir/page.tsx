import { AnimatedSection } from "@/components/shared/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import ParticlesContainer from "@/components/shared/particles-container";
import { Globe, ShieldCheck, TrendingUp, Handshake, Sun, Euro } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const metadata = {
  title: "Por que investir em Portugal?",
  description: "Descubra as vantagens de investir em Portugal: diversificação, segurança, e um caminho para a cidadania europeia.",
};

const benefits = [
    { 
        icon: Globe, 
        title: "Diversificação global",
        description: "Expanda seu portfólio, reduzindo riscos e buscando novas oportunidades de crescimento."
    },
    { 
        icon: Handshake, 
        title: "Passaporte europeu",
        description: "Obtenha residência e cidadania em Portugal, abrindo portas para a União Europeia e seus benefícios."
    },
    { 
        icon: ShieldCheck, 
        title: "Proteção patrimonial",
        description: "Garanta a segurança de seus ativos em um ambiente econômico e jurídico estável."
    },
    { 
        icon: Euro, 
        title: "Benefícios fiscais",
        description: "Aproveite incentivos fiscais e regimes especiais para investidores não residentes."
    },
    { 
        icon: TrendingUp, 
        title: "Mercado promissor",
        description: "Participe do crescimento de um dos mercados mais dinâmicos e atraentes da Europa."
    },
    { 
        icon: Sun,
        title: "Qualidade de vida",
        description: "Desfrute de um país com excelente infraestrutura, segurança e cultura rica."
    }
];

export default function PorQueInvestirPage() {
    const title = 'Por que investir<br/>em Portugal?';
    const subtitle = 'Está na hora de olhar para Portugal como a sua próxima grande oportunidade.';

  return (
    <>
       <section className="w-full h-[60vh] bg-primary text-primary-foreground relative flex items-center justify-center text-center overflow-hidden">
             <ParticlesContainer />
             <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"
            />
            <div className="container relative z-20">
                <AnimatedSection>
                    <p className="text-sm uppercase tracking-widest text-primary-foreground/80 font-headline">Oportunidades Globais</p>
                    <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase mt-2" dangerouslySetInnerHTML={{ __html: title }}></h1>
                    <p className="mt-4 text-lg text-primary-foreground/90 max-w-3xl mx-auto">{subtitle}</p>
                </AnimatedSection>
            </div>
        </section>
      
      <section className="bg-background text-foreground relative">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} delay={0.1 + index * 0.05} direction="up">
                <Card className="bg-card border text-card-foreground hover:border-primary transition-colors h-full">
                    <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                        <div className="flex-shrink-0 rounded-full bg-primary/10 text-primary p-4 w-fit mb-4">
                            <benefit.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-headline text-primary">{benefit.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                    </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}