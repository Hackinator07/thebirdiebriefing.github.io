'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useWeather } from '@/hooks/useWeather';

interface TournamentComponentProps {
  tournamentName?: string;
  location?: string;
  date?: string;
  buyTicketsUrl?: string;
  officialSiteUrl?: string;
  teeTimesUrl?: string;
  broadcastUrl?: string;
  entryListUrl?: string;
  podcastUrl?: string;
}

export default function TournamentComponent({
  tournamentName = "Walmart NW Arkansas Championship",
  location = "Rogers, Arkansas",
  date = "September 19-21, 2025",
  buyTicketsUrl = "https://nwachampionship.com/tickets",
  officialSiteUrl = "https://nwachampionship.com/",
  teeTimesUrl = "/tee-times",
  broadcastUrl = "https://www.birdiebriefing.com/news/queen-city-2025/#tv-schedule",
  entryListUrl = "#",
  podcastUrl = "https://open.spotify.com/episode/1O2VczRWTebqhMNxH64mdX?si=7685c58492cc45d4"
}: TournamentComponentProps) {
  const { t } = useTranslation();
  const { weather, loading, error } = useWeather('401734779'); // Walmart NW Arkansas Championship event ID
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg border border-gray-200 w-full max-w-md mx-auto translation-safe-container tournament-container-fixed">
      <div className="tournament-content">
        {/* Tournament Header */}
        <div className="mb-4">
        {/* Tournament Logo */}
        <div className="flex justify-center mb-3">
          <Image
            src="/images/tournaments/walmart-nw-arkansas.png"
            alt="Walmart NW Arkansas Championship Logo"
            width={140}
            height={70}
            className="h-16 w-auto object-contain"
          />
        </div>
        {/* Tournament Title */}
        <div className="mb-2">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 text-center translation-text leading-tight whitespace-pre-line" style={{ hyphens: 'none' }}>
            {tournamentName.replace(/ Championship/g, '\nChampionship')}
          </h3>
        </div>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <Link 
              href="https://maps.app.goo.gl/2uYAkBN8j33apMhd6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors duration-200"
            >
              {location}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <a 
              href="/course-maps/nwa-course-map.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors duration-200"
            >
              Pinnacle Country Club
            </a>
          </div>
        </div>
        
        {/* Tournament Details */}
        <div className="space-y-1 text-sm text-gray-600 mt-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z" fill="white" />
            </svg>
            <span>Par: 71 <svg className="w-3 h-3 inline mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>Yardage: 6,438</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
            </svg>
            <span className="whitespace-nowrap">Purse: $3M <svg className="w-3 h-3 inline mx-1" fill="currentColor" viewBox="0 0 24 24"><path d="M7 3V1h10v2h5v8c0 2.21-1.79 4-4 4h-2.2l-.8 4H17v2H7v-2h2.2l-.8-4H6c-2.21 0-4-1.79-4-4V3h5zm10 8c1.1 0 2-.9 2-2V5h-3v6h1zm-2 0V5H9v6h6zM7 5H5v4c0 1.1.9 2 2 2h1V5z"/></svg>2024 Winner: J. Suwannapura</span>
          </div>
        </div>
      </div>

        {/* Action Tiles */}
        <div className="grid grid-cols-2 gap-1.5 mt-4">
        {/* Row 1: Buy Tickets, Official Site */}
        <Link
          href={buyTicketsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-lg text-center transition-colors duration-200 group"
        >
          <div className="flex flex-col items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span className="text-xs font-semibold">{t('buyTickets')}</span>
          </div>
        </Link>

        <Link
          href={officialSiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-secondary-500 hover:bg-secondary-600 text-white p-2 rounded-lg text-center transition-colors duration-200 group"
        >
          <div className="flex flex-col items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="text-xs font-semibold">{t('officialSite')}</span>
          </div>
        </Link>

        {/* Row 2: Entry List, Tee Times */}
        <Link
          href="/entry-list"
          className="bg-teal-500 hover:bg-teal-800 text-white p-2 rounded-lg text-center transition-colors duration-200 group"
        >
          <div className="flex flex-col items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-xs font-semibold">{t('entryList')}</span>
          </div>
        </Link>

        <Link
          href={teeTimesUrl}
          className="bg-gray-500 hover:bg-gray-800 text-white p-2 rounded-lg text-center transition-colors duration-200 group"
        >
          <div className="flex flex-col items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-semibold">{t('teeTimes')}</span>
          </div>
        </Link>

        {/* Row 3: Podcast, TV Schedule */}
        <Link
          href={podcastUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 hover:bg-yellow-700 text-white p-2 rounded-lg text-center transition-colors duration-200 group"
        >
          <div className="flex flex-col items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-xs font-semibold">{t('podcast')}</span>
          </div>
        </Link>

        <Link
          href={broadcastUrl}
          className="bg-red-500 hover:bg-red-800 text-white p-2 rounded-lg text-center transition-colors duration-200 group"
        >
          <div className="flex flex-col items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-semibold">{t('tvSchedule')}</span>
          </div>
        </Link>
        </div>

        {/* Weather Info */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-center">
            {weather ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="font-medium">{weather?.displayValue || 'Mostly sunny'}</span>
                  {isClient && loading && <span className="text-xs text-gray-400">(updating...)</span>}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3v10.5a3.5 3.5 0 11-4 0V3a2 2 0 114 0z" />
                        <circle cx="12" cy="17" r="1.5" fill="currentColor" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 6h1M14 8h1M14 10h1M14 12h1" />
                      </svg>
                      <span>{weather?.temperature || 72}°F</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      <span>{weather?.lowTemperature || 65}°-{weather?.highTemperature || 78}°F</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h12a2 2 0 110 4H3M3 12h12a2 2 0 100-4H3M3 16h8a2 2 0 110 4H3" />
                      </svg>
                      <span>{weather?.windSpeed || 4} mph {weather?.windDirection || 'S'}</span>
                    </div>
                    {(weather?.precipitation || 20) > 0 && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 19l4-4 4 4" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15l4-4 4 4" />
                        </svg>
                        <span>{weather?.precipitation || 20}% chance</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Weather unavailable</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
