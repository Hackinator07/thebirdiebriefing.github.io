'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CustomTranslation from './CustomTranslation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRankingsDropdownOpen, setIsRankingsDropdownOpen] = useState(false);
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);
  const [isMobileRankingsOpen, setIsMobileRankingsOpen] = useState(false);
  const [isMobileNewsOpen, setIsMobileNewsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsRankingsDropdownOpen(false);
    setIsNewsDropdownOpen(false);
    setIsMobileRankingsOpen(false);
    setIsMobileNewsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'News', href: '/news' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact-us' },
  ];

  const newsSubmenu = [
    { name: 'Explore All', href: '/news' },
    { name: 'Tournament Previews', href: '/news/tournament-preview' },
    { name: 'Tournament Golf', href: '/news/tournament-golf' },
    { name: 'LPGA Analysis', href: '/news/lpga-analysis' },
    { name: 'Opinion', href: '/news/opinion' },
  ];

  const rankingsSubmenu = [
    { name: 'Rolex World', href: '/rankings' },
    { name: 'CME Globe', href: '/rankings/cme-globe' },
  ];

  // Helper function to check if a link is active
  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Check if rankings section is active
  const isRankingsActive = pathname.startsWith('/rankings');
  
  // Check if news section is active
  const isNewsActive = pathname.startsWith('/news');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-500 font-heading">The Birdie</span>
              <span className="text-xl font-bold text-secondary-500 font-heading ml-1">Briefing</span>
            </Link>
          </div>

          {/* Desktop Navigation - Changed from md: to lg: to prevent cramped layout in landscape */}
          <nav className="hidden xl:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => {
              const isActive = isLinkActive(item.href);
              return (
                <div key={item.name}>
                  {/* News dropdown */}
                  {item.name === 'News' && (
                    <div 
                      className="relative inline-block"
                      onMouseEnter={() => setIsNewsDropdownOpen(true)}
                      onMouseLeave={() => setIsNewsDropdownOpen(false)}
                    >
                      <button
                        onClick={() => setIsNewsDropdownOpen(!isNewsDropdownOpen)}
                        className={`font-medium transition-colors duration-200 flex items-center ${
                          isNewsActive
                            ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                            : 'text-gray-700 hover:text-primary-500'
                        }`}
                      >
                        News
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            isNewsDropdownOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {isNewsDropdownOpen && (
                        <div 
                          className="absolute top-full left-0 pt-1 w-48 z-50"
                          onMouseEnter={() => setIsNewsDropdownOpen(true)}
                          onMouseLeave={() => setIsNewsDropdownOpen(false)}
                        >
                          <div className="bg-white rounded-md shadow-lg border border-gray-200 py-1">
                          {newsSubmenu.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                  isSubActive
                                    ? 'text-primary-500 bg-primary-50 font-medium'
                                    : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsNewsDropdownOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            );
                          })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Regular navigation items */}
                  {item.name !== 'News' && (
                    <Link
                      href={item.href}
                      className={`font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                          : 'text-gray-700 hover:text-primary-500'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                  
                  {/* Insert Rankings dropdown after Podcast - Adjusted spacing */}
                  {item.name === 'Podcast' && (
                    <div 
                      className="relative inline-block ml-6 xl:ml-8"
                      onMouseEnter={() => setIsRankingsDropdownOpen(true)}
                      onMouseLeave={() => setIsRankingsDropdownOpen(false)}
                    >
                      <button
                        onClick={() => setIsRankingsDropdownOpen(!isRankingsDropdownOpen)}
                        className={`font-medium transition-colors duration-200 flex items-center ${
                          isRankingsActive
                            ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                            : 'text-gray-700 hover:text-primary-500'
                        }`}
                      >
                        Rankings
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            isRankingsDropdownOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {isRankingsDropdownOpen && (
                        <div 
                          className="absolute top-full left-0 pt-1 w-48 z-50"
                          onMouseEnter={() => setIsRankingsDropdownOpen(true)}
                          onMouseLeave={() => setIsRankingsDropdownOpen(false)}
                        >
                          <div className="bg-white rounded-md shadow-lg border border-gray-200 py-1">
                          {rankingsSubmenu.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                  isSubActive
                                    ? 'text-primary-500 bg-primary-50 font-medium'
                                    : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsRankingsDropdownOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            );
                          })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Vertical Divider */}
            <div className="h-5 w-px bg-black"></div>
            
            {/* Custom Translation Icon */}
            <CustomTranslation />
          </nav>

          {/* Mobile menu button - Changed from lg:hidden to xl:hidden */}
          <div className="xl:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary-500 focus:outline-none focus:text-primary-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Changed from md:hidden to lg:hidden */}
        {isMenuOpen && (
          <div className="xl:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-out menu */}
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                  <span className="text-xl font-bold text-primary-500">Menu</span>
                  <button
                    type="button"
                    className="text-gray-700 hover:text-primary-500 focus:outline-none"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links - Made scrollable only in landscape */}
                <nav className="flex-1 px-6 py-4 overflow-y-auto landscape:overflow-y-auto portrait:overflow-y-visible">
                  <div className="space-y-2">
                    {navigation.map((item) => {
                      const isActive = isLinkActive(item.href);
                      return (
                        <div key={item.name}>
                          {/* News dropdown in mobile */}
                          {item.name === 'News' ? (
                            <div className="-mx-6">
                              <button
                                onClick={() => setIsMobileNewsOpen(!isMobileNewsOpen)}
                                className={`w-full flex items-center justify-between py-3 px-6 font-medium transition-colors duration-200 rounded-lg ${
                                  isNewsActive
                                    ? 'text-primary-500 bg-primary-50 font-semibold'
                                    : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                                }`}
                              >
                                <span>News</span>
                                <svg
                                  className={`h-4 w-4 transition-transform duration-200 ${
                                    isMobileNewsOpen ? 'rotate-180' : ''
                                  }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              
                              {/* Mobile News Dropdown */}
                              {isMobileNewsOpen && (
                                <div className="bg-gray-50 border-t border-gray-100">
                                  {newsSubmenu.map((subItem) => {
                                    const isSubActive = pathname === subItem.href;
                                    return (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className={`block py-3 px-6 text-sm transition-colors duration-200 ${
                                          isSubActive
                                            ? 'text-primary-500 bg-primary-100 font-medium'
                                            : 'text-gray-600 hover:text-primary-500 hover:bg-gray-100'
                                        }`}
                                        onClick={() => {
                                          setIsMenuOpen(false);
                                          setIsMobileNewsOpen(false);
                                        }}
                                      >
                                        {subItem.name}
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className={`block py-3 font-medium transition-colors duration-200 rounded-lg -mx-6 px-6 ${
                                isActive
                                  ? 'text-primary-500 bg-primary-50 font-semibold'
                                  : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                              }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                          
                          {/* Insert Rankings dropdown after Podcast in mobile */}
                          {item.name === 'Podcast' && (
                            <div className="-mx-6">
                              <button
                                onClick={() => setIsMobileRankingsOpen(!isMobileRankingsOpen)}
                                className={`w-full flex items-center justify-between py-3 px-6 font-medium transition-colors duration-200 rounded-lg ${
                                  isRankingsActive
                                    ? 'text-primary-500 bg-primary-50 font-semibold'
                                    : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                                }`}
                              >
                                <span>Rankings</span>
                                <svg
                                  className={`h-4 w-4 transition-transform duration-200 ${
                                    isMobileRankingsOpen ? 'rotate-180' : ''
                                  }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              
                              {/* Mobile Rankings Dropdown */}
                              {isMobileRankingsOpen && (
                                <div className="bg-gray-50 border-t border-gray-100">
                                  {rankingsSubmenu.map((subItem) => {
                                    const isSubActive = pathname === subItem.href;
                                    return (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className={`block py-3 px-6 text-sm transition-colors duration-200 ${
                                          isSubActive
                                            ? 'text-primary-500 bg-primary-100 font-medium'
                                            : 'text-gray-600 hover:text-primary-500 hover:bg-gray-100'
                                        }`}
                                        onClick={() => {
                                          setIsMenuOpen(false);
                                          setIsMobileRankingsOpen(false);
                                        }}
                                      >
                                        {subItem.name}
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    
                    {/* Mobile Translation Section */}
                    <div className="pt-4 mt-4 border-t border-gray-200 notranslate">
                      <div className="flex items-center justify-end py-3 -mx-6 px-6 notranslate">
                        <CustomTranslation />
                      </div>
                    </div>
                  </div>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 flex-shrink-0">
                  <p className="text-sm text-center font-heading">
                    <span className="text-primary-500">The Birdie</span>
                    <span className="text-secondary-500 ml-1">Briefing</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      

    </header>
  );
}
