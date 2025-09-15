'use client';

import { useState, useEffect, useRef } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string[];
  className?: string;
  isMobile?: boolean;
}

export default function TableOfContents({ content, className = '', isMobile }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Generate TOC from content
    const headings: TOCItem[] = [];
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    
    content.forEach((paragraph, paragraphIndex) => {
      let match;
      while ((match = headingRegex.exec(paragraph)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = `heading-${paragraphIndex}-${text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`;
        
        headings.push({ id, text, level });
      }
    });

    setTocItems(headings);
    setIsVisible(headings.length > 2); // Only show if there are multiple headings

    // Set up intersection observer for active heading tracking
    if (headings.length > 0) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-20% 0% -35% 0%',
          threshold: 0
        }
      );

      // Observe all headings when they're rendered
      setTimeout(() => {
        headings.forEach(({ id }) => {
          const element = document.getElementById(id);
          if (element && observerRef.current) {
            observerRef.current.observe(element);
          }
        });
      }, 1000);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = isMobileDevice ? 80 : 100; // Smaller offset on mobile
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Auto-collapse on mobile after navigation
      if (isMobileDevice) {
        setIsExpanded(false);
      }
    }
  };

  if (!isVisible || tocItems.length === 0) {
    return null;
  }

  // Mobile: Collapsible/floating design
  if (isMobileDevice) {
    return (
      <>
        {/* Floating TOC button */}
        <div className="fixed bottom-4 right-4 z-40 lg:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
            aria-label="Table of Contents"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile TOC overlay */}
        {isExpanded && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsExpanded(false)}
            />
            
            {/* TOC Panel */}
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[70vh] overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Table of Contents
                  </h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <nav className="p-4 overflow-y-auto max-h-[calc(70vh-80px)]">
                <div className="space-y-1">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToHeading(item.id)}
                      className={`block w-full text-left py-3 px-3 rounded-lg text-sm transition-colors ${
                        activeId === item.id
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      style={{ paddingLeft: `${(item.level - 1) * 16 + 12}px` }}
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop: Sidebar design (original)
  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Table of Contents
      </h3>
      
      <nav className="space-y-1">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`block w-full text-left py-2 px-3 rounded text-sm transition-colors ${
              activeId === item.id
                ? 'bg-primary-100 text-primary-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
          >
            {item.text}
          </button>
        ))}
      </nav>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Click any heading to jump to that section
        </p>
      </div>
    </div>
  );
}
