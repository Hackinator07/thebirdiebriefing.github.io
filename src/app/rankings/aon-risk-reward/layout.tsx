import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AON Risk Reward Challenge - The Birdie Briefing',
  description: 'Complete 2025 LPGA Tour AON Risk Reward Challenge rankings with points and performance information.',
  openGraph: {
    title: 'AON Risk Reward Challenge - The Birdie Briefing',
    description: 'Complete 2025 LPGA Tour AON Risk Reward Challenge rankings with points and performance information.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/rankings/aon-risk-reward`,
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
    title: 'AON Risk Reward Challenge - The Birdie Briefing',
    description: 'Complete 2025 LPGA Tour AON Risk Reward Challenge rankings with points and performance information.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
  },
};

export default function AonRiskRewardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
