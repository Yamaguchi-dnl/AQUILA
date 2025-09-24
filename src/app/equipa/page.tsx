

import { TeamMemberCard } from "@/components/shared/team-member-card";
import { teamData } from "@/lib/data";
import { getPageContentBySlug, findBlock } from "@/lib/data-loader";
import { AnimatedSection } from "@/components/shared/animated-section";
import ParticlesContainer from "@/components/shared/particles-container";

export const metadata = {
  title: "Nossa Equipa",
  description: "Conheça a equipe de liderança da Aquila Fund FCR, especialistas com vasta experiência no mercado financeiro global.",
};

export default async function EquipaPage() {
  const blocks = await getPageContentBySlug('equipa');
  const heroBlock = findBlock(blocks, 'equipa-hero');

  return (
    <>
       <section className="w-full h-[60vh] bg-primary text-primary-foreground relative flex items-center justify-center text-center overflow-hidden">
             <ParticlesContainer />
             <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"
            />
            <div className="container relative z-20">
                <AnimatedSection>
                    <p className="text-sm uppercase tracking-widest text-primary-foreground/80 font-headline">Conheça os nossos especialistas</p>
                    <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase mt-2">{heroBlock?.title || "Nossa Equipa"}</h1>
                </AnimatedSection>
            </div>
        </section>
      <section className="bg-primary text-primary-foreground relative">
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.15)_0%,_transparent_70%)]"
        />
        <div className="container relative z-10">
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.sort((a,b) => a.ordem - b.ordem).map((member, index) => (
              <AnimatedSection key={member.nome} delay={0.1 + index * 0.05} direction="up">
                <TeamMemberCard member={member} isDark />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
