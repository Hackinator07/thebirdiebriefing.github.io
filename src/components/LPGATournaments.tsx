'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CalendarIcon, TrophyIcon, UsersIcon } from '@heroicons/react/24/outline';

interface Tournament {
  id: number;
  espn_id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  season_year: number;
}

interface LPGATournamentsProps {
  onTournamentSelect?: (espnId: string) => void;
  selectedTournamentForAnalysis?: string | null;
}

interface TournamentStatus {
  tournament_id: string;
  tournament_name: string;
  status: string;
  start_date: string;
  end_date: string;
  players_count: number;
  rounds_completed: number;
  total_rounds: number;
  progress_percentage: number;
}

const LPGATournaments: React.FC<LPGATournamentsProps> = ({ onTournamentSelect, selectedTournamentForAnalysis }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);
  const [tournamentStatus, setTournamentStatus] = useState<TournamentStatus | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [tournamentWinners, setTournamentWinners] = useState<{ [key: string]: string }>({});

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8585';

  useEffect(() => {
    fetchTournaments();
  }, []);

  // Fetch winners for completed tournaments after tournaments are loaded
  useEffect(() => {
    if (tournaments.length > 0) {
      tournaments.forEach(tournament => {
        if (tournament.status === 'completed') {
          fetchTournamentWinner(tournament.espn_id);
        }
      });
    }
  }, [tournaments]);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/tournaments`);
      if (!response.ok) throw new Error('Failed to fetch tournaments');
      
      const data = await response.json();
      setTournaments(data.tournaments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tournaments');
    } finally {
      setLoading(false);
    }
  };

  const refreshTournament = async (espnId: string) => {
    try {
      setRefreshing(true);
      const response = await fetch(`${API_BASE}/tournament/${espnId}/refresh`);
      if (!response.ok) throw new Error('Failed to refresh tournament');
      
      const data = await response.json();
      
      
      // Refresh the tournaments list to get updated status
      await fetchTournaments();
      
      // Also refresh the winner information
      if (data.current_status === 'completed') {
        fetchTournamentWinner(espnId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh tournament');
    } finally {
      setRefreshing(false);
    }
  };

  const fetchTournamentStatus = async (espnId: string) => {
    try {
      const response = await fetch(`${API_BASE}/tournament/${espnId}/status`);
      if (!response.ok) throw new Error('Failed to fetch tournament status');
      
      const data = await response.json();
      setTournamentStatus(data.status_info);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tournament status');
    }
  };

  const fetchTournamentWinner = async (espnId: string) => {
    try {
      const response = await fetch(`${API_BASE}/tournament/${espnId}/leaderboard`);
      if (!response.ok) throw new Error('Failed to fetch tournament leaderboard');
      
      const data = await response.json();
      if (data.leaderboard && data.leaderboard.length > 0) {
        // Find the player with position 1 (winner)
        const winner = data.leaderboard.find((player: any) => player.position === 1);
        if (winner) {
          setTournamentWinners(prev => ({
            ...prev,
            [espnId]: winner.player_name
          }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch tournament winner:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'scheduled':
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
      default:
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleTournamentClick = (espnId: string) => {
    if (selectedTournament === espnId) {
      setSelectedTournament(null);
      setTournamentStatus(null);
      onTournamentSelect?.(espnId); // Notify parent of selection
    } else {
      setSelectedTournament(espnId);
      fetchTournamentStatus(espnId);
      fetchTournamentWinner(espnId); // Fetch winner when tournament is selected
      onTournamentSelect?.(espnId); // Notify parent of selection
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="text-orange-800">
            <p className="font-medium">Error loading tournaments</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="mb-8">
         <h1 className="text-3xl font-bold text-primary-800 mb-2 font-heading">LPGA Tournaments 2025</h1>
         <div className="flex items-center space-x-4 text-secondary-600">
           <span className="text-sm font-medium">Tournament: 401734753</span>
           <span>Live Tournament Tracking and scoring updates</span>
         </div>
       </div>

             {/* Tournament Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {tournaments.map((tournament) => (
           <div
             key={tournament.id}
             className="bg-white rounded-lg shadow-brand border border-primary-200 hover:shadow-lg transition-shadow duration-200"
           >
             {/* Tournament Header */}
             <div className="p-6">
               <div className="flex items-start justify-between mb-4">
                 <div className="flex-1">
                   <h3 className="text-lg font-semibold text-primary-800 mb-2 line-clamp-2">
                     {tournament.name}
                   </h3>
                   <div className="flex items-center space-x-2 text-sm text-secondary-600 mb-3">
                     <CalendarIcon className="w-4 h-4" />
                     <span>{formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}</span>
                   </div>
                 </div>
                 <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(tournament.status)}`}>
                   {getStatusIcon(tournament.status)}
                   <span className="capitalize">{tournament.status.replace('_', ' ')}</span>
                 </div>
               </div>

               {/* Action Buttons */}
               <div className="flex flex-col space-y-2">
                 <div className="flex space-x-2">
                   <button
                     onClick={() => handleTournamentClick(tournament.espn_id)}
                     className="flex-1 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                     style={{
                       backgroundColor: '#ad345a',
                       ':hover': { backgroundColor: '#8a2a48' }
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.backgroundColor = '#8a2a48';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.backgroundColor = '#ad345a';
                     }}
                   >
                     {selectedTournament === tournament.espn_id ? 'Hide Details' : 'View Details'}
                   </button>
                   <button
                     onClick={() => refreshTournament(tournament.espn_id)}
                     disabled={refreshing}
                     className="bg-secondary-100 text-secondary-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary-200 transition-colors duration-200 disabled:opacity-50"
                   >
                     {refreshing ? '...' : 'Refresh'}
                   </button>
                 </div>
                                   <button
                    onClick={() => {
                      if (selectedTournamentForAnalysis === tournament.espn_id) {
                        // Deselect if already selected
                        onTournamentSelect?.(null);
                      } else {
                        // Select if not selected
                        onTournamentSelect?.(tournament.espn_id);
                      }
                    }}
                    className="w-full text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    style={{
                      backgroundColor: selectedTournamentForAnalysis === tournament.espn_id ? '#6b6b6b' : '#355743',
                      ':hover': { backgroundColor: selectedTournamentForAnalysis === tournament.espn_id ? '#6b6b6b' : '#2a4535' }
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTournamentForAnalysis !== tournament.espn_id) {
                        e.currentTarget.style.backgroundColor = '#2a4535';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTournamentForAnalysis !== tournament.espn_id) {
                        e.currentTarget.style.backgroundColor = '#355743';
                      }
                    }}
                  >
                    {selectedTournamentForAnalysis === tournament.espn_id ? 'Selected for Analysis' : 'Select for Analysis'}
                  </button>
               </div>
             </div>

             {/* Tournament Details - Now expands within the card */}
             {selectedTournament === tournament.espn_id && tournamentStatus && (
               <div className="border-t border-primary-200 bg-primary-50">
                 <div className="p-6">
                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <span className="text-sm font-medium text-primary-700">Tournament Rounds</span>
                       <span className="text-sm text-primary-900">{tournamentStatus.rounds_completed}/{tournamentStatus.total_rounds} completed</span>
                     </div>
                     
                     {/* Progress Bar */}
                     <div className="w-full bg-primary-200 rounded-full h-2">
                       <div
                         className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                         style={{ width: `${tournamentStatus.progress_percentage}%` }}
                       ></div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4 text-sm">
                       <div>
                         <span className="text-primary-600">Players:</span>
                         <span className="ml-2 font-medium text-primary-900">{tournamentStatus.players_count}</span>
                       </div>
                       <div>
                         <span className="text-primary-600">Status:</span>
                         <span className="ml-2 font-medium text-primary-900 capitalize">{tournamentStatus.status.replace('_', ' ')}</span>
                       </div>
                     </div>
                     
                     {/* Winner Information */}
                     {tournament.status === 'completed' && tournamentWinners[tournament.espn_id] && (
                       <div className="border-t border-primary-200 pt-4">
                         <div className="flex items-center space-x-2">
                           <TrophyIcon className="w-5 h-5 text-golden-600" />
                           <span className="text-sm font-medium text-primary-700">Winner:</span>
                           <span className="text-sm font-semibold text-black">{tournamentWinners[tournament.espn_id]}</span>
                         </div>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             )}
           </div>
         ))}
       </div>

      {/* Summary Stats */}
      <div className="mt-12 bg-white rounded-lg shadow-brand border border-primary-200 p-6">
        <h2 className="text-xl font-semibold text-primary-800 mb-4 font-heading">Season Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{tournaments.length}</div>
            <div className="text-sm text-secondary-600">Total Tournaments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-golden-600">
              {tournaments.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-secondary-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {tournaments.filter(t => t.status === 'in_progress').length}
            </div>
            <div className="text-sm text-secondary-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600">
              {tournaments.filter(t => t.status === 'scheduled').length}
            </div>
            <div className="text-sm text-secondary-600">Scheduled</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPGATournaments;
