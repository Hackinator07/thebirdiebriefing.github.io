'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import TimezoneSelect from 'react-timezone-select';
import { TimezoneProvider, useTimezone } from '@/components/TimezoneContext';
import { useStaticTournamentData } from '@/hooks/useStaticTournamentData';

// Default timezone (Malaysia Time - Maybank Championship tee times)
const DEFAULT_TIMEZONE = 'Asia/Kuala_Lumpur';

// Tournament information
const TOURNAMENT_NAME = "Maybank Championship 2025";
const TOURNAMENT_COURSE = "Kuala Lumpur Golf & Country Club";
const TOURNAMENT_LOCATION = "Kuala Lumpur, Malaysia";
const TOURNAMENT_PAR = 72;
const TOURNAMENT_YARDS = 6536;
const TOURNAMENT_FIELD = "78 Players";
const TOURNAMENT_PURSE = "$3,000,000";
const TOURNAMENT_LOGO = "https://media.lpga.com/images/librariesprovider3/default-album/mb-championship-2023-logo---primarye077f6ff-83cc-4daa-a1ac-376523f09d9d.png?sfvrsn=f10791fd_1";

// Thursday, October 30, 2025 Tee Times (Malaysia Time - GMT+8)
const round1TeeTimes = [
  // Tee 1
  { time: "7:15AM", tee: "1", players: ["Lucy Li (Redwood Shores, CA)", "Weiwei Zhang (Hainan, People's Republic of China)", "Manon De Roey (Lint, Belgium)"] },
  { time: "7:26AM", tee: "1", players: ["Wei-Ling Hsu (New Taipei City, Chinese Taipei)", "Cholcheva Wongras * (Chiangmai, Thailand)", "Jenny Bae (Suwanee, GA)"] },
  { time: "7:37AM", tee: "1", players: ["Gemma Dryburgh (Aberdeen, Scotland)", "Paula Reto (Bloemfontein, South Africa)", "Yan Liu (Fujian, People's Republic of China)"] },
  { time: "7:48AM", tee: "1", players: ["Kristen Gillman (Austin, TX)", "Kelly Tan * (Batu Pahat, Malaysia)", "Brooke M. Henderson (Smiths Falls, Ontario)"] },
  { time: "7:59AM", tee: "1", players: ["Lindy Duncan (Plantation, FL)", "Albane Valenzuela (Geneva, Switzerland)", "Yealimi Noh (San Francisco, CA)"] },
  { time: "8:10AM", tee: "1", players: ["Elizabeth Szokol (Chicago, IL)", "Ashleigh Buhai (Johannesburg, South Africa)", "Pauline Roussin-Bouchard (Orcieres 1850, France)"] },
  { time: "8:21AM", tee: "1", players: ["Gurleen Kaur (Houston, TX)", "Auston Kim (St. Augustine, FL)", "Ingrid Lindblad (Halmstad, Sweden)"] },
  { time: "8:32AM", tee: "1", players: ["Hannah Green (Perth, Australia)", "Linn Grant (Viken, Sweden)", "Nasa Hataoka (Ibaraki, Japan)"] },
  { time: "8:43AM", tee: "1", players: ["Hye-Jin Choi (Gyeonggi-do, Republic of Korea)", "Ashley Lau * (Bintulu, Malaysia)", "Gaby Lopez (Mexico City, Mexico)"] },
  { time: "8:54AM", tee: "1", players: ["Mirabel Ting * (Miri, Malaysia)", "Lottie Woad (Farnham, England)", "Chisato Iwai (Saitama, Japan)"] },
  { time: "9:05AM", tee: "1", players: ["Lilia Vu (Fountain Valley, CA)", "Grace Kim (Sydney, Australia)", "Miyu Yamashita (Osaka, Japan)"] },
  { time: "9:16AM", tee: "1", players: ["Rio Takeda (Kumamoto, Japan)", "Lydia Ko (Auckland, New Zealand)", "Angel Yin (Arcadia, CA)"] },
  { time: "9:27AM", tee: "1", players: ["Celine Boutier (Montrouge, France)", "Ruoning Yin (ShangHai, People's Republic of China)", "Jeeno Thitikul (Bangkok, Thailand)"] },
  
  // Tee 10
  { time: "7:15AM", tee: "10", players: ["Mary Liu (Xi'an, People's Republic of China)", "Aditi Ashok (Bangalore, India)", "Yuri Yoshida (Chiba, Japan)"] },
  { time: "7:26AM", tee: "10", players: ["Sei Young Kim (Seoul, Republic of Korea)", "Robyn Choi (Gold Coast, Australia)", "Mi Hyang Lee (Seoul, Republic of Korea)"] },
  { time: "7:37AM", tee: "10", players: ["Nanna Koerstz Madsen (Smoerum, Denmark)", "Miranda Wang (Tianjin, People's Republic of China)", "Chanettee Wannasaen (Chiang mai, Thailand)"] },
  { time: "7:48AM", tee: "10", players: ["Achiraya Sriwong (a) * (Loei, Thailand)", "Ina Yoon (Seoul, Republic of Korea)", "Julia Lopez Ramirez (Benahavis, Spain)"] },
  { time: "7:59AM", tee: "10", players: ["Kan Bunnabodee * (Chonburi, Thailand)", "Ilhee Lee (Seoul, Republic of Korea)", "Somi Lee (Yongin-si, Republic of Korea)"] },
  { time: "8:10AM", tee: "10", players: ["Karis Anne Davidson (Gold Coast, Australia)", "Haeji Kang (Seoul, Republic of Korea)", "Benedetta Moresco (Caldogno, Italy)"] },
  { time: "8:21AM", tee: "10", players: ["Arpichaya Yubol (Saraburi, Thailand)", "Emily Kristine Pedersen (Smoerum, Denmark)", "Celine Borge (Tonsberg, Norway)"] },
  { time: "8:32AM", tee: "10", players: ["Kritchanya Kaopattanaskul (a) * (Pattaya City, Thailand)", "Minami Katsu (Kagoshima, Japan)", "Haeran Ryu (Suwon, Republic of Korea)"] },
  { time: "8:43AM", tee: "10", players: ["Genevieve I-Rynn Ling * (Selangor, Malaysia)", "Leona Maguire (Cavan, Ireland)", "Jin Hee Im (Jeju, Republic of Korea)"] },
  { time: "8:54AM", tee: "10", players: ["Namo Luangnitikul (a) * (Phuket, Thailand)", "Patty Tavatanakit (Bangkok, Thailand)", "Nataliya Guseva (Miami, FL)"] },
  { time: "9:05AM", tee: "10", players: ["Andrea Lee (Hermosa Beach, CA)", "Pajaree Anannarukarn (Bangkok, Thailand)", "Saki Baba (Tokyo, Japan)"] },
  { time: "9:16AM", tee: "10", players: ["Carlota Ciganda (Pamplona, Spain)", "Cassie Porter (Peregian Springs, Australia)", "Akie Iwai (Saitama, Japan)"] },
  { time: "9:27AM", tee: "10", players: ["Ayaka Furue (Kobe, Japan)", "A Lim Kim (Seongnam-si, Republic of Korea)", "Liyana Durisic * (Selangor, Malaysia)"] }
];

