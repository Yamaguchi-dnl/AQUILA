import { Hero } from '@/components/sections/hero';
import { AboutSummary } from '@/components/sections/about-summary';
import { FundsSummary } from '@/components/sections/funds-summary';
import { GoldenVisaSummary } from '@/components/sections/golden-visa-summary';
import { CalculatorCta } from '@/components/sections/calculator-cta';
import { TeamSummary } from '@/components/sections/team-summary';
import { ContactSummary } from '@/components/sections/contact-summary';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <FundsSummary />
      <GoldenVisaSummary />
      <CalculatorCta />
      <TeamSummary />
      <ContactSummary />
    </>
  );
}
