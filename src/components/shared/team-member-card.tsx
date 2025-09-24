import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";

type TeamMemberCardProps = {
  member: TeamMember;
  isDark?: boolean;
};

export function TeamMemberCard({ member, isDark = false }: TeamMemberCardProps) {
  return (
    <Card className={cn(
      "flex flex-col h-full text-center transition-all duration-300 hover:scale-105 hover:shadow-xl",
      isDark && "bg-card/10 border-primary-foreground/20 text-primary-foreground"
    )}>
      <CardHeader className="items-center">
        <Image
          src={`${member.foto.src}?v=${member.foto.v}`}
          alt={member.nome}
          width={128}
          height={128}
          className={cn("rounded-full w-32 h-32 object-cover border-4", isDark ? "border-card/10" : "border-card")}
          data-ai-hint={member.dataAiHint}
        />
        <CardTitle className={cn("pt-4 font-headline text-2xl", isDark && "text-primary-foreground")}>{member.nome}</CardTitle>
        <p className={cn("text-sm font-medium", isDark ? "text-secondary" : "text-primary")}>{member.cargo}</p>
      </CardHeader>
      <CardContent 
        className={cn(
            "text-sm text-muted-foreground text-center",
            isDark && "text-primary-foreground/80"
        )} 
        dangerouslySetInnerHTML={{ __html: member.bioHtml }} />
    </Card>
  );
}
