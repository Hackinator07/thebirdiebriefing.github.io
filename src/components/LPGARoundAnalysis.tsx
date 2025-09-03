'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  ClockIcon, 
  TrophyIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface RoundAnalysisProps {
  selectedTournament: string | null;
}

interface RoundAnalysis {
  round_number: number;
  players: PlayerRoundData[];
  best_score: number | null;
  worst_score: number | null;
  average_score: number;
  completion_times: string[];
}

interface PlayerRoundData {
  player_name: string;
  score: number;
  to_par: string;
  completion_time: string | null;
}

const LPGARoundAnalysis: React.FC<RoundAnalysisProps> = ({ selectedTournament }) => {
  const [roundAnalysis, setRoundAnalysis] = useState<Record<number, RoundAnalysis>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  const fetchRoundAnalysis = async (tournamentId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8585'}/tournament/${tournamentId}/round_analysis`);
      const data = await response.json();
      
      if (data.code === 200) {
        setRoundAnalysis(data.round_analysis);
        // Auto-select the first round if available
        const rounds = Object.keys(data.round_analysis).map(Number).sort();
        if (rounds.length > 0) {
          setSelectedRound(rounds[0]);
        }
      } else {
        setError(data.message || 'Failed to fetch round analysis');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error('Error fetching round analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTournament) {
      fetchRoundAnalysis(selectedTournament);
    }
  }, [selectedTournament]);

  if (!selectedTournament) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Tournament Selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a tournament from the Tournaments tab to view round analysis.
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
          <p className="mt-2 text-sm text-gray-500">Loading round analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <ChartBarIcon className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Analysis</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
                     <button
             onClick={() => fetchRoundAnalysis(selectedTournament)}
             className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
           >
             <ArrowPathIcon className="w-4 h-4 mr-2" />
             Retry
           </button>
        </div>
      </div>
    );
  }

  const rounds = Object.keys(roundAnalysis).map(Number).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Round-by-Round Analysis</h2>
            <p className="text-gray-600">Performance analysis across all rounds with statistics and completion times</p>
          </div>
                     <button
             onClick={() => fetchRoundAnalysis(selectedTournament)}
             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
           >
             <ArrowPathIcon className="w-4 h-4 mr-2" />
             Refresh
           </button>
        </div>
      </div>

      {/* Round Selection */}
      <div className="mb-6">
        <label htmlFor="round-selector" className="block text-sm font-medium text-gray-700 mb-2">
          Select Round
        </label>
        <div className="flex space-x-2">
          {rounds.map((roundNum) => (
            <button
              key={roundNum}
              onClick={() => setSelectedRound(roundNum)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedRound === roundNum
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Round {roundNum}
            </button>
          ))}
        </div>
      </div>

      {/* Round Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {rounds.map((roundNum) => {
          const round = roundAnalysis[roundNum];
          if (!round) return null;

          return (
            <div key={roundNum} className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Round {roundNum}
                </h3>
                
                {round.best_score !== null && (
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                      <TrophyIcon className="w-5 h-5 mr-1" />
                      {round.best_score}
                    </div>
                    <div className="text-xs text-gray-500">Best Score</div>
                  </div>
                )}
                
                {round.worst_score !== null && (
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-red-600 flex items-center justify-center">
                      <ArrowTrendingDownIcon className="w-5 h-5 mr-1" />
                      {round.worst_score}
                    </div>
                    <div className="text-xs text-gray-500">Worst Score</div>
                  </div>
                )}
                
                {round.average_score > 0 && (
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-blue-600 flex items-center justify-center">
                      <ArrowTrendingUpIcon className="w-5 h-5 mr-1" />
                      {round.average_score.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Average Score</div>
                  </div>
                )}
                
                <div className="text-sm text-gray-600">
                  {round.players.length} players
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Round Analysis */}
      {selectedRound && roundAnalysis[selectedRound] && (
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Round {selectedRound} - Detailed Analysis
            </h3>
            <p className="text-sm text-gray-600">
              {roundAnalysis[selectedRound].players.length} players completed this round
            </p>
          </div>

          {/* Round Statistics */}
          <div className="px-6 py-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {roundAnalysis[selectedRound].best_score || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Best Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {roundAnalysis[selectedRound].worst_score || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Worst Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {roundAnalysis[selectedRound].average_score > 0 
                    ? roundAnalysis[selectedRound].average_score.toFixed(1) 
                    : 'N/A'
                  }
                </div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
            </div>
          </div>

          {/* Player Performance Table */}
          <div className="px-6 py-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Player Performance</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      To Par
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completion Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roundAnalysis[selectedRound].players
                    .sort((a, b) => a.score - b.score)
                    .map((player, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {player.player_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`font-semibold ${
                            player.score === roundAnalysis[selectedRound].best_score 
                              ? 'text-green-600' 
                              : player.score === roundAnalysis[selectedRound].worst_score 
                                ? 'text-red-600' 
                                : 'text-gray-900'
                          }`}>
                            {player.score}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {player.to_par}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.completion_time ? (
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {player.completion_time}
                            </div>
                          ) : (
                            'N/A'
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Completion Times Analysis */}
          {roundAnalysis[selectedRound].completion_times.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-blue-50">
              <h4 className="text-sm font-medium text-blue-900 mb-3">Completion Time Analysis</h4>
              <div className="text-sm text-blue-800">
                <p>Players completed this round between:</p>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Earliest:</span> {roundAnalysis[selectedRound].completion_times[0]}
                  </div>
                  <div>
                    <span className="font-medium">Latest:</span> {roundAnalysis[selectedRound].completion_times[roundAnalysis[selectedRound].completion_times.length - 1]}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Analysis covers {rounds.length} rounds with detailed performance metrics
      </div>
    </div>
  );
};

export default LPGARoundAnalysis;
