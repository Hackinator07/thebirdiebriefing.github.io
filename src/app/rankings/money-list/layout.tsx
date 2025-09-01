import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LPGA Money List - The Birdie Briefing',
  description: 'Complete 2025 LPGA Tour Money List with earnings and event information.',
};

export default function MoneyListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
