import { Hero } from '@/components/sections/hero';
import { AboutSummary } from '@/components/sections/about-summary';
import { FundsSummary } from '@/components/sections/funds-summary';
import { WhyPortugal } from '@/components/sections/why-portugal';
import { GoldenVisaSummary } from '@/components/sections/golden-visa-summary';
import { InvestmentCycle } from '@/components/sections/investment-cycle';
import { InvestmentStrategy } from '@/components/sections/investment-strategy';
import { ContactSummary } from '@/components/sections/contact-summary';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10">
        <AboutSummary />
        <FundsSummary />
        <WhyPortugal />
        <GoldenVisaSummary />
        <InvestmentCycle />
        <InvestmentStrategy />
        <ContactSummary />
      </div>
    </>
  );
}
