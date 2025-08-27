import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
    className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("font-headline text-xl md:text-2xl font-bold text-primary transition-colors hover:text-primary/80", className)}>
      Áquila Fund FCR
    </Link>
  );
}
