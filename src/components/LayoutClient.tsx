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
  const [hasVisitedHomepage, setHasVisitedHomepage] = useState(false);
  const pathname = usePathname();
  
  // Only show scorecard widget on homepage
  const isHomepage = pathname === '/';

  const handleToggleScores = () => {
    setIsScoresOpen(!isScoresOpen);
  };

  // Set scorecard state based on homepage status
  useEffect(() => {
    if (isHomepage) {
      // Scorecard remains collapsed by default - no auto-open behavior
      setHasVisitedHomepage(true);
    } else {
      setIsScoresOpen(false);
    }
  }, [isHomepage, hasVisitedHomepage]);

  return (
    <>
      <Header 
        isScoresOpen={isScoresOpen}
        onToggleScores={isHomepage ? handleToggleScores : undefined}
      />
      <main>{children}</main>
      {isHomepage && (
        <TournamentScoresWidget
          tournamentId="401734778"
          tournamentName="Kroger Queen City Championship"
          isOpen={isScoresOpen}
          onToggle={handleToggleScores}
        />
      )}
    </>
  );
}
