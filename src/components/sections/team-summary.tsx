
import { teamData } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TeamSummaryProps = {
  isPage?: boolean;
}

export function TeamSummary({ isPage = false }: TeamSummaryProps) {
  const featuredTeam = teamData.slice(0, 4);
  const teamToShow = isPage ? teamData.sort((a,b) => a.ordem - b.ordem) : featuredTeam;

  return (
    <section id="equipa" className={cn(isPage ? "bg-background" : "bg-card")}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl text-primary uppercase">Liderança Experiente</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nossa equipe é composta por especialistas com décadas de experiência no mercado financeiro global, dedicados a maximizar o potencial dos seus investimentos.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {teamToShow.map((member) => (
            <div key={member.nome} className="flex flex-col items-center">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-card">
                <AvatarImage src={`${member.foto.src}?v=${member.foto.v}`} alt={member.nome} data-ai-hint={member.dataAiHint} className="object-cover" />
                <AvatarFallback>{member.nome.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 font-semibold text-lg text-foreground">{member.nome}</h3>
              <p className="text-sm text-muted-foreground">{member.cargo}</p>
            </div>
          ))}
        </div>
        
        {!isPage && (
            <div className="text-center mt-12">
                <Button asChild variant="default">
                    <Link href="/equipa">Conheça toda a equipe <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}
