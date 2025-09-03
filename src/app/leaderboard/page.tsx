import LPGADashboard from '@/components/LPGADashboard';

export const metadata = {
  title: 'LPGA Leaderboard & Live Scoring | The Birdie Briefing',
  description: 'Live LPGA tournament tracking, real-time leaderboards, and comprehensive season analytics. Follow all 34 LPGA tournaments with live scoring updates.',
  keywords: 'LPGA, golf tournaments, live scoring, leaderboard, golf analytics, women golf, tournament schedule',
};

export default function LeaderboardPage() {
  return <LPGADashboard />;
}
