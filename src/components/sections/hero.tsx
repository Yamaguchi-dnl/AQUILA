
"use client";

import { AnimatedSection } from '../shared/animated-section';
import type { Block } from "@/lib/data-loader";

type Props = {
  block: Block | null;
}

export function Hero({ block }: Props) {
  // Hardcoding the title to allow for separate animations
  const titleLine1 = "Investimentos Inteligentes";
  const titleLine2 = "para o seu Futuro";
  
  return (
      <section id="hero" className="w-full h-screen relative flex items-center justify-center text-center -mt-[100vh]">
          <div className="container relative z-20 overflow-hidden">
              <h1 className="font-headline text-4xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white uppercase">
                <AnimatedSection delay={0.5} direction="left">
                    <span>{titleLine1}</span>
                </AnimatedSection>
                <AnimatedSection delay={0.5} direction="right">
                    <span className="block">{titleLine2}</span>
                </AnimatedSection>
              </h1>
          </div>
      </section>
  );
}
