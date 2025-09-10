'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TeeTimesPage() {
  const [activeRound, setActiveRound] = useState<'round1' | 'round2'>('round1');
  const round1TeeTimes = [
    { time: "7:20 AM", tee: "1", players: ["Daniela Darquea", "Gemma Dryburgh", "Alexa Pano"] },
    { time: "7:20 AM", tee: "10", players: ["Soo Bin Joo", "Caroline Masson", "Lauren Morris"] },
    { time: "7:31 AM", tee: "1", players: ["Aditi Ashok", "Jaravee Boonchant", "Madison Young"] },
    { time: "7:31 AM", tee: "10", players: ["Narin An", "Eun-Hee Ji", "Wichanee Meechai"] },
    { time: "7:42 AM", tee: "1", players: ["Hyo Joon Jang", "Danielle Kang", "Yuri Yoshida"] },
    { time: "7:42 AM", tee: "10", players: ["Celine Borge", "Azahara Munoz", "Hira Naveed"] },
    { time: "7:53 AM", tee: "1", players: ["Wei-Ling Hsu", "Stacy Lewis", "Anna Nordqvist"] },
    { time: "7:53 AM", tee: "10", players: ["Allisen Corpuz", "Nasa Hataoka", "Madelene Sagstrom"] },
    { time: "8:04 AM", tee: "1", players: ["Manon De Roey", "Megan Khang", "Chanettee Wannasaen"] },
    { time: "8:04 AM", tee: "10", players: ["Jenny Bae", "Yan Liu", "Gaby Lopez"] },
    { time: "8:15 AM", tee: "1", players: ["Lindy Duncan", "Andrea Lee", "Mao Saigo"] },
    { time: "8:15 AM", tee: "10", players: ["Hannah Green", "Haeran Ryu", "Rio Takeda"] },
    { time: "8:26 AM", tee: "1", players: ["Celine Boutier", "Hye-Jin Choi", "Linnea Strom"] },
    { time: "8:26 AM", tee: "10", players: ["Nelly Korda", "Lottie Woad", "Rose Zhang"] },
    { time: "8:37 AM", tee: "1", players: ["Esther Henseleit", "Ingrid Lindblad", "Jenny Shin"] },
    { time: "8:37 AM", tee: "10", players: ["Charley Hull", "Maja Stark", "Lexi Thompson"] },
    { time: "8:48 AM", tee: "1", players: ["Brittany Altomare", "Vidhi Lakhawala (a)", "Yuna Nishimura"] },
    { time: "8:48 AM", tee: "10", players: ["Jodi Ewart Shadoff", "Aline Krauter", "Paula Reto"] },
    { time: "8:59 AM", tee: "1", players: ["Muni He", "Bianca Pagdanganan", "Gabriela Ruffels"] },
    { time: "8:59 AM", tee: "10", players: ["Polly Mack", "Pornanong Phatlum", "Kate Smith-Stroh"] },
    { time: "9:10 AM", tee: "1", players: ["Mirim Lee", "Caley McGinty", "Stephanie Meadow"] },
    { time: "9:10 AM", tee: "10", players: ["Peiyun Chien", "Olivia Cowan", "Mary Liu"] },
    { time: "9:21 AM", tee: "1", players: ["Perrine Delacour", "Brianna Do", "Sofia Garcia"] },
    { time: "9:21 AM", tee: "10", players: ["Adela Cernousek", "Maria Fassi", "Sophia Popov"] },
    { time: "12:20 PM", tee: "1", players: ["Savannah Grewal", "Ryann O'Toole", "Yahui Zhang"] },
    { time: "12:20 PM", tee: "10", players: ["Karis Anne Davidson", "Amanda Doherty", "Elizabeth Szokol"] },
    { time: "12:31 PM", tee: "1", players: ["Haeji Kang", "Benedetta Moresco", "Arpichaya Yubol"] },
    { time: "12:31 PM", tee: "10", players: ["Ashleigh Buhai", "Lauren Hartlage", "Xiaowen Yin"] },
    { time: "12:42 PM", tee: "1", players: ["Alison Lee", "Emily Kristine Pedersen", "Dewi Weber"] },
    { time: "12:42 PM", tee: "10", players: ["Fiona Xu", "Ina Yoon", "Weiwei Zhang"] },
    { time: "12:53 PM", tee: "1", players: ["Akie Iwai", "Minami Katsu", "Somi Lee"] },
    { time: "12:53 PM", tee: "10", players: ["Nanna Koerstz Madsen", "Lilia Vu", "Amy Yang"] },
    { time: "1:04 PM", tee: "1", players: ["Mi Hyang Lee", "Bailey Tardy", "Patty Tavatanakit"] },
    { time: "1:04 PM", tee: "10", players: ["Jin Hee Im", "Yuka Saso", "Jasmine Suwannapura"] },
    { time: "1:15 PM", tee: "1", players: ["Julia Lopez Ramirez", "Yealimi Noh", "Cassie Porter"] },
    { time: "1:15 PM", tee: "10", players: ["Ayaka Furue", "Sei Young Kim", "Jeeno Thitikul"] },
    { time: "1:26 PM", tee: "1", players: ["Hyo Joo Kim", "Jennifer Kupcho", "Stephanie Kyriacou"] },
    { time: "1:26 PM", tee: "10", players: ["Lydia Ko", "Minjee Lee", "Miranda Wang"] },
    { time: "1:37 PM", tee: "1", players: ["Chisato Iwai", "Gurleen Kaur", "A Lim Kim"] },
    { time: "1:37 PM", tee: "10", players: ["Grace Kim", "Jin Young Ko", "Miyu Yamashita"] },
    { time: "1:48 PM", tee: "1", players: ["Kristen Gillman", "Hinako Shibuno", "Gigi Stoll"] },
    { time: "1:48 PM", tee: "10", players: ["Brooke Matthews", "Morgane Metraux", "Kumkang Park"] },
    { time: "1:59 PM", tee: "1", players: ["Caroline Inglis", "Heather Lin", "Ruixin Liu"] },
    { time: "1:59 PM", tee: "10", players: ["Frida Kinhult", "Jeongeun Lee6", "Lucy Li"] },
    { time: "2:10 PM", tee: "1", players: ["Bronte Law", "Ilhee Lee", "Jeongeun Lee5"] },
    { time: "2:10 PM", tee: "10", players: ["Nataliya Guseva", "Jiwon Jeon", "Yu Liu"] },
    { time: "2:21 PM", tee: "1", players: ["Robyn Choi", "Mariel Galdiano", "Jessica Porvasnik"] },
    { time: "2:21 PM", tee: "10", players: ["Saki Baba", "Ana Belac", "Ssu-Chia Cheng"] }
  ];

  const round2TeeTimes = [
    { time: "7:20 AM", tee: "1", players: ["Karis Anne Davidson", "Amanda Doherty", "Elizabeth Szokol"] },
    { time: "7:20 AM", tee: "10", players: ["Savannah Grewal", "Yahui Zhang", "Ryann O'Toole"] },
    { time: "7:31 AM", tee: "1", players: ["Ashleigh Buhai", "Lauren Hartlage", "Xiaowen Yin"] },
    { time: "7:31 AM", tee: "10", players: ["Haeji Kang", "Arpichaya Yubol", "Benedetta Moresco"] },
    { time: "7:42 AM", tee: "1", players: ["Fiona Xu", "Ina Yoon", "Weiwei Zhang"] },
    { time: "7:42 AM", tee: "10", players: ["Dewi Weber", "Alison Lee", "Emily Kristine Pedersen"] },
    { time: "7:53 AM", tee: "1", players: ["Lilia Vu", "Amy Yang", "Nanna Koerstz Madsen"] },
    { time: "7:53 AM", tee: "10", players: ["Akie Iwai", "Minami Katsu", "Somi Lee"] },
    { time: "8:04 AM", tee: "1", players: ["Jin Hee Im", "Jasmine Suwannapura", "Yuka Saso"] },
    { time: "8:04 AM", tee: "10", players: ["Bailey Tardy", "Patty Tavatanakit", "Mi Hyang Lee"] },
    { time: "8:15 AM", tee: "1", players: ["Ayaka Furue", "Sei Young Kim", "Jeeno Thitikul"] },
    { time: "8:15 AM", tee: "10", players: ["Julia Lopez Ramirez", "Yealimi Noh", "Cassie Porter"] },
    { time: "8:26 AM", tee: "1", players: ["Miranda Wang", "Lydia Ko", "Minjee Lee"] },
    { time: "8:26 AM", tee: "10", players: ["Hyo Joo Kim", "Jennifer Kupcho", "Stephanie Kyriacou"] },
    { time: "8:37 AM", tee: "1", players: ["Grace Kim", "Miyu Yamashita", "Jin Young Ko"] },
    { time: "8:37 AM", tee: "10", players: ["Chisato Iwai", "Gurleen Kaur", "A Lim Kim"] },
    { time: "8:48 AM", tee: "1", players: ["Brooke Matthews", "Morgane Metraux", "Kumkang Park"] },
    { time: "8:48 AM", tee: "10", players: ["Kristen Gillman", "Gigi Stoll", "Hinako Shibuno"] },
    { time: "8:59 AM", tee: "1", players: ["Frida Kinhult", "Jeongeun Lee6", "Lucy Li"] },
    { time: "8:59 AM", tee: "10", players: ["Caroline Inglis", "Heather Lin", "Ruixin Liu"] },
    { time: "9:10 AM", tee: "1", players: ["Nataliya Guseva", "Jiwon Jeon", "Yu Liu"] },
    { time: "9:10 AM", tee: "10", players: ["Bronte Law", "Ilhee Lee", "Jeongeun Lee5"] },
    { time: "9:21 AM", tee: "1", players: ["Saki Baba", "Ana Belac", "Ssu-Chia Cheng"] },
    { time: "9:21 AM", tee: "10", players: ["Robyn Choi", "Mariel Galdiano", "Jessica Porvasnik"] },
    { time: "12:20 PM", tee: "1", players: ["Soo Bin Joo", "Caroline Masson", "Lauren Morris"] },
    { time: "12:20 PM", tee: "10", players: ["Daniela Darquea", "Gemma Dryburgh", "Alexa Pano"] },
    { time: "12:31 PM", tee: "1", players: ["Narin An", "Eun-Hee Ji", "Wichanee Meechai"] },
    { time: "12:31 PM", tee: "10", players: ["Aditi Ashok", "Jaravee Boonchant", "Madison Young"] },
    { time: "12:42 PM", tee: "1", players: ["Celine Borge", "Azahara Munoz", "Hira Naveed"] },
    { time: "12:42 PM", tee: "10", players: ["Hyo Joon Jang", "Danielle Kang", "Yuri Yoshida"] },
    { time: "12:53 PM", tee: "1", players: ["Allisen Corpuz", "Nasa Hataoka", "Madelene Sagstrom"] },
    { time: "12:53 PM", tee: "10", players: ["Wei-Ling Hsu", "Stacy Lewis", "Anna Nordqvist"] },
    { time: "1:04 PM", tee: "1", players: ["Jenny Bae", "Yan Liu", "Gaby Lopez"] },
    { time: "1:04 PM", tee: "10", players: ["Manon De Roey", "Megan Khang", "Chanettee Wannasaen"] },
    { time: "1:15 PM", tee: "1", players: ["Hannah Green", "Rio Takeda", "Haeran Ryu"] },
    { time: "1:15 PM", tee: "10", players: ["Lindy Duncan", "Andrea Lee", "Mao Saigo"] },
    { time: "1:26 PM", tee: "1", players: ["Lottie Woad", "Rose Zhang", "Nelly Korda"] },
    { time: "1:26 PM", tee: "10", players: ["Celine Boutier", "Hye-Jin Choi", "Linnea Strom"] },
    { time: "1:37 PM", tee: "1", players: ["Charley Hull", "Maja Stark", "Lexi Thompson"] },
    { time: "1:37 PM", tee: "10", players: ["Esther Henseleit", "Jenny Shin", "Ingrid Lindblad"] },
    { time: "1:48 PM", tee: "1", players: ["Jodi Ewart Shadoff", "Aline Krauter", "Paula Reto"] },
    { time: "1:48 PM", tee: "10", players: ["Brittany Altomare", "Vidhi Lakhawala (a)", "Yuna Nishimura"] },
    { time: "1:59 PM", tee: "1", players: ["Kate Smith-Stroh", "Polly Mack", "Pornanong Phatlum"] },
    { time: "1:59 PM", tee: "10", players: ["Muni He", "Bianca Pagdanganan", "Gabriela Ruffels"] },
    { time: "2:10 PM", tee: "1", players: ["Peiyun Chien", "Olivia Cowan", "Mary Liu"] },
    { time: "2:10 PM", tee: "10", players: ["Mirim Lee", "Caley McGinty", "Stephanie Meadow"] },
    { time: "2:21 PM", tee: "1", players: ["Adela Cernousek", "Maria Fassi", "Sophia Popov"] },
    { time: "2:21 PM", tee: "10", players: ["Perrine Delacour", "Brianna Do", "Sofia Garcia"] }
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
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              ← Back to Home
            </Link>
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
              </div>
            </div>

            {/* Active Round Content */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {activeRound === 'round1' ? 'Round 1 - Thursday, September 11' : 'Round 2 - Friday, September 12'}
              </h3>
              
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
                    {(() => {
                      const teeTimes = activeRound === 'round1' ? round1TeeTimes : round2TeeTimes;
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

                      return Object.entries(groupedByTime).map(([time, groups], index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">{time}</td>
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
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}