import { Card } from "@/components/ui/card";

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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map(stat => (
                            <div key={stat.label}>
                                <p className="text-4xl font-bold text-highlight">{stat.value}</p>
                                <p className="text-sm uppercase tracking-wider text-muted-foreground mt-2">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
