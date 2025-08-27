"use client";

import { useState, useEffect, useRef } from 'react';

type AnimatedStatProps = {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
};

export function AnimatedStat({ value, prefix = '', suffix = '', duration = 1500 }: AnimatedStatProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLParagraphElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
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
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [value, duration]);

    return (
        <p ref={ref} className="text-4xl font-bold text-highlight mt-2">
            {prefix}{count}{suffix}
        </p>
    );
}