// Round 2 Tee Times - BMW Ladies Championship
const round2TeeTimes = [
  // Tee 1
  { time: "8:30AM", tee: "1", players: ["Narin An", "Cassie Porter", "Sherman Santiwiwatthanaphong"] },
  { time: "8:41AM", tee: "1", players: ["Muni He", "Shiyuan Zhou (a)", "Celine Borge"] },
  { time: "8:52AM", tee: "1", players: ["Aditi Ashok", "Nataliya Guseva", "Stephanie Kyriacou"] },
  { time: "9:03AM", tee: "1", players: ["Hye-Jin Choi", "Nanna Koerstz Madsen", "Menghan Li (a)"] },
  { time: "9:14AM", tee: "1", players: ["Minami Katsu", "Yuai Ji", "Lucy Li"] },
  { time: "9:25AM", tee: "1", players: ["Carlota Ciganda", "Julia Lopez Ramirez", "Ariya Jutanugarn"] },
  { time: "9:36AM", tee: "1", players: ["Mary Liu", "Shuying Li", "Rio Takeda"] },
  { time: "9:47AM", tee: "1", players: ["Robyn Choi", "Emily Kristine Pedersen", "Gabriela Ruffels"] },
  { time: "9:58AM", tee: "1", players: ["Ashleigh Buhai", "Patty Tavatanakit", "Sei Young Kim"] },
  { time: "10:09AM", tee: "1", players: ["Miyu Yamashita", "Somi Lee", "Pauline Roussin-Bouchard"] },
  { time: "10:20AM", tee: "1", players: ["Lindy Duncan", "Ruixin Liu", "Jin Hee Im"] },
  { time: "10:31AM", tee: "1", players: ["Ying Xu (a)", "Jennifer Kupcho", "Sarah Schmelzel"] },
  { time: "10:42AM", tee: "1", players: ["Ina Yoon", "Jeeno Thitikul", "Minjee Lee"] },
  { time: "10:53AM", tee: "1", players: ["Arpichaya Yubol", "Jenny Bae", "Jenny Shin"] },
  
  // Tee 10
  { time: "8:30AM", tee: "10", players: ["Karis Anne Davidson", "Miranda Wang", "Gemma Dryburgh"] },
  { time: "8:41AM", tee: "10", players: ["Gurleen Kaur", "Auston Kim", "Hira Naveed"] },
  { time: "8:52AM", tee: "10", players: ["Allisen Corpuz", "Saki Baba", "Zixuan Wang"] },
  { time: "9:03AM", tee: "10", players: ["Weiwei Zhang", "Albane Valenzuela", "Lilia Vu"] },
  { time: "9:14AM", tee: "10", players: ["Yu Liu", "A Lim Kim", "Ruoning Yin"] },
  { time: "9:25AM", tee: "10", players: ["Leona Maguire", "Gaby Lopez", "Runzhi Pang"] },
  { time: "9:36AM", tee: "10", players: ["Ilhee Lee", "Haeji Kang", "Yan Liu"] },
  { time: "9:47AM", tee: "10", players: ["Wei-Ling Hsu", "Zining An (a)", "Nasa Hataoka"] },
  { time: "9:58AM", tee: "10", players: ["Yuri Yoshida", "Esther Henseleit", "Kristen Gillman"] },
  { time: "10:09AM", tee: "10", players: ["Yu Yuan Jiang (a)", "Pajaree Anannarukarn", "Manon De Roey"] },
  { time: "10:20AM", tee: "10", players: ["Chih Yen Chang", "Paula Reto", "Xiaowen Yin"] },
  { time: "10:31AM", tee: "10", players: ["Yijia Ren (a)", "Benedetta Moresco", "Brooke Matthews"] },
  { time: "10:42AM", tee: "10", players: ["Yujie Liu (a)", "Danielle Kang"] },
  { time: "10:53AM", tee: "10", players: ["Angel Yin", "Yahui Zhang"] }
];

