import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CME Globe Rankings - The Birdie Briefing',
  description: 'Complete 2025 LPGA Tour CME Globe Rankings with points and event information.',
  openGraph: {
    title: 'CME Globe Rankings - The Birdie Briefing',
    description: 'Complete 2025 LPGA Tour CME Globe Rankings with points and event information.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/rankings/cme-globe`,
    siteName: 'The Birdie Briefing',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: 'The Birdie Briefing Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CME Globe Rankings - The Birdie Briefing',
    description: 'Complete 2025 LPGA Tour CME Globe Rankings with points and event information.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
  },
};

export default function CmeGlobeRankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
