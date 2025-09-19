'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import TimezoneSelect from 'react-timezone-select';
import { TimezoneProvider, useTimezone } from '@/components/TimezoneContext';

// Default timezone (Central Time - tournament timezone)
const DEFAULT_TIMEZONE = 'America/New_York';

// Tournament information
const TOURNAMENT_NAME = "Walmart NW Arkansas Championship";
const TOURNAMENT_COURSE = "Pinnacle Country Club";
const TOURNAMENT_LOCATION = "Rogers, Arkansas";
const TOURNAMENT_PAR = 71;
const TOURNAMENT_YARDS = 6438;
const TOURNAMENT_FIELD = "144 Players";
const TOURNAMENT_PURSE = "$3,000,000";
const TOURNAMENT_LOGO = "https://media.lpga.com/images/librariesprovider3/default-album/nwa-champ-new-logo.png?sfvrsn=7007305e_1";

// Round 1 Tee Times
const round1TeeTimes = [
  { time: "7:10AM", tee: "1", players: ["Ilhee Lee", "Yahui Zhang", "Ssu-Chia Cheng"] },
  { time: "7:21AM", tee: "1", players: ["Aditi Ashok", "Karis Anne Davidson", "Wichanee Meechai"] },
  { time: "7:32AM", tee: "1", players: ["Muni He", "Emily Kristine Pedersen", "Azahara Munoz"] },
  { time: "7:43AM", tee: "1", players: ["Cassie Porter", "Auston Kim", "Somi Lee"] },
  { time: "7:54AM", tee: "1", players: ["Stephanie Kyriacou", "Bailey Tardy", "Ingrid Lindblad"] },
  { time: "8:05AM", tee: "1", players: ["Minami Katsu", "Rio Takeda", "Anna Nordqvist"] },
  { time: "8:16AM", tee: "1", players: ["Leona Maguire", "Mi Hyang Lee", "Sarah Schmelzel"] },
  { time: "8:27AM", tee: "1", players: ["Allisen Corpuz", "Jenny Bae", "Wei-Ling Hsu"] },
  { time: "8:38AM", tee: "1", players: ["Eun-Hee Ji", "Maude-Aimee Leblanc", "Celine Borge"] },
  { time: "8:49AM", tee: "1", players: ["Jeongeun Lee6", "Alexa Pano", "Yu Liu"] },
  { time: "9:00AM", tee: "1", players: ["Maria Jose Marin Cali", "Robyn Choi", "Sophia Popov"] },
  { time: "9:11AM", tee: "1", players: ["Sung Hyun Park", "Kendall Todd", "Xiaowen Yin"] },
  { time: "7:10AM", tee: "10", players: ["Pornanong Phatlum", "Madison Young", "Brianna Do"] },
  { time: "7:21AM", tee: "10", players: ["Jessica Porvasnik", "In Gee Chun", "Morgane Metraux"] },
  { time: "7:32AM", tee: "10", players: ["Yuna Nishimura", "Caroline Inglis", "Brittany Altomare"] },
  { time: "7:43AM", tee: "10", players: ["Lottie Woad", "Mao Saigo", "Lilia Vu"] },
  { time: "7:54AM", tee: "10", players: ["Lexi Thompson", "Maja Stark", "Miyu Yamashita"] },
  { time: "8:05AM", tee: "10", players: ["Jin Young Ko", "Yealimi Noh", "Jasmine Suwannapura"] },
  { time: "8:16AM", tee: "10", players: ["Sei Young Kim", "Madelene Sagstrom", "Celine Boutier"] },
  { time: "8:27AM", tee: "10", players: ["A Lim Kim", "Hyo Joo Kim", "Jennifer Kupcho"] },
  { time: "8:38AM", tee: "10", players: ["Benedetta Moresco", "Brooke Matthews", "Dewi Weber"] },
  { time: "8:49AM", tee: "10", players: ["Kate Smith-Stroh", "Hyo Joon Jang", "Mariel Galdiano"] },
  { time: "9:00AM", tee: "10", players: ["Weiwei Zhang", "Frida Kinhult", "Danielle Kang"] },
  { time: "9:11AM", tee: "10", players: ["Jeongeun Lee5", "Ruixin Liu", "Kumkang Park"] },
  { time: "12:10PM", tee: "1", players: ["Alison Lee", "Arpichaya Yubol", "Gabriela Ruffels"] },
  { time: "12:21PM", tee: "1", players: ["Lauren Morris", "Bianca Pagdanganan", "Jodi Ewart Shadoff"] },
  { time: "12:32PM", tee: "1", players: ["Yuri Yoshida", "Amanda Doherty", "Nataliya Guseva"] },
  { time: "12:43PM", tee: "1", players: ["Stacy Lewis", "Nelly Korda", "Lauren Coughlin"] },
  { time: "12:54PM", tee: "1", players: ["Akie Iwai", "Linn Grant", "Grace Kim"] },
  { time: "1:05PM", tee: "1", players: ["Hannah Green", "Chanettee Wannasaen", "Chisato Iwai"] },
  { time: "1:16PM", tee: "1", players: ["Megan Khang", "Haeran Ryu", "Miranda Wang"] },
  { time: "1:27PM", tee: "1", players: ["Andrea Lee", "Nasa Hataoka", "Esther Henseleit"] },
  { time: "1:38PM", tee: "1", players: ["Pauline Roussin-Bouchard", "Soo Bin Joo", "Jiwon Jeon"] },
  { time: "1:49PM", tee: "1", players: ["Sofia Garcia", "Hinako Shibuno", "Perrine Delacour"] },
  { time: "2:00PM", tee: "1", players: ["Bronte Law", "Mary Liu", "Caroline Masson"] },
  { time: "2:11PM", tee: "1", players: ["Daniela Darquea", "Hira Naveed", "Savannah Grewal"] },
  { time: "12:10PM", tee: "10", players: ["Saki Baba", "Paula Reto", "Narin An"] },
  { time: "12:21PM", tee: "10", players: ["Mirim Lee", "Lucy Li", "Ina Yoon"] },
  { time: "12:32PM", tee: "10", players: ["Kristen Gillman", "Olivia Cowan", "Lauren Hartlage"] },
  { time: "12:43PM", tee: "10", players: ["Julia Lopez Ramirez", "Patty Tavatanakit", "Pajaree Anannarukarn"] },
  { time: "12:54PM", tee: "10", players: ["Yan Liu", "Amy Yang", "Yuka Saso"] },
  { time: "1:05PM", tee: "10", players: ["Gaby Lopez", "Jenny Shin", "Ayaka Furue"] },
  { time: "1:16PM", tee: "10", players: ["Jin Hee Im", "Hye-Jin Choi", "Linnea Strom"] },
  { time: "1:27PM", tee: "10", players: ["Carlota Ciganda", "Manon De Roey", "Lindy Duncan"] },
  { time: "1:38PM", tee: "10", players: ["Gemma Dryburgh", "Ryann O'Toole", "Maria Fassi"] },
  { time: "1:49PM", tee: "10", players: ["Ana Belac", "Caley McGinty", "Stephanie Meadow"] },
  { time: "2:00PM", tee: "10", players: ["Haeji Kang", "Gurleen Kaur", "Aline Krauter"] },
  { time: "2:11PM", tee: "10", players: ["Gigi Stoll", "Adela Cernousek", "Peiyun Chien"] }
];

