
import SolucoesTailorMadeClient from "./solucoes-tailor-made-client";
import { AnimatedSection } from "@/components/shared/animated-section";
import ParticlesContainer from "@/components/shared/particles-container";

export const metadata = {
  title: "Soluções Tailor Made",
  description: "Conectamos investidores a ativos únicos em Portugal, com soluções de investimento personalizadas para o seu perfil e objetivos.",
};

export default async function SolucoesTailorMadePage() {
  const headerBlock = null;
  const contentBlock = null;

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
                    <p className="text-sm uppercase tracking-widest text-primary-foreground/80 font-headline">INVESTIMENTOS PERSONALIZADOS</p>
                    <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase mt-2">{headerBlock?.title || "Soluções Tailor Made"}</h1>
                </AnimatedSection>
            </div>
        </section>
      <SolucoesTailorMadeClient
        contentBlock={contentBlock}
      />
    </>
  );
}
