import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Latest News - The Birdie Briefing',
  description: 'Stay updated with the latest LPGA news, tournament coverage, and exclusive content from The Birdie Briefing.',
  openGraph: {
    title: 'Latest News - The Birdie Briefing',
    description: 'Stay updated with the latest LPGA news, tournament coverage, and exclusive content from The Birdie Briefing.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news`,
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
    title: 'Latest News - The Birdie Briefing',
    description: 'Stay updated with the latest LPGA news, tournament coverage, and exclusive content from The Birdie Briefing.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
