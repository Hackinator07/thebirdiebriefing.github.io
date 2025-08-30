import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CME Globe Rankings - The Birdie Briefing',
  description: 'Complete 2025 LPGA Tour CME Globe Rankings with points and event information.',
};

export default function CmeGlobeRankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
