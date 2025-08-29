import { AboutSummary } from '@/components/sections/about-summary';
import { FundsSummary } from '@/components/sections/funds-summary';
import { WhyPortugal } from '@/components/sections/why-portugal';
import { GoldenVisaSummary } from '@/components/sections/golden-visa-summary';
import { InvestmentCycle } from '@/components/sections/investment-cycle';
import { ContactSummary } from '@/components/sections/contact-summary';
import { Hero } from '@/components/sections/hero';
import { InvestmentStrategy } from '@/components/sections/investment-strategy';
import { SectionDivider } from '@/components/shared/section-divider';

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
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
