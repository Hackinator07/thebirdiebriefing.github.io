import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TranslationWidget from '@/components/TranslationWidget';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Golf Girl Gazette - LPGA Women\'s Golf News',
  description: 'Your premier source for LPGA women\'s golf news, tournament coverage, and exclusive content. Celebrating the stories, achievements, and voices of women in golf.',
  keywords: 'LPGA, women golf, golf news, golf tournaments, golf events, golf podcasts',
  authors: [{ name: 'Golf Girl Gazette' }],
  creator: 'Golf Girl Gazette',
  publisher: 'Golf Girl Gazette',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://golfgirlgazette.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Golf Girl Gazette - LPGA Women\'s Golf News',
    description: 'Your premier source for LPGA women\'s golf news, tournament coverage, and exclusive content.',
    url: 'https://golfgirlgazette.com',
    siteName: 'Golf Girl Gazette',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Girl Gazette',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Girl Gazette - LPGA Women\'s Golf News',
    description: 'Your premier source for LPGA women\'s golf news, tournament coverage, and exclusive content.',
    images: ['/images/og-image.jpg'],
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
        <TranslationWidget />
      </body>
    </html>
  );
}
