'use client';

import { useState, useEffect } from 'react';
import { TournamentHole } from '@/types/tournament';

interface CourseHolesWidgetProps {
  eventId?: string;
  aonRiskHole?: number;
  hardestHole?: number;
}

interface CourseData {
  holes: TournamentHole[];
  courseName: string;
  totalYards: number;
  shotsToPar: number;
  parOut: number;
  parIn: number;
}

// Aggressive caching for course data (24 hours since it rarely changes)
const courseDataCache = new Map<string, {
  data: CourseData;
  timestamp: number;
}>();

const COURSE_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8';

async function fetchCourseData(eventId: string): Promise<CourseData | null> {
  // Check in-memory cache first
  const cached = courseDataCache.get(eventId);
  if (cached && (Date.now() - cached.timestamp) < COURSE_CACHE_DURATION) {
    console.log('Using in-memory cached course data (24h cache)');
    return cached.data;
  }

  // Check localStorage cache (persists across sessions)
  if (typeof window !== 'undefined') {
    try {
      const localStorageKey = `course_data_${eventId}`;
      const storedData = localStorage.getItem(localStorageKey);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        const age = Date.now() - parsed.timestamp;
        if (age < COURSE_CACHE_DURATION) {
          console.log('Using localStorage cached course data (24h cache)');
          // Also populate in-memory cache
          courseDataCache.set(eventId, {
            data: parsed.data,
            timestamp: parsed.timestamp
          });
          return parsed.data;
        }
      }
    } catch (error) {
      console.warn('Failed to read course data from localStorage:', error);
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout for course data

    const response = await fetch(
      `https://live-golf-data1.p.rapidapi.com/leaderboard?league=lpga&eventId=${eventId}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'live-golf-data1.p.rapidapi.com',
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const apiData = await response.json();
    const course = apiData.events?.[0]?.courses?.[0];

    if (!course || !course.holes) {
      throw new Error('No course data found');
    }

    const courseData: CourseData = {
      holes: course.holes,
      courseName: course.name || 'Unknown Course',
      totalYards: course.totalYards || 0,
      shotsToPar: course.shotsToPar || 71,
      parOut: course.parOut || 0,
      parIn: course.parIn || 0
    };

    const timestamp = Date.now();
    
    // Cache in memory
    courseDataCache.set(eventId, {
      data: courseData,
      timestamp
    });

    // Cache in localStorage for persistence across sessions
    if (typeof window !== 'undefined') {
      try {
        const localStorageKey = `course_data_${eventId}`;
        localStorage.setItem(localStorageKey, JSON.stringify({
          data: courseData,
          timestamp
        }));
      } catch (error) {
        console.warn('Failed to save course data to localStorage:', error);
      }
    }

    console.log('Fetched and cached fresh course data (24h cache, persistent)');
    return courseData;

  } catch (error) {
    console.error('Error fetching course data:', error);
    
    // Return expired cache if available
    if (cached) {
      console.log('Using expired cached course data as fallback');
      return cached.data;
    }
    
    return null;
  }
}

export default function CourseHolesWidget({
  eventId = "401734780",
  aonRiskHole = 11,
  hardestHole
}: CourseHolesWidgetProps) {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadCourseData() {
      try {
        setLoading(true);
        const data = await fetchCourseData(eventId);
        
        if (isMounted) {
          setCourseData(data);
        }
      } catch (error) {
        console.error('Failed to load course data:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCourseData();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  // Helper functions for course analysis
  const analyzeHoles = (holes: TournamentHole[]) => {
    if (!holes || holes.length === 0) return null;
    
    const longest = holes.reduce((prev, current) => 
      current.totalYards > prev.totalYards ? current : prev
    );
    
    const shortest = holes.reduce((prev, current) => 
      current.totalYards < prev.totalYards ? current : prev
    );
    
    // Hardest hole calculation: Use static override if provided, otherwise calculate dynamically
    const hardest = hardestHole 
      ? holes.find(hole => hole.number === hardestHole) || holes.reduce((prev, current) => {
          const currentDifficulty = getDifficultyScore(current);
          const prevDifficulty = getDifficultyScore(prev);
          return currentDifficulty > prevDifficulty ? current : prev;
        })
      : holes.reduce((prev, current) => {
          const currentDifficulty = getDifficultyScore(current);
          const prevDifficulty = getDifficultyScore(prev);
          return currentDifficulty > prevDifficulty ? current : prev;
        });
    
    // AON Risk hole is tournament-specific
    const aonRisk = holes.find(hole => hole.number === aonRiskHole);
    
    return { longest, shortest, hardest, aonRisk };
  };

  const getDifficultyScore = (hole: TournamentHole): number => {
    // Scoring system for difficulty
    if (hole.shotsToPar === 3) {
      return hole.totalYards > 180 ? hole.totalYards * 1.5 : hole.totalYards;
    } else if (hole.shotsToPar === 4) {
      return hole.totalYards > 450 ? hole.totalYards * 1.2 : hole.totalYards;
    } else if (hole.shotsToPar === 5) {
      return hole.totalYards > 550 ? hole.totalYards * 1.1 : hole.totalYards;
    }
    return hole.totalYards;
  };

  const holes = courseData?.holes || [];
  const holeAnalysis = analyzeHoles(holes);
  const displayPar = courseData?.shotsToPar || 71;
  const displayYardage = courseData?.totalYards?.toLocaleString() || "6,438";

  // Don't render if still loading
  if (loading) {
    return null;
  }

  // If no course data, show a fallback with static course info
  if (!courseData || holes.length === 0) {
    return (
      <div className="w-full">
        <div className="space-y-1">
          {/* Fallback course display */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 py-1">
            {/* Front 9 */}
            <div className="flex flex-col">
              <h4 className="text-[10px] sm:text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Front 9</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-0.5 sm:py-1 px-1 font-medium text-gray-500">Hole</th>
                      <th className="text-center py-0.5 sm:py-1 px-1 font-medium text-gray-500">Par</th>
                      <th className="text-right py-0.5 sm:py-1 px-1 font-medium text-gray-500">Yards</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 9 }, (_, i) => (
                      <tr key={i + 1} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-0.5 sm:py-1 px-1 font-medium">{i + 1}</td>
                        <td className="text-center py-0.5 sm:py-1 px-1">-</td>
                        <td className="text-right py-0.5 sm:py-1 px-1">-</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                      <td className="py-0.5 sm:py-1 px-1">Out</td>
                      <td className="text-center py-0.5 sm:py-1 px-1">-</td>
                      <td className="text-right py-0.5 sm:py-1 px-1">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Back 9 */}
            <div className="flex flex-col">
              <h4 className="text-[10px] sm:text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Back 9</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-0.5 sm:py-1 px-1 font-medium text-gray-500">Hole</th>
                      <th className="text-center py-0.5 sm:py-1 px-1 font-medium text-gray-500">Par</th>
                      <th className="text-right py-0.5 sm:py-1 px-1 font-medium text-gray-500">Yards</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 9 }, (_, i) => {
                      const holeNumber = i + 10;
                      const isAonRisk = holeNumber === aonRiskHole;
                      return (
                        <tr 
                          key={holeNumber} 
                          className={`border-b border-gray-100 ${isAonRisk ? 'bg-purple-50' : 'hover:bg-gray-50'}`}
                        >
                          <td className="py-0.5 px-0.5 font-medium">
                            <div className="flex items-center gap-0.5">
                              {holeNumber}
                              {isAonRisk && (
                                <svg className="w-1.5 h-1.5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
                                </svg>
                              )}
                            </div>
                          </td>
                          <td className="text-center py-0.5 px-0.5">-</td>
                          <td className="text-right py-0.5 px-0.5">-</td>
                        </tr>
                      );
                    })}
                    <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                      <td className="py-0.5 px-0.5">In</td>
                      <td className="text-center py-0.5 px-0.5">-</td>
                      <td className="text-right py-0.5 px-0.5">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Total and Legend */}
          <div className="space-y-3 sm:space-y-0.5">
            <div className="bg-primary-50 rounded p-0.5 sm:p-1">
              <div className="flex justify-between items-center text-[7px] sm:text-[10px] font-semibold">
                <span>Total</span>
                <span>Par {displayPar} • {displayYardage}y</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded p-0.5 sm:p-1 border border-gray-200">
              <div className="flex justify-center items-center text-center">
                <div className="flex items-center gap-0.5">
                  <svg className="w-1.5 h-1.5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
                  </svg>
                  <span className="text-[7px] sm:text-[8px] font-medium text-purple-700">AON Risk #{aonRiskHole}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-1">
        {/* Side-by-side Front 9 and Back 9 on all devices */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 py-1">
          {/* Front 9 */}
          <div className="flex flex-col">
            <h4 className="text-[10px] sm:text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Front 9</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] sm:text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-0.5 sm:py-1 px-1 font-medium text-gray-500">Hole</th>
                    <th className="text-center py-0.5 sm:py-1 px-1 font-medium text-gray-500">Par</th>
                    <th className="text-right py-0.5 sm:py-1 px-1 font-medium text-gray-500">Yards</th>
                  </tr>
                </thead>
                <tbody>
                  {holes.slice(0, 9).map((hole) => {
                    const isLongest = holeAnalysis?.longest?.number === hole.number;
                    const isShortest = holeAnalysis?.shortest?.number === hole.number;
                    const isHardest = holeAnalysis?.hardest?.number === hole.number;
                    const isAonRisk = holeAnalysis?.aonRisk?.number === hole.number;
                    
                    return (
                      <tr 
                        key={hole.number} 
                        className={`border-b border-gray-100 ${
                          isLongest ? 'bg-blue-50' : 
                          isShortest ? 'bg-green-50' : 
                          isHardest ? 'bg-red-50' : 
                          isAonRisk ? 'bg-purple-50' :
                          'hover:bg-gray-50'
                        }`}
                      >
                        <td className="py-0.5 sm:py-1 px-1 font-medium">
                          <div className="flex items-center gap-0.5">
                            {hole.number}
                            {isLongest && (
                              <svg className="w-1.5 h-1.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            )}
                            {isShortest && (
                              <svg className="w-1.5 h-1.5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                                <circle cx="12" cy="12" r="4" fill="white"/>
                              </svg>
                            )}
                            {isHardest && (
                              <svg className="w-1.5 h-1.5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            )}
                            {isAonRisk && (
                              <svg className="w-1.5 h-1.5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
                              </svg>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-0.5 sm:py-1 px-1">{hole.shotsToPar}</td>
                        <td className="text-right py-0.5 sm:py-1 px-1">{hole.totalYards.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                  <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                    <td className="py-0.5 sm:py-1 px-1">Out</td>
                    <td className="text-center py-0.5 sm:py-1 px-1">{courseData?.parOut || holes.slice(0, 9).reduce((sum, hole) => sum + hole.shotsToPar, 0)}</td>
                    <td className="text-right py-0.5 sm:py-1 px-1">{holes.slice(0, 9).reduce((sum, hole) => sum + hole.totalYards, 0).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Back 9 */}
          {holes.length > 9 && (
            <div className="flex flex-col">
              <h4 className="text-[10px] sm:text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Back 9</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-0.5 sm:py-1 px-1 font-medium text-gray-500">Hole</th>
                      <th className="text-center py-0.5 sm:py-1 px-1 font-medium text-gray-500">Par</th>
                      <th className="text-right py-0.5 sm:py-1 px-1 font-medium text-gray-500">Yards</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holes.slice(9, 18).map((hole) => {
                      const isLongest = holeAnalysis?.longest?.number === hole.number;
                      const isShortest = holeAnalysis?.shortest?.number === hole.number;
                      const isHardest = holeAnalysis?.hardest?.number === hole.number;
                      const isAonRisk = holeAnalysis?.aonRisk?.number === hole.number;
                      
                      return (
                        <tr 
                          key={hole.number} 
                          className={`border-b border-gray-100 ${
                            isLongest ? 'bg-blue-50' : 
                            isShortest ? 'bg-green-50' : 
                            isHardest ? 'bg-red-50' : 
                            isAonRisk ? 'bg-purple-50' :
                            'hover:bg-gray-50'
                          }`}
                        >
                        <td className="py-0.5 sm:py-1 px-1 font-medium">
                          <div className="flex items-center gap-0.5">
                            {hole.number}
                            {isLongest && (
                              <svg className="w-1.5 h-1.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            )}
                            {isShortest && (
                              <svg className="w-1.5 h-1.5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                                <circle cx="12" cy="12" r="4" fill="white"/>
                              </svg>
                            )}
                            {isHardest && (
                              <svg className="w-1.5 h-1.5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            )}
                            {isAonRisk && (
                              <svg className="w-1.5 h-1.5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
                              </svg>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-0.5 sm:py-1 px-1">{hole.shotsToPar}</td>
                        <td className="text-right py-0.5 sm:py-1 px-1">{hole.totalYards.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                    <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                      <td className="py-0.5 sm:py-1 px-1">In</td>
                      <td className="text-center py-0.5 sm:py-1 px-1">{courseData?.parIn || holes.slice(9, 18).reduce((sum, hole) => sum + hole.shotsToPar, 0)}</td>
                      <td className="text-right py-0.5 sm:py-1 px-1">{holes.slice(9, 18).reduce((sum, hole) => sum + hole.totalYards, 0).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Total and Legend */}
        <div className="space-y-3 sm:space-y-0.5 mt-3 sm:mt-0">
          <div className="bg-primary-50 rounded p-0.5 sm:p-1">
            <div className="flex justify-between items-center text-[9px] sm:text-xs font-semibold">
              <span>Total</span>
              <span>Par {displayPar} • {displayYardage}y</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded p-0.5 sm:p-1 border border-gray-200">
            <div className="flex justify-between items-center text-center">
              <div className="flex items-center gap-0.5">
                <svg className="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-[8px] sm:text-[10px] font-medium text-blue-700">Longest #{holeAnalysis?.longest?.number}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="4" fill="white"/>
                </svg>
                <span className="text-[8px] sm:text-[10px] font-medium text-green-700">Shortest #{holeAnalysis?.shortest?.number}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <svg className="w-2 h-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-[8px] sm:text-[10px] font-medium text-red-700">Hardest #{holeAnalysis?.hardest?.number}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <svg className="w-2 h-2 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
                </svg>
                <span className="text-[8px] sm:text-[10px] font-medium text-purple-700">AON Risk #{holeAnalysis?.aonRisk?.number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}