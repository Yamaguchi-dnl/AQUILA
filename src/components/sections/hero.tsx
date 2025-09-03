
"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { AnimatedSection } from '../shared/animated-section';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="w-full bg-card relative overflow-hidden pt-16">
       <div className="bg-animation z-0">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        </div>
        <div className="container relative z-10 grid md:grid-cols-2 gap-8 items-center pt-16 pb-16">
        <div className="max-w-2xl order-last md:order-first">
             <AnimatedSection>
                 <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-headline">
                    Aquila Fund FCR
                  </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
                <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-foreground uppercase mt-4">
                    Investimentos <span className="text-primary">Inteligentes</span> <span className="block">para o seu Futuro</span>
                </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
                <p className="mt-6 text-lg text-muted-foreground">
                Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.
                </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href="/contato">Começar Investimento <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
            </AnimatedSection>
        </div>
        <div className="flex justify-center items-center order-first md:order-last">
             <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                className="relative h-[300px] w-[250px] md:h-[500px] md:w-[400px]"
             >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                    className="relative w-full h-full z-10"
                >
                    <Image 
                        src="https://ik.imagekit.io/leosmc2zb/3493.jpg?updatedAt=1756315204824"
                        alt="Paisagem de Lisboa, Portugal"
                        fill
                        className="rounded-3xl object-cover"
                        data-ai-hint="lisbon portugal"
                        priority
                    />
                </motion.div>
                <motion.div
                     initial={{ opacity: 0, scale: 0.8, y: -20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                     className="absolute -top-4 -left-12 md:-left-16 z-30"
                >
                    <Image 
                        src="https://ik.imagekit.io/leosmc2zb/beautiful-shot-portuguese-flag-waving-calm-bright-sky.jpg"
                        alt="Bandeira de Portugal"
                        width={180}
                        height={160}
                        className="w-[100px] h-auto md:w-[180px] md:h-[160px] rounded-2xl shadow-2xl object-cover"
                        data-ai-hint="portugal flag"
                    />
                </motion.div>
                <motion.div
                     initial={{ opacity: 0, scale: 0.8, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
                     className="absolute -bottom-4 -right-12 md:-right-16 z-20"
                >
                     <Image 
                        src="https://ik.imagekit.io/leosmc2zb/60913.jpg"
                        alt="Detalhe de investimento"
                        width={180}
                        height={160}
                        className="w-[100px] h-auto md:w-[180px] md:h-[160px] rounded-2xl shadow-2xl object-cover"
                        data-ai-hint="investment chart"
                    />
                </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
