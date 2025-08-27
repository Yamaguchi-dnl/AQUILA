import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const stats = [
    { value: '€420M', label: 'Ativos sob gestão' },
    { value: '4', label: 'Fundos especializados' },
    { value: '12%', label: 'Retorno médio anual' },
    { value: '550+', label: 'Investidores' },
]

export function StatsCard() {
    return (
        <div className="relative z-20">
            <div className="container">
                <Card className="p-8 -mt-16 bg-card shadow-xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={stat.label} className="relative flex flex-col items-center justify-center">
                                {index > 0 && <Separator orientation="vertical" className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 hidden md:block" />}
                                <p className="text-sm uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                                <p className="text-4xl font-bold text-highlight mt-2">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
