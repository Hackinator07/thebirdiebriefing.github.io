import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'United States Solheim Cup Team - The Birdie Briefing',
  description: 'Team USA\'s Solheim Cup squad is 12 LPGA players: a mix of automatic qualifiers, Rolex Rankings spots, and captain\'s picks.',
  openGraph: {
    title: 'United States Solheim Cup Team - The Birdie Briefing',
    description: 'Team USA\'s Solheim Cup squad is 12 LPGA players: a mix of automatic qualifiers, Rolex Rankings spots, and captain\'s picks.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/solheim-cup/united-states`,
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

export default function UnitedStatesSolheimCupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
