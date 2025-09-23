
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
  const imageUrl = block?.image_url || 'https://ik.imagekit.io/leosmc2zb/dest_portugal_porto_douro-river_gettyimages-698822614_universal_within-usage-period_46109.jpg?updatedAt=1758670295788';
  
  return (
    <section id="hero" className="w-full h-screen bg-primary text-primary-foreground relative flex items-center justify-center text-center">
        <Image
            src={imageUrl}
            alt="Rio Douro, Porto, Portugal"
            fill
            className="object-cover z-0"
            data-ai-hint="douru river porto"
            priority
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
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
