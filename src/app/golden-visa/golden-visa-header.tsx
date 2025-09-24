
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimatedSection } from '@/components/shared/animated-section';

type GoldenVisaHeaderProps = {
  pretitle?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
};

export default function GoldenVisaHeader({ pretitle, title, subtitle, imageUrl }: GoldenVisaHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const backgroundSize = useTransform(scrollYProgress, [0, 1], ["100%", "150%"]);
  const filterBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(5px)"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-screen">
      <motion.div
        className="feature fixed top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: backgroundSize,
          filter: filterBlur,
          opacity: opacity,
        }}
      />
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-0 w-full h-full"
        style={{
             boxShadow: '0 -50px 20px -20px #232323 inset'
        }}
      />

      <div className="content relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <AnimatedSection>
              <div className="max-w-3xl mx-auto">
                  {pretitle && (
                      <p className="text-sm uppercase tracking-widest text-white/80 font-headline mb-2">
                          {pretitle}
                      </p>
                  )}
                  <h1 className="font-headline text-4xl md:text-5xl uppercase">
                  {title}
                  </h1>
                  {subtitle && (
                  <p className="mt-4 text-lg text-white/90">
                      {subtitle}
                  </p>
                  )}
              </div>
          </AnimatedSection>
      </div>
    </div>
  );
}
