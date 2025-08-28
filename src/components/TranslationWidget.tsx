'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    TranslationWidget: (
      publicKey: string,
      config?: {
        pageLanguage?: string;
        position?: string;
        autoDetectLanguage?: boolean;
        theme?: {
          baseColor?: string;
          textColor?: string;
        };
        showUI?: boolean;
        loadingMessage?: Record<string, string>;
      }
    ) => void;
    translate: (langCode: string) => Promise<any>;
    resetTranslation: (defaultLang: string) => void;
  }
}

export default function TranslationWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create loading overlay
    const createLoadingOverlay = () => {
      const overlay = document.createElement('div');
      overlay.id = 'jigts-loading-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: -9999px;
        right: -9999px;
        width: 120px;
        height: 80px;
        background: #ad345a;
        border-radius: 8px;
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 12px;
      `;

      const spinner = document.createElement('div');
      spinner.className = 'golf-spinner';
      spinner.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 69.787 69.787" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M32.986,66.143c-2.564-1.354-3.708-1.365-5.809,0.236c-0.314-0.076-0.628-0.156-0.94-0.242
              c-0.243-1.074,0.145-2.158,1.104-2.986c1.323-1.139,3.595-1.334,4.877-0.416C33.326,63.525,33.588,64.693,32.986,66.143z
               M42.394,61.532c-1.236-0.669-3.148-0.296-4.465,0.872c-1.281,1.136-1.678,2.558-1.056,4.244c1.755-2.24,3.776-3.26,6.423-1.86
              C43.736,63.075,43.448,62.1,42.394,61.532z M21.65,63.173c-0.968-0.758-2.434-0.956-3.66-0.589
              c1.521,0.923,3.124,1.725,4.794,2.391C22.669,64.295,22.289,63.674,21.65,63.173z M51.105,59.695
              c-1.574-0.174-2.713,0.727-3.629,1.883c-0.824,1.038-1.289,2.173-0.886,3.559c0.294-0.113,0.584-0.229,0.873-0.349
              c1.086-1.274,2.261-2.259,3.995-2.004c0.359-0.212,0.717-0.429,1.064-0.651C52.816,60.814,52.304,59.829,51.105,59.695z
               M49.109,53.766c0.078-1.519-0.451-2.552-1.764-2.959c-1.596-0.496-2.898,0.195-3.933,1.377c-1.037,1.188-1.531,2.541-1.069,3.938
              c0.947-0.923,1.784-1.976,2.844-2.708C46.424,52.555,47.795,52.956,49.109,53.766z M54.058,42.518
              c-0.109-1.395-0.439-2.562-1.728-3.174c-1.146-0.547-2.185-0.217-3.101,0.579c-1.268,1.101-1.693,2.697-1.203,4.449
              C49.851,41.109,51.595,40.54,54.058,42.518z M52.365,54.766c1.521-3.313,2.863-4.137,5.316-3.187
              c0.016-2.021-1.021-3.097-2.488-2.713C53.021,49.432,51.478,52.65,52.365,54.766z M61.28,40.441
              c-0.13-0.555-0.112-1.066-0.354-1.379c-0.514-0.664-1.129-1.664-1.764-1.711c-0.734-0.057-1.744,0.596-2.264,1.238
              c-0.916,1.139-0.946,2.584-0.647,4.156C57.754,39.331,58.892,38.797,61.28,40.441z M59.677,25.923
              c-1.252,0.188-1.845,1.824-1.465,4.051c1.432-2.374,2.239-2.471,4.329-0.411C62.22,27.204,61.009,25.727,59.677,25.923z
               M33.424,52.578c-1.645,1.044-2.306,2.982-1.613,4.738c1.418-3.987,2.864-4.939,6.436-4.076
              C36.902,51.742,35.068,51.537,33.424,52.578z M22.131,53.236c-1.522,1.074-2.005,3-1.127,4.488
              c0.309-3.498,2.507-4.851,6.248-3.845C25.918,52.33,23.793,52.062,22.131,53.236z M43.769,41.934
              c-1.094-1.315-2.795-1.623-4.287-0.818c-1.731,0.934-2.707,3.49-1.77,5.179C38.273,42.473,40.207,41.117,43.769,41.934z
               M55.353,28.83c-0.91-0.967-1.871-1.36-3.022-0.685c-1.345,0.787-1.841,2.768-1.194,4.535
              C51.745,29.366,52.595,28.566,55.353,28.83z M60.599,16.398c0.026-0.109,0.055-0.218,0.082-0.328
              c-0.66-0.13-1.572-0.598-1.937-0.327c-1.088,0.81-0.685,2.01-0.321,3.491C58.54,16.76,58.937,16.308,60.599,16.398z M69.754,34.926
              c0,19.225-15.639,34.861-34.861,34.861c-19.224,0-34.861-15.639-34.861-34.861c0-11.481,5.582-21.685,14.172-28.039
              C19.978,2.564,27.143,0,34.894,0c7.514,0,14.477,2.411,20.155,6.496C63.943,12.82,69.754,23.207,69.754,34.926z M64.245,48.729
              c-0.011-0.561-0.327-1.188-0.468-1.775c-0.953,2.32-1.129,4.967-4.818,5.384c0.684,0.871,1.122,1.942,1.669,2.001
              c0.075,0.008,0.157,0.006,0.24,0.001C62.172,52.596,63.306,50.717,64.245,48.729z M66.631,41.637
              c0.271-1.285,0.466-2.597,0.58-3.932c-0.11-0.85-0.366-1.637-0.786-2.205c-0.389,2.047,0.104,4.602-3.139,5.205
              c0.186,0.43,0.337,0.995,0.646,1.458c0.623,0.937,1.477,0.963,2.231,0.149C66.341,42.124,66.498,41.893,66.631,41.637z
               M34.894,67.365c7.364,0,14.161-2.469,19.612-6.618c-0.248,0.187-0.496,0.373-0.751,0.554c0.068-0.119,0.136-0.24,0.207-0.354
              c0.622-0.989,1.28-2.237,2.24-2.678c2.543-1.16,2.967-2.928,2.537-5.276c-0.433-2.367-0.089-4.454,1.672-6.197
              c1.933-1.915,2.368-4.217,1.823-6.813c-0.407-1.938,0.156-3.672,1.484-5.09c0.756-0.81,1.643-1.539,2.584-2.125
              c0.344-0.216,0.643-0.449,0.9-0.697c-0.188-2.132-0.58-4.205-1.161-6.199c-0.69-0.412-1.181-0.053-1.795,0.993
              c-0.067-0.033-0.192-0.068-0.192-0.1c0.014-1.156-0.498-2.819,0.905-3.142c0.115-0.026,0.22-0.036,0.32-0.041
              C60.671,11.274,48.79,2.489,34.894,2.489c-17.888,0-32.438,14.552-32.438,32.439c0,7.848,2.802,15.053,7.456,20.668
              c0.025-1.133,0.532-2.018,1.465-2.617c1.578-1.014,3.288-0.744,5.161,1.07c-1.653-0.725-2.979-0.99-4.302-0.254
              c-0.985,0.549-1.539,1.344-1.801,2.415c1.443,1.657,3.053,3.166,4.8,4.5c0.886,0.669,1.804,1.3,2.756,1.875
              c-0.007,0.003-0.011,0.005-0.019,0.007C22.902,65.618,28.698,67.365,34.894,67.365z" fill="#F8F6F2"/>
          </g>
        </svg>
      `;
      spinner.style.cssText = `
        width: 20px;
        height: 20px;
        margin-bottom: 8px;
      `;

      // Detect browser language and get appropriate loading message
      const browserLang = navigator.language.split('-')[0]; // Get primary language code
      const loadingMessages = {
        ja: '翻訳を準備中です。少しお待ちください。',
        ko: '번역을 준비하고 있습니다. 잠시만 기다려 주세요.',
        th: 'กำลังเตรียมการแปลให้คุณ กรุณารอสักครู่',
        zh: '我们正在为您准备翻译，请稍等片刻。',
        sv: 'Vi förbereder din översättning. Bara en kort väntan.',
        no: 'Vi forbereder oversettelsen din. Bare en kort ventetid.',
        fr: 'Nous préparons votre traduction. Juste un court délai.',
        es: 'Estamos preparando tu traducción. Solo una breve espera.',
        de: 'Wir bereiten Ihre Übersetzung vor. Nur eine kurze Wartezeit.',
        en: "We're teeing up your translation. Just a short wait."
      };

      const loadingMessage = loadingMessages[browserLang as keyof typeof loadingMessages] || loadingMessages.en;

      const message = document.createElement('div');
      message.textContent = loadingMessage;
      message.style.cssText = `
        color: #F8F6F2;
        font-size: 11px;
        font-weight: 500;
        text-align: center;
        line-height: 1.2;
        word-wrap: break-word;
        max-width: 100%;
      `;

      const style = document.createElement('style');
      style.textContent = `
        .golf-spinner {
          width: 20px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {transform: rotate(0);}
          to {transform: rotate(360deg);}
        }
        
        /* Hide JigsawStack widget off-screen */
        .jigts-translation-widget {
          position: fixed !important;
          top: -9999px !important;
          right: -9999px !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `;

      document.head.appendChild(style);
      overlay.appendChild(spinner);
      overlay.appendChild(message);
      document.body.appendChild(overlay);

      return overlay;
    };

    // Remove loading overlay
    const removeLoadingOverlay = (overlay: HTMLElement) => {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    };

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/translation-widget@latest/dist/index.min.js';
    script.defer = true;

    const initWidget = () => {
      if (typeof window === 'undefined') return;

      const key = process.env.NEXT_PUBLIC_TRANSLATION_WIDGET_KEY;

      if (!key) {
        // Widget requires an API key to function - silent fail in production
        if (process.env.NODE_ENV === 'development') {
          console.info('TranslationWidget: No API key provided. Translation widget disabled.');
        }
        return;
      }

      try {
        // Create and show loading overlay
        const loadingOverlay = createLoadingOverlay();

        // Hide the widget initially
        const hideWidget = () => {
          const widget = document.querySelector('.jigts-translation-widget');
          if (widget) {
            (widget as HTMLElement).style.opacity = '0';
            (widget as HTMLElement).style.pointerEvents = 'none';
          }
        };

        // Show the widget
        const showWidget = () => {
          const widget = document.querySelector('.jigts-translation-widget');
          if (widget) {
            (widget as HTMLElement).style.opacity = '1';
            (widget as HTMLElement).style.pointerEvents = 'auto';
            (widget as HTMLElement).style.transition = 'opacity 0.3s ease-in-out';
          }
        };

        // Fix URL routing issue in production
        const currentUrl = window.location.href;
        if (currentUrl.includes('/index.txt')) {
          const correctedUrl = currentUrl.replace('/index.txt', '/');
          window.history.replaceState({}, '', correctedUrl);
        }

        // Check for previously saved language preference
        const savedLanguage = localStorage.getItem('jss-pref');
        if (process.env.NODE_ENV === 'development') {
          console.log('Saved language preference:', savedLanguage);
        }

        window.TranslationWidget(key, {
          pageLanguage: 'en',
          position: 'top-right',
          autoDetectLanguage: false,
          preserveUrls: true,
          urlRewriting: false,
          baseUrl: 'https://www.birdiebriefing.com',
          staticSite: true,
          theme: {
            baseColor: '#ad345a',
            textColor: '#F8F6F2'
          },
          showUI: true,
          loadingMessage: {
            ja: '翻訳を準備中です。少しお待ちください。',
            ko: '번역을 준備하고 있습니다. 잠시만 기다려 주세요.',
            th: 'กำลังเตรียมการแปลให้คุณ กรุณารอสักครู่',
            zh: '我们正在为您准备翻译，请稍等片刻。',
            sv: 'Vi förbereder din översättning. Bara en kort väntan.',
            no: 'Vi forbereder oversettelsen din. Bare et kort øyeblikk.',
            fr: 'Nous préparons votre traduction. Un court instant.',
            es: 'Estamos preparando tu traducción. Solo un momento.',
            de: 'Wir bereiten Ihre Übersetzung vor. Nur einen Moment.',
            en: 'Preparing your translation. Just a moment.'
          }
        });

        // Wait for widget to load, then filter and show
        setTimeout(() => {
          hideWidget();
          filterLanguages(() => {
            showWidget();
            removeLoadingOverlay(loadingOverlay);
            
            // Auto-restore previously saved language if available
            if (savedLanguage && savedLanguage !== 'en') {
              if (process.env.NODE_ENV === 'development') {
                console.log('Auto-restoring language:', savedLanguage);
              }
              setTimeout(() => {
                if (window.translate) {
                  window.translate(savedLanguage)
                    .then((result) => {
                      if (process.env.NODE_ENV === 'development') {
                        console.log('Language restored successfully:', result);
                      }
                    })
                    .catch((error) => {
                      if (process.env.NODE_ENV === 'development') {
                        console.warn('Failed to restore language:', error);
                      }
                    });
                }
              }, 300); // Faster language restoration
            }
          });
        }, 1500); // Optimized timing for production
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('TranslationWidget initialization error:', error);
        }
      }
    };

    const filterLanguages = (callback?: () => void) => {
      const allowedLanguages = ['en', 'ja', 'ko', 'th', 'zh', 'sv', 'no', 'fr', 'es', 'de'];

      // Function to hide unwanted language elements
      const hideUnwantedLanguages = () => {
        // Target the specific jigts-language-item elements
        const languageElements = document.querySelectorAll('.jigts-language-item');

        languageElements.forEach(element => {
          const langCode = element.getAttribute('data-language-code');

          if (langCode && !allowedLanguages.includes(langCode)) {
            (element as HTMLElement).style.display = 'none';
          }
        });

        // Update the language count display
        updateLanguageCount();
      };

      // Function to update the language count display
      const updateLanguageCount = () => {
        const countElement = document.querySelector('.jigts-language-count');
        if (countElement) {
          countElement.textContent = `${allowedLanguages.length} languages`;
        }
      };

      // Function to handle search filtering
      const setupSearchFilter = () => {
        const searchInput = document.querySelector('.jigts-search-input') as HTMLInputElement;
        if (searchInput) {
          // Remove existing event listeners to avoid duplicates
          searchInput.removeEventListener('input', handleSearch);
          searchInput.addEventListener('input', handleSearch);
        }
      };

      // Function to handle search input
      const handleSearch = (event: Event) => {
        const searchInput = event.target as HTMLInputElement;
        const searchTerm = searchInput.value.toLowerCase();

        // Get all language items
        const languageElements = document.querySelectorAll('.jigts-language-item');

        languageElements.forEach(element => {
          const langCode = element.getAttribute('data-language-code');
          const langName = element.querySelector('.jigts-language-name')?.textContent?.toLowerCase() || '';
          const langNative = element.querySelector('.jigts-language-native')?.textContent?.toLowerCase() || '';

          // Check if this language is allowed
          const isAllowed = langCode && allowedLanguages.includes(langCode);

          // Check if it matches the search term
          const matchesSearch = searchTerm === '' ||
                              langName.includes(searchTerm) ||
                              langNative.includes(searchTerm) ||
                              langCode?.includes(searchTerm);

          // Show only if it's allowed AND matches search
          if (isAllowed && matchesSearch) {
            (element as HTMLElement).style.display = '';
          } else {
            (element as HTMLElement).style.display = 'none';
          }
        });
      };

      // Initial filter
      hideUnwantedLanguages();

      // Set up search filter
      setupSearchFilter();

      // Set up observer to handle dynamically added elements
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            // Check if any new language items were added
            const hasNewLanguageItems = Array.from(mutation.addedNodes).some(node => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                return element.classList?.contains('jigts-language-item') ||
                       element.querySelector?.('.jigts-language-item');
              }
              return false;
            });

            // Check if search input was added
            const hasSearchInput = Array.from(mutation.addedNodes).some(node => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                return element.classList?.contains('jigts-search-input') ||
                       element.querySelector?.('.jigts-search-input');
              }
              return false;
            });

            if (hasNewLanguageItems) {
              // Small delay to ensure elements are fully rendered
              setTimeout(hideUnwantedLanguages, 100);
            }

            if (hasSearchInput) {
              // Small delay to ensure search input is fully rendered
              setTimeout(setupSearchFilter, 100);
            }
          }
        });
      });

      // Start observing for DOM changes
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Also run filter periodically to catch any missed elements
      const interval = setInterval(() => {
        hideUnwantedLanguages();
        setupSearchFilter();
      }, 1000);

      // Clean up interval after 10 seconds
      setTimeout(() => {
        clearInterval(interval);
      }, 10000);

      // Call callback when filtering is complete
      if (callback) {
        setTimeout(callback, 500); // Give a little extra time for filtering to complete
      }
    };

    script.onload = () => {
      if (document.readyState === 'complete') {
        initWidget();
      } else {
        window.addEventListener('load', initWidget);
      }
    };

    document.body.appendChild(script);

    return () => {
      window.removeEventListener('load', initWidget);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Clean up loading overlay if it exists
      const overlay = document.getElementById('jigts-loading-overlay');
      if (overlay) {
        removeLoadingOverlay(overlay);
      }
    };
  }, []);

  return null;
}
