

import { TeamMemberCard } from "@/components/shared/team-member-card";
import { teamData } from "@/lib/data";
import { getPageContentBySlug, findBlock } from "@/lib/data-loader";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Nossa Equipa",
  description: "Conheça a equipe de liderança da Aquila Fund FCR, especialistas com vasta experiência no mercado financeiro global.",
};

export default async function EquipaPage() {
  const blocks = await getPageContentBySlug('equipa');
  const heroBlock = findBlock(blocks, 'equipa-hero');

  return (
    <>
      <PageHeader
        pretitle="Conheça os nossos especialistas"
        title={heroBlock?.title || "Nossa Equipa"}
        subtitle={heroBlock?.content || "Especialistas dedicados a transformar desafios em oportunidades e aspirações em conquistas."}
      />
      <section className="bg-background">
        <div className="container">
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.sort((a,b) => a.ordem - b.ordem).map((member, index) => (
              <AnimatedSection key={member.nome} delay={0.1 + index * 0.05} direction="up">
                <TeamMemberCard member={member} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
