
import { AboutSummary } from '@/components/sections/about-summary';
import { FundsSummary } from '@/components/sections/funds-summary';
import { WhyPortugal } from '@/components/sections/why-portugal';
import { GoldenVisaSummary } from '@/components/sections/golden-visa-summary';
import { InvestmentCycle } from '@/components/sections/investment-cycle';
import { ContactSummary } from '@/components/sections/contact-summary';
import { Hero } from '@/components/sections/hero';
import { InvestmentStrategy } from '@/components/sections/investment-strategy';
import { getPageContentBySlug, findBlock } from '@/lib/data-loader';
import Image from 'next/image';

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
  const imageUrl = heroBlock?.image_url || 'https://ik.imagekit.io/leosmc2zb/dest_portugal_porto_douro-river_gettyimages-698822614_universal_within-usage-period_46109.jpg?updatedAt=1758670295788';

  return (
    <div>
        <div className="sticky top-0 -z-10 h-screen w-full">
            <Image
                src={imageUrl}
                alt="Rio Douro, Porto, Portugal"
                fill
                className="object-cover"
                data-ai-hint="douru river porto"
                priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <Hero block={heroBlock} />
        <div className="relative z-10 bg-background">
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
        </div>
    </div>
  );
}
