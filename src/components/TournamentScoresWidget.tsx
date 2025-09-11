'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Trophy, Clock, Search, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Player {
  id: string;
  name: string;
  position: number;
  tiedPosition?: string;
  totalScore: number;
  round1?: number;
  round2?: number;
  round3?: number;
  round4?: number;
  today?: number;
  status: 'active' | 'cut' | 'wd';
  country?: string;
  teeTime?: string;
}

interface TournamentData {
  id: string;
  name: string;
  shortName: string;
  status: string;
  players: Player[];
  currentRound: number;
  lastUpdated: string;
}

interface TournamentScoresWidgetProps {
  tournamentId?: string;
  tournamentName?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function TournamentScoresWidget({
  tournamentId = '401734778',
  tournamentName = 'Kroger Queen City Championship',
  isOpen,
  onToggle
}: TournamentScoresWidgetProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [tournamentData, setTournamentData] = useState<TournamentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Country name to 3-letter code mapping
  const countryCodeMap: { [key: string]: string } = {
    'United States': 'USA',
    'Thailand': 'THA',
    'Japan': 'JPN',
    'England': 'ENG',
    'Scotland': 'SCO',
    'Norway': 'NOR',
    'Belgium': 'BEL',
    'South Korea': 'KOR',
    'China': 'CHN',
    'Sweden': 'SWE',
    'Philippines': 'PHI',
    'Canada': 'CAN',
    'Australia': 'AUS',
    'Germany': 'GER',
    'France': 'FRA',
    'Spain': 'ESP',
    'Italy': 'ITA',
    'Netherlands': 'NED',
    'Denmark': 'DEN',
    'Finland': 'FIN',
    'Ireland': 'IRL',
    'New Zealand': 'NZL',
    'South Africa': 'RSA',
    'Mexico': 'MEX',
    'Brazil': 'BRA',
    'Argentina': 'ARG',
    'Colombia': 'COL',
    'Venezuela': 'VEN',
    'Chile': 'CHI',
    'Peru': 'PER',
    'Ecuador': 'ECU',
    'Paraguay': 'PAR',
    'Uruguay': 'URU',
    'Bolivia': 'BOL',
    'India': 'IND',
    'Indonesia': 'INA',
    'Malaysia': 'MAS',
    'Singapore': 'SIN',
    'Taiwan': 'TPE',
    'Hong Kong': 'HKG',
    'Vietnam': 'VIE',
    'Myanmar': 'MYA',
    'Cambodia': 'CAM',
    'Laos': 'LAO',
    'Brunei': 'BRU',
    'Timor-Leste': 'TLS',
    'Papua New Guinea': 'PNG',
    'Fiji': 'FIJ',
    'Samoa': 'SAM',
    'Tonga': 'TGA',
    'Vanuatu': 'VAN',
    'Solomon Islands': 'SOL',
    'Palau': 'PLW',
    'Marshall Islands': 'MHL',
    'Micronesia': 'FSM',
    'Kiribati': 'KIR',
    'Nauru': 'NRU',
    'Tuvalu': 'TUV'
  };

  const getCountryCode = (countryName: string): string => {
    return countryCodeMap[countryName] || countryName.substring(0, 3).toUpperCase();
  };

  // Fetch tournament data from ESPN API
  const fetchTournamentData = useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/golf/lpga/scoreboard/${tournamentId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch tournament data: ${response.status}`);
        }

        const data = await response.json();
        
        // Debug: Log the API response
        console.log('ESPN API Response:', {
          tournamentName: data.name,
          competitionCount: data.competitions?.length,
          timestamp: new Date().toISOString()
        });
        
        // Validate the response structure
        if (!data || !data.competitions || !Array.isArray(data.competitions)) {
          throw new Error('Invalid API response structure');
        }
      
      // Parse the ESPN API response
      const competition = data.competitions?.[0];
      if (!competition) {
        throw new Error('No competition data found');
      }
      
      const players: Player[] = competition.competitors?.map((competitor: any, index: number) => {
        try {
        const athlete = competitor.athlete;
        const linescores = competitor.linescores || [];
        
        // Debug: Log raw data for first few players
        if (index < 3) {
          console.log(`Player ${index + 1} Raw Data:`, {
            name: athlete.displayName,
            competitorScore: competitor.score,
            linescores: linescores.map((ls: any) => ({
              displayValue: ls.displayValue,
              value: ls.value,
              period: ls.period
            }))
          });
        }
        
        // Parse round scores from displayValue (current score for each round)
        const round1 = linescores[0]?.displayValue ? 
          (linescores[0].displayValue === 'E' ? 0 : parseInt(linescores[0].displayValue)) : undefined;
        const round2 = linescores[1]?.displayValue ? 
          (linescores[1].displayValue === 'E' ? 0 : parseInt(linescores[1].displayValue)) : undefined;
        const round3 = linescores[2]?.displayValue ? 
          (linescores[2].displayValue === 'E' ? 0 : parseInt(linescores[2].displayValue)) : undefined;
        const round4 = linescores[3]?.displayValue ? 
          (linescores[3].displayValue === 'E' ? 0 : parseInt(linescores[3].displayValue)) : undefined;

        // Calculate total score by summing all completed round scores
        const roundScores = [round1, round2, round3, round4].filter(score => score !== undefined);
        const totalScore = roundScores.length > 0 ? 
          roundScores.reduce((sum, score) => sum + (score || 0), 0) : 0;
        
        // Get current round score (TODAY) - this should be the score for the current round only
        // We'll determine which round to show based on the tournament's current round
        const tournamentCurrentRound = competition.status?.period || 1;
        let today: number | undefined;
        
        if (tournamentCurrentRound === 1 && round1 !== undefined) {
          today = round1;
        } else if (tournamentCurrentRound === 2 && round2 !== undefined) {
          today = round2;
        } else if (tournamentCurrentRound === 3 && round3 !== undefined) {
          today = round3;
        } else if (tournamentCurrentRound === 4 && round4 !== undefined) {
          today = round4;
        } else {
          // Fallback to the last available round
          const currentRound = linescores[linescores.length - 1];
          today = currentRound?.displayValue ? 
            (currentRound.displayValue === 'E' ? 0 : parseInt(currentRound.displayValue)) : undefined;
        }
        
        return {
          id: competitor.id || athlete.id || index.toString(),
          name: athlete.displayName || athlete.fullName,
          position: competitor.order || index + 1,
          totalScore,
          round1,
          round2,
          round3,
          round4,
          today,
          status: 'active' as const,
          country: athlete.flag?.alt ? getCountryCode(athlete.flag.alt) : undefined,
          teeTime: undefined
        };
        } catch (error) {
          console.error('Error parsing player data:', error, competitor);
          // Return a fallback player object
          return {
            id: competitor.id || index.toString(),
            name: competitor.athlete?.displayName || 'Unknown Player',
            position: competitor.order || index + 1,
            totalScore: 0,
            status: 'active' as const,
            country: competitor.athlete?.flag?.alt ? getCountryCode(competitor.athlete.flag.alt) : undefined
          };
        }
      }) || [];
      
        // Sort players by total score (ascending - lower scores first)
        const sortedPlayers = players.sort((a, b) => a.totalScore - b.totalScore);
        
        // Apply tied position logic
        const playersWithTiedPositions = sortedPlayers.map((player, index) => {
          // Find the first occurrence of this score to determine position
          const firstOccurrenceIndex = sortedPlayers.findIndex(p => p.totalScore === player.totalScore);
          const position = firstOccurrenceIndex + 1;
          
          // Check if there are multiple players with the same score
          const sameScoreCount = sortedPlayers.filter(p => p.totalScore === player.totalScore).length;
          
          return {
            ...player,
            position: position,
            tiedPosition: sameScoreCount > 1 ? `T${position}` : `${position}`
          };
        });

        const tournamentInfo: TournamentData = {
          id: data.id,
          name: data.name,
          shortName: data.shortName,
          status: competition.status?.type?.description || 'Unknown',
          players: playersWithTiedPositions,
          currentRound: competition.status?.period || 1,
          lastUpdated: new Date().toISOString()
        };
      
        // Debug: Log the processed tournament data
        console.log('Processed Tournament Data:', {
          name: tournamentInfo.name,
          playerCount: tournamentInfo.players.length,
          currentRound: tournamentInfo.currentRound,
          topPlayers: tournamentInfo.players.slice(0, 5).map(p => ({
            name: p.name,
            position: p.tiedPosition,
            totalScore: p.totalScore,
            today: p.today,
            round1: p.round1,
            round2: p.round2,
            round3: p.round3,
            round4: p.round4,
            calculatedTotal: [p.round1, p.round2, p.round3, p.round4].filter(s => s !== undefined).reduce((sum, s) => sum + (s || 0), 0)
          })),
          lastUpdated: tournamentInfo.lastUpdated
        });
      
      setTournamentData(tournamentInfo);
      setLastRefresh(new Date());
      
    } catch (err) {
      console.error('Error fetching tournament data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load tournament data');
      } finally {
        setIsLoading(false);
      }
    }, [tournamentId]);

  // Initial data fetch
  useEffect(() => {
    if (isOpen) {
      fetchTournamentData();
    }
  }, [fetchTournamentData, isOpen]);

  // Auto-refresh every 30 seconds when widget is open
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      fetchTournamentData();
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, [isOpen, fetchTournamentData]);

  const formatScore = (score: number) => {
    if (score === 0) return 'E';
    return score > 0 ? `+${score}` : `${score}`;
  };

  const getScoreColor = (score: number) => {
    if (score < 0) return 'text-red-600';
    if (score > 0) return 'text-gray-600';
    return 'text-gray-500';
  };

  // Filter players based on search query
  const getFilteredPlayers = () => {
    if (!tournamentData?.players) return [];
    
    if (!searchQuery.trim()) {
      return tournamentData.players.slice(0, 9);
    }
    
    return tournamentData.players.filter(player => 
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (player.country && player.country.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Search is already handled by the input change, but we can add additional logic here if needed
      e.preventDefault();
    }
  };

  const tabs = [
    { id: 'leaderboard', label: t('leaderboard'), icon: Trophy },
    { id: 'rounds', label: t('rounds'), icon: Clock },
    { id: 'search', label: t('search'), icon: Search },
  ];

  // Clear search when switching tabs
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId !== 'search') {
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed z-30 bg-primary-500 hover:bg-primary-600 text-white shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'top-[65px] right-80 sm:right-80 p-1 sm:p-2' 
            : 'top-[65px] right-0 p-1 sm:p-2'
        }`}
        aria-label={isOpen ? 'Close scores' : 'Open scores'}
      >
        <div className="flex flex-col items-center gap-0.5 sm:gap-1">
          <div className="px-1 sm:px-2 py-0.5 sm:py-1">
            <div className="text-[10px] sm:text-[12px] font-medium leading-tight" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              Scorecard
            </div>
          </div>
          {isOpen ? (
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 font-bold" />
          ) : (
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 font-bold" />
          )}
        </div>
      </button>

      {/* Scores Widget Panel */}
      <div
        className={`fixed top-16 right-0 h-auto max-h-[70vh] sm:max-h-[60vh] w-80 max-w-[calc(100vw-2rem)] bg-white shadow-2xl z-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-primary-500 text-white p-1.5 sm:p-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[9px] sm:text-[10px] font-bold opacity-90 break-words leading-tight flex-1 pr-2">
              {tournamentData?.name || tournamentName}
            </p>
            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              <button
                onClick={fetchTournamentData}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label={t('refreshScores')}
                disabled={isLoading}
              >
                <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              {lastRefresh && (
                <span className="text-[8px] sm:text-[10px] opacity-75 hidden xs:inline">
                  {lastRefresh.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          {tournamentData?.status && (
            <p className="text-[8px] sm:text-[10px] opacity-75 mt-1 break-words leading-tight">
              {tournamentData.status} • Round {tournamentData.currentRound}
            </p>
          )}
          <p className="text-[8px] sm:text-[10px] opacity-60 mt-1 break-words leading-tight">
            Note: Thru-hole data not currently available
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-0.5 sm:gap-1 py-1 sm:py-1.5 px-0.5 sm:px-1 text-[8px] sm:text-[10px] font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                <span className="hidden xs:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'leaderboard' && (
            <div className="overflow-y-auto">
              {error ? (
                <div className="flex flex-col items-center justify-center h-16 p-2">
                  <div className="text-red-500 text-center">
                    <p className="font-medium mb-1 text-xs">Unable to load scores</p>
                    <p className="text-xs text-gray-600 mb-2">{error}</p>
                    <button
                      onClick={fetchTournamentData}
                      className="bg-primary-500 text-white px-2 py-1 rounded text-xs hover:bg-primary-600 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex items-center justify-center h-16">
                  <RefreshCw className="w-3 h-3 animate-spin text-primary-500" />
                  <span className="ml-2 text-gray-600 text-xs">Loading scores...</span>
                </div>
              ) : tournamentData?.players ? (
                <div className="p-0.5 sm:p-1">
                  {/* Column Headers */}
                  <div className="grid grid-cols-[0.8fr_2fr_0.8fr_0.8fr] sm:grid-cols-[1fr_2fr_1fr_1fr] gap-0.5 sm:gap-1 text-[8px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 pb-1 border-b border-gray-200">
                    <div>{t('pos')}</div>
                    <div>{t('player')}</div>
                    <div className="text-center">{t('score')}</div>
                    <div className="text-center">{t('today')}</div>
                  </div>
                  
                  {/* Player Rows */}
                  <div className="space-y-0">
                    {tournamentData.players.slice(0, 9).map((player) => (
                      <div
                        key={player.id}
                        className="grid grid-cols-[0.8fr_2fr_0.8fr_0.8fr] sm:grid-cols-[1fr_2fr_1fr_1fr] gap-0.5 sm:gap-1 items-center p-0.5 hover:bg-gray-50 rounded transition-colors min-h-[18px] sm:min-h-[20px]"
                      >
                        <div className="flex-shrink-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-[8px] sm:text-[10px] font-bold">
                          {player.tiedPosition || player.position}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-[8px] sm:text-[10px] truncate">{player.name}</p>
                          {player.country && (
                            <span className="text-[8px] sm:text-[10px] text-gray-500 truncate block">{player.country}</span>
                          )}
                        </div>
                        <div className="text-center">
                          <p className={`font-bold text-[8px] sm:text-[10px] ${getScoreColor(player.totalScore)}`}>
                            {formatScore(player.totalScore)}
                          </p>
                        </div>
                        <div className="text-center">
                          {player.today !== undefined ? (
                            <p className={`font-medium text-[8px] sm:text-[10px] ${getScoreColor(player.today)}`}>
                              {formatScore(player.today)}
                            </p>
                          ) : (
                            <span className="text-gray-400 text-[8px] sm:text-[10px]">-</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-16">
                  <p className="text-gray-500 text-xs">No tournament data available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'rounds' && (
            <div className="overflow-y-auto">
              {error ? (
                <div className="flex flex-col items-center justify-center h-16 p-2">
                  <div className="text-red-500 text-center">
                    <p className="font-medium mb-1 text-xs">Unable to load scores</p>
                    <p className="text-xs text-gray-600 mb-2">{error}</p>
                    <button
                      onClick={fetchTournamentData}
                      className="bg-primary-500 text-white px-2 py-1 rounded text-xs hover:bg-primary-600 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex items-center justify-center h-16">
                  <RefreshCw className="w-3 h-3 animate-spin text-primary-500" />
                  <span className="ml-2 text-gray-600 text-xs">Loading scores...</span>
                </div>
              ) : tournamentData?.players ? (
                <div className="p-0.5 sm:p-1">
                  {/* Column Headers */}
                  <div className="grid grid-cols-[2fr_0.4fr_0.4fr_0.4fr_0.4fr] sm:grid-cols-[2fr_0.5fr_0.5fr_0.5fr_0.5fr] gap-0.5 sm:gap-1 text-[8px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 pb-1 border-b border-gray-200">
                    <div>{t('player')}</div>
                    <div className="text-center">{t('r1')}</div>
                    <div className="text-center">{t('r2')}</div>
                    <div className="text-center">{t('r3')}</div>
                    <div className="text-center">{t('r4')}</div>
                  </div>
                  
                  {/* Player Rows */}
                  <div className="space-y-0">
                    {tournamentData.players.slice(0, 9).map((player) => (
                      <div
                        key={player.id}
                        className="grid grid-cols-[2fr_0.4fr_0.4fr_0.4fr_0.4fr] sm:grid-cols-[2fr_0.5fr_0.5fr_0.5fr_0.5fr] gap-0.5 sm:gap-1 items-center p-0.5 hover:bg-gray-50 rounded transition-colors min-h-[18px] sm:min-h-[20px]"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-[8px] sm:text-[10px] truncate">{player.name}</p>
                          {player.country && (
                            <span className="text-[8px] sm:text-[10px] text-gray-500 truncate block">{player.country}</span>
                          )}
                        </div>
                        <div className="text-center">
                          <p className={`font-medium text-[8px] sm:text-[10px] ${getScoreColor(player.round1 || 0)}`}>
                            {player.round1 !== undefined ? formatScore(player.round1) : '-'}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className={`font-medium text-[8px] sm:text-[10px] ${getScoreColor(player.round2 || 0)}`}>
                            {player.round2 !== undefined ? formatScore(player.round2) : '-'}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className={`font-medium text-[8px] sm:text-[10px] ${getScoreColor(player.round3 || 0)}`}>
                            {player.round3 !== undefined ? formatScore(player.round3) : '-'}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className={`font-medium text-[8px] sm:text-[10px] ${getScoreColor(player.round4 || 0)}`}>
                            {player.round4 !== undefined ? formatScore(player.round4) : '-'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-16">
                  <p className="text-gray-500 text-xs">No tournament data available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'search' && (
            <div className="overflow-y-auto">
              {error ? (
                <div className="flex flex-col items-center justify-center h-16 p-2">
                  <div className="text-red-500 text-center">
                    <p className="font-medium mb-1 text-xs">Unable to load scores</p>
                    <p className="text-xs text-gray-600 mb-2">{error}</p>
                    <button
                      onClick={fetchTournamentData}
                      className="bg-primary-500 text-white px-2 py-1 rounded text-xs hover:bg-primary-600 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex items-center justify-center h-16">
                  <RefreshCw className="w-3 h-3 animate-spin text-primary-500" />
                  <span className="ml-2 text-gray-600 text-xs">Loading scores...</span>
                </div>
              ) : tournamentData?.players ? (
                <div className="p-0.5 sm:p-1">
                  {/* Search Input */}
                  <div className="mb-1">
                    <input
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyPress={handleSearchKeyPress}
                      className="w-full px-1 py-1 text-[8px] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent h-[29.2px]"
                    />
                  </div>
                  
                  {/* Column Headers */}
                  <div className="grid grid-cols-[2fr_0.8fr] sm:grid-cols-[2fr_1fr] gap-0.5 sm:gap-1 text-[8px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 pb-1 border-b border-gray-200">
                    <div>{t('player')}</div>
                    <div className="text-center">{t('score')}</div>
                  </div>
                  
                  {/* Player Rows - Show only 8 players to account for search input */}
                  <div className="space-y-0">
                    {getFilteredPlayers().length > 0 ? (
                      getFilteredPlayers().slice(0, 8).map((player) => (
                        <div
                          key={player.id}
                          className="grid grid-cols-[2fr_0.8fr] sm:grid-cols-[2fr_1fr] gap-0.5 sm:gap-1 items-center p-0.5 hover:bg-gray-50 rounded transition-colors min-h-[18px] sm:min-h-[20px] cursor-pointer"
                        >
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-[8px] sm:text-[10px] truncate">{player.name}</p>
                            {player.country && (
                              <span className="text-[8px] sm:text-[10px] text-gray-500 truncate block">{player.country}</span>
                            )}
                          </div>
                          <div className="text-center">
                            <p className={`font-bold text-[8px] sm:text-[10px] ${getScoreColor(player.totalScore)}`}>
                              {formatScore(player.totalScore)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <p className="text-gray-500 text-[8px] sm:text-[10px]">
                          {searchQuery.trim() ? 'No players found' : 'No tournament data available'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-16">
                  <p className="text-gray-500 text-xs">No tournament data available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </>
  );
}
