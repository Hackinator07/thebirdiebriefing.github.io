'use client';

import { useState, useMemo } from 'react';
import { getTeamEntryList } from '@/lib/teamEntryList';
import { getCountryFlagUrl, getCountryFlagAlt } from '@/lib/countryFlags';
import Link from 'next/link';
import Image from 'next/image';

type SortField = 'rank' | 'name' | 'countryCode' | 'pool';
type SortDirection = 'asc' | 'desc';

export default function TeamEntryListPage() {
  const entryList = getTeamEntryList();
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Sort teams based on current sort field and direction
  const sortedTeams = useMemo(() => {
    const teams = [...entryList.teams];
    
    return teams.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'rank':
          aValue = a.rank;
          bValue = b.rank;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'countryCode':
          aValue = a.countryCode.toLowerCase();
          bValue = b.countryCode.toLowerCase();
          break;
        case 'pool':
          aValue = a.pool.toLowerCase();
          bValue = b.pool.toLowerCase();
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
  }, [entryList.teams, sortField, sortDirection]);

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

  // Group teams by pool
  const poolA = sortedTeams.filter(team => team.pool === 'A');
  const poolB = sortedTeams.filter(team => team.pool === 'B');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-300 max-w-16 sm:max-w-32"></div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                Entry List – Team Event
              </h1>
              <div className="flex-1 h-px bg-gray-300 max-w-16 sm:max-w-32"></div>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-600 text-center">
            {entryList.tournament} | Final Field
          </p>
          <p className="text-sm text-gray-500 text-center">
            <a
              href="https://maps.app.goo.gl/r4ZGGX7rMz3F7Pu18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 hover:underline transition-colors"
            >
              New Korea Country Club
            </a>
          </p>
          <p className="text-sm text-gray-500 text-center">
            Goyang-si, Gyeonggi-do, Republic of Korea | October 23–26, 2025
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
            Updated {new Date(entryList.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </section>

      {/* Entry List Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Team Event Layout */}
          <div className="space-y-8">
            {/* Pool A */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Pool A</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {poolA.map((team) => (
                  <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-800">{team.rank}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{team.name}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Image
                              src={getCountryFlagUrl(team.countryCode)}
                              alt={getCountryFlagAlt(team.countryCode)}
                              width={20}
                              height={15}
                              className="w-5 h-4 object-cover rounded-sm"
                            />
                            {team.countryCode}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        Pool {team.pool}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {team.players.map((player, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">#{player.worldRank}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{player.name}</div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Image
                                  src={getCountryFlagUrl(player.countryCode)}
                                  alt={getCountryFlagAlt(player.countryCode)}
                                  width={12}
                                  height={9}
                                  className="w-3 h-2 object-cover rounded-sm"
                                />
                                {player.countryCode}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pool B */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Pool B</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {poolB.map((team) => (
                  <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-800">{team.rank}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{team.name}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Image
                              src={getCountryFlagUrl(team.countryCode)}
                              alt={getCountryFlagAlt(team.countryCode)}
                              width={20}
                              height={15}
                              className="w-5 h-4 object-cover rounded-sm"
                            />
                            {team.countryCode}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        Pool {team.pool}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {team.players.map((player, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">#{player.worldRank}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{player.name}</div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Image
                                  src={getCountryFlagUrl(player.countryCode)}
                                  alt={getCountryFlagAlt(player.countryCode)}
                                  width={12}
                                  height={9}
                                  className="w-3 h-2 object-cover rounded-sm"
                                />
                                {player.countryCode}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seeding Information */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Seeding</h3>
            <p className="text-sm text-blue-800 mb-2">
              The eight teams are seeded No. 1 through No. 8 and divided into two pools based on the cumulative team ranking of the four players' Rolex Women's World Golf Rankings published after the conclusion of the 2025 AIG Women's Open on Aug. 4.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Pool A:</h4>
                <p className="text-sm text-blue-800">United States, Australia, Thailand, People's Republic of China</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Pool B:</h4>
                <p className="text-sm text-blue-800">Japan, Republic of Korea, Sweden, World Team</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-500">
            <p>
              Official Entry List Provided by the{' '}
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
