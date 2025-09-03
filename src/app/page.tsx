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
      <div className="hidden md:block -mt-20">
        <SectionLink topColor="hsl(var(--card))" bottomColor="hsl(var(--primary))" height={80} variant="quebrada" />
      </div>
      <AboutSummary />
      <FundsSummary />
      <WhyPortugal />
      <GoldenVisaSummary />
      <div className='relative bg-primary'>
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(30%_40%_at_95%_95%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),radial-gradient(30%_40%_at_5%_5%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]"
        />
        <InvestmentCycle />
        <InvestmentStrategy />
        <ContactSummary />
      </div>
    </>
  );
}
