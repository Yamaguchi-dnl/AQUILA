
import { AboutSummary } from '@/components/sections/about-summary';
import { FundsSummary } from '@/components/sections/funds-summary';
import { WhyPortugal } from '@/components/sections/why-portugal';
import { GoldenVisaSummary } from '@/components/sections/golden-visa-summary';
import { InvestmentCycle } from '@/components/sections/investment-cycle';
import { ContactSummary } from '@/components/sections/contact-summary';
import { Hero } from '@/components/sections/hero';
import { InvestmentStrategy } from '@/components/sections/investment-strategy';
import { getPageContentBySlug, findBlock } from '@/lib/data-loader';

export default async function Home() {
  const blocks = await getPageContentBySlug('home');
  
  const heroBlock = findBlock(blocks, 'hero');
  const aboutBlock = findBlock(blocks, 'about-summary');
  const fundsBlock = findBlock(blocks, 'funds-summary');
  const whyPortugalBlock = findBlock(blocks, 'why-portugal');
  const goldenVisaBlock = findBlock(blocks, 'golden-visa-summary');
  const investmentCycleBlock = findBlock(blocks, 'investment-cycle');
  const investmentStrategyBlock = findBlock(blocks, 'investment-strategy');
  const contactBlock = findBlock(blocks, 'contact-summary');

  return (
    <>
      <Hero block={heroBlock} />
      <AboutSummary block={aboutBlock} />
      <FundsSummary block={fundsBlock} />
      <WhyPortugal block={whyPortugalBlock} />
      <GoldenVisaSummary block={goldenVisaBlock} />
      <div className='relative bg-primary'>
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.15)_0%,_transparent_70%)]"
        />
        <InvestmentCycle block={investmentCycleBlock} />
        <InvestmentStrategy block={investmentStrategyBlock} />
        <ContactSummary block={contactBlock} />
      </div>
    </>
  );
}
