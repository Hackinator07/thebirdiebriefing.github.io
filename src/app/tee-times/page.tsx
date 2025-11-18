'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import TimezoneSelect from 'react-timezone-select';
import { TimezoneProvider, useTimezone } from '@/components/TimezoneContext';
import { useStaticTournamentData } from '@/hooks/useStaticTournamentData';

// Default timezone (Eastern Time - CME Group Tour Championship tee times)
const DEFAULT_TIMEZONE = 'America/New_York';

// Tournament information
const TOURNAMENT_NAME = "CME Group Tour Championship 2025";
const TOURNAMENT_COURSE = "Tiburón Golf Club";
const TOURNAMENT_LOCATION = "Naples, Florida";
const TOURNAMENT_PAR = 72;
const TOURNAMENT_YARDS = 6734;
const TOURNAMENT_FIELD = "60 Players";
const TOURNAMENT_PURSE = "$7,000,000";
const TOURNAMENT_LOGO = "https://media.lpga.com/images/librariesprovider3/default-album/cme-group-tour-championship-full-color.png?sfvrsn=5ab715b9_1";

// Thursday, November 20, 2025 Tee Times (Eastern Time - GMT-5)
const round1TeeTimes = [
  // Tee 1
  { time: "7:50AM", tee: "1", players: ["Brooke Matthews (Rogers, AR)", "Pajaree Anannarukarn (Bangkok, Thailand)"] },
  { time: "8:00AM", tee: "1", players: ["Nataliya Guseva (Miami, FL)", "Lucy Li (Redwood Shores, CA)"] },
  { time: "8:10AM", tee: "1", players: ["Patty Tavatanakit (Bangkok, Thailand)", "Leona Maguire (Cavan, Ireland)"] },
  { time: "8:20AM", tee: "1", players: ["Manon De Roey (Lint, Belgium)", "Yan Liu (Fujian, People's Republic of China)"] },
  { time: "8:30AM", tee: "1", players: ["Mi Hyang Lee (Seoul, Republic of Korea)", "Lexi Thompson (Delray Beach, FL)"] },
  { time: "8:40AM", tee: "1", players: ["Allisen Corpuz (Kapolei, HI)", "Ingrid Lindblad (Halmstad, Sweden)"] },
  { time: "8:50AM", tee: "1", players: ["Madelene Sagstrom (Enkoping, Sweden)", "Jenny Bae (Suwanee, GA)"] },
  { time: "9:00AM", tee: "1", players: ["Stephanie Kyriacou (Sydney, Australia)", "Sarah Schmelzel (Phoenix, AZ)"] },
  { time: "9:10AM", tee: "1", players: ["Nanna Koerstz Madsen (Smoerum, Denmark)", "Chanettee Wannasaen (Chiang mai, Thailand)"] },
  { time: "9:20AM", tee: "1", players: ["Esther Henseleit (Hamburg, Germany)", "Lottie Woad (Farnham, England)"] },
  { time: "9:30AM", tee: "1", players: ["Hannah Green (Perth, Australia)", "Maja Stark (Abbekas, Sweden)"] },
  { time: "9:40AM", tee: "1", players: ["Jin Young Ko (Seoul, Republic of Korea)", "Gaby Lopez (Mexico City, Mexico)"] },
  { time: "9:50AM", tee: "1", players: ["Auston Kim (St. Augustine, FL)", "Miranda Wang (Tianjin, People's Republic of China)"] },
  { time: "10:00AM", tee: "1", players: ["Megan Khang (Rockland, MA)", "Ruoning Yin (ShangHai, People's Republic of China)"] },
  { time: "10:10AM", tee: "1", players: ["Lauren Coughlin (Charlottesville, VA)", "Ariya Jutanugarn (Bangkok, Thailand)"] },
  { time: "10:20AM", tee: "1", players: ["Grace Kim (Sydney, Australia)", "Brooke M. Henderson (Smiths Falls, Ontario)"] },
  { time: "10:30AM", tee: "1", players: ["Carlota Ciganda (Pamplona, Spain)", "Lindy Duncan (Plantation, FL)"] },
  { time: "10:40AM", tee: "1", players: ["Ayaka Furue (Kobe, Japan)", "Lydia Ko (Auckland, New Zealand)"] },
  { time: "10:50AM", tee: "1", players: ["Andrea Lee (Hermosa Beach, CA)", "Yealimi Noh (San Francisco, CA)"] },
  { time: "11:00AM", tee: "1", players: ["Linn Grant (Viken, Sweden)", "Haeran Ryu (Suwon, Republic of Korea)"] },
  { time: "11:10AM", tee: "1", players: ["Celine Boutier (Montrouge, France)", "Jennifer Kupcho (Westminster, CO)"] },
  { time: "11:20AM", tee: "1", players: ["Angel Yin (Arcadia, CA)", "Minami Katsu (Kagoshima, Japan)"] },
  { time: "11:30AM", tee: "1", players: ["Chisato Iwai (Saitama, Japan)", "Jin Hee Im (Jeju, Republic of Korea)"] },
  { time: "11:40AM", tee: "1", players: ["Akie Iwai (Saitama, Japan)", "Charley Hull (Woburn, England)"] },
  { time: "11:50AM", tee: "1", players: ["Mao Saigo (Chiba, Japan)", "Nasa Hataoka (Ibaraki, Japan)"] },
  { time: "12:00PM", tee: "1", players: ["Nelly Korda (Bradenton, FL)", "Somi Lee (Yongin-si, Republic of Korea)"] },
  { time: "12:10PM", tee: "1", players: ["Sei Young Kim (Seoul, Republic of Korea)", "A Lim Kim (Seongnam-si, Republic of Korea)"] },
  { time: "12:20PM", tee: "1", players: ["Hyo Joo Kim (Wonju, Republic of Korea)", "Hye-Jin Choi (Gyeonggi-do, Republic of Korea)"] },
  { time: "12:30PM", tee: "1", players: ["Minjee Lee (Perth, Australia)", "Rio Takeda (Kumamoto, Japan)"] },
  { time: "12:40PM", tee: "1", players: ["Jeeno Thitikul (Bangkok, Thailand)", "Miyu Yamashita (Osaka, Japan)"] }
];

