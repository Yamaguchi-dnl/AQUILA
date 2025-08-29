import { AboutSummary } from '@/components/sections/about-summary';
import { FundsSummary } from '@/components/sections/funds-summary';
import { WhyPortugal } from '@/components/sections/why-portugal';
import { GoldenVisaSummary } from '@/components/sections/golden-visa-summary';
import { InvestmentCycle } from '@/components/sections/investment-cycle';
import { ContactSummary } from '@/components/sections/contact-summary';
import { Hero } from '@/components/sections/hero';
import { InvestmentStrategy } from '@/components/sections/investment-strategy';
import SectionLink from '@/components/shared/section-link';

export default function Home() {
  return (
    <>
      <Hero />
      <SectionLink topColor="hsl(var(--card))" bottomColor="hsl(var(--primary))" height={160} variant="quebrada" />
      <AboutSummary />
      <InvestmentStrategy />
      <FundsSummary />
      <WhyPortugal />
      <GoldenVisaSummary />
      <InvestmentCycle />
      <ContactSummary />
    </>
  );
}
