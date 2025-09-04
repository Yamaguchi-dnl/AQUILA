import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/react';
import { DM_Sans, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontHeadline = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-headline',
  display: 'swap',
});


export const metadata: Metadata = {
  metadataBase: new URL('https://aquila-vantage-app.com'),
  title: {
    default: 'Aquila Fund FCR - Investimentos de Valor em Portugal',
    template: '%s | Aquila Fund FCR',
  },
  description: 'Plataforma de investimentos de alta renda focada em diversificação internacional, Golden Visa e proteção patrimonial em Portugal.',
  openGraph: {
    title: 'Aquila Fund FCR',
    description: 'Investimentos de Valor em Portugal',
    url: 'https://aquilafund.com', // placeholder
    siteName: 'Aquila Fund FCR',
    images: [
      {
        url: '/og-image.jpg', // placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head />
      <body className={cn("font-sans antialiased bg-background text-foreground", fontSans.variable, fontHeadline.variable)}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
