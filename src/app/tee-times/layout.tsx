import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tee Times - The Birdie Briefing',
  description: 'Complete LPGA tournament tee times for all rounds. Stay updated with player groupings and start times for major LPGA events.',
  openGraph: {
    title: 'Tee Times - The Birdie Briefing',
    description: 'Complete LPGA tournament tee times for all rounds. Stay updated with player groupings and start times for major LPGA events.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/tee-times`,
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
    title: 'Tee Times - The Birdie Briefing',
    description: 'Complete LPGA tournament tee times for all rounds. Stay updated with player groupings and start times for major LPGA events.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
  },
};

export default function TeeTimesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
