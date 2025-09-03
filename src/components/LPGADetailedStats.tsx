'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserIcon, 
  FlagIcon, 
  ClockIcon, 
  ChartBarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface DetailedStatsProps {
  selectedTournament: string | null;
}

interface PlayerStats {
  player_id: string;
  player_name: string;
  display_name: string;
  short_name: string;
  country: string;
  country_flag_url: string;
  position: number;
  total_score: string;
  rounds: RoundData[];
}

interface RoundData {
  round_number: number;
  score: number;
  to_par: string;
  completion_time: string | null;
  statistics: Statistic[];
}

interface Statistic {
  name: string;
  value: number | string;
  display_value: string;
}

const LPGADetailedStats: React.FC<DetailedStatsProps> = ({ selectedTournament }) => {
  const [stats, setStats] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const fetchDetailedStats = async (tournamentId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8585'}/tournament/${tournamentId}/detailed_stats`);
      const data = await response.json();
      
      if (data.code === 200) {
        setStats(data.detailed_stats);
      } else {
        setError(data.message || 'Failed to fetch detailed stats');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error('Error fetching detailed stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTournament) {
      fetchDetailedStats(selectedTournament);
    }
  }, [selectedTournament]);

  if (!selectedTournament) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Tournament Selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a tournament from the Tournaments tab to view detailed statistics.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading detailed statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <ChartBarIcon className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Stats</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
                     <button
             onClick={() => fetchDetailedStats(selectedTournament)}
             className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
           >
             <ArrowPathIcon className="w-4 h-4 mr-2" />
             Retry
           </button>
        </div>
      </div>
    );
  }

  const filteredStats = selectedPlayer 
    ? stats.filter(player => player.player_id === selectedPlayer)
    : stats;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Detailed Tournament Statistics</h2>
            <p className="text-gray-600">Comprehensive player performance data and round-by-round analysis</p>
          </div>
                     <button
             onClick={() => fetchDetailedStats(selectedTournament)}
             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
           >
             <ArrowPathIcon className="w-4 h-4 mr-2" />
             Refresh
           </button>
        </div>
      </div>

      {/* Player Filter */}
      <div className="mb-6">
        <label htmlFor="player-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Player
        </label>
        <select
          id="player-filter"
          value={selectedPlayer || ''}
          onChange={(e) => setSelectedPlayer(e.target.value || null)}
          className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="">All Players ({stats.length})</option>
          {stats.map((player) => (
            <option key={player.player_id} value={player.player_id}>
              {player.display_name || player.player_name} - {player.country}
            </option>
          ))}
        </select>
      </div>

      {/* Statistics Grid */}
      <div className="grid gap-6">
        {filteredStats.map((player) => (
          <div key={player.player_id} className="bg-white rounded-lg shadow border border-gray-200">
            {/* Player Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <UserIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {player.display_name || player.player_name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{player.short_name}</span>
                      <span>•</span>
                      <span>{player.country}</span>
                      {player.country_flag_url && (
                        <img 
                          src={player.country_flag_url} 
                          alt={player.country}
                          className="w-4 h-4 rounded"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {player.total_score}
                  </div>
                  <div className="text-sm text-gray-500">
                    Position: {player.position}
                  </div>
                </div>
              </div>
            </div>

            {/* Rounds Data */}
            <div className="px-6 py-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Round-by-Round Performance</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {player.rounds.map((round) => (
                  <div key={round.round_number} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        Round {round.round_number}
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {round.score}
                      </div>
                      <div className="text-sm text-gray-600">
                        {round.to_par}
                      </div>
                      {round.completion_time && (
                        <div className="mt-2 text-xs text-gray-500 flex items-center justify-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {round.completion_time}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            {player.rounds.some(round => round.statistics.length > 0) && (
              <div className="px-6 py-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Detailed Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {player.rounds.map((round) => (
                    round.statistics.length > 0 && (
                      <div key={round.round_number} className="bg-blue-50 rounded-lg p-3">
                        <h5 className="text-sm font-medium text-blue-900 mb-2">
                          Round {round.round_number} Stats
                        </h5>
                        <div className="space-y-1">
                          {round.statistics.map((stat, index) => (
                            <div key={index} className="text-xs text-blue-800">
                              <span className="font-medium">{stat.name}:</span> {stat.display_value}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Showing {filteredStats.length} of {stats.length} players
        {selectedPlayer && (
          <button
            onClick={() => setSelectedPlayer(null)}
            className="ml-2 text-blue-600 hover:text-blue-800 underline"
          >
            Clear Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default LPGADetailedStats;
