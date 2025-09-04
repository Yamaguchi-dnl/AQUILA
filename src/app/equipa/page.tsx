
import { TeamMemberCard } from "@/components/shared/team-member-card";
import { teamData } from "@/lib/data";
import { getPageContentBySlug, findBlock } from "@/lib/data-loader";
import { AnimatedSection } from "@/components/shared/animated-section";

export const metadata = {
  title: "Nossa Equipa",
  description: "Conheça a equipe de liderança da Aquila Fund FCR, especialistas com vasta experiência no mercado financeiro global.",
};

export default async function EquipaPage() {
  const blocks = await getPageContentBySlug('equipa');
  const heroBlock = findBlock(blocks, 'equipa-hero');

  return (
    <>
      <section className="bg-background pt-32 md:pt-40">
        <div className="container">
           <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
                  <p className="text-sm uppercase tracking-widest text-muted-foreground font-headline">Conheça os nossos especialistas</p>
                  <h1 className="font-headline text-4xl md:text-5xl text-primary uppercase mt-2">{heroBlock?.title || "Nossa Equipa"}</h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                      {heroBlock?.content || "Especialistas dedicados a transformar desafios em oportunidades e aspirações em conquistas."}
                  </p>
              </div>
           </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamData.sort((a,b) => a.ordem - b.ordem).map((member) => (
                <TeamMemberCard key={member.nome} member={member} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
