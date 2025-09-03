"use client";

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

type AnimatedStatProps = {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
};

export function AnimatedStat({ value, prefix = '', suffix = '', duration = 1500 }: AnimatedStatProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLParagraphElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const startTime = performance.now();

            const animateCount = (timestamp: number) => {
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                const current = Math.floor(end * percentage);
                
                setCount(current);

                if (progress < duration) {
                    requestAnimationFrame(animateCount);
                } else {
                    setCount(end);
                }
            };

            requestAnimationFrame(animateCount);
        }
    }, [isInView, value, duration]);

    return (
        <p ref={ref} className="text-4xl font-bold text-primary-foreground mt-2">
            {prefix}{count}{suffix}
        </p>
    );
}
