'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import TournamentScoresWidget from './TournamentScoresWidget';

interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [isScoresOpen, setIsScoresOpen] = useState(false);
  const pathname = usePathname();
  
  // Only show scorecard widget on homepage
  const isHomepage = pathname === '/';

  const handleToggleScores = () => {
    setIsScoresOpen(!isScoresOpen);
  };

  // Note: Widget stays open when navigating between pages

  return (
    <>
      <Header 
        isScoresOpen={isScoresOpen}
        onToggleScores={handleToggleScores}
      />
      <main>{children}</main>
      <TournamentScoresWidget
        tournamentId="401734778"
        tournamentName="Kroger Queen City Championship"
        isOpen={isScoresOpen}
        onToggle={handleToggleScores}
        showToggleButton={isHomepage}
      />
    </>
  );
}
