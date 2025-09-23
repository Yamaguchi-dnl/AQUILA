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
  const title = block?.title || 'Investimentos <span class="text-white">Inteligentes</span> <span class="block">para o seu Futuro</span>';
  const imageUrl = block?.image_url || 'https://ik.imagekit.io/leosmc2zb/timonero-bg.jpg';
  
  return (
    <section className="w-full h-[70vh] md:h-screen bg-primary text-primary-foreground relative flex items-center justify-center text-center">
        <Image
            src={imageUrl}
            alt="Oceano escuro"
            fill
            className="object-cover z-0"
            data-ai-hint="dark ocean"
            priority
        />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="container relative z-20">
            <AnimatedSection>
                <h1 
                  className="font-headline text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white uppercase"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
            </AnimatedSection>
        </div>
    </section>
  );
}
