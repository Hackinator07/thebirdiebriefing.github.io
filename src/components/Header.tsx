'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'News', href: '/news' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'Events', href: '/events' },
    { name: 'Rankings', href: '/rankings' },
    { name: 'Cocktails', href: '/cocktails' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact-us' },
  ];

  const states = [
    { name: 'Minnesota', href: '/courses-all#minnesota' },
    { name: 'Wisconsin', href: '/courses-all#wisconsin' },
    { name: 'Michigan', href: '/courses-all#michigan' },
    { name: 'Ontario', href: '/courses-all#ontario' },
    { name: 'Illinois', href: '/courses-all#illinois' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-500">Golf Girl Gazette</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            {/* Courses Dropdown */}
            <div className="relative">
              <button
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200 flex items-center"
                onMouseEnter={() => setIsCoursesDropdownOpen(true)}
                onMouseLeave={() => setIsCoursesDropdownOpen(false)}
              >
                Courses
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 transition-all duration-200 ${
                  isCoursesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
                onMouseEnter={() => setIsCoursesDropdownOpen(true)}
                onMouseLeave={() => setIsCoursesDropdownOpen(false)}
              >
                <Link
                  href="/courses-all"
                  className="block px-4 py-2 text-gray-700 hover:text-primary-500 hover:bg-gray-50 font-medium"
                >
                  All Courses
                </Link>
                <div className="border-t border-gray-200 my-1"></div>
                {states.map((state) => (
                  <Link
                    key={state.name}
                    href={state.href}
                    className="block px-4 py-2 text-gray-700 hover:text-primary-500 hover:bg-gray-50 text-sm"
                  >
                    {state.name}
                  </Link>
                ))}
              </div>
            </div>
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
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:text-primary-500 hover:bg-gray-50 font-medium transition-colors duration-200 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Mobile Courses Section */}
                  <div className="px-4 py-3">
                    <div className="text-gray-700 font-medium mb-2">Courses</div>
                    <div className="space-y-1">
                      <Link
                        href="/courses-all"
                        className="block px-4 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 text-sm rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        All Courses
                      </Link>
                      {states.map((state) => (
                        <Link
                          key={state.name}
                          href={state.href}
                          className="block px-4 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 text-sm rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {state.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Golf Girl Gazette
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
