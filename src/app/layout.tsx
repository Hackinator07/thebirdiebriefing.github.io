import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import LayoutClient from '@/components/LayoutClient';
import Analytics from '@/components/Analytics';
import TranslationWidget from '@/components/TranslationWidget';
import StructuredData from '@/components/StructuredData';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  preload: true,
  fallback: ['serif'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'The Birdie Briefing - LPGA Podcast, News, and Rankings',
  description: 'Your premier source for LPGA women\'s golf news, tournament coverage, exclusive content, and comprehensive rankings. Listen to our podcast for behind-the-scenes stories from the LPGA Tour.',
  keywords: 'LPGA, women golf, golf podcast, LPGA news, golf rankings, women golf tournament, LPGA coverage, golf media',
  authors: [{ name: 'Marie Hack' }],
  creator: 'The Birdie Briefing',
  publisher: 'The Birdie Briefing',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'The Birdie Briefing - LPGA Podcast, News, and Rankings',
    description: 'Your premier source for LPGA women\'s golf news, tournament coverage, exclusive content, and comprehensive rankings.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}`,
    siteName: 'The Birdie Briefing',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'The Birdie Briefing Logo',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Birdie Briefing - LPGA Podcast, News, and Rankings',
    description: 'Your premier source for LPGA women\'s golf news, tournament coverage, exclusive content, and comprehensive rankings.',
    images: ['/images/logo.png'],
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
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code if you have one
  },
  other: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${poppins.variable}`}>
      <head>
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; media-src 'self' https:; connect-src 'self' https://www.google-analytics.com https://vercel.live; frame-src 'self' https://open.spotify.com; object-src 'none'; base-uri 'self'; form-action 'self';" />
        <StructuredData />
      </head>
      <body className="min-h-screen bg-white">
        <LayoutClient>{children}</LayoutClient>
        <Analytics />
        <TranslationWidget />
      </body>
    </html>
  );
}
