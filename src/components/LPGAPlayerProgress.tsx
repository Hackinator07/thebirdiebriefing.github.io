'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  ChartBarIcon, 
  ClockIcon, 
  FlagIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface PlayerProgressProps {
  selectedTournament: string | null;
}

interface PlayerProgress {
  player_id: string;
  player_name: string;
  display_name: string;
  country: string;
  final_position: number;
  final_score: string;
  round_progress: RoundProgress[];
  position_progression: number[];
  score_progression: number[];
}

interface RoundProgress {
  round: number;
  score: number;
  to_par: string;
  cumulative_score: number;
  completion_time: string | null;
}

const LPGAPlayerProgress: React.FC<PlayerProgressProps> = ({ selectedTournament }) => {
  const [playerProgress, setPlayerProgress] = useState<PlayerProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'position' | 'score' | 'name'>('position');

  const fetchPlayerProgress = async (tournamentId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8585'}/tournament/${tournamentId}/player_progress`);
      const data = await response.json();
      
      if (data.code === 200) {
        setPlayerProgress(data.player_progress);
        // Auto-select the first player if available
        if (data.player_progress.length > 0) {
          setSelectedPlayer(data.player_progress[0].player_id);
        }
      } else {
        setError(data.message || 'Failed to fetch player progress');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error('Error fetching player progress:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTournament) {
      fetchPlayerProgress(selectedTournament);
    }
  }, [selectedTournament]);

  if (!selectedTournament) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Tournament Selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a tournament from the Tournaments tab to view player progress.
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
          <p className="mt-2 text-sm text-gray-500">Loading player progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <UserGroupIcon className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Progress</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <button
            onClick={() => fetchPlayerProgress(selectedTournament)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Sort players based on selected criteria
  const sortedPlayers = [...playerProgress].sort((a, b) => {
    switch (sortBy) {
      case 'position':
        return a.final_position - b.final_position;
      case 'score':
        return a.final_score.localeCompare(b.final_score);
      case 'name':
        return a.player_name.localeCompare(b.player_name);
      default:
        return 0;
    }
  });

  const selectedPlayerData = selectedPlayer 
    ? playerProgress.find(p => p.player_id === selectedPlayer)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Player Progress Tracking</h2>
            <p className="text-gray-600">Individual player performance progression throughout the tournament</p>
          </div>
          <button
            onClick={() => fetchPlayerProgress(selectedTournament)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Player Selection */}
        <div>
          <label htmlFor="player-selector" className="block text-sm font-medium text-gray-700 mb-2">
            Select Player
          </label>
          <select
            id="player-selector"
            value={selectedPlayer || ''}
            onChange={(e) => setSelectedPlayer(e.target.value || null)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Choose a player...</option>
            {sortedPlayers.map((player) => (
              <option key={player.player_id} value={player.player_id}>
                {player.display_name || player.player_name} - {player.country} (Pos: {player.final_position})
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label htmlFor="sort-selector" className="block text-sm font-medium text-gray-700 mb-2">
            Sort Players By
          </label>
          <select
            id="sort-selector"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'position' | 'score' | 'name')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="position">Final Position</option>
            <option value="score">Final Score</option>
            <option value="name">Player Name</option>
          </select>
        </div>
      </div>

      {/* Player Progress Overview */}
      {selectedPlayerData && (
        <div className="mb-8 bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedPlayerData.display_name || selectedPlayerData.player_name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{selectedPlayerData.country}</span>
                    <FlagIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {selectedPlayerData.final_score}
                </div>
                <div className="text-sm text-gray-500">
                  Final Position: {selectedPlayerData.final_position}
                </div>
              </div>
            </div>
          </div>

          {/* Round-by-Round Progress */}
          <div className="px-6 py-4">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Round-by-Round Progress</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {selectedPlayerData.round_progress.map((round) => (
                <div key={round.round} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      Round {round.round}
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {round.score}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {round.to_par}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      Cumulative: {round.cumulative_score}
                    </div>
                    {round.completion_time && (
                      <div className="text-xs text-gray-500 flex items-center justify-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {round.completion_time}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score Progression Chart */}
          {selectedPlayerData.score_progression.length > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Score Progression</h4>
              <div className="flex items-end space-x-2 h-32">
                {selectedPlayerData.score_progression.map((score, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ 
                        height: `${Math.max(10, (score / Math.max(...selectedPlayerData.score_progression)) * 100)}%` 
                      }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-1">
                      R{index + 1}
                    </div>
                    <div className="text-xs font-medium text-gray-900">
                      {score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* All Players Summary */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            All Players Progress Summary
          </h3>
          <p className="text-sm text-gray-600">
            {playerProgress.length} players tracked
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Final Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Final Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rounds Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedPlayers.map((player) => (
                <tr key={player.player_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <UserGroupIcon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {player.display_name || player.player_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {player.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {player.final_position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-semibold">{player.final_score}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {player.round_progress.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedPlayer(player.player_id)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        selectedPlayer === player.player_id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedPlayer === player.player_id ? 'Selected' : 'Select'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Tracking progress for {playerProgress.length} players across all rounds
        {selectedPlayer && (
          <button
            onClick={() => setSelectedPlayer(null)}
            className="ml-2 text-blue-600 hover:text-blue-800 underline"
          >
            Clear Selection
          </button>
        )}
      </div>
    </div>
  );
};

export default LPGAPlayerProgress;
