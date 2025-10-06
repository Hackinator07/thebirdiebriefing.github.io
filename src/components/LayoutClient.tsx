'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import TournamentScoresWidget from './TournamentScoresWidget';

interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [isScoresOpen, setIsScoresOpen] = useState(false);
  const pathname = usePathname();
  
  // Only show scorecard widget on homepage
  const isHomepage = pathname === '/';
  
  // Show vertical button on non-homepage pages when widget is expanded
  // On homepage, always show the button
  const shouldShowToggleButton = isHomepage || isScoresOpen;

  // Load widget state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('scorecard-widget-open');
    if (savedState !== null) {
      setIsScoresOpen(JSON.parse(savedState));
    }
  }, []);

  // Save widget state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('scorecard-widget-open', JSON.stringify(isScoresOpen));
  }, [isScoresOpen]);

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
      <Footer onToggleScores={handleToggleScores} />
      <TournamentScoresWidget
        tournamentId="401734781"
        tournamentName="Buick LPGA Shanghai"
        isOpen={isScoresOpen}
        onToggle={handleToggleScores}
        showToggleButton={shouldShowToggleButton}
      />
    </>
  );
}
