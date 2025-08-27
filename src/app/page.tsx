import { Hero } from '@/components/sections/hero';
import { AboutSummary } from '@/components/sections/about-summary';
import { FundsSummary } from '@/components/sections/funds-summary';
import { WhyPortugal } from '@/components/sections/why-portugal';
import { GoldenVisaSummary } from '@/components/sections/golden-visa-summary';
import { InvestmentCycle } from '@/components/sections/investment-cycle';
import { InvestmentStrategy } from '@/components/sections/investment-strategy';
import { ContactSummary } from '@/components/sections/contact-summary';
import { StatsCard } from '@/components/sections/stats-card';
import { AnimatedSection } from '@/components/shared/animated-section';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10">
        <StatsCard />
        <AnimatedSection>
          <AboutSummary />
        </AnimatedSection>
        <AnimatedSection>
          <FundsSummary />
        </AnimatedSection>
        <AnimatedSection>
          <WhyPortugal />
        </AnimatedSection>
        <AnimatedSection>
          <GoldenVisaSummary />
        </AnimatedSection>
        <AnimatedSection>
          <InvestmentCycle />
        </AnimatedSection>
        <AnimatedSection>
          <InvestmentStrategy />
        </AnimatedSection>
        <AnimatedSection>
          <ContactSummary />
        </AnimatedSection>
      </div>
    </>
  );
}
