
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '../shared/animated-section';
import Image from 'next/image';
import type { Block } from "@/lib/data-loader";

type Props = {
  block: Block | null;
}

export function Hero({ block }: Props) {
  const title = block?.title || 'Investimentos <br/> Inteligentes para o seu Futuro';
  
  return (
      <section id="hero" className="w-full h-screen relative flex items-center justify-center text-center -mt-[100vh]">
          <div className="container relative z-20">
              <AnimatedSection delay={0.5}>
                  <h1 
                    className="font-headline text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white uppercase"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
              </AnimatedSection>
          </div>
      </section>
  );
}
