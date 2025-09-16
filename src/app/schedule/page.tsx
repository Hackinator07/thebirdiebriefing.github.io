'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { getSchedule, getEnhancedSchedule } from '@/lib/schedule';

type SortField = 'date' | 'title' | 'winner' | 'purse' | 'score' | 'prize';
type SortDirection = 'asc' | 'desc';

// Helper function to get tournament logo URL
const getTournamentLogo = (tournamentTitle: string): string | null => {
  // Map tournament titles to their logo filenames
  const logoMap: Record<string, string> = {
    'Hilton Grand Vacations Tournament of Champions': 'hilton-grand-vacations.png',
    'Founders Cup': 'founders-cup.png',
    'Honda LPGA Thailand': 'honda-lpga-thailand.png',
    'HSBC Women\'s World Championship': 'hsbc-womens-world.png',
    'Blue Bay LPGA': 'blue-bay-lpga.svg',
    'FIR HILLS SERI PAK Championship': 'seripak.png',
    'Ford Championship presented by Wild Horse Pass': 'ford-championship.png',
    'T-Mobile Match Play presented by MGM Rewards': 'tmobile-match-play.png',
    'JM Eagle LA Championship presented by Plastpro': 'jm-eagle-la.webp',
    'The Chevron Championship': 'chevron-championship.png',
    'Black Desert Championship': 'black-desert-championship.png',
    'Mizuho Americas Open': 'mizuho-americas.png',
    'Riviera Maya Open': 'riviera-maya.png',
    'U.S. Women\'s Open presented by Ally': 'us-womens-open.png',
    'ShopRite LPGA Classic presented by Acer': 'shoprite-lpga.webp',
    'Meijer LPGA Classic for Simply Give': 'meijer-lpga.webp',
    'KPMG Women\'s PGA Championship': 'kpmg-womens-pga.png',
    'Dow Championship': 'dow-championship.webp',
    'Amundi Evian Championship': 'amundi-evian.png',
    'ISPS Handa Women\'s Scottish Open': 'isps-handa-scottish.svg',
    'AIG Women\'s Open': 'aig-womens-open.png',
    'The Standard Portland Classic': 'portland-classic.png',
    'CPKC Women\'s Open': 'cpkc-womens-open.svg',
    'FM Championship': 'fm-championship.png',
    'Kroger Queen City Championship presented by P&G': 'kroger-queen-city.png',
    'Walmart NW Arkansas Championship presented by P&G': 'walmart-nw-arkansas.png',
    'LOTTE Championship presented by Hoakalei': 'lotte-championship.png',
    'Buick LPGA Shanghai': 'buick-lpga-shanghai.png',
    'BMW Ladies Championship': 'bmw-ladies.svg',
    'Hanwha LIFEPLUS International Crown': 'hanwha-crown-new.svg',
    'Maybank Championship': 'maybank-championship.png',
    'TOTO Japan Classic': 'toto-japan.webp',
    'The ANNIKA driven by Gainbridge at Pelican': 'annika-pelican.webp',
    'CME Group Tour Championship': 'cme-tour-championship.png',
    'Grant Thornton Invitational': 'grant-thornton.svg',
  };

  const logoFilename = logoMap[tournamentTitle];
  if (!logoFilename) return null;
  
  // For SVG files, use the original path since they don't get optimized
  if (logoFilename.endsWith('.svg')) {
    return `/images/tournaments/${logoFilename}`;
  }
  
  // For other formats, use the optimized WebP version
  return `/optimized/${logoFilename.replace(/\.(png|jpg|jpeg)$/i, '.webp')}`;
};

