import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LPGA Schedule - The Birdie Briefing',
  description: 'Complete 2025 LPGA Tour tournament schedule with dates, locations, and purse information.',
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
