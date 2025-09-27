'use client';

import { useState, useMemo } from 'react';
import { getEuropeSolheimCupRankings, SolheimCupPlayer } from '@/lib/rankings';
import { getCountryFlagUrl, getCountryFlagAlt } from '@/lib/countryFlags';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

type SortField = 'rank' | 'fullName' | 'countryCode' | 'points' | 'qualificationStatus';
type SortDirection = 'asc' | 'desc';

export default function EuropeSolheimCupPage() {
  const { t } = useTranslation();
  const rankings = getEuropeSolheimCupRankings();
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
          aValue = a.fullName.toLowerCase();
          bValue = b.fullName.toLowerCase();
          break;
        case 'countryCode':
          aValue = a.countryCode.toLowerCase();
          bValue = b.countryCode.toLowerCase();
          break;
        case 'points':
          aValue = a.points;
          bValue = b.points;
          break;
        case 'qualificationStatus':
          aValue = a.qualificationStatus;
          bValue = b.qualificationStatus;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rankings.players, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getQualificationBadge = (status: string) => {
    const badges = {
      let: 'bg-green-100 text-green-800',
      rolex: 'bg-blue-100 text-blue-800',
      captain: 'bg-purple-100 text-purple-800',
      alternate: 'bg-gray-100 text-gray-800'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getQualificationText = (status: string) => {
    const texts = {
      let: 'LET Points',
      rolex: 'Rolex Rankings',
      captain: 'Potential Captain\'s Pick',
      alternate: 'Alternate'
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            {/* Solheim Cup 2026 Logo */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/tournaments/solheim-cup-2026-logo.png"
                alt="Solheim Cup 2026 Logo"
                width={300}
                height={200}
                className="h-24 w-auto object-contain"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('europe')} {t('solheimCup')} {t('team')}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Team Europe's Solheim Cup squad has 12 players: two from the LET points list, six from the Rolex Rankings, and four chosen as captain's picks.
            </p>
          </div>
          
          {/* Qualification Info */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{rankings.qualificationInfo.letPointsList}</div>
              <div className="text-sm text-green-700">LET Points</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{rankings.qualificationInfo.rolexRankings}</div>
              <div className="text-sm text-blue-700">Rolex Rankings</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{rankings.qualificationInfo.captainPicks}</div>
              <div className="text-sm text-purple-700">Captain's Picks</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{rankings.qualificationInfo.totalSpots}</div>
              <div className="text-sm text-gray-700">Total Team</div>
            </div>
          </div>

          {/* Qualification Details */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Team Selection Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                <div>
                  <strong>LET Points List:</strong> Top 2 players on the European Solheim Cup Points List from LET-sanctioned ranking events.
                </div>
                <div>
                  <strong>Rolex Rankings:</strong> Next 6 players on the Rolex Women's World Rankings not already qualified.
                </div>
                <div>
                  <strong>Captain's Picks:</strong> 4 players selected by the European captain to complete the team.
                </div>
              </div>
            </div>
          </div>

          {/* Solheim Cup Navigation */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <Link
                href="/solheim-cup/europe"
                className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md text-center"
              >
                {t('europe')}
              </Link>
              <Link
                href="/solheim-cup/united-states"
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-md text-center"
              >
                {t('unitedStates')}
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
            {sortedPlayers.map((player) => (
              <div key={player.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-800">{player.rank}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{player.fullName}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
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
                  <div className="text-right">
                    {player.rankDelta !== 0 && (
                      <span className={`text-xs font-medium ${
                        player.rankDelta > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {player.rankDelta > 0 ? '+' : ''}{player.rankDelta}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Points</div>
                    <div className="font-medium text-gray-900">{player.points.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Status</div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getQualificationBadge(player.qualificationStatus)}`}>
                      {getQualificationText(player.qualificationStatus)}
                    </span>
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
                        {sortField === 'rank' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('fullName')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Player
                        {sortField === 'fullName' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('countryCode')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Country
                        {sortField === 'countryCode' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('points')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Points
                        {sortField === 'points' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('qualificationStatus')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Status
                        {sortField === 'qualificationStatus' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedPlayers.map((player) => (
                    <tr key={player.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                        <div className="flex items-center justify-center gap-1">
                          {player.rank}
                          {player.rankDelta !== 0 && (
                            <span className={`text-xs ${
                              player.rankDelta > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {player.rankDelta > 0 ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                        {player.points.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getQualificationBadge(player.qualificationStatus)}`}>
                          {getQualificationText(player.qualificationStatus)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Last updated: {new Date(rankings.lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