// Round 3 Tee Times - Buick LPGA Shanghai
const round3TeeTimes = [
  { time: "8:48AM", tee: "1", players: ["Kristen Gillman", "Stacy Lewis", "A Lim Kim"] },
  { time: "8:59AM", tee: "1", players: ["Ilhee Lee", "Brooke M. Henderson", "In Gee Chun"] },
  { time: "9:10AM", tee: "1", players: ["Ruixin Liu", "Miyu Yamashita", "Dewi Weber"] },
  { time: "9:21AM", tee: "1", players: ["Paula Reto", "Stephanie Meadow", "Polly Mack"] },
  { time: "9:32AM", tee: "1", players: ["Ana Belac", "Andrea Lee", "Celine Borge"] },
  { time: "9:43AM", tee: "1", players: ["Pajaree Anannarukarn", "Linnea Strom", "Elizabeth Szokol"] },
  { time: "9:54AM", tee: "1", players: ["Hyo Joo Kim", "Patty Tavatanakit", "Adela Cernousek"] },
  { time: "10:05AM", tee: "1", players: ["Minami Katsu", "Jeongeun Lee5", "Amy Yang"] },
  { time: "10:16AM", tee: "1", players: ["Charley Hull", "Allisen Corpuz", "Lucy Li"] },
  { time: "10:27AM", tee: "1", players: ["Nelly Korda", "Peiyun Chien", "Megan Khang"] },
  { time: "10:38AM", tee: "1", players: ["Pornanong Phatlum", "Ina Yoon", "Chisato Iwai"] },
  { time: "10:49AM", tee: "1", players: ["Nasa Hataoka", "Gabriela Ruffels", "Brooke Matthews"] },
  { time: "11:00AM", tee: "1", players: ["Youmin Hwang", "Jessica Porvasnik", "Akie Iwai"] },
  { time: "8:48AM", tee: "10", players: ["Sophia Popov", "Rio Takeda", "Kumkang Park"] },
  { time: "8:59AM", tee: "10", players: ["Jennifer Kupcho", "Nataliya Guseva", "Ryann O'Toole"] },
  { time: "9:10AM", tee: "10", players: ["Mariel Galdiano", "Sofia Garcia", "Emily Kristine Pedersen"] },
  { time: "9:21AM", tee: "10", players: ["Azahara Munoz", "Somi Lee", "Sung Hyun Park"] },
  { time: "9:32AM", tee: "10", players: ["Caroline Masson", "Yahui Zhang", "Hira Naveed"] },
  { time: "9:43AM", tee: "10", players: ["Narin An", "Jaravee Boonchant", "Hyo Joon Jang"] },
  { time: "9:54AM", tee: "10", players: ["Ingrid Lindblad", "Kate Smith-Stroh", "Jodi Ewart Shadoff"] },
  { time: "10:05AM", tee: "10", players: ["Yuna Nishimura", "Alena Sharp", "Jin Hee Im"] },
  { time: "10:16AM", tee: "10", players: ["Sarah Schmelzel", "Jasmine Suwannapura", "Hye-Jin Choi"] },
  { time: "10:27AM", tee: "10", players: ["Robyn Choi", "Lauren Hartlage", "Brianna Do"] },
  { time: "10:38AM", tee: "10", players: ["Jiwon Jeon", "Madelene Sagstrom"] },
  { time: "10:49AM", tee: "10", players: ["Frida Kinhult", "Cassie Porter"] }
];

