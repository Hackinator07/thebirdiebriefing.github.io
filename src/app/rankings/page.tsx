import { getRankings } from '@/lib/data';

export const metadata = {
  title: 'LPGA Rankings - Golf Girl Gazette',
  description: 'Stay updated with the latest LPGA rankings including Rolex World Ranking, Race to CME Globe, LPGA Money List, Race for the Card, and Epson Money List.',
};

export default function RankingsPage() {
  const rankings = getRankings();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              LPGA Rankings
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
              Stay updated with the latest rankings across all major LPGA competitions
            </p>
          </div>
        </div>
      </section>

      {/* Rankings Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Rolex World Ranking */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Rolex World Ranking</h2>
                <p className="text-gray-600">Official world rankings for women's professional golf</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {rankings.rolexWorldRanking.slice(0, 10).map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-gray-900 w-8">{index + 1}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{player.name}</p>
                          <p className="text-sm text-gray-600">{player.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{player.points}</p>
                        <p className="text-sm text-gray-600">{player.events} events</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                    View Full Rankings →
                  </a>
                </div>
              </div>
            </div>

            {/* Race to CME Globe */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Race to CME Globe</h2>
                <p className="text-gray-600">Season-long points race for the CME Group Tour Championship</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {rankings.raceToCmeGlobe.slice(0, 10).map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-gray-900 w-8">{index + 1}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{player.name}</p>
                          <p className="text-sm text-gray-600">{player.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{player.points}</p>
                        <p className="text-sm text-gray-600">{player.events} events</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                    View Full Rankings →
                  </a>
                </div>
              </div>
            </div>

            {/* LPGA Money List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">LPGA Money List</h2>
                <p className="text-gray-600">Official money list for the LPGA Tour season</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {rankings.lpgaMoneyList.slice(0, 10).map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-gray-900 w-8">{index + 1}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{player.name}</p>
                          <p className="text-sm text-gray-600">{player.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${player.earnings}</p>
                        <p className="text-sm text-gray-600">{player.events} events</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                    View Full Rankings →
                  </a>
                </div>
              </div>
            </div>

            {/* Race for the Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Race for the Card</h2>
                <p className="text-gray-600">Epson Tour players competing for LPGA Tour cards</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {rankings.raceForTheCard.slice(0, 10).map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-gray-900 w-8">{index + 1}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{player.name}</p>
                          <p className="text-sm text-gray-600">{player.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{player.points}</p>
                        <p className="text-sm text-gray-600">{player.events} events</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                    View Full Rankings →
                  </a>
                </div>
              </div>
            </div>

            {/* Epson Money List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm lg:col-span-2">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Epson Money List</h2>
                <p className="text-gray-600">Official money list for the Epson Tour season</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {rankings.epsonMoneyList.slice(0, 10).map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-gray-900 w-8">{index + 1}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{player.name}</p>
                            <p className="text-sm text-gray-600">{player.country}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${player.earnings}</p>
                          <p className="text-sm text-gray-600">{player.events} events</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {rankings.epsonMoneyList.slice(10, 20).map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-gray-900 w-8">{index + 11}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{player.name}</p>
                            <p className="text-sm text-gray-600">{player.country}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${player.earnings}</p>
                          <p className="text-sm text-gray-600">{player.events} events</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                    View Full Rankings →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About LPGA Rankings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{rankings.information.rolexWorldRanking.title}</h3>
                <p className="text-gray-600 mb-4">
                  {rankings.information.rolexWorldRanking.description}
                </p>
                <p className="text-gray-600">
                  {rankings.information.rolexWorldRanking.details}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{rankings.information.raceToCmeGlobe.title}</h3>
                <p className="text-gray-600 mb-4">
                  {rankings.information.raceToCmeGlobe.description}
                </p>
                <p className="text-gray-600">
                  {rankings.information.raceToCmeGlobe.details}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{rankings.information.lpgaMoneyList.title}</h3>
                <p className="text-gray-600 mb-4">
                  {rankings.information.lpgaMoneyList.description}
                </p>
                <p className="text-gray-600">
                  {rankings.information.lpgaMoneyList.details}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{rankings.information.epsonTourRankings.title}</h3>
                <p className="text-gray-600 mb-4">
                  {rankings.information.epsonTourRankings.description}
                </p>
                <p className="text-gray-600">
                  {rankings.information.epsonTourRankings.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
