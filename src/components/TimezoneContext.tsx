'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TimezoneContextType {
  selectedTimezone: string;
  setSelectedTimezone: (timezone: string) => void;
  updateTimezone: (timezone: string) => void;
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined);

const DEFAULT_TIMEZONE = 'America/Chicago';

export function TimezoneProvider({ children }: { children: ReactNode }) {
  const [selectedTimezone, setSelectedTimezone] = useState(DEFAULT_TIMEZONE);

  useEffect(() => {
    const savedTimezone = localStorage.getItem('preferred-timezone');
    if (savedTimezone) {
      setSelectedTimezone(savedTimezone);
    }
  }, []);

  const updateTimezone = (newTimezone: string) => {
    setSelectedTimezone(newTimezone);
    localStorage.setItem('preferred-timezone', newTimezone);
  };

  return (
    <TimezoneContext.Provider value={{ selectedTimezone, setSelectedTimezone, updateTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  const context = useContext(TimezoneContext);
  if (context === undefined) {
    throw new Error('useTimezone must be used within a TimezoneProvider');
  }
  return context;
}
