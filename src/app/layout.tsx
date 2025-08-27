import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
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