// Round 2 Tee Times - Friday, November 21, 2025 (Eastern Time - GMT-5)
const round2TeeTimes: { time: string; tee: string; players: string[] }[] = [
  // Tee times TBD
];

// Round 3 Tee Times - Saturday, November 22, 2025 (Eastern Time - GMT-5)
const round3TeeTimes: { time: string; tee: string; players: string[] }[] = [
  // Tee times TBD
];

// Round 4 Tee Times - Sunday, November 23, 2025 (Eastern Time - GMT-5)
const round4TeeTimes: { time: string; tee: string; players: string[] }[] = [
  // Tee times TBD
];

// Function to format purse amount
function formatPurse(purse: number): string {
  if (purse >= 1000000) {
    return `$${(purse / 1000000).toFixed(1).replace('.0', '')},000,000`;
  } else if (purse >= 1000) {
    return `$${(purse / 1000).toLocaleString()}K`;
  } else {
    return `$${purse.toLocaleString()}`;
  }
}

// Function to convert tee time from Eastern time (GMT-5) to selected timezone
function convertTeeTime(timeString: string, fromTimezone: string, toTimezone: string): string {
  try {
    // If the timezones are the same, return the original time
    if (fromTimezone === toTimezone) {
      return timeString;
    }

    // Parse the time (e.g., "7:00 AM" or "12:31 PM")
    const timeMatch = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (!timeMatch) return timeString;

    const [, hour, minute, period] = timeMatch;

    // Convert to 24-hour format
    let hour24 = parseInt(hour);
    if (period === 'PM' && hour24 !== 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;

    // Create a date object representing the time in Eastern timezone (GMT-5)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hourStr = String(hour24).padStart(2, '0');
    const minuteStr = String(minute).padStart(2, '0');

    // Create the date string in Eastern timezone format
    const dateString = `${year}-${month}-${day}T${hourStr}:${minuteStr}:00`;
    
    // Create a date object that represents this time in Eastern timezone (GMT-5)
    const easternDate = new Date(dateString + '-05:00'); // Explicitly set Eastern timezone offset (GMT-5)
    
    // Format to target timezone
    const formatted = easternDate.toLocaleTimeString('en-US', {
      timeZone: toTimezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return formatted;
  } catch {
    return timeString;
  }
}

function TeeTimesContent() {
  // Use tournament data from API (same event ID as TournamentComponent)
  const eventId = "401734786"; // Current event ID
  const { tournamentData, loading, error } = useStaticTournamentData(eventId);
  
  // Round 1 date info - always Thursday for CME Group Tour Championship
  const getRound1DateInfo = useCallback(() => {
    return {
      isWednesday: false,
      dayLabel: "Thursday",
      dateLabel: "Thursday, November 20"
    };
  }, []);

  // Function to determine which round should be active based on tournament status
  const getCurrentRound = useCallback((): 'round1' | 'round2' | 'round3' | 'round4' => {
    // Tournament dates: November 20 - November 23, 2025 (Thursday-Sunday)
    const tournamentStartDate = new Date('2025-11-20'); // Thursday
    const tournamentEndDate = new Date('2025-11-23'); // Sunday

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Check if we're within the tournament week
    if (today >= tournamentStartDate && today <= tournamentEndDate) {
      const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

      // Check tournament status from localStorage (set by tournament widget)
      // Only access localStorage on client side with Safari iOS fallback
      let tournamentStatus = null;
      let tournamentRound = null;

      if (typeof window !== 'undefined') {
        try {
          // Test localStorage availability first
          const testKey = 'localStorage-test';
          localStorage.setItem(testKey, 'test');
          localStorage.removeItem(testKey);

          tournamentStatus = localStorage.getItem('tournamentStatus');
          tournamentRound = localStorage.getItem('tournamentRound');
        } catch (error) {
          // Safari iOS private browsing or storage restrictions
          console.warn('localStorage not available:', error);
          tournamentStatus = null;
          tournamentRound = null;
        }
      }

      // If we have tournament status data, use it to determine the round
      if (tournamentStatus && tournamentRound) {
        // Parse the round number from the tournament data
        const currentRound = parseInt(tournamentRound);

        // If tournament shows "Play Complete", advance to next round
        if (tournamentStatus.toLowerCase().includes('play complete') ||
            tournamentStatus.toLowerCase().includes('complete')) {
          if (currentRound === 1) return 'round2';
          if (currentRound === 2) return 'round3';
          if (currentRound === 3) return 'round4';
          if (currentRound === 4) return 'round4'; // Final round
        }

        // If tournament is still active, show current round
        if (currentRound === 1) return 'round1';
        if (currentRound === 2) return 'round2';
        if (currentRound === 3) return 'round3';
        if (currentRound === 4) return 'round4';
      }

      // Safari iOS fallback: Try to get tournament data from sessionStorage or other sources
      if (typeof window !== 'undefined') {
        try {
          const sessionTournamentStatus = sessionStorage.getItem('tournamentStatus');
          const sessionTournamentRound = sessionStorage.getItem('tournamentRound');

          if (sessionTournamentStatus && sessionTournamentRound) {
            const currentRound = parseInt(sessionTournamentRound);

            // If tournament shows "Play Complete", advance to next round
            if (sessionTournamentStatus.toLowerCase().includes('play complete') ||
                sessionTournamentStatus.toLowerCase().includes('complete')) {
              if (currentRound === 1) return 'round2';
              if (currentRound === 2) return 'round3';
              if (currentRound === 3) return 'round4';
              if (currentRound === 4) return 'round4'; // Final round
            }

            // If tournament is still active, show current round
            if (currentRound === 1) return 'round1';
            if (currentRound === 2) return 'round2';
            if (currentRound === 3) return 'round3';
            if (currentRound === 4) return 'round4';
          }
        } catch (error) {
          console.warn('sessionStorage not available:', error);
        }
      }

      // Safari iOS specific handling: Try to detect if we're in a tournament scenario
      // and make educated guesses based on current time and day
      if (typeof window !== 'undefined') {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (isSafari && isIOS) {
          console.log('Safari iOS detected - using enhanced fallback logic');

          // Enhanced Safari iOS logic for all rounds
          const currentHour = now.getHours();

          // Wednesday (Round 1)
          if (dayOfWeek === 3) {
            // If it's after 6 PM on Wednesday, Round 1 is likely complete
            if (currentHour >= 18) {
              return 'round2';
            }
            return 'round1';
          }

          // Thursday (Round 2)
          if (dayOfWeek === 4) {
            // If it's after 6 PM on Thursday, Round 2 is likely complete
            if (currentHour >= 18) {
              return 'round3';
            }
            return 'round2';
          }

          // Friday (Round 3)
          if (dayOfWeek === 5) {
            // If it's after 6 PM on Friday, Round 3 is likely complete
            if (currentHour >= 18) {
              return 'round4';
            }
            return 'round3';
          }

          // Saturday (Final day)
          if (dayOfWeek === 6) {
            return 'round4'; // Final round
          }

          // Monday-Thursday: Default to Round 1
          if (dayOfWeek >= 1 && dayOfWeek <= 4) {
            return 'round1';
          }
        }
      }

      // Fallback to day-based logic with time check if no tournament data
      const currentHour = now.getHours();

      // Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6
      if (dayOfWeek === 3) {
        // Round 1 (Wednesday) - check if round is complete (after 6 PM)
        if (currentHour >= 18) return 'round2'; // After 6 PM, advance to Round 2
        return 'round1';
      }
      if (dayOfWeek === 4) {
        // Round 2 (Thursday) - check if round is complete (after 6 PM)
        if (currentHour >= 18) return 'round3'; // After 6 PM, advance to Round 3
        return 'round2';
      }
      if (dayOfWeek === 5) {
        // Round 3 (Friday) - check if round is complete (after 6 PM)
        if (currentHour >= 18) return 'round4'; // After 6 PM, advance to Round 4
        return 'round3';
      }
      if (dayOfWeek === 6) {
        // Saturday - final round
        return 'round4';
      }

      // Monday-Thursday: Default to Round 1
      if (dayOfWeek >= 1 && dayOfWeek <= 4) {
        return 'round1';
      }
    }

    // Default to Round 1 if not during tournament or other days
    return 'round1';
  }, []);

  const [activeRound, setActiveRound] = useState<'round1' | 'round2' | 'round3' | 'round4'>(getCurrentRound());
  const { selectedTimezone, updateTimezone } = useTimezone();
  const [isClient, setIsClient] = useState(false);
  
  // Get dynamic date info for Round 1
  const round1DateInfo = getRound1DateInfo();

  // Ensure component only renders on client to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update active round when tournament status changes
  useEffect(() => {
    const updateRound = () => {
      const newRound = getCurrentRound();
      if (newRound !== activeRound) {
        setActiveRound(newRound);
      }
    };

    // Check every 30 seconds during tournament week for status changes
    const interval = setInterval(updateRound, 30000); // 30 seconds

    // Also listen for storage changes (when tournament widget updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'tournamentStatus' || e.key === 'tournamentRound') {
        updateRound();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [activeRound, getCurrentRound]);




  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">
              Tee Times
            </h1>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Tournament Header */}
          <div className="bg-secondary-500 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {tournamentData?.name || TOURNAMENT_NAME}
                </h2>
                <p className="text-secondary-100">
                  {tournamentData?.date && tournamentData?.endDate ? 
                    (() => {
                      const start = new Date(tournamentData.date);
                      const end = new Date(tournamentData.endDate);
                      const startMonth = start.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
                      const endMonth = end.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
                      const startDay = start.getUTCDate();
                      const endDay = end.getUTCDate();
                      const year = start.getUTCFullYear();
                      
                      if (startMonth === endMonth) {
                        return `${startMonth} ${startDay}-${endDay}, ${year}`;
                      } else {
                        return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
                      }
                    })()
                    : 'November 20-23, 2025'
                  } • {tournamentData?.courses?.[0]?.name || TOURNAMENT_COURSE}
                </p>
                <p className="text-secondary-100">{tournamentData?.courses?.[0]?.address ? `${tournamentData.courses[0].address.city}, ${tournamentData.courses[0].address.state || tournamentData.courses[0].address.country}` : TOURNAMENT_LOCATION}</p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-secondary-200 text-xs uppercase tracking-wide">Par</span>
                    <span className="text-white font-semibold text-lg">{tournamentData?.courses?.[0]?.shotsToPar || TOURNAMENT_PAR}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-200 text-xs uppercase tracking-wide">Yards</span>
                    <span className="text-white font-semibold text-lg">{tournamentData?.courses?.[0]?.totalYards?.toLocaleString() || TOURNAMENT_YARDS.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-200 text-xs uppercase tracking-wide">Field</span>
                    <span className="text-white font-semibold text-lg">{TOURNAMENT_FIELD}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-200 text-xs uppercase tracking-wide">Purse</span>
                    <span className="text-white font-semibold text-lg">{tournamentData?.purse ? formatPurse(tournamentData.purse) : TOURNAMENT_PURSE}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src={TOURNAMENT_LOGO}
                  alt={`${tournamentData?.name || TOURNAMENT_NAME} Logo`}
                  width={200}
                  height={100}
                  className="h-24 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Tee Times Content */}
          <div className="p-6">
            {/* Round Navigation */}
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-4xl">
                {/* Mobile: Stack buttons vertically */}
                <div className="block sm:hidden space-y-2">
                  <button
                    onClick={() => setActiveRound('round1')}
                    className={`w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      activeRound === 'round1'
                        ? 'text-primary-600 bg-primary-50 border border-primary-200'
                        : 'text-gray-500 hover:text-gray-700 border border-gray-200'
                    }`}
                  >
                    Round 1 - {round1DateInfo.dayLabel}
                  </button>
                  <button
                    disabled
                    className="w-full px-4 py-3 text-sm font-medium rounded-md transition-colors text-gray-300 bg-gray-100 border border-gray-200 cursor-not-allowed"
                  >
                    Round 2 - Friday (TBD)
                  </button>
                  <button
                    disabled
                    className="w-full px-4 py-3 text-sm font-medium rounded-md transition-colors text-gray-300 bg-gray-100 border border-gray-200 cursor-not-allowed"
                  >
                    Round 3 - Saturday (TBD)
                  </button>
                  <button
                    disabled
                    className="w-full px-4 py-3 text-sm font-medium rounded-md transition-colors text-gray-300 bg-gray-100 border border-gray-200 cursor-not-allowed"
                  >
                    Round 4 - Sunday (TBD)
                  </button>
                </div>

                {/* Desktop: Horizontal layout */}
                <div className="hidden sm:flex justify-center">
                  <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                    <button
                      onClick={() => setActiveRound('round1')}
                      className={`px-3 sm:px-4 lg:px-6 py-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeRound === 'round1'
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Round 1 - {round1DateInfo.dayLabel}
                    </button>
                    <button
                      disabled
                      className="px-3 sm:px-4 lg:px-6 py-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap text-gray-300 cursor-not-allowed"
                    >
                      Round 2 - Friday (TBD)
                    </button>
                    <button
                      disabled
                      className="px-3 sm:px-4 lg:px-6 py-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap text-gray-300 cursor-not-allowed"
                    >
                      Round 3 - Saturday (TBD)
                    </button>
                    <button
                      disabled
                      className="px-3 sm:px-4 lg:px-6 py-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap text-gray-300 cursor-not-allowed"
                    >
                      Round 4 - Sunday (TBD)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Timezone Selector */}
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-md">
                <label htmlFor="timezone-select" className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Select Timezone
                </label>
                {isClient ? (
                  <TimezoneSelect
                    value={selectedTimezone}
                    onChange={(tz) => updateTimezone(tz.value)}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        boxShadow: 'none',
                        '&:hover': {
                          border: '1px solid #9ca3af',
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#f3f4f6' : 'white',
                        color: state.isSelected ? 'white' : '#374151',
                      }),
                    }}
                  />
                ) : (
                  <div className="h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                    Loading timezone selector...
                  </div>
                )}
              </div>
            </div>

            {/* Active Round Content */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {isClient ? (
                  <>
                    {activeRound === 'round1' && `Round 1 - ${round1DateInfo.dateLabel}`}
                    {activeRound === 'round2' && 'Round 2 - Friday, November 7'}
                    {activeRound === 'round3' && 'Round 3 - Saturday, November 8'}
                    {activeRound === 'round4' && 'Round 4 - Sunday, November 9'}
                  </>
                ) : (
                  <>
                    {activeRound === 'round1' && 'Round 1 - Thursday, November 6'}
                    {activeRound === 'round2' && 'Round 2 - Friday, November 7'}
                    {activeRound === 'round3' && 'Round 3 - Saturday, November 8'}
                    {activeRound === 'round4' && 'Round 4 - Sunday, November 9'}
                  </>
                )}
              </h3>

              {(() => {
                const teeTimes = activeRound === 'round1' ? round1TeeTimes : 
                                activeRound === 'round2' ? round2TeeTimes :
                                activeRound === 'round3' ? round3TeeTimes :
                                round4TeeTimes;
                const groupedByTime = teeTimes.reduce((acc, group) => {
                  if (!acc[group.time]) {
                    acc[group.time] = { tee1: null, tee10: null };
                  }
                  if (group.tee === '1') {
                    acc[group.time].tee1 = group;
                  } else {
                    acc[group.time].tee10 = group;
                  }
                  return acc;
                }, {} as Record<string, { tee1: typeof teeTimes[0] | null; tee10: typeof teeTimes[0] | null }>);

                return (
                  <>
                    {/* Mobile Card Layout */}
                    <div className="block lg:hidden space-y-4">
                      {Object.entries(groupedByTime).map(([time, groups], index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-primary-800 text-center leading-none">
                                  {convertTeeTime(time, DEFAULT_TIMEZONE, selectedTimezone)}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Tee Time</div>
                                <div className="text-sm text-gray-500">Both tees</div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {/* Tee 1 Group */}
                            {groups.tee1 && (
                              <div className="border-l-4 border-primary-500 pl-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-medium text-gray-700">Tee 1</span>
                                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                </div>
                                <div className="space-y-1">
                                  {groups.tee1.players.map((player: string, playerIndex: number) => (
                                    <div key={playerIndex} className="text-gray-700 text-sm">
                                      {player}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Tee 10 Group */}
                            {groups.tee10 && (
                              <div className="border-l-4 border-secondary-500 pl-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-medium text-gray-700">Tee 10</span>
                                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                                </div>
                                <div className="space-y-1">
                                  {groups.tee10.players.map((player: string, playerIndex: number) => (
                                    <div key={playerIndex} className="text-gray-700 text-sm">
                                      {player}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Table Layout */}
                    <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Time</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Tee</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Players</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Tee</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Players</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(groupedByTime).map(([time, groups], index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                                  {convertTeeTime(time, DEFAULT_TIMEZONE, selectedTimezone)}
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">
                                  {groups.tee1 ? '1' : '-'}
                                </td>
                                <td className="border border-gray-300 px-4 py-3">
                                  <div className="space-y-1">
                                    {groups.tee1 ? groups.tee1.players.map((player: string, playerIndex: number) => (
                                      <div key={playerIndex} className="text-gray-700">
                                        {player}
                                      </div>
                                    )) : <div className="text-gray-400">-</div>}
                                  </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">
                                  {groups.tee10 ? '10' : '-'}
                                </td>
                                <td className="border border-gray-300 px-4 py-3">
                                  <div className="space-y-1">
                                    {groups.tee10 ? groups.tee10.players.map((player: string, playerIndex: number) => (
                                      <div key={playerIndex} className="text-gray-700">
                                        {player}
                                      </div>
                                    )) : <div className="text-gray-400">-</div>}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeeTimesPage() {
  return (
    <TimezoneProvider>
      <TeeTimesContent />
    </TimezoneProvider>
  );
}
