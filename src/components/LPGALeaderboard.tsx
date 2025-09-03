'use client';

import React, { useState, useEffect } from 'react';
import { TrophyIcon, FlagIcon, CalendarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface LeaderboardEntry {
  position: number;
  player_name: string;
  total_score: number;
  total_to_par: number;
  rounds: {
    round: number;
    score: number;
    to_par: number;
    position: number;
  }[];
}

interface Tournament {
  id: number;
  espn_id: string;
  name: string;
  status: string;
}

interface LPGALeaderboardProps {
  selectedTournament?: string | null;
  onBackToTournaments?: () => void;
}

const LPGALeaderboard: React.FC<LPGALeaderboardProps> = ({ selectedTournament: propSelectedTournament, onBackToTournaments }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [internalSelectedTournament, setInternalSelectedTournament] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Use prop if provided, otherwise use internal state
  const selectedTournament = propSelectedTournament || internalSelectedTournament;

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8585';

  useEffect(() => {
    fetchTournaments();
  }, []);

  useEffect(() => {
    if (selectedTournament) {
      fetchLeaderboard(selectedTournament);
    }
  }, [selectedTournament]);

  const fetchTournaments = async () => {
    try {
      const response = await fetch(`${API_BASE}/tournaments`);
      if (!response.ok) throw new Error('Failed to fetch tournaments');
      
      const data = await response.json();
      setTournaments(data.tournaments);
      
      // Auto-select first tournament if none selected (only for internal state)
      if (data.tournaments.length > 0 && !propSelectedTournament && !internalSelectedTournament) {
        setInternalSelectedTournament(data.tournaments[0].espn_id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tournaments');
    }
  };

  const fetchLeaderboard = async (espnId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/tournament/${espnId}/leaderboard`);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshLeaderboard = async () => {
    if (!selectedTournament) return;
    
    try {
      setRefreshing(true);
      setError(null);
      
      // First refresh the tournament data
      const refreshResponse = await fetch(`${API_BASE}/tournament/${selectedTournament}/refresh`);
      if (!refreshResponse.ok) throw new Error('Failed to refresh tournament');
      
      // Then fetch the updated leaderboard
      await fetchLeaderboard(selectedTournament);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh leaderboard');
    } finally {
      setRefreshing(false);
    }
  };

  const getPositionColor = (position: number) => {
    if (position === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (position <= 3) return 'bg-green-100 text-green-800 border-green-200';
    if (position <= 10) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return <TrophyIcon className="w-4 h-4" />;
    return null;
  };

  const formatScore = (score: number | null) => {
    if (score === null || score === undefined) return '-';
    return score.toString();
  };

  const formatToPar = (toPar: number | null) => {
    if (toPar === null || toPar === undefined) return '-';
    if (toPar === 0) return 'E';
    if (toPar > 0) return `+${toPar}`;
    return toPar.toString();
  };

  const getToParColor = (toPar: number | null) => {
    if (toPar === null || toPar === undefined) return 'text-gray-500';
    if (toPar < 0) return 'text-green-600';
    if (toPar > 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const selectedTournamentData = tournaments.find(t => t.espn_id === selectedTournament);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-2 font-heading">Live LPGA Leaderboard</h1>
        <p className="text-secondary-600">Real-time tournament scoring and player performance</p>
      </div>

      {/* Tournament Selector */}
      <div className="bg-white rounded-lg shadow-brand border border-primary-200 p-6 mb-6">
        {propSelectedTournament && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center space-x-2">
              <TrophyIcon className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Tournament selected for analysis from Tournaments page
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <label htmlFor="tournament-select" className="block text-sm font-medium text-primary-700 mb-2">
              {propSelectedTournament ? 'Analysis Tournament' : 'Select Tournament'}
            </label>
            <select
              id="tournament-select"
              value={selectedTournament}
              onChange={(e) => {
                if (propSelectedTournament) {
                  // If tournament is selected from parent, don't allow local changes
                  return;
                }
                setInternalSelectedTournament(e.target.value);
              }}
              className={`block w-full sm:w-80 px-3 py-2 border border-primary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                propSelectedTournament ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              disabled={!!propSelectedTournament}
            >
              <option value="">Choose a tournament...</option>
              {tournaments.map((tournament) => (
                <option key={tournament.espn_id} value={tournament.espn_id}>
                  {tournament.name} ({tournament.status.replace('_', ' ')})
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-3">
                         {propSelectedTournament && onBackToTournaments && (
               <button
                 onClick={onBackToTournaments}
                 className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
               >
                 <CalendarIcon className="w-4 h-4 mr-2" />
                 Back to Tournaments
               </button>
             )}
            {selectedTournament && (
              <button
                onClick={refreshLeaderboard}
                disabled={refreshing}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary-500 hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 disabled:opacity-50"
              >
                <ArrowPathIcon className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh Leaderboard'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tournament Info */}
      {selectedTournamentData && (
        <div className="bg-white rounded-lg shadow-brand border border-primary-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary-800">{selectedTournamentData.name}</h2>
              <div className="flex items-center space-x-4 mt-2 text-sm text-secondary-600">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPositionColor(selectedTournamentData.status === 'completed' ? 1 : 0)}`}>
                  {selectedTournamentData.status.replace('_', ' ')}
                </span>
                <span className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  Tournament Status
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {selectedTournament && (
        <div className="bg-white rounded-lg shadow-brand border border-primary-200 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-orange-800">
                  <p className="font-medium">Error loading leaderboard</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="p-6 text-center">
              <div className="text-gray-500">
                <TrophyIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No leaderboard data available</p>
                <p className="text-sm">This tournament may not have started yet or no scores have been recorded.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Leaderboard Header */}
              <div className="bg-primary-50 px-6 py-4 border-b border-primary-200">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-primary-700">
                  <div className="col-span-1">Pos</div>
                  <div className="col-span-4">Player</div>
                  <div className="col-span-2 text-center">Total</div>
                  <div className="col-span-2 text-center">To Par</div>
                  <div className="col-span-3 text-center">Rounds</div>
                </div>
              </div>

                             {/* Leaderboard Rows */}
               <div className="divide-y divide-primary-200">
                 {leaderboard.map((entry, index) => {
                   // Check if this player has completed all 4 rounds
                   const hasCompletedAllRounds = entry.rounds.length === 4 && entry.rounds.every(r => r.score !== null);
                   
                   // Check if the next player has fewer rounds (indicating cut line)
                   const nextEntry = leaderboard[index + 1];
                   const nextHasCompletedAllRounds = nextEntry ? nextEntry.rounds.length === 4 && nextEntry.rounds.every(r => r.score !== null) : true;
                   
                   // Show cut line if current player has all rounds but next doesn't
                   const showCutLine = hasCompletedAllRounds && !nextHasCompletedAllRounds;
                   
                   return (
                     <React.Fragment key={index}>
                       <div className="px-6 py-4 hover:bg-primary-50 transition-colors duration-150">
                         <div className="grid grid-cols-12 gap-4 items-center">
                           {/* Position */}
                           <div className="col-span-1">
                             <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border text-sm font-medium ${getPositionColor(entry.position)}`}>
                               {getPositionIcon(entry.position)}
                               <span className="ml-1">{entry.position || 'TBD'}</span>
                             </div>
                           </div>

                           {/* Player Name */}
                           <div className="col-span-4">
                             <div className="font-medium text-gray-900">{entry.player_name}</div>
                           </div>

                           {/* Total Score */}
                           <div className="col-span-2 text-center">
                             <span className="font-medium text-gray-900">{formatScore(entry.total_score)}</span>
                           </div>

                           {/* Total To Par */}
                           <div className="col-span-2 text-center">
                             <span className={`font-medium ${getToParColor(entry.total_to_par)}`}>
                               {formatToPar(entry.total_to_par)}
                             </span>
                           </div>

                           {/* Rounds */}
                           <div className="col-span-3">
                             <div className="flex justify-center space-x-2">
                               {[1, 2, 3, 4].map((roundNum) => {
                                 const roundData = entry.rounds.find(r => r.round === roundNum);
                                 return (
                                   <div key={roundNum} className="text-center">
                                     <div className="text-xs text-gray-500">R{roundNum}</div>
                                     <div className="text-sm font-medium text-gray-900">
                                       {roundData ? formatScore(roundData.score) : '-'}
                                     </div>
                                     <div className={`text-xs ${getToParColor(roundData?.to_par ?? null)}`}>
                                       {roundData ? formatToPar(roundData.to_par) : '-'}
                                     </div>
                                   </div>
                                 );
                               })}
                             </div>
                           </div>
                         </div>
                       </div>
                       
                       {/* Cut Line */}
                       {showCutLine && (
                         <div className="border-t-4 border-orange-500 bg-orange-50">
                           <div className="px-6 py-3 text-center">
                             <div className="text-sm font-semibold text-orange-800 uppercase tracking-wide">
                               Cut Line
                             </div>
                             <div className="text-xs text-orange-600 mt-1">
                               Players below this line did not complete all 4 rounds
                             </div>
                           </div>
                         </div>
                       )}
                     </React.Fragment>
                   );
                 })}
               </div>
            </>
          )}
        </div>
      )}

      {/* No Tournament Selected */}
      {!selectedTournament && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <TrophyIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Tournament</h3>
          <p className="text-gray-500">Choose a tournament from the dropdown above to view the live leaderboard.</p>
        </div>
      )}
    </div>
  );
};

export default LPGALeaderboard;
