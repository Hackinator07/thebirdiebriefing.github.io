import { getSchedule } from '@/lib/schedule';

export const metadata = {
  title: 'LPGA Schedule - The Birdie Briefing',
  description: 'Complete 2025 LPGA Tour tournament schedule with dates, locations, and purse information.',
};

export default function SchedulePage() {
  const schedule = getSchedule();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-300 max-w-16 sm:max-w-32"></div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                LPGA Schedule 2025
              </h1>
              <div className="flex-1 h-px bg-gray-300 max-w-16 sm:max-w-32"></div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
            Last updated {new Date(schedule.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </section>

      {/* Schedule Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile Card Layout */}
          <div className="block lg:hidden space-y-4">
            {schedule.tournaments.map((tournament) => (
              <div key={tournament.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-sm font-medium text-gray-900">
                    {tournament.date}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {tournament.purse}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className={`font-medium text-base ${tournament.isMajor ? 'text-primary-600 font-bold' : ''} ${tournament.isExhibition ? 'italic text-gray-600' : ''}`}>
                    <a
                      href={tournament.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${tournament.isMajor ? 'text-secondary-500 hover:text-secondary-700' : 'text-primary-500 hover:text-primary-700'} hover:underline transition-colors`}
                    >
                      {tournament.title}
                    </a>
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    {tournament.location}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {tournament.isMajor && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      Major Championship
                    </div>
                  )}
                  {tournament.isExhibition && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Exhibition
                    </div>
                  )}
                  {tournament.isCancelled && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Cancelled
                    </div>
                  )}
                </div>

                <div className="text-sm">
                  <span className="text-gray-500">Winner: </span>
                  {tournament.winner && tournament.winner !== "N/A" ? (
                    <span className="font-medium text-gray-900">{tournament.winner}</span>
                  ) : tournament.winner === "N/A" ? (
                    <span className="text-gray-400">N/A</span>
                  ) : (
                    <span className="text-gray-400">TBD</span>
                  )}
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
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tournament
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Winner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purse
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedule.tournaments.map((tournament) => (
                    <tr key={tournament.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tournament.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          <div className={`font-medium ${tournament.isMajor ? 'text-primary-600 font-bold' : ''} ${tournament.isExhibition ? 'italic text-gray-600' : ''}`}>
                            <a
                              href={tournament.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${tournament.isMajor ? 'text-secondary-500 hover:text-secondary-700' : 'text-primary-500 hover:text-primary-700'} hover:underline transition-colors`}
                            >
                              {tournament.title}
                            </a>
                          </div>
                          <div className="text-gray-500 text-xs">
                            {tournament.location}
                          </div>
                          {tournament.isMajor && (
                            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              Major Championship
                            </div>
                          )}
                          {tournament.isExhibition && (
                            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Exhibition
                            </div>
                          )}
                          {tournament.isCancelled && (
                            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Cancelled
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tournament.winner && tournament.winner !== "N/A" ? (
                          <span className="font-medium text-gray-900">{tournament.winner}</span>
                        ) : tournament.winner === "N/A" ? (
                          <span className="text-gray-400">N/A</span>
                        ) : (
                          <span className="text-gray-400">TBD</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tournament.purse}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-500">
            <p className="mb-2">
              <span className="font-medium text-secondary-500">Major Championships</span> are highlighted in green
            </p>
            <p>
              Schedule information provided by the{' '}
              <a
                href="https://www.lpga.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600"
              >
                LPGA
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
