'use client';

import { useState, useEffect } from 'react';
import { getTranslation, getCurrentLanguage, type TranslationKeys } from '@/lib/translations';

export function useTranslation() {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Get initial language
    setCurrentLang(getCurrentLanguage());

    // Listen for language changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'jss-pref') {
        setCurrentLang(e.newValue || 'en');
      }
    };

    // Listen for custom language change events
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.language) {
        setCurrentLang(e.detail.language);
      }
    };

    // Listen for JigsawStack translation events
    const handleJigsawStackChange = () => {
      const savedLang = localStorage.getItem('jss-pref');
      if (savedLang && savedLang !== currentLang) {
        setCurrentLang(savedLang);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    // Poll for JigsawStack changes (fallback)
    const interval = setInterval(handleJigsawStackChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
      clearInterval(interval);
    };
  }, [currentLang]);

  const t = (key: keyof TranslationKeys): string => {
    return getTranslation(currentLang, key);
  };

  return { t, currentLang };
}