// Round 2 Tee Times
const round2TeeTimes = [
  { time: "7:10AM", tee: "1", players: ["Saki Baba", "Paula Reto", "Narin An"] },
  { time: "7:21AM", tee: "1", players: ["Mirim Lee", "Lucy Li", "Ina Yoon"] },
  { time: "7:32AM", tee: "1", players: ["Kristen Gillman", "Olivia Cowan", "Lauren Hartlage"] },
  { time: "7:43AM", tee: "1", players: ["Julia Lopez Ramirez", "Patty Tavatanakit", "Pajaree Anannarukarn"] },
  { time: "7:54AM", tee: "1", players: ["Yan Liu", "Amy Yang", "Yuka Saso"] },
  { time: "8:05AM", tee: "1", players: ["Gaby Lopez", "Jenny Shin", "Ayaka Furue"] },
  { time: "8:16AM", tee: "1", players: ["Jin Hee Im", "Hye-Jin Choi", "Linnea Strom"] },
  { time: "8:27AM", tee: "1", players: ["Carlota Ciganda", "Manon De Roey", "Lindy Duncan"] },
  { time: "8:38AM", tee: "1", players: ["Gemma Dryburgh", "Ryann O'Toole", "Maria Fassi"] },
  { time: "8:49AM", tee: "1", players: ["Ana Belac", "Caley McGinty", "Stephanie Meadow"] },
  { time: "9:00AM", tee: "1", players: ["Haeji Kang", "Gurleen Kaur", "Aline Krauter"] },
  { time: "9:11AM", tee: "1", players: ["Gigi Stoll", "Adela Cernousek", "Peiyun Chien"] },
  { time: "7:10AM", tee: "10", players: ["Alison Lee", "Arpichaya Yubol", "Gabriela Ruffels"] },
  { time: "7:21AM", tee: "10", players: ["Lauren Morris", "Bianca Pagdanganan", "Jodi Ewart Shadoff"] },
  { time: "7:32AM", tee: "10", players: ["Yuri Yoshida", "Amanda Doherty", "Nataliya Guseva"] },
  { time: "7:43AM", tee: "10", players: ["Stacy Lewis", "Nelly Korda", "Lauren Coughlin"] },
  { time: "7:54AM", tee: "10", players: ["Akie Iwai", "Linn Grant", "Grace Kim"] },
  { time: "8:05AM", tee: "10", players: ["Hannah Green", "Chanettee Wannasaen", "Chisato Iwai"] },
  { time: "8:16AM", tee: "10", players: ["Megan Khang", "Haeran Ryu", "Miranda Wang"] },
  { time: "8:27AM", tee: "10", players: ["Andrea Lee", "Nasa Hataoka", "Esther Henseleit"] },
  { time: "8:38AM", tee: "10", players: ["Pauline Roussin-Bouchard", "Soo Bin Joo", "Jiwon Jeon"] },
  { time: "8:49AM", tee: "10", players: ["Sofia Garcia", "Hinako Shibuno", "Perrine Delacour"] },
  { time: "9:00AM", tee: "10", players: ["Bronte Law", "Mary Liu", "Caroline Masson"] },
  { time: "9:11AM", tee: "10", players: ["Daniela Darquea", "Hira Naveed", "Savannah Grewal"] },
  { time: "12:10PM", tee: "1", players: ["Pornanong Phatlum", "Madison Young", "Brianna Do"] },
  { time: "12:21PM", tee: "1", players: ["Jessica Porvasnik", "In Gee Chun", "Morgane Metraux"] },
  { time: "12:32PM", tee: "1", players: ["Yuna Nishimura", "Caroline Inglis", "Brittany Altomare"] },
  { time: "12:43PM", tee: "1", players: ["Lottie Woad", "Mao Saigo", "Lilia Vu"] },
  { time: "12:54PM", tee: "1", players: ["Lexi Thompson", "Maja Stark", "Miyu Yamashita"] },
  { time: "1:05PM", tee: "1", players: ["Jin Young Ko", "Yealimi Noh", "Jasmine Suwannapura"] },
  { time: "1:16PM", tee: "1", players: ["Sei Young Kim", "Madelene Sagstrom", "Celine Boutier"] },
  { time: "1:27PM", tee: "1", players: ["A Lim Kim", "Hyo Joo Kim", "Jennifer Kupcho"] },
  { time: "1:38PM", tee: "1", players: ["Benedetta Moresco", "Brooke Matthews", "Dewi Weber"] },
  { time: "1:49PM", tee: "1", players: ["Kate Smith-Stroh", "Hyo Joon Jang", "Mariel Galdiano"] },
  { time: "2:00PM", tee: "1", players: ["Weiwei Zhang", "Frida Kinhult", "Danielle Kang"] },
  { time: "2:11PM", tee: "1", players: ["Jeongeun Lee5", "Ruixin Liu", "Kumkang Park"] },
  { time: "12:10PM", tee: "10", players: ["Ilhee Lee", "Yahui Zhang", "Ssu-Chia Cheng"] },
  { time: "12:21PM", tee: "10", players: ["Aditi Ashok", "Karis Anne Davidson", "Wichanee Meechai"] },
  { time: "12:32PM", tee: "10", players: ["Muni He", "Emily Kristine Pedersen", "Azahara Munoz"] },
  { time: "12:43PM", tee: "10", players: ["Cassie Porter", "Auston Kim", "Somi Lee"] },
  { time: "12:54PM", tee: "10", players: ["Stephanie Kyriacou", "Bailey Tardy", "Ingrid Lindblad"] },
  { time: "1:05PM", tee: "10", players: ["Minami Katsu", "Rio Takeda", "Anna Nordqvist"] },
  { time: "1:16PM", tee: "10", players: ["Leona Maguire", "Mi Hyang Lee", "Sarah Schmelzel"] },
  { time: "1:27PM", tee: "10", players: ["Allisen Corpuz", "Jenny Bae", "Wei-Ling Hsu"] },
  { time: "1:38PM", tee: "10", players: ["Eun-Hee Ji", "Maude-Aimee Leblanc", "Celine Borge"] },
  { time: "1:49PM", tee: "10", players: ["Jeongeun Lee6", "Alexa Pano", "Yu Liu"] },
  { time: "2:00PM", tee: "10", players: ["Maria Jose Marin Cali", "Robyn Choi", "Sophia Popov"] },
  { time: "2:11PM", tee: "10", players: ["Sung Hyun Park", "Kendall Todd", "Xiaowen Yin"] }
];

