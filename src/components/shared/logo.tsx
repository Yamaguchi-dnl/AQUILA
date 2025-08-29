import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type LogoProps = {
    className?: string;
}

export function Logo({ className }: LogoProps) {
  const logoUrl = "https://ik.imagekit.io/leosmc2zb/logo.png?updatedAt=1756308765013";
  
  return (
    <Link href="/" className={cn("transition-opacity hover:opacity-80", className)}>
      <Image 
        src={logoUrl}
        alt="Áquila Fund FCR Logo"
        width={140}
        height={32}
        priority
      />
    </Link>
  );
}
