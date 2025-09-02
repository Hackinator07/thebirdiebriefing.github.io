import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rolex World Rankings - The Birdie Briefing',
  description: 'Complete 2025 LPGA Tour Rolex World Rankings with player statistics and ranking changes.',
  openGraph: {
    title: 'Rolex World Rankings - The Birdie Briefing',
    description: 'Complete 2025 LPGA Tour Rolex World Rankings with player statistics and ranking changes.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/rankings`,
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
    title: 'Rolex World Rankings - The Birdie Briefing',
    description: 'Complete 2025 LPGA Tour Rolex World Rankings with player statistics and ranking changes.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
  },
};

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
