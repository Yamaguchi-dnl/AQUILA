
"use client";

import { AnimatedSection } from '../shared/animated-section';
import type { Block } from "@/lib/data-loader";
import { Button } from '../ui/button';
import Link from 'next/link';

type Props = {
  block: Block | null;
}

export function Hero({ block }: Props) {
  // Hardcoding the title to allow for separate animations
  const titleLine1 = "Proteja seu futuro financeiro";
  const titleLine2 = "antes que seja tarde demais";
  
  return (
      <section id="hero" className="w-full h-screen relative flex items-center justify-center text-center -mt-[100vh]">
          <div className="container relative z-20 overflow-hidden">
                <AnimatedSection>
                    <p className="text-lg uppercase tracking-widest text-primary-foreground/80 font-headline">AQUILA FUND FCR</p>
                </AnimatedSection>
              <h1 className="font-headline text-4xl sm:text-6xl tracking-tight text-white uppercase mt-4">
                <AnimatedSection delay={0.2} direction="left">
                    <span>{titleLine1}</span>
                </AnimatedSection>
                <AnimatedSection delay={0.2} direction="right">
                    <span className="block">{titleLine2}</span>
                </AnimatedSection>
              </h1>
              <AnimatedSection delay={0.4} direction="up">
                <Button asChild size="lg" variant="secondary" className="mt-8">
                  <Link href="/contato">AGENDE UMA CONVERSA!</Link>
                </Button>
              </AnimatedSection>
          </div>
      </section>
  );
}
