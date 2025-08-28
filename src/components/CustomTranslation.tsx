'use client';

import { useState, useEffect, useRef } from 'react';

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Function to trigger direct API translation (bypassing buggy widget)
  const triggerTranslation = async (langCode: string) => {
    if (typeof window === 'undefined') return;
    
    console.log('Triggering direct translation for:', langCode);
    
    try {
      // Get API key from environment
      const apiKey = process.env.NEXT_PUBLIC_TRANSLATION_WIDGET_KEY;
      if (!apiKey) {
        console.error('API key not available');
        return;
      }

      // Show loading state
      setIsOpen(false);
      
      // Get all text content from the page, excluding notranslate elements
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, a, button, label');
      const textsToTranslate: string[] = [];
      const elementMap: Element[] = [];
      
      textElements.forEach(element => {
        // Skip elements with notranslate class or inside notranslate containers
        if (element.classList.contains('notranslate') || element.closest('.notranslate')) {
          return;
        }
        
        const text = element.textContent?.trim();
        if (text && 
            text.length > 1 && 
            text.length < 500 && // Skip very long text blocks that might cause 400 errors
            !text.match(/^[0-9\s\.\,\-\+\=\(\)\[\]\{\}]+$/) && // Skip number-only text
            !text.match(/^https?:\/\//) && // Skip URLs
            !text.includes('javascript:') // Skip JS code
        ) {
          textsToTranslate.push(text);
          elementMap.push(element);
        }
      });

      console.log(`Found ${textsToTranslate.length} text elements to translate`);

      // Translate in smaller batches to avoid 400 errors
      const batchSize = 5; // Reduced from 10 to avoid overwhelming API
      for (let i = 0; i < textsToTranslate.length; i += batchSize) {
        const batch = textsToTranslate.slice(i, i + batchSize);
        
        try {
          // Clean and validate the batch
          const cleanBatch = batch.filter(text => 
            text.length > 0 && 
            text.length < 300 && // Further limit text length
            !text.includes('\n\n') // Avoid texts with multiple line breaks
          );
          
          if (cleanBatch.length === 0) continue;
          
          const response = await fetch('https://api.jigsawstack.com/v1/ai/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey
            },
            body: JSON.stringify({
              text: cleanBatch.join(' | '), // Use separator instead of newlines
              target_language: langCode
            })
          });

          if (response.ok) {
            const result = await response.json();
            const translations = result.translated_text?.split(' | ') || [];
            
            // Apply translations to elements
            translations.forEach((translation: string, index: number) => {
              const elementIndex = i + index;
              if (elementMap[elementIndex] && translation.trim()) {
                elementMap[elementIndex].textContent = translation.trim();
              }
            });
            
            console.log(`Translated batch ${Math.floor(i/batchSize) + 1}`);
          } else {
            console.error('Translation API error:', response.status, response.statusText);
            if (response.status === 400) {
              console.log('Skipping problematic batch and continuing...');
              continue; // Continue with next batch instead of stopping
            }
            break; // Stop on other errors
          }
        } catch (error) {
          console.error('Translation request failed:', error);
          continue; // Continue with next batch
        }
        
        // Longer delay between batches to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Save language preference
      localStorage.setItem('jss-pref', langCode);
      console.log('Direct translation completed successfully');
      
    } catch (error) {
      console.error('Direct translation failed:', error);
      
      // Fallback to widget if direct translation fails
      if (window.customTranslate) {
        console.log('Falling back to widget translation...');
        window.customTranslate(langCode);
      }
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  return (
    <div className="relative flex items-center gap-2 notranslate" ref={dropdownRef}>
      {/* Language Code Display */}
      <span 
        className="font-mono font-bold text-gray-600 tracking-wider uppercase select-none"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
      >
        {selectedLanguage.toUpperCase()}
      </span>
      
      {/* Translation Icon Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-6 h-6 text-gray-700 hover:text-primary-500 transition-colors duration-200"
        aria-label="Select language for translation"
        type="button"
      >
        {/* Universal Translation Icon */}
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
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 notranslate">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Select Language</h3>
            {/* Search Input */}
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 notranslate"
            />
          </div>

          {/* Language List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredLanguages.length > 0 ? (
              <div className="py-2">
                {filteredLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 notranslate ${
                      selectedLanguage === language.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                    }`}
                    type="button"
                  >
                    <div className="flex justify-between items-center notranslate">
                      <span className="font-medium notranslate">{language.name}</span>
                      <span className="text-gray-500 text-xs notranslate">{language.native}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-4 px-4 text-sm text-gray-500 text-center">
                No languages found
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <p className="text-xs text-gray-500 text-center">
              {filteredLanguages.length} language{filteredLanguages.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
