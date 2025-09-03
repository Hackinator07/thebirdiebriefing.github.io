'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrophyIcon, 
  CalendarIcon, 
  UsersIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface SeasonStats {
  year: number;
  total_tournaments: number;
  completed_tournaments: number;
  in_progress_tournaments: number;
  scheduled_tournaments: number;
  tournaments: {
    name: string;
    status: string;
    players_count: number;
    winner: string | null;
  }[];
}

interface Player {
  id: number;
  espn_id: string;
  name: string;
  country: string;
  tournaments_played: number;
}

const LPGASeasonAnalytics: React.FC = () => {
  const [seasonStats, setSeasonStats] = useState<SeasonStats | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState(2025);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8585';

  useEffect(() => {
    fetchSeasonAnalytics();
    fetchPlayers();
  }, [selectedYear]);

  const fetchSeasonAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/analytics/season/${selectedYear}`);
      if (!response.ok) throw new Error('Failed to fetch season analytics');
      
      const data = await response.json();
      setSeasonStats(data.season_stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch season analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${API_BASE}/players`);
      if (!response.ok) throw new Error('Failed to fetch players');
      
      const data = await response.json();
      setPlayers(data.players || []);
    } catch (err) {
      console.error('Failed to fetch players:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <TrophyIcon className="w-4 h-4" />;
      case 'in_progress':
        return <UsersIcon className="w-4 h-4" />;
      case 'scheduled':
        return <CalendarIcon className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const calculateCompletionRate = () => {
    if (!seasonStats) return 0;
    return (seasonStats.completed_tournaments / seasonStats.total_tournaments) * 100;
  };

  const getTopPlayers = () => {
    return players
      .sort((a, b) => b.tournaments_played - a.tournaments_played)
      .slice(0, 10);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="text-red-800">
          <p className="font-medium">Error loading season analytics</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">LPGA Season Analytics</h1>
        <p className="text-gray-600">Comprehensive season statistics and performance insights</p>
      </div>

      {/* Year Selector */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="year-select" className="text-sm font-medium text-gray-700">
            Season Year:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
          </select>
        </div>
      </div>

      {seasonStats && (
        <>
          {/* Season Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrophyIcon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{seasonStats.total_tournaments}</div>
                  <div className="text-sm text-gray-500">Total Tournaments</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrophyIcon className="w-8 h-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{seasonStats.completed_tournaments}</div>
                  <div className="text-sm text-gray-500">Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UsersIcon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{seasonStats.in_progress_tournaments}</div>
                  <div className="text-sm text-gray-500">In Progress</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="w-8 h-8 text-gray-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{seasonStats.scheduled_tournaments}</div>
                  <div className="text-sm text-gray-500">Scheduled</div>
                </div>
              </div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Season Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                <span className="text-sm text-gray-900">{calculateCompletionRate().toFixed(1)}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${calculateCompletionRate()}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Completed:</span>
                  <span className="ml-2 font-medium text-green-600">{seasonStats.completed_tournaments}</span>
                </div>
                <div>
                  <span className="text-gray-500">In Progress:</span>
                  <span className="ml-2 font-medium text-blue-600">{seasonStats.in_progress_tournaments}</span>
                </div>
                <div>
                  <span className="text-gray-500">Scheduled:</span>
                  <span className="ml-2 font-medium text-gray-600">{seasonStats.scheduled_tournaments}</span>
                </div>
                <div>
                  <span className="text-gray-500">Remaining:</span>
                  <span className="ml-2 font-medium text-gray-600">
                    {seasonStats.total_tournaments - seasonStats.completed_tournaments - seasonStats.in_progress_tournaments}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tournament List */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Tournament Status</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {seasonStats.tournaments.map((tournament, index) => (
                <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{tournament.name}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>Players: {tournament.players_count}</span>
                        {tournament.winner && (
                          <span className="text-green-600">Winner: {tournament.winner}</span>
                        )}
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(tournament.status)}`}>
                      {getStatusIcon(tournament.status)}
                      <span className="capitalize">{tournament.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Player Statistics */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Top Players by Tournament Count</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {getTopPlayers().map((player, index) => (
            <div key={player.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    index === 1 ? 'bg-gray-100 text-gray-800 border-gray-200' :
                    index === 2 ? 'bg-orange-100 text-orange-800 border-orange-200' :
                    'bg-blue-100 text-blue-800 border-blue-200'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{player.name}</h3>
                    <p className="text-sm text-gray-500">{player.country}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-blue-600">{player.tournaments_played}</div>
                  <div className="text-sm text-gray-500">tournaments</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No Data State */}
      {!seasonStats && !loading && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <ChartBarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Season Data Available</h3>
          <p className="text-gray-500">Season analytics will be available once tournaments begin.</p>
        </div>
      )}
    </div>
  );
};

export default LPGASeasonAnalytics;
