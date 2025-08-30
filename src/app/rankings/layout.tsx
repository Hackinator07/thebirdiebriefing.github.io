import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rolex World Rankings - The Birdie Briefing',
  description: 'Complete 2025 LPGA Tour Rolex World Rankings with player statistics and ranking changes.',
};

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
