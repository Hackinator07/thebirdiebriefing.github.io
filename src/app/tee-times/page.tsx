'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TimezoneSelect from 'react-timezone-select';
import { TimezoneProvider, useTimezone } from '@/components/TimezoneContext';

// Default timezone (Central Time - tournament timezone)
const DEFAULT_TIMEZONE = 'America/Chicago';

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
  // Tournament dates: September 11-14, 2025 (Thursday-Sunday)
  const tournamentStartDate = new Date('2025-09-11'); // Thursday
  const tournamentEndDate = new Date('2025-09-14'); // Sunday
  
  // Function to determine which round should be active based on current date
  const getCurrentRound = (): 'round1' | 'round2' | 'round3' => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Check if we're within the tournament week
    if (today >= tournamentStartDate && today <= tournamentEndDate) {
      const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      
      // Thursday = 4, Friday = 5, Saturday = 6
      if (dayOfWeek === 4) return 'round1'; // Thursday
      if (dayOfWeek === 5) return 'round2'; // Friday  
      if (dayOfWeek === 6) return 'round3'; // Saturday
    }
    
    // Default to Round 1 if not during tournament or other days
    return 'round1';
  };

  const [activeRound, setActiveRound] = useState<'round1' | 'round2' | 'round3'>(getCurrentRound());
  const { selectedTimezone, updateTimezone } = useTimezone();
  const round1TeeTimes = [
    { time: "6:20 AM", tee: "1", players: ["Daniela Darquea", "Gemma Dryburgh", "Alexa Pano"] },
    { time: "6:20 AM", tee: "10", players: ["Soo Bin Joo", "Caroline Masson", "Lauren Morris"] },
    { time: "6:31 AM", tee: "1", players: ["Aditi Ashok", "Jaravee Boonchant", "Madison Young"] },
    { time: "6:31 AM", tee: "10", players: ["Narin An", "Eun-Hee Ji", "Wichanee Meechai"] },
    { time: "6:42 AM", tee: "1", players: ["Hyo Joon Jang", "Danielle Kang", "Yuri Yoshida"] },
    { time: "6:42 AM", tee: "10", players: ["Celine Borge", "Azahara Munoz", "Hira Naveed"] },
    { time: "6:53 AM", tee: "1", players: ["Wei-Ling Hsu", "Stacy Lewis", "Anna Nordqvist"] },
    { time: "6:53 AM", tee: "10", players: ["Allisen Corpuz", "Nasa Hataoka", "Madelene Sagstrom"] },
    { time: "7:04 AM", tee: "1", players: ["Manon De Roey", "Megan Khang", "Chanettee Wannasaen"] },
    { time: "7:04 AM", tee: "10", players: ["Jenny Bae", "Yan Liu", "Gaby Lopez"] },
    { time: "7:15 AM", tee: "1", players: ["Lindy Duncan", "Andrea Lee", "Mao Saigo"] },
    { time: "7:15 AM", tee: "10", players: ["Hannah Green", "Haeran Ryu", "Rio Takeda"] },
    { time: "7:26 AM", tee: "1", players: ["Celine Boutier", "Hye-Jin Choi", "Linnea Strom"] },
    { time: "7:26 AM", tee: "10", players: ["Nelly Korda", "Lottie Woad", "Rose Zhang"] },
    { time: "7:37 AM", tee: "1", players: ["Esther Henseleit", "Ingrid Lindblad", "Jenny Shin"] },
    { time: "7:37 AM", tee: "10", players: ["Charley Hull", "Maja Stark", "Lexi Thompson"] },
    { time: "7:48 AM", tee: "1", players: ["Brittany Altomare", "Vidhi Lakhawala (a)", "Yuna Nishimura"] },
    { time: "7:48 AM", tee: "10", players: ["Jodi Ewart Shadoff", "Aline Krauter", "Paula Reto"] },
    { time: "7:59 AM", tee: "1", players: ["Muni He", "Bianca Pagdanganan", "Gabriela Ruffels"] },
    { time: "7:59 AM", tee: "10", players: ["Polly Mack", "Pornanong Phatlum", "Kate Smith-Stroh"] },
    { time: "8:10 AM", tee: "1", players: ["Mirim Lee", "Caley McGinty", "Stephanie Meadow"] },
    { time: "8:10 AM", tee: "10", players: ["Peiyun Chien", "Olivia Cowan", "Mary Liu"] },
    { time: "8:21 AM", tee: "1", players: ["Perrine Delacour", "Brianna Do", "Sofia Garcia"] },
    { time: "8:21 AM", tee: "10", players: ["Adela Cernousek", "Maria Fassi", "Sophia Popov"] },
    { time: "11:20 AM", tee: "1", players: ["Savannah Grewal", "Ryann O'Toole", "Yahui Zhang"] },
    { time: "11:20 AM", tee: "10", players: ["Karis Anne Davidson", "Amanda Doherty", "Elizabeth Szokol"] },
    { time: "11:31 AM", tee: "1", players: ["Haeji Kang", "Benedetta Moresco", "Arpichaya Yubol"] },
    { time: "11:31 AM", tee: "10", players: ["Ashleigh Buhai", "Lauren Hartlage", "Xiaowen Yin"] },
    { time: "11:42 AM", tee: "1", players: ["Alison Lee", "Emily Kristine Pedersen", "Dewi Weber"] },
    { time: "11:42 AM", tee: "10", players: ["Fiona Xu", "Ina Yoon", "Weiwei Zhang"] },
    { time: "11:53 AM", tee: "1", players: ["Akie Iwai", "Minami Katsu", "Somi Lee"] },
    { time: "11:53 AM", tee: "10", players: ["Nanna Koerstz Madsen", "Lilia Vu", "Amy Yang"] },
    { time: "12:04 PM", tee: "1", players: ["Mi Hyang Lee", "Bailey Tardy", "Patty Tavatanakit"] },
    { time: "12:04 PM", tee: "10", players: ["Jin Hee Im", "Yuka Saso", "Jasmine Suwannapura"] },
    { time: "12:15 PM", tee: "1", players: ["Julia Lopez Ramirez", "Yealimi Noh", "Cassie Porter"] },
    { time: "12:15 PM", tee: "10", players: ["Ayaka Furue", "Sei Young Kim", "Jeeno Thitikul"] },
    { time: "12:26 PM", tee: "1", players: ["Hyo Joo Kim", "Jennifer Kupcho", "Stephanie Kyriacou"] },
    { time: "12:26 PM", tee: "10", players: ["Lydia Ko", "Minjee Lee", "Miranda Wang"] },
    { time: "12:37 PM", tee: "1", players: ["Chisato Iwai", "Gurleen Kaur", "A Lim Kim"] },
    { time: "12:37 PM", tee: "10", players: ["Grace Kim", "Jin Young Ko", "Miyu Yamashita"] },
    { time: "12:48 PM", tee: "1", players: ["Kristen Gillman", "Hinako Shibuno", "Gigi Stoll"] },
    { time: "12:48 PM", tee: "10", players: ["Brooke Matthews", "Morgane Metraux", "Kumkang Park"] },
    { time: "12:59 PM", tee: "1", players: ["Caroline Inglis", "Heather Lin", "Ruixin Liu"] },
    { time: "12:59 PM", tee: "10", players: ["Frida Kinhult", "Jeongeun Lee6", "Lucy Li"] },
    { time: "1:10 PM", tee: "1", players: ["Bronte Law", "Ilhee Lee", "Jeongeun Lee5"] },
    { time: "1:10 PM", tee: "10", players: ["Nataliya Guseva", "Jiwon Jeon", "Yu Liu"] },
    { time: "1:21 PM", tee: "1", players: ["Robyn Choi", "Mariel Galdiano", "Jessica Porvasnik"] },
    { time: "1:21 PM", tee: "10", players: ["Saki Baba", "Ana Belac", "Ssu-Chia Cheng"] }
  ];

  const round2TeeTimes = [
    { time: "6:20 AM", tee: "1", players: ["Karis Anne Davidson", "Amanda Doherty", "Elizabeth Szokol"] },
    { time: "6:20 AM", tee: "10", players: ["Savannah Grewal", "Yahui Zhang", "Ryann O'Toole"] },
    { time: "6:31 AM", tee: "1", players: ["Ashleigh Buhai", "Lauren Hartlage", "Xiaowen Yin"] },
    { time: "6:31 AM", tee: "10", players: ["Haeji Kang", "Arpichaya Yubol", "Benedetta Moresco"] },
    { time: "6:42 AM", tee: "1", players: ["Fiona Xu", "Ina Yoon", "Weiwei Zhang"] },
    { time: "6:42 AM", tee: "10", players: ["Dewi Weber", "Alison Lee", "Emily Kristine Pedersen"] },
    { time: "6:53 AM", tee: "1", players: ["Lilia Vu", "Amy Yang", "Nanna Koerstz Madsen"] },
    { time: "6:53 AM", tee: "10", players: ["Akie Iwai", "Minami Katsu", "Somi Lee"] },
    { time: "7:04 AM", tee: "1", players: ["Jin Hee Im", "Jasmine Suwannapura", "Yuka Saso"] },
    { time: "7:04 AM", tee: "10", players: ["Bailey Tardy", "Patty Tavatanakit", "Mi Hyang Lee"] },
    { time: "7:15 AM", tee: "1", players: ["Ayaka Furue", "Sei Young Kim", "Jeeno Thitikul"] },
    { time: "7:15 AM", tee: "10", players: ["Julia Lopez Ramirez", "Yealimi Noh", "Cassie Porter"] },
    { time: "7:26 AM", tee: "1", players: ["Miranda Wang", "Lydia Ko", "Minjee Lee"] },
    { time: "7:26 AM", tee: "10", players: ["Hyo Joo Kim", "Jennifer Kupcho", "Stephanie Kyriacou"] },
    { time: "7:37 AM", tee: "1", players: ["Grace Kim", "Miyu Yamashita", "Jin Young Ko"] },
    { time: "7:37 AM", tee: "10", players: ["Chisato Iwai", "Gurleen Kaur", "A Lim Kim"] },
    { time: "7:48 AM", tee: "1", players: ["Brooke Matthews", "Morgane Metraux", "Kumkang Park"] },
    { time: "7:48 AM", tee: "10", players: ["Kristen Gillman", "Gigi Stoll", "Hinako Shibuno"] },
    { time: "7:59 AM", tee: "1", players: ["Frida Kinhult", "Jeongeun Lee6", "Lucy Li"] },
    { time: "7:59 AM", tee: "10", players: ["Caroline Inglis", "Heather Lin", "Ruixin Liu"] },
    { time: "8:10 AM", tee: "1", players: ["Nataliya Guseva", "Jiwon Jeon", "Yu Liu"] },
    { time: "8:10 AM", tee: "10", players: ["Bronte Law", "Ilhee Lee", "Jeongeun Lee5"] },
    { time: "8:21 AM", tee: "1", players: ["Saki Baba", "Ana Belac", "Ssu-Chia Cheng"] },
    { time: "8:21 AM", tee: "10", players: ["Robyn Choi", "Mariel Galdiano", "Jessica Porvasnik"] },
    { time: "11:20 AM", tee: "1", players: ["Soo Bin Joo", "Caroline Masson", "Lauren Morris"] },
    { time: "11:20 AM", tee: "10", players: ["Daniela Darquea", "Gemma Dryburgh", "Alexa Pano"] },
    { time: "11:31 AM", tee: "1", players: ["Narin An", "Eun-Hee Ji", "Wichanee Meechai"] },
    { time: "11:31 AM", tee: "10", players: ["Aditi Ashok", "Jaravee Boonchant", "Madison Young"] },
    { time: "11:42 AM", tee: "1", players: ["Celine Borge", "Azahara Munoz", "Hira Naveed"] },
    { time: "11:42 AM", tee: "10", players: ["Hyo Joon Jang", "Danielle Kang", "Yuri Yoshida"] },
    { time: "11:53 AM", tee: "1", players: ["Allisen Corpuz", "Nasa Hataoka", "Madelene Sagstrom"] },
    { time: "11:53 AM", tee: "10", players: ["Wei-Ling Hsu", "Stacy Lewis", "Anna Nordqvist"] },
    { time: "12:04 PM", tee: "1", players: ["Jenny Bae", "Yan Liu", "Gaby Lopez"] },
    { time: "12:04 PM", tee: "10", players: ["Manon De Roey", "Megan Khang", "Chanettee Wannasaen"] },
    { time: "12:15 PM", tee: "1", players: ["Hannah Green", "Rio Takeda", "Haeran Ryu"] },
    { time: "12:15 PM", tee: "10", players: ["Lindy Duncan", "Andrea Lee", "Mao Saigo"] },
    { time: "12:26 PM", tee: "1", players: ["Lottie Woad", "Rose Zhang", "Nelly Korda"] },
    { time: "12:26 PM", tee: "10", players: ["Celine Boutier", "Hye-Jin Choi", "Linnea Strom"] },
    { time: "12:37 PM", tee: "1", players: ["Charley Hull", "Maja Stark", "Lexi Thompson"] },
    { time: "12:37 PM", tee: "10", players: ["Esther Henseleit", "Jenny Shin", "Ingrid Lindblad"] },
    { time: "12:48 PM", tee: "1", players: ["Jodi Ewart Shadoff", "Aline Krauter", "Paula Reto"] },
    { time: "12:48 PM", tee: "10", players: ["Brittany Altomare", "Vidhi Lakhawala (a)", "Yuna Nishimura"] },
    { time: "12:59 PM", tee: "1", players: ["Kate Smith-Stroh", "Polly Mack", "Pornanong Phatlum"] },
    { time: "12:59 PM", tee: "10", players: ["Muni He", "Bianca Pagdanganan", "Gabriela Ruffels"] },
    { time: "1:10 PM", tee: "1", players: ["Peiyun Chien", "Olivia Cowan", "Mary Liu"] },
    { time: "1:10 PM", tee: "10", players: ["Mirim Lee", "Caley McGinty", "Stephanie Meadow"] },
    { time: "1:21 PM", tee: "1", players: ["Adela Cernousek", "Maria Fassi", "Sophia Popov"] },
    { time: "1:21 PM", tee: "10", players: ["Perrine Delacour", "Brianna Do", "Sofia Garcia"] }
  ];

  const round3TeeTimes = [
    { time: "7:30 AM", tee: "1", players: ["Rio Takeda", "Yealimi Noh", "Stephanie Kyriacou"] },
    { time: "7:30 AM", tee: "10", players: ["Elizabeth Szokol", "A Lim Kim", "Jaravee Boonchant"] },
    { time: "7:41 AM", tee: "1", players: ["Pornanong Phatlum", "Lydia Ko", "Hyo Joo Kim"] },
    { time: "7:41 AM", tee: "10", players: ["Jasmine Suwannapura", "Allisen Corpuz", "Yuri Yoshida"] },
    { time: "7:52 AM", tee: "1", players: ["Robyn Choi", "Nataliya Guseva", "Linnea Strom"] },
    { time: "7:52 AM", tee: "10", players: ["Hye-Jin Choi", "Lexi Thompson", "Dewi Weber"] },
    { time: "8:03 AM", tee: "1", players: ["Lindy Duncan", "Julia Lopez Ramirez", "Kumkang Park"] },
    { time: "8:03 AM", tee: "10", players: ["Brooke Matthews", "Mao Saigo", "Madison Young"] },
    { time: "8:14 AM", tee: "1", players: ["Andrea Lee", "Perrine Delacour", "Grace Kim"] },
    { time: "8:14 AM", tee: "10", players: ["Wei-Ling Hsu", "Alena Sharp", "Narin An"] },
    { time: "8:25 AM", tee: "1", players: ["Aline Krauter", "Gabriela Ruffels", "Bianca Pagdanganan"] },
    { time: "8:25 AM", tee: "10", players: ["Emily Kristine Pedersen", "Stacy Lewis", "Jenny Shin"] },
    { time: "8:36 AM", tee: "1", players: ["Bailey Tardy", "Ruixin Liu", "Celine Boutier"] },
    { time: "8:36 AM", tee: "10", players: ["Xiaowen Yin", "Minami Katsu", "Yu Liu"] },
    { time: "8:47 AM", tee: "1", players: ["Manon De Roey", "Minjee Lee", "Miyu Yamashita"] },
    { time: "8:47 AM", tee: "10", players: ["Arpichaya Yubol", "Nasa Hataoka", "Sofia Garcia"] },
    { time: "8:58 AM", tee: "1", players: ["Jenny Bae", "Jennifer Kupcho", "Chisato Iwai"] },
    { time: "8:58 AM", tee: "10", players: ["Nanna Koerstz Madsen", "Daniela Darquea", "Jin Hee Im"] },
    { time: "9:09 AM", tee: "1", players: ["Frida Kinhult", "Jiwon Jeon", "Nelly Korda"] },
    { time: "9:09 AM", tee: "10", players: ["Ayaka Furue", "Ana Belac", "Esther Henseleit"] },
    { time: "9:20 AM", tee: "1", players: ["Gigi Stoll", "Mary Liu", "Lottie Woad"] },
    { time: "9:20 AM", tee: "10", players: ["Hira Naveed", "Jodi Ewart Shadoff", "Danielle Kang"] },
    { time: "9:31 AM", tee: "1", players: ["Olivia Cowan", "Maja Stark", "Sei Young Kim"] },
    { time: "9:31 AM", tee: "10", players: ["Mi Hyang Lee", "Gurleen Kaur", "Jessica Porvasnik"] },
    { time: "9:42 AM", tee: "1", players: ["Chanettee Wannasaen", "Jeeno Thitikul", "Charley Hull"] },
    { time: "9:42 AM", tee: "10", players: ["Yan Liu", "Patty Tavatanakit"] }
  ];

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
                  Kroger Queen City Championship
                </h2>
                <p className="text-secondary-100">September 11-14, 2025 • TPC River's Bend</p>
                <p className="text-secondary-100">Maineville, Ohio</p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-secondary-200">Par:</span>
                    <span className="text-white font-medium ml-1">72</span>
                  </div>
                  <div>
                    <span className="text-secondary-200">Yards:</span>
                    <span className="text-white font-medium ml-1">6,876</span>
                  </div>
                  <div>
                    <span className="text-secondary-200">Field:</span>
                    <span className="text-white font-medium ml-1">144 Players</span>
                  </div>
                  <div>
                    <span className="text-secondary-200">Purse:</span>
                    <span className="text-white font-medium ml-1">$2,000,000</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="https://media.lpga.com/images/librariesprovider3/default-album/kroger_queen_city_lockup9c9f957d-998c-419d-a539-0e52b475ffe4.png?sfvrsn=dccf91dc_1&v=2"
                  alt="Kroger Queen City Championship Logo"
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
              <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                <button
                  onClick={() => setActiveRound('round1')}
                  className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeRound === 'round1'
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Round 1 - Thursday
                </button>
                <button
                  onClick={() => setActiveRound('round2')}
                  className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeRound === 'round2'
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Round 2 - Friday
                </button>
                <button
                  onClick={() => setActiveRound('round3')}
                  className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeRound === 'round3'
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Round 3 - Saturday
                </button>
              </div>
            </div>

            {/* Timezone Selector */}
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-md">
                <label htmlFor="timezone-select" className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Select Timezone
                </label>
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
              </div>
            </div>

            {/* Active Round Content */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {activeRound === 'round1' ? 'Round 1 - Thursday, September 11' : 
                 activeRound === 'round2' ? 'Round 2 - Friday, September 12' : 
                 'Round 3 - Saturday, September 13'}
              </h3>
              
              {(() => {
                const teeTimes = activeRound === 'round1' ? round1TeeTimes : 
                                 activeRound === 'round2' ? round2TeeTimes : 
                                 round3TeeTimes;
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
                }, {} as Record<string, { tee1: any; tee10: any }>);

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