// Function to convert tee time from Central to selected timezone
function convertTeeTime(timeString: string, fromTimezone: string, toTimezone: string): string {
  try {
    // If the timezones are the same, return the original time
    if (fromTimezone === toTimezone) {
      return timeString;
    }

    // Parse the time (e.g., "6:20 AM" or "12:31 PM")
    const timeMatch = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (!timeMatch) return timeString;

    const [, hour, minute, period] = timeMatch;

    // Convert to 24-hour format
    let hour24 = parseInt(hour);
    if (period === 'PM' && hour24 !== 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;

    // Create a date string in the source timezone
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hourStr = String(hour24).padStart(2, '0');
    const minuteStr = String(minute).padStart(2, '0');

    // Create the date string with timezone info
    const dateString = `${year}-${month}-${day}T${hourStr}:${minuteStr}:00`;

    // Create date object and convert to target timezone
    const sourceDate = new Date(dateString);

    // Format directly to target timezone
    const formatted = sourceDate.toLocaleTimeString('en-US', {
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
  // Function to determine which round should be active based on tournament status
  const getCurrentRound = useCallback((): 'round1' | 'round2' => {
    // Tournament dates: September 19-21, 2025 (Friday-Sunday)
    const tournamentStartDate = new Date('2025-09-19'); // Friday
    const tournamentEndDate = new Date('2025-09-21'); // Sunday

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
          if (currentRound === 2) return 'round2'; // Final round
        }

        // If tournament is still active, show current round
        if (currentRound === 1) return 'round1';
        if (currentRound === 2) return 'round2';
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
              if (currentRound === 2) return 'round2'; // Final round
            }

            // If tournament is still active, show current round
            if (currentRound === 1) return 'round1';
            if (currentRound === 2) return 'round2';
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

          // Friday (Round 1)
          if (dayOfWeek === 5) {
            // If it's after 6 PM on Friday, Round 1 is likely complete
            if (currentHour >= 18) {
              return 'round2';
            }
            return 'round1';
          }

          // Saturday (Round 2)
          if (dayOfWeek === 6) {
            // If it's after 6 PM on Saturday, Round 2 is likely complete
            if (currentHour >= 18) {
              return 'round2'; // Final round
            }
            return 'round2';
          }

          // Sunday (Final day)
          if (dayOfWeek === 0) {
            return 'round2'; // Final round
          }

          // Monday-Thursday: Default to Round 1
          if (dayOfWeek >= 1 && dayOfWeek <= 4) {
            return 'round1';
          }
        }
      }

      // Fallback to day-based logic with time check if no tournament data
      const currentHour = now.getHours();

      // Friday = 5, Saturday = 6, Sunday = 0
      if (dayOfWeek === 5) {
        // Round 1 (Friday) - check if round is complete (after 6 PM)
        if (currentHour >= 18) return 'round2'; // After 6 PM, advance to Round 2
        return 'round1';
      }
      if (dayOfWeek === 6) {
        // Round 2 (Saturday) - check if round is complete (after 6 PM)
        if (currentHour >= 18) return 'round2'; // After 6 PM, stay on Round 2 (final round)
        return 'round2';
      }
      if (dayOfWeek === 0) {
        // Sunday - final round
        return 'round2';
      }

      // Monday-Thursday: Default to Round 1
      if (dayOfWeek >= 1 && dayOfWeek <= 4) {
        return 'round1';
      }
    }

    // Default to Round 1 if not during tournament or other days
    return 'round1';
  }, []);

  const [activeRound, setActiveRound] = useState<'round1' | 'round2'>(getCurrentRound());
  const { selectedTimezone, updateTimezone } = useTimezone();
  const [isClient, setIsClient] = useState(false);

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
                  {TOURNAMENT_NAME}
                </h2>
                <p className="text-secondary-100">September 19-21, 2025 • {TOURNAMENT_COURSE}</p>
                <p className="text-secondary-100">{TOURNAMENT_LOCATION}</p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-secondary-200">Par:</span>
                    <span className="text-white font-medium ml-1">{TOURNAMENT_PAR}</span>
                  </div>
                  <div>
                    <span className="text-secondary-200">Yards:</span>
                    <span className="text-white font-medium ml-1">{TOURNAMENT_YARDS.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-secondary-200">Field:</span>
                    <span className="text-white font-medium ml-1">{TOURNAMENT_FIELD}</span>
                  </div>
                  <div>
                    <span className="text-secondary-200">Purse:</span>
                    <span className="text-white font-medium ml-1">{TOURNAMENT_PURSE}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src={TOURNAMENT_LOGO}
                  alt={`${TOURNAMENT_NAME} Logo`}
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
                    Round 1 - Friday
                  </button>
                  <button
                    onClick={() => setActiveRound('round2')}
                    className={`w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      activeRound === 'round2'
                        ? 'text-primary-600 bg-primary-50 border border-primary-200'
                        : 'text-gray-500 hover:text-gray-700 border border-gray-200'
                    }`}
                  >
                    Round 2 - Saturday
                  </button>
                  {/* <button
                    onClick={() => setActiveRound('round3')}
                    className={`w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      activeRound === 'round3'
                        ? 'text-primary-600 bg-primary-50 border border-primary-200'
                        : 'text-gray-500 hover:text-gray-700 border border-gray-200'
                    }`}
                  >
                    Round 3 - Sunday
                  </button>
                  <button
                    onClick={() => setActiveRound('round4')}
                    className={`w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      activeRound === 'round4'
                        ? 'text-primary-600 bg-primary-50 border border-primary-200'
                        : 'text-gray-500 hover:text-gray-700 border border-gray-200'
                    }`}
                  >
                    Round 4 - Monday
                  </button> */}
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
                      Round 1 - Friday
                    </button>
                    <button
                      onClick={() => setActiveRound('round2')}
                      className={`px-3 sm:px-4 lg:px-6 py-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeRound === 'round2'
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Round 2 - Saturday
                    </button>
                    {/* <button
                      onClick={() => setActiveRound('round3')}
                      className={`px-3 sm:px-4 lg:px-6 py-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeRound === 'round3'
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Round 3 - Sunday
                    </button>
                    <button
                      onClick={() => setActiveRound('round4')}
                      className={`px-3 sm:px-4 lg:px-6 py-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeRound === 'round4'
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Round 4 - Monday
                    </button> */}
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
                {activeRound === 'round1' ? 'Round 1 - Friday, September 19' :
                 activeRound === 'round2' ? 'Round 2 - Saturday, September 20' :
                 'Round 1 - Friday, September 19'}
              </h3>

              {(() => {
                const teeTimes = activeRound === 'round1' ? round1TeeTimes :
                                 activeRound === 'round2' ? round2TeeTimes :
                                 round1TeeTimes;
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
