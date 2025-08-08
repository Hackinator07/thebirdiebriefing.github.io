'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'News', href: '/news' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'Rankings', href: '/rankings' },
    { name: 'Cocktails', href: '/cocktails' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact-us' },
  ];

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                      : 'text-gray-700 hover:text-primary-500'
                  }`}

                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary-500 focus:outline-none focus:text-primary-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
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

        {/* Mobile Navigation */}
        <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Slide-out menu */}
          <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <span className="text-xl font-bold text-primary-500">Menu</span>
                <button
                  type="button"
                  className="text-gray-700 hover:text-primary-500 focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-4">
                <div className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-4 py-3 font-medium transition-colors duration-200 rounded-lg ${
                          isActive
                            ? 'text-primary-500 bg-primary-50 border-l-4 border-primary-500'
                            : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <p className="text-sm text-center font-heading">
                  <span className="text-primary-500">The Birdie</span>
                  <span className="text-secondary-500 ml-1">Briefing</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
