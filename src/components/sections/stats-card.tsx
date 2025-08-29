"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedStat } from "@/components/shared/animated-stat";

const stats = [
    { value: 420, label: 'Ativos sob gestão', suffix: 'M', prefix: '€' },
    { value: 4, label: 'Fundos especializados' },
    { value: 12, label: 'Retorno médio anual', suffix: '%' },
    { value: 550, label: 'Investidores', suffix: '+' },
];

export function StatsCard() {
    return (
        <div className="relative z-20">
            <div className="">
                <Card className="p-8 bg-card/10 backdrop-blur-md border-primary-foreground/20 shadow-xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={stat.label} className="relative flex flex-col items-center justify-center">
                                {index > 0 && <Separator orientation="vertical" className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 hidden md:block bg-primary-foreground/20" />}
                                <p className="text-sm uppercase tracking-wider text-primary-foreground/80">{stat.label}</p>
                                <AnimatedStat value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
