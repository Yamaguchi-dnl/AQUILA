
"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

type AnimationDirection = 'up' | 'down' | 'left' | 'right';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
}

export function AnimatedSection({ children, className, delay = 0, direction = 'up' }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -75 : direction === 'right' ? 75 : 0,
      y: direction === 'up' ? 75 : direction === 'down' ? -75 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.9, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
