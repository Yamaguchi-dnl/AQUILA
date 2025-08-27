import { PageHeader } from "@/components/shared/page-header";
import { TeamMemberCard } from "@/components/shared/team-member-card";
import { teamData } from "@/lib/data";

export const metadata = {
  title: "Nossa Equipa",
  description: "Conheça a equipe de liderança da Aquila Fund FCR, especialistas com vasta experiência no mercado financeiro global.",
};

export default function EquipaPage() {
  return (
    <>
      <PageHeader
        title="Nossa Equipa"
        subtitle="Especialistas dedicados a transformar desafios em oportunidades e aspirações em conquistas."
      />
      <section className="bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.sort((a,b) => a.ordem - b.ordem).map((member) => (
              <TeamMemberCard key={member.nome} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
