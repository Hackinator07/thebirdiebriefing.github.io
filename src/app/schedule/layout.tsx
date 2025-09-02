import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LPGA Schedule - The Birdie Briefing',
  description: 'Complete 2025 LPGA Tour tournament schedule with dates, locations, and purse information.',
  openGraph: {
    title: 'LPGA Schedule - The Birdie Briefing',
    description: 'Complete 2025 LPGA Tour tournament schedule with dates, locations, and purse information.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/schedule`,
    siteName: 'The Birdie Briefing',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`,
        width: 1200,
        height: '630',
        alt: 'The Birdie Briefing Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
    },
  twitter: {
    card: 'summary_large_image',
    title: 'LPGA Schedule - The Birdie Briefing',
    description: 'Complete 2025 LPGA Tour tournament schedule with dates, locations, and purse information.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
