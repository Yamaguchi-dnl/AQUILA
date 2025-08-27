import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TeamMember } from "@/lib/types";

type TeamMemberCardProps = {
  member: TeamMember;
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="flex flex-col h-full text-center">
      <CardHeader className="items-center">
        <Image
          src={member.foto}
          alt={member.nome}
          width={128}
          height={128}
          className="rounded-full w-32 h-32 object-cover border-4 border-card"
          data-ai-hint={member.dataAiHint}
        />
        <CardTitle className="pt-4 font-headline text-2xl">{member.nome}</CardTitle>
        <p className="text-sm font-medium text-primary">{member.cargo}</p>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground text-left" dangerouslySetInnerHTML={{ __html: member.bioHtml }} />
    </Card>
  );
}