// Round 4 Tee Times - Buick LPGA Shanghai
const round4TeeTimes = [
  { time: "8:43AM", tee: "1", players: ["Sofia Garcia", "Miyu Yamashita", "Ilhee Lee"] },
  { time: "8:54AM", tee: "1", players: ["Jin Hee Im", "Kumkang Park", "Jennifer Kupcho"] },
  { time: "9:05AM", tee: "1", players: ["Azahara Munoz", "Elizabeth Szokol", "Paula Reto"] },
  { time: "9:16AM", tee: "1", players: ["Ina Yoon", "Gabriela Ruffels", "Kate Smith-Stroh"] },
  { time: "9:27AM", tee: "1", players: ["Jeongeun Lee5", "Charley Hull", "Allisen Corpuz"] },
  { time: "9:38AM", tee: "1", players: ["Ruixin Liu", "Brooke M. Henderson", "Celine Borge"] },
  { time: "9:49AM", tee: "1", players: ["Somi Lee", "Dewi Weber", "Mariel Galdiano"] },
  { time: "10:00AM", tee: "1", players: ["Chisato Iwai", "Rio Takeda", "Nataliya Guseva"] },
  { time: "10:11AM", tee: "1", players: ["Andrea Lee", "Pajaree Anannarukarn", "Patty Tavatanakit"] },
  { time: "10:22AM", tee: "1", players: ["Nelly Korda", "Nasa Hataoka", "A Lim Kim"] },
  { time: "10:33AM", tee: "1", players: ["Pornanong Phatlum", "Jessica Porvasnik", "Youmin Hwang"] },
  { time: "10:44AM", tee: "1", players: ["Megan Khang", "Peiyun Chien", "Brooke Matthews"] },
  { time: "10:55AM", tee: "1", players: ["Akie Iwai", "Minami Katsu", "Hyo Joo Kim"] },
  { time: "8:43AM", tee: "10", players: ["In Gee Chun", "Linnea Strom", "Lucy Li"] },
  { time: "8:54AM", tee: "10", players: ["Robyn Choi", "Lauren Hartlage", "Cassie Porter"] },
  { time: "9:05AM", tee: "10", players: ["Yuna Nishimura", "Emily Kristine Pedersen", "Stacy Lewis"] },
  { time: "9:16AM", tee: "10", players: ["Ana Belac", "Narin An", "Hyo Joon Jang"] },
  { time: "9:27AM", tee: "10", players: ["Ryann O'Toole", "Amy Yang", "Sarah Schmelzel"] },
  { time: "9:38AM", tee: "10", players: ["Jasmine Suwannapura", "Brianna Do", "Hira Naveed"] },
  { time: "9:49AM", tee: "10", players: ["Jaravee Boonchant", "Kristen Gillman", "Stephanie Meadow"] },
  { time: "10:00AM", tee: "10", players: ["Alena Sharp", "Sophia Popov", "Sung Hyun Park"] },
  { time: "10:11AM", tee: "10", players: ["Madelene Sagstrom", "Frida Kinhult", "Caroline Masson"] },
  { time: "10:22AM", tee: "10", players: ["Ingrid Lindblad", "Jodi Ewart Shadoff", "Adela Cernousek"] },
  { time: "10:33AM", tee: "10", players: ["Hye-Jin Choi", "Yahui Zhang"] },
  { time: "10:44AM", tee: "10", players: ["Jiwon Jeon", "Polly Mack"] }
];

