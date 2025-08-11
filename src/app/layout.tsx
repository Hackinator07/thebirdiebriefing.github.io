import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import TranslationWidget from '@/components/TranslationWidget';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Birdie Briefing',
  description: 'Your premier source for LPGA women\'s golf news, tournament coverage, and exclusive content.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
        {/* <TranslationWidget /> */}
      </body>
    </html>
  );
}
