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
        tournamentId="401734779"
        tournamentName="Kroger Queen City Championship"
        isOpen={isScoresOpen}
        onToggle={handleToggleScores}
      />
    </>
  );
}
