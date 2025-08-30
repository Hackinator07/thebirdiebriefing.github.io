'use client';

import { useState, useMemo } from 'react';
import { getSchedule } from '@/lib/schedule';

type SortField = 'date' | 'title' | 'winner' | 'purse';
type SortDirection = 'asc' | 'desc';

export default function SchedulePage() {
  const schedule = getSchedule();
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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
            {sortedTournaments.map((tournament) => (
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
                      onClick={() => handleSort('winner')}
                    >
                      <div className="flex items-center gap-1">
                        Winner
                        {getSortIcon('winner')}
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
