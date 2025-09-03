'use client';

import React from 'react';
import Link from 'next/link';
import { TrophyIcon } from '@heroicons/react/24/outline';

const LPGANavigation: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrophyIcon className="w-6 h-6" />
            <div>
              <h3 className="font-semibold text-lg">LPGA Live Scoring</h3>
              <p className="text-blue-100 text-sm">Real-time tournament updates</p>
            </div>
          </div>
          
          <Link 
            href="/leaderboard"
            className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors duration-200 shadow-sm"
          >
            View Dashboard
          </Link>
        </div>
        
        <div className="mt-3 text-blue-100 text-sm">
          <span className="font-medium">34 tournaments</span> • Live leaderboards • Season analytics
        </div>
      </div>
    </div>
  );
};

export default LPGANavigation;