// Function to convert tee time from Malaysia time (GMT+8) to selected timezone
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

    // Create a date object representing the time in Malaysia timezone (GMT+8)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hourStr = String(hour24).padStart(2, '0');
    const minuteStr = String(minute).padStart(2, '0');

    // Create the date string in Malaysia timezone format
    const dateString = `${year}-${month}-${day}T${hourStr}:${minuteStr}:00`;
    
    // Create a date object that represents this time in Malaysia timezone (GMT+8)
    const malaysiaDate = new Date(dateString + '+08:00'); // Explicitly set Malaysia timezone offset (GMT+8)
    
    // Format to target timezone
    const formatted = malaysiaDate.toLocaleTimeString('en-US', {
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
  const eventId = "401734783"; // Maybank Championship event ID
  const { tournamentData, loading, error } = useStaticTournamentData(eventId);
  
  // Round 1 date info - always Thursday for Maybank Championship
  const getRound1DateInfo = useCallback(() => {
    return {
      isWednesday: false,
      dayLabel: "Thursday",
      dateLabel: "Thursday, October 30"
    };
  }, []);

  // Function to determine which round should be active based on tournament status
  const getCurrentRound = useCallback((): 'round1' | 'round2' | 'round3' | 'round4' => {
    // Tournament dates: October 30 - November 2, 2025 (Thursday-Sunday)
    const tournamentStartDate = new Date('2025-10-30'); // Thursday
    const tournamentEndDate = new Date('2025-11-02'); // Sunday

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
                <p className="text-secondary-100">October 30 - November 2, 2025 • {tournamentData?.courses?.[0]?.name || TOURNAMENT_COURSE}</p>
                <p className="text-secondary-100">{tournamentData?.courses?.[0]?.address ? `${tournamentData.courses[0].address.city}, ${tournamentData.courses[0].address.state}` : TOURNAMENT_LOCATION}</p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-secondary-200 text-xs uppercase tracking-wide">Par</span>
                    <span className="text-white font-semibold text-lg">{tournamentData?.courses?.[0]?.shotsToPar || TOURNAMENT_PAR}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-200 text-xs uppercase tracking-wide">Yards</span>
                    <span className="text-white font-semibold text-lg">{tournamentData?.courses?.[0]?.totalYards || TOURNAMENT_YARDS.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-200 text-xs uppercase tracking-wide">Field</span>
                    <span className="text-white font-semibold text-lg">{TOURNAMENT_FIELD}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-200 text-xs uppercase tracking-wide">Purse</span>
                    <span className="text-white font-semibold text-lg">{tournamentData?.purse || TOURNAMENT_PURSE}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src={tournamentData?.logo || TOURNAMENT_LOGO}
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
                    Round 2 - Friday (Coming Soon)
                  </button>
                  <button
                    disabled
                    className="w-full px-4 py-3 text-sm font-medium rounded-md transition-colors text-gray-300 bg-gray-100 border border-gray-200 cursor-not-allowed"
                  >
                    Round 3 - Saturday (Coming Soon)
                  </button>
                  <button
                    disabled
                    className="w-full px-4 py-3 text-sm font-medium rounded-md transition-colors text-gray-300 bg-gray-100 border border-gray-200 cursor-not-allowed"
                  >
                    Round 4 - Sunday (Coming Soon)
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
                      Round 2 - Friday (Coming Soon)
                    </button>
                    <button
                      disabled
                      className="px-3 sm:px-4 lg:px-6 py-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap text-gray-300 cursor-not-allowed"
                    >
                      Round 3 - Saturday (Coming Soon)
                    </button>
                    <button
                      disabled
                      className="px-3 sm:px-4 lg:px-6 py-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap text-gray-300 cursor-not-allowed"
                    >
                      Round 4 - Sunday (Coming Soon)
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
                <p className="mt-3 text-sm text-primary-500 text-center italic">
                  Dates are shown in local time. Times adjust correctly based on your selected timezone. We apologize that the date does not yet update dynamically.
                </p>
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
                    {activeRound === 'round2' && 'Round 2 - Friday, October 31'}
                    {activeRound === 'round3' && 'Round 3 - Saturday, November 1'}
                    {activeRound === 'round4' && 'Round 4 - Sunday, November 2'}
                  </>
                ) : (
                  <>
                    {activeRound === 'round1' && 'Round 1 - Thursday, October 30'}
                    {activeRound === 'round2' && 'Round 2 - Friday, October 31'}
                    {activeRound === 'round3' && 'Round 3 - Saturday, November 1'}
                    {activeRound === 'round4' && 'Round 4 - Sunday, November 2'}
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
