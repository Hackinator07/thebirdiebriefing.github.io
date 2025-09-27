import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Europe Solheim Cup Team - The Birdie Briefing',
  description: 'Team Europe\'s Solheim Cup squad has 12 players: two from the LET points list, six from the Rolex Rankings, and four chosen as captain\'s picks.',
  openGraph: {
    title: 'Europe Solheim Cup Team - The Birdie Briefing',
    description: 'Team Europe\'s Solheim Cup squad has 12 players: two from the LET points list, six from the Rolex Rankings, and four chosen as captain\'s picks.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/solheim-cup/europe`,
    siteName: 'The Birdie Briefing',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/tournaments/solheim-cup-2026-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Solheim Cup 2026 Logo - Bernardus Golf, Netherlands',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function EuropeSolheimCupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
