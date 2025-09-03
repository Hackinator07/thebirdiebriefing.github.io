'use client';

import React, { useState } from 'react';
import { 
  TrophyIcon, 
  ChartBarIcon, 
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import LPGATournaments from './LPGATournaments';
import LPGALeaderboard from './LPGALeaderboard';
import LPGASeasonAnalytics from './LPGASeasonAnalytics';
import LPGADetailedStats from './LPGADetailedStats';
import LPGARoundAnalysis from './LPGARoundAnalysis';
import LPGAPlayerProgress from './LPGAPlayerProgress';

type TabType = 'tournaments' | 'leaderboard' | 'analytics' | 'detailed_stats' | 'round_analysis' | 'player_progress';

const LPGADashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('tournaments');
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  // Handle tournament selection for analysis - store selection without auto-redirect
  const handleTournamentSelect = (espnId: string | null) => {
    setSelectedTournament(espnId);
    // No automatic tab switching - user can navigate manually when ready
  };

  const tabs = [
    {
      id: 'tournaments' as TabType,
      name: 'Tournaments',
      icon: CalendarIcon,
      description: 'Tournament schedule and status'
    },
    {
      id: 'leaderboard' as TabType,
      name: 'Live Leaderboard',
      icon: TrophyIcon,
      description: 'Real-time scoring and results'
    },
    {
      id: 'detailed_stats' as TabType,
      name: 'Detailed Stats',
      icon: ChartBarIcon,
      description: 'Player statistics and round data'
    },
    {
      id: 'round_analysis' as TabType,
      name: 'Round Analysis',
      icon: ChartPieIcon,
      description: 'Round-by-round performance analysis'
    },
    {
      id: 'player_progress' as TabType,
      name: 'Player Progress',
      icon: UserGroupIcon,
      description: 'Individual player tournament progress'
    },
    {
      id: 'analytics' as TabType,
      name: 'Season Analytics',
      icon: UsersIcon,
      description: 'Performance insights and statistics'
    }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'tournaments':
        return <LPGATournaments onTournamentSelect={handleTournamentSelect} selectedTournamentForAnalysis={selectedTournament} />;
      case 'leaderboard':
        return <LPGALeaderboard 
          selectedTournament={selectedTournament} 
          onBackToTournaments={() => setActiveTab('tournaments')} 
        />;
      case 'detailed_stats':
        return <LPGADetailedStats selectedTournament={selectedTournament} />;
      case 'round_analysis':
        return <LPGARoundAnalysis selectedTournament={selectedTournament} />;
      case 'player_progress':
        return <LPGAPlayerProgress selectedTournament={selectedTournament} />;
      case 'analytics':
        return <LPGASeasonAnalytics />;
      default:
        return <LPGATournaments onTournamentSelect={handleTournamentSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white shadow-brand border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrophyIcon className="w-8 h-8 text-primary-600" />
                <h1 className="text-2xl font-bold text-primary-800 font-heading">LPGA Dashboard</h1>
              </div>
              <span className="text-sm text-primary-700 bg-primary-50 px-2 py-1 rounded-full border border-primary-200">
                2025 Season
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {selectedTournament && (
                <div className="text-sm text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
                  Tournament: {selectedTournament}
                </div>
              )}
              <div className="text-sm text-secondary-600">
                Live Tournament Tracking
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-600 hover:text-primary-700 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </div>
                  <div className="text-xs mt-1 text-secondary-500">
                    {tab.description}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {renderActiveTab()}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-primary-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-secondary-600">
            <p className="text-sm">
              LPGA Tournament Data powered by ESPN API • Real-time updates every refresh
            </p>
            <p className="text-xs mt-2">
              Enhanced with detailed statistics, round analysis, and player progress tracking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPGADashboard;
