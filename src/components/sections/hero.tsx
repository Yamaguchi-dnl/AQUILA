
"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { AnimatedSection } from '../shared/animated-section';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="w-full bg-card z-10 relative overflow-hidden pt-16">
       <div className="bg-animation">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        </div>
        <div className="container z-10 grid md:grid-cols-2 gap-8 items-center pt-16 pb-16">
        <div className="max-w-2xl order-last md:order-first">
            <AnimatedSection delay={0.1}>
                <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-foreground uppercase">
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
                    <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                        <Link href="/#fundos">
                            <PlayCircle className="mr-2" />
                            Ver Apresentação
                        </Link>
                    </Button>
                </div>
            </AnimatedSection>
        </div>
        <div className="order-first md:order-last flex justify-center">
            <div className="relative h-[500px] w-[400px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image 
                        src="https://ik.imagekit.io/leosmc2zb/3493.jpg?updatedAt=1756315204824"
                        alt="Paisagem de Lisboa, Portugal"
                        fill
                        className="rounded-3xl object-cover relative z-10"
                        data-ai-hint="lisbon portugal"
                        priority
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -50, y: -50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                >
                    <Image 
                        src="https://picsum.photos/180/160"
                        alt="Detalhe de investimento 1"
                        width={180}
                        height={160}
                        className="absolute -top-4 -left-16 rounded-2xl shadow-2xl object-cover z-30"
                        data-ai-hint="investment detail"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50, y: 50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                >
                    <Image 
                        src="https://ik.imagekit.io/leosmc2zb/60913.jpg"
                        alt="Detalhe de investimento"
                        width={180}
                        height={160}
                        className="absolute -bottom-4 -right-16 rounded-2xl shadow-2xl object-cover z-20"
                        data-ai-hint="investment chart"
                    />
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