export default function SchedulePage() {
  const fallbackSchedule = getSchedule();
  const [schedule, setSchedule] = useState(fallbackSchedule);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [formattedDate, setFormattedDate] = useState<string>('');

  // Fetch enhanced schedule data
  useEffect(() => {
    const fetchEnhancedData = async () => {
      try {
        const enhancedSchedule = await getEnhancedSchedule();
        setSchedule(enhancedSchedule);
      } catch (error) {
        console.error('Error fetching enhanced schedule:', error);
        // Keep fallback schedule if API fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnhancedData();
  }, []);

  // Format date on client side to avoid hydration mismatch
  useEffect(() => {
    setFormattedDate(
      new Date(schedule.lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    );
  }, [schedule.lastUpdated]);

  // Sort tournaments based on current sort field and direction
  const sortedTournaments = useMemo(() => {
    const tournaments = [...schedule.tournaments];
    
    return tournaments.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'date':
          // Extract the start date for sorting (first date in range)
          const aDateStr = a.date.split('-')[0].trim();
          const bDateStr = b.date.split('-')[0].trim();
          
          // Convert to comparable format (assuming format like "Jan. 30" or "March 6")
          const aDate = new Date(aDateStr + ', 2025');
          const bDate = new Date(bDateStr + ', 2025');
          
          aValue = aDate.getTime();
          bValue = bDate.getTime();
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'winner':
          // Handle TBD, N/A, and undefined cases
          if (!a.winner || a.winner === 'TBD' || a.winner === 'N/A') aValue = 'zzz'; // Sort to end
          else aValue = a.winner.toLowerCase();
          
          if (!b.winner || b.winner === 'TBD' || b.winner === 'N/A') bValue = 'zzz'; // Sort to end
          else bValue = b.winner.toLowerCase();
          break;
        case 'purse':
          // Convert purse strings to numbers for sorting
          const aPurseStr = a.purse.replace(/[$,]/g, '');
          const bPurseStr = b.purse.replace(/[$,]/g, '');
          
          // Handle M (millions) and K (thousands)
          const aMultiplier = aPurseStr.includes('M') ? 1000000 : aPurseStr.includes('K') ? 1000 : 1;
          const bMultiplier = bPurseStr.includes('M') ? 1000000 : bPurseStr.includes('K') ? 1000 : 1;
          
          const aNumber = parseFloat(aPurseStr.replace(/[MK]/g, '')) * aMultiplier;
          const bNumber = parseFloat(bPurseStr.replace(/[MK]/g, '')) * bMultiplier;
          
          aValue = aNumber;
          bValue = bNumber;
          break;
        case 'score':
          // Handle score sorting (lower scores are better)
          if (!a.score || a.score === 'N/A') aValue = 999; // Sort to end
          else {
            const aScoreMatch = a.score.match(/(\d+)/);
            aValue = aScoreMatch ? parseInt(aScoreMatch[1]) : 999;
          }
          
          if (!b.score || b.score === 'N/A') bValue = 999; // Sort to end
          else {
            const bScoreMatch = b.score.match(/(\d+)/);
            bValue = bScoreMatch ? parseInt(bScoreMatch[1]) : 999;
          }
          break;
        case 'prize':
          // Convert prize strings to numbers for sorting
          if (!a.prize || a.prize === 'N/A') aValue = 0; // Sort to end
          else {
            const aPrizeStr = a.prize.replace(/[$,]/g, '');
            aValue = parseFloat(aPrizeStr) || 0;
          }
          
          if (!b.prize || b.prize === 'N/A') bValue = 0; // Sort to end
          else {
            const bPrizeStr = b.prize.replace(/[$,]/g, '');
            bValue = parseFloat(bPrizeStr) || 0;
          }
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [schedule.tournaments, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sortDirection === 'asc') {
      return (
        <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-4">
            {/* LPGA Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="/optimized/lpga-logo-75.webp"
                alt="LPGA Logo"
                className="h-16 sm:h-20 md:h-24 object-contain"
              />
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-300 max-w-16 sm:max-w-32"></div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                LPGA Schedule 2025
              </h1>
              <div className="flex-1 h-px bg-gray-300 max-w-16 sm:max-w-32"></div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
            Last updated {formattedDate || 'Loading...'}
            {isLoading && (
              <span className="ml-2 text-blue-600">
                • Fetching live data...
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Schedule Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile Card Layout */}
          <div className="block lg:hidden space-y-4">
            {sortedTournaments.map((tournament) => (
              <div key={tournament.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                {/* Header row: Date and Purse/Prize */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-900">{tournament.date}</span>
                  <div className="text-right">
                    <div className="text-xs">
                      <span className="text-gray-500">Purse:</span>
                      <span className="font-medium text-gray-900 ml-1">{tournament.purse}</span>
                    </div>
                    {tournament.prize && (
                      <div className="text-xs text-gray-500">
                        Prize: <span className="font-medium text-gray-900">${tournament.prize.replace(/^\$/, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Tournament title and badges */}
                <div className="mb-3">
                  <div className={`font-medium text-base ${tournament.isMajor ? 'text-primary-600 font-bold' : ''} ${tournament.isExhibition ? 'italic text-gray-600' : ''}`}>
                    <div className="flex items-center gap-3 mb-1">
                      {getTournamentLogo(tournament.title) && (
                        <div className="flex-shrink-0">
                          <Image
                            src={getTournamentLogo(tournament.title)!}
                            alt={`${tournament.title} logo`}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <a
                        href={tournament.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${tournament.isMajor ? 'text-secondary-500 hover:text-secondary-700' : 'text-primary-500 hover:text-primary-700'} hover:underline transition-colors`}
                      >
                        {tournament.title}
                      </a>
                    </div>
                  </div>
                  
                  {/* Location and badges on same line */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{tournament.location}</span>
                    <div className="flex gap-1">
                      {tournament.isMajor && (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          Major
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
                  </div>
                </div>

                {/* Results row: Winner and Score */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 min-w-0 flex-1">
                    <span className="text-gray-500">Winner:</span>
                    {tournament.winner && tournament.winner !== "N/A" ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800 truncate">{tournament.winner}</span>
                    ) : tournament.winner === "N/A" ? (
                      <span className="text-gray-400">N/A</span>
                    ) : (
                      <span className="text-gray-400">TBD</span>
                    )}
                  </div>
                  
                  {tournament.score && (
                    <div className="flex items-center text-xs flex-shrink-0 ml-3">
                      <span className="text-gray-500">Score:</span>
                      <span className="font-medium text-gray-900 ml-1">{tournament.score}</span>
                    </div>
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
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center gap-1">
                        Date
                        {getSortIcon('date')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center gap-1">
                        Tournament
                        {getSortIcon('title')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('purse')}
                    >
                      <div className="flex items-center gap-1">
                        Purse
                        {getSortIcon('purse')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('winner')}
                    >
                      <div className="flex items-center gap-1">
                        Winner
                        {getSortIcon('winner')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('score')}
                    >
                      <div className="flex items-center gap-1">
                        Score
                        {getSortIcon('score')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('prize')}
                    >
                      <div className="flex items-center gap-1">
                        Prize
                        {getSortIcon('prize')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedTournaments.map((tournament) => (
                    <tr key={tournament.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tournament.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          <div className={`font-medium ${tournament.isMajor ? 'text-primary-600 font-bold' : ''} ${tournament.isExhibition ? 'italic text-gray-600' : ''}`}>
                            <div className="flex items-center gap-3">
                              {getTournamentLogo(tournament.title) && (
                                <div className="flex-shrink-0">
                                  <Image
                                    src={getTournamentLogo(tournament.title)!}
                                    alt={`${tournament.title} logo`}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 object-contain"
                                    onError={(e) => {
                                      // Hide the image if it fails to load
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              <a
                                href={tournament.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${tournament.isMajor ? 'text-secondary-500 hover:text-secondary-700' : 'text-primary-500 hover:text-primary-700'} hover:underline transition-colors`}
                              >
                                {tournament.title}
                              </a>
                            </div>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tournament.purse}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                         {tournament.winner && tournament.winner !== "N/A" ? (
                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">{tournament.winner}</span>
                         ) : tournament.winner === "N/A" ? (
                           <span className="text-gray-400">N/A</span>
                         ) : (
                           <span className="text-gray-400">TBD</span>
                         )}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tournament.score ? (
                          <span className="font-medium">{tournament.score}</span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tournament.prize ? (
                          <span className="font-medium text-gray-900">
                            ${tournament.prize.replace(/^\$/, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                          </span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
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
              <span className="font-medium text-secondary-500">Major Championships</span> appear in green
            </p>
            <p className="mb-2">
              Live scores and prize money updated automatically from tournament results
            </p>
            <p>
              Schedule Information Provided by the{' '}
              <a
                href="https://www.lpga.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600"
              >
                LPGA Tour
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
