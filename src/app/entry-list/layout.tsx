import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entry List - The Birdie Briefing',
  description: 'Complete LPGA tournament entry list with player exemptions, entry status, and qualification details for major LPGA events.',
  openGraph: {
    title: 'Entry List - The Birdie Briefing',
    description: 'Complete LPGA tournament entry list with player exemptions, entry status, and qualification details for major LPGA events.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/entry-list`,
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
    title: 'Entry List - The Birdie Briefing',
    description: 'Complete LPGA tournament entry list with player exemptions, entry status, and qualification details for major LPGA events.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
  },
};

export default function EntryListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
