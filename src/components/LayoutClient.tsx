'use client';

import { useState } from 'react';
import Header from './Header';
import TournamentScoresWidget from './TournamentScoresWidget';

interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [isScoresOpen, setIsScoresOpen] = useState(true);

  const handleToggleScores = () => {
    setIsScoresOpen(!isScoresOpen);
  };

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
      />
    </>
  );
}
