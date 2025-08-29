import { getCmeGlobeRankings } from '@/lib/rankings';
import Link from 'next/link';

export const metadata = {
  title: 'CME Globe Rankings - The Birdie Briefing',
  description: 'Complete 2025 LPGA Tour CME Globe Rankings with points and event information.',
};

export default function CmeGlobeRankingsPage() {
  const rankings = getCmeGlobeRankings();
  
  // Sort players by rank (default sorting)
  const sortedPlayers = [...rankings.players].sort((a, b) => a.rank - b.rank);
  const topPlayers = sortedPlayers.slice(0, 60); // Show top 60

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-300 max-w-16 sm:max-w-32"></div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                CME Globe Rankings
              </h1>
              <div className="flex-1 h-px bg-gray-300 max-w-16 sm:max-w-32"></div>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-600 text-center">
            Updated {new Date(rankings.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} at {new Date(rankings.lastUpdated).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </p>
          
          {/* Rankings Navigation */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <Link
                href="/rankings"
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-md"
              >
                Rolex World
              </Link>
              <Link
                href="/rankings/cme-globe"
                className="px-4 py-2 text-sm font-medium text-secondary-600 bg-secondary-50 rounded-md"
              >
                CME Globe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rankings Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile Card Layout */}
          <div className="block lg:hidden space-y-3">
            {topPlayers.map((player) => (
              <div key={player.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-secondary-800">{player.rank}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{player.fullName}</div>
                      <div className="text-sm text-gray-500">{player.countryCode}</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wide">Points</div>
                    <div className="font-medium text-gray-900">{player.points.toFixed(3)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wide">Events</div>
                    <div className="font-medium text-gray-900">{player.events}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Events
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topPlayers.map((player) => (
                    <tr key={player.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {player.rank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {player.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.countryCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {player.points.toFixed(3)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.events}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-500">
            <p>
              Data provided by the{' '}
              <a
                href="https://ocs-lpga.com/tic/tmtic.cgi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600"
              >
                Tour Information Centre
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
