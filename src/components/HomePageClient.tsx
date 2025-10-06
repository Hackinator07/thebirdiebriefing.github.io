'use client';

import { useState } from 'react';
import TournamentScoresWidget from './TournamentScoresWidget';

interface HomePageClientProps {
  children: React.ReactNode;
}

export default function HomePageClient({ children }: HomePageClientProps) {
  const [isScoresOpen, setIsScoresOpen] = useState(false);

  const handleToggleScores = () => {
    setIsScoresOpen(!isScoresOpen);
  };

  return (
    <>
      {children}
      <TournamentScoresWidget
        tournamentId="401734781"
        tournamentName="Buick LPGA Shanghai"
        isOpen={isScoresOpen}
        onToggle={handleToggleScores}
      />
    </>
  );
}
