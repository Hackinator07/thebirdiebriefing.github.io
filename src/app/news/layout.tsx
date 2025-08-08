import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Latest News - The Birdie Briefing',
  description: 'Stay updated with the latest LPGA news, tournament coverage, and exclusive content from The Birdie Briefing.',
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
