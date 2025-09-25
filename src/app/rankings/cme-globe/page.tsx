'use client';

import { useState, useMemo } from 'react';
import { getCmeGlobeRankings } from '@/lib/rankings';
import { getCountryFlagUrl, getCountryFlagAlt } from '@/lib/countryFlags';
import Link from 'next/link';
import Image from 'next/image';

type SortField = 'rank' | 'fullName' | 'countryCode' | 'points' | 'events';
type SortDirection = 'asc' | 'desc';

export default function CmeGlobeRankingsPage() {
  const rankings = getCmeGlobeRankings();
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Sort players based on current sort field and direction
  const sortedPlayers = useMemo(() => {
    const players = [...rankings.players];
    
    return players.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'rank':
          aValue = a.rank;
          bValue = b.rank;
          break;
        case 'fullName':
          aValue = a.fullName.toLowerCase().split(' ').pop() || a.fullName.toLowerCase();
          bValue = b.fullName.toLowerCase().split(' ').pop() || b.fullName.toLowerCase();
          break;
        case 'countryCode':
          aValue = a.countryCode.toLowerCase();
          bValue = b.countryCode.toLowerCase();
          break;
        case 'points':
          aValue = a.points;
          bValue = b.points;
          break;
        case 'events':
          aValue = a.events;
          bValue = b.events;
          break;
        default:
          aValue = a.rank;
          bValue = b.rank;
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [rankings.players, sortField, sortDirection]);

  const topPlayers = sortedPlayers; // Show all players

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
            {/* CME Globe Rankings Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="/optimized/cme-logo-rankings.webp"
                alt="CME Globe Rankings Logo"
                className="h-16 sm:h-20 md:h-24 object-contain"
              />
            </div>
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
          <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
            Week of {rankings.week.start_date} to {rankings.week.end_date}
          </p>
          
                    {/* Rankings Navigation */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <Link
                href="/rankings"
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-md text-center"
              >
                Rolex World
              </Link>
                             <Link
                 href="/rankings/cme-globe"
                 className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md text-center"
               >
                 CME Globe
               </Link>
              <Link
                href="/rankings/money-list"
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-md text-center"
              >
                LPGA Money
              </Link>
              <Link
                href="/rankings/aon-risk-reward"
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-md text-center"
              >
                AON Risk Reward
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
                   <div className="flex flex-col items-center mb-3">
                     <div className="flex items-center gap-3">
                                         <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                       <span className="text-sm font-bold text-primary-800">{player.rank}</span>
                     </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{player.fullName}</div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Image
                          src={getCountryFlagUrl(player.countryCode)}
                          alt={getCountryFlagAlt(player.countryCode)}
                          width={16}
                          height={12}
                          className="w-4 h-3 object-cover rounded-sm"
                        />
                        {player.countryCode}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-gray-500 text-xs uppercase tracking-wide">Points</div>
                    <div className="font-medium text-gray-900">{player.points.toFixed(3)}</div>
                  </div>
                  <div className="text-center">
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
                    <th 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('rank')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Rank
                        {getSortIcon('rank')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('fullName')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Player
                        {getSortIcon('fullName')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('countryCode')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Country
                        {getSortIcon('countryCode')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('points')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Points
                        {getSortIcon('points')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('events')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Events
                        {getSortIcon('events')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topPlayers.map((player) => (
                    <tr key={player.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                        {player.rank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                        {player.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                        <div className="flex items-center justify-center gap-2">
                          <Image
                            src={getCountryFlagUrl(player.countryCode)}
                            alt={getCountryFlagAlt(player.countryCode)}
                            width={20}
                            height={15}
                            className="w-5 h-4 object-cover rounded-sm"
                          />
                          {player.countryCode}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                        {player.points.toFixed(3)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
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
               Official Tour Rankings Provided by the{' '}
               <a
                 href="https://www.lpga.com/"
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
