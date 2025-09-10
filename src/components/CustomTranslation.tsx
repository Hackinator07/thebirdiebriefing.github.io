'use client';

import { useState, useEffect, useRef } from 'react';
import { getTranslation, getCurrentLanguage, type TranslationKeys } from '@/lib/translations';
import { translationCache } from '@/lib/translationCache';

// Global window interface extension
declare global {
  interface Window {
    customTranslate: (langCode: string) => void;
  }
}

// Language configuration matching TranslationWidget
const ALLOWED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'zh', name: 'Chinese', native: '中文' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'tl', name: 'Tagalog', native: 'Tagalog' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'no', name: 'Norwegian', native: 'Norsk' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'de', name: 'German', native: 'Deutsch' },
];

export default function CustomTranslation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get current language for translations
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());
  const t = (key: keyof TranslationKeys) => getTranslation(currentLang, key);

  // Listen for language changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'jss-pref') {
        setCurrentLang(e.newValue || 'en');
      }
    };

    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.language) {
        setCurrentLang(e.detail.language);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Check for saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('jss-pref');
    if (savedLanguage && ALLOWED_LANGUAGES.some(lang => lang.code === savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Detect mobile device on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint - same as hamburger menu
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter languages based on search
  const filteredLanguages = ALLOWED_LANGUAGES.filter(lang =>
    searchTerm === '' ||
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.native.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle language selection
  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setIsOpen(false);
    setSearchTerm('');
    
    // Save language preference
    localStorage.setItem('jss-pref', langCode);
    
    // Trigger JigsawStack translation
    triggerTranslation(langCode);
  };

  // Function to trigger JigsawStack translation with fallback to direct API
  const triggerTranslation = (langCode: string) => {
    if (typeof window === 'undefined') return;
    
    setIsTranslating(true);
    setTranslationProgress(0);
    
    // Close dropdown
    setIsOpen(false);
    
    // Try using JigsawStack widget first (better layout preservation)
    if (window.customTranslate) {
      window.customTranslate(langCode);
      setIsTranslating(false);
      return;
    }
    
    // Fallback to direct API if widget not available
    triggerDirectTranslation(langCode);
  };

  // Direct API translation as fallback
  const triggerDirectTranslation = async (langCode: string) => {

    
    try {
      // Get API key from environment
      const apiKey = process.env.NEXT_PUBLIC_TRANSLATION_WIDGET_KEY;
      if (!apiKey) {
        console.error('API key not available');
        return;
      }
      
      // Check for cached translations first
      const cacheKey = `translation_${langCode}_${window.location.pathname}`;
      const cachedTranslationsData = localStorage.getItem(cacheKey);
      if (cachedTranslationsData) {
        try {
          const cached = JSON.parse(cachedTranslationsData);
          if (cached.timestamp && (Date.now() - cached.timestamp) < 24 * 60 * 60 * 1000) { // 24 hour cache
            console.log('Using cached translations');
            applyCachedTranslations(cached.translations);
            setIsTranslating(false);
            setTranslationProgress(100);
            return;
          }
        } catch (e) {
          // Invalid cache, continue with fresh translation
        }
      }
      
      // Get specific text content from the page, excluding notranslate elements and layout elements
      const textSelectors = [
        'main h1', 'main h2', 'main h3', 'main h4', 'main h5', 'main h6',
        'main p', 'main li', 'main td', 'main th',
        'article h1', 'article h2', 'article h3', 'article h4', 'article h5', 'article h6',
        'article p', 'article li', 'article td', 'article th',
        '.content h1', '.content h2', '.content h3', '.content h4', '.content h5', '.content h6',
        '.content p', '.content li', '.content td', '.content th',
        'section h1', 'section h2', 'section h3', 'section h4', 'section h5', 'section h6',
        'section p', 'section li'
      ];
      
      const textElements = document.querySelectorAll(textSelectors.join(', '));
      const textsToTranslate: string[] = [];
      const elementMap: Element[] = [];
      const cachedTranslations: string[] = [];
      const cachedElementMap: Element[] = [];
      
      textElements.forEach(element => {
        // Skip elements with notranslate class or inside notranslate containers
        if (element.classList.contains('notranslate') || 
            element.closest('.notranslate') ||
            element.closest('nav') || // Skip navigation
            element.closest('header') || // Skip header
            element.closest('footer') || // Skip footer
            element.closest('[class*="translate"]') // Skip translation-related elements
        ) {
          return;
        }
        
        // Only translate elements that have direct text content
        const text = element.textContent?.trim();
        const hasOnlyTextContent = element.children.length === 0 || 
                                  Array.from(element.children).every(child => 
                                    child.tagName === 'BR' || 
                                    child.tagName === 'SPAN' ||
                                    child.tagName === 'STRONG' ||
                                    child.tagName === 'EM' ||
                                    child.tagName === 'A'
                                  );
        
        if (text && 
            hasOnlyTextContent &&
            text.length > 2 && 
            text.length < 500 && // Increased length limit
            !text.match(/^[0-9\s\.\,\-\+\=\(\)\[\]\{\}]+$/) &&
            !text.match(/^https?:\/\//) &&
            !text.includes('javascript:') &&
            !text.includes('class=') &&
            !text.includes('src=') &&
            !text.match(/^[A-Z\s]+$/) // Skip all-caps text (likely navigation)
        ) {
          // Check cache first
          const cachedTranslation = translationCache.get(text, langCode);
          if (cachedTranslation) {
            cachedTranslations.push(cachedTranslation);
            cachedElementMap.push(element);
          } else {
            textsToTranslate.push(text);
            elementMap.push(element);
          }
        }
      });



      // Apply cached translations immediately while preserving font sizes
      cachedTranslations.forEach((translation, index) => {
        const element = cachedElementMap[index];
        if (element && element.textContent) {
          // Store original font size classes before applying cached translation
          const originalClasses = element.className;
          const fontSizeClasses = originalClasses.match(/font-lock-\w+|text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/g) || [];
          
          // Apply cached translation
          element.textContent = translation;
          
          // Restore font size classes to maintain consistent sizing
          if (fontSizeClasses.length > 0) {
            const cleanedClasses = originalClasses.replace(/font-lock-\w+|text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/g, '').trim();
            element.className = `${cleanedClasses} ${fontSizeClasses.join(' ')}`.trim();
          }
        }
      });

      if (textsToTranslate.length === 0) {
        console.log(`Applied ${cachedTranslations.length} cached translations, no new text to translate`);
        setIsTranslating(false);
        return;
      }

      console.log(`Applied ${cachedTranslations.length} cached translations, translating ${textsToTranslate.length} new text elements in optimized batches`);

      // Optimized batch processing with parallel execution
      const batchSize = 20; // Increased from 15 to 20 for better efficiency
      const maxConcurrentBatches = 4; // Process up to 4 batches in parallel
      const batches: string[][] = [];
      
      // Create batches
      for (let i = 0; i < textsToTranslate.length; i += batchSize) {
        const batch = textsToTranslate.slice(i, i + batchSize);
        batches.push(batch);
      }

      // Process batches in parallel groups
      const translations: string[] = new Array(textsToTranslate.length);
      
      for (let i = 0; i < batches.length; i += maxConcurrentBatches) {
        const batchGroup = batches.slice(i, i + maxConcurrentBatches);
        
        const batchPromises = batchGroup.map(async (batch, groupIndex) => {
          const batchIndex = i + groupIndex;
          const startIndex = batchIndex * batchSize;
          
          try {
            // Clean and validate the batch
            const cleanBatch = batch.filter(text => 
              text.length > 0 && 
              text.length < 500 &&
              !text.includes('\n\n')
            );
            
            if (cleanBatch.length === 0) return;
            
            const response = await fetch('https://api.jigsawstack.com/v1/ai/translate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
              },
              body: JSON.stringify({
                text: cleanBatch.join(' | '),
                target_language: langCode
              })
            });

            if (response.ok) {
              const result = await response.json();
              const batchTranslations = result.translated_text?.split(' | ') || [];
              
              // Store translations in correct positions
              batchTranslations.forEach((translation: string, index: number) => {
                const globalIndex = startIndex + index;
                if (globalIndex < translations.length && translation.trim()) {
                  translations[globalIndex] = translation.trim();
                }
              });
              
              console.log(`Batch ${batchIndex + 1}/${batches.length} completed`);
              setTranslationProgress(Math.round(((batchIndex + 1) / batches.length) * 100));
            } else {
              console.error(`Translation API error for batch ${batchIndex + 1}:`, response.status);
            }
          } catch (error) {
            console.error(`Translation request failed for batch ${batchIndex + 1}:`, error);
          }
        });
        
        // Wait for all batches in this group to complete
        await Promise.all(batchPromises);
        
        // Reduced delay between batch groups for faster processing
        if (i + maxConcurrentBatches < batches.length) {
          await new Promise(resolve => setTimeout(resolve, 100)); // Reduced from 200ms to 100ms
        }
      }

      // Apply all translations and cache them while preserving font sizes
      let appliedCount = 0;
      translations.forEach((translation, index) => {
        if (translation && elementMap[index]) {
          const element = elementMap[index];
          
          // Store original font size classes before translation
          const originalClasses = element.className;
          const fontSizeClasses = originalClasses.match(/font-lock-\w+|text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/g) || [];
          
          // Apply translation
          element.textContent = translation;
          
          // Restore font size classes to maintain consistent sizing
          if (fontSizeClasses.length > 0) {
            // Remove any existing font size classes that might have been added by translation
            const cleanedClasses = originalClasses.replace(/font-lock-\w+|text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/g, '').trim();
            // Add back the original font size classes
            element.className = `${cleanedClasses} ${fontSizeClasses.join(' ')}`.trim();
          }
          
          // Cache the translation for future use
          translationCache.set(textsToTranslate[index], langCode, translation);
          appliedCount++;
        }
      });

      console.log(`Translation completed: ${appliedCount}/${textsToTranslate.length} elements translated`);
      
      // Save language preference
      localStorage.setItem('jss-pref', langCode);
      
      // Complete translation
      setIsTranslating(false);
      setTranslationProgress(100);

      
    } catch (error) {
      console.error('Direct translation failed:', error);
      
      // Fallback to widget if direct translation fails
      if (window.customTranslate) {
        window.customTranslate(langCode);
      }
      
      // Reset translation state
      setIsTranslating(false);
      setTranslationProgress(0);
    }
  };

  // Helper function to apply cached translations
  const applyCachedTranslations = (cachedTranslations: string[]) => {
    const textSelectors = [
      'main h1', 'main h2', 'main h3', 'main h4', 'main h5', 'main h6',
      'main p', 'main li', 'main td', 'main th',
      'article h1', 'article h2', 'article h3', 'article h4', 'article h5', 'article h6',
      'article p', 'article li', 'article td', 'article th',
      '.content h1', '.content h2', '.content h3', '.content h4', '.content h5', '.content h6',
      '.content p', '.content li', '.content td', '.content th'
    ];
    
    const textElements = document.querySelectorAll(textSelectors.join(', '));
    const elementMap: Element[] = [];
    
    textElements.forEach(element => {
      if (element.classList.contains('notranslate') || 
          element.closest('.notranslate') ||
          element.closest('nav') ||
          element.closest('header') ||
          element.closest('footer') ||
          element.closest('[class*="translate"]')
      ) {
        return;
      }
      
      const text = element.textContent?.trim();
      if (text && text.length > 2 && text.length < 500) {
        elementMap.push(element);
      }
    });

    cachedTranslations.forEach((translation, index) => {
      if (translation && elementMap[index]) {
        elementMap[index].textContent = translation;
      }
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  return (
    <div 
      className="relative flex items-center gap-2 notranslate group" 
      ref={dropdownRef} 
      translate="no"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Clickable Language Display */}
      <button
        onClick={toggleDropdown}
        className="font-medium text-gray-700 select-none notranslate group-hover:text-primary-500 transition-colors duration-200 cursor-pointer relative"
        translate="no"
        type="button"
        aria-label="Select language for translation"
      >
        {ALLOWED_LANGUAGES.find(lang => lang.code === selectedLanguage)?.native || selectedLanguage.toUpperCase()}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 ease-out group-hover:w-full"></span>
      </button>
      
      {/* Translation Icon Button */}
      <button
        onClick={toggleDropdown}
        disabled={isTranslating}
        className="flex items-center justify-center w-6 h-6 text-gray-700 group-hover:text-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Select language for translation"
        type="button"
      >
        {isTranslating ? (
          /* Spinner for translation progress */
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 animate-spin"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
              style={{
                strokeDashoffset: 31.416 * (1 - translationProgress / 100)
              }}
            />
          </svg>
        ) : (
          /* Universal Translation Icon */
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M12.87 15.07L10.33 12.56L10.36 12.53C12.1 10.59 13.34 8.36 14.07 6H17V4H10V2H8V4H1V6H12.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8H4.69C5.42 9.63 6.42 11.17 7.67 12.56L2.58 17.58L4 19L9 14L12.11 17.11L12.87 15.07ZM18.5 10H16.5L12 22H14L15.12 19H19.87L21 22H23L18.5 10ZM15.88 17L17.5 12.67L19.12 17H15.88Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          className={`absolute w-64 max-w-[90vw] bg-white border border-gray-200 rounded-lg shadow-lg z-50 notranslate ${
            isMobile ? 'bottom-full mb-2 left-0' : 'top-full pt-1 left-0'
          }`} 
          translate="no"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 notranslate">
            <h3 className="text-sm font-medium text-gray-900 mb-2 notranslate font-lock-sm">{t('selectLanguage')}</h3>
            {/* Search Input */}
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t('searchLanguages')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 notranslate font-lock-sm"
            />
          </div>

          {/* Language List */}
          <div className="max-h-64 overflow-y-auto notranslate">
            {filteredLanguages.length > 0 ? (
              <div className="py-2 notranslate">
                {filteredLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 notranslate font-lock-sm ${
                      selectedLanguage === language.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                    }`}
                    type="button"
                  >
                    <div className="flex justify-between items-center notranslate">
                      <span className="font-medium notranslate">{language.name}</span>
                      <span className="text-gray-500 text-xs notranslate font-lock-xs">{language.native}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-4 px-4 text-sm text-gray-500 text-center font-lock-sm">
                {t('noLanguagesFound')}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <p className="text-xs text-gray-500 text-center font-lock-xs">
              {filteredLanguages.length} {t('languagesAvailable')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
