import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type LogoProps = {
    className?: string;
    variant?: 'default' | 'white';
}

export function Logo({ className, variant = 'default' }: LogoProps) {
  const logos = {
    default: "https://ik.imagekit.io/leosmc2zb/logo.png?updatedAt=1756308765013",
    white: "https://ik.imagekit.io/leosmc2zb/logo%202.png"
  }
  return (
    <Link href="/" className={cn("transition-opacity hover:opacity-80", className)}>
      <Image 
        src={logos[variant]}
        alt="Áquila Fund FCR Logo"
        width={140}
        height={32}
        priority
      />
    </Link>
  );
}
