'use client';

import { useState, useEffect } from 'react';
import { TournamentHole } from '@/types/tournament';
import CourseMap from './CourseMap';

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

// Function to get course map URL based on tournament/course name
function getCourseMapUrl(courseName?: string): string | undefined {
  if (!courseName) return undefined;
  
  // Map course names to course map files
  const courseMapMappings: Record<string, string> = {
    'Pinnacle Country Club': '/course-maps/nwa-course-map.pdf',
    'Lotte Championship': 'https://lirp.cdn-website.com/9fed8a20/dms3rep/multi/opt/lotte-course-map-2025-1920w.jpg',
    'Lotte Golf & Country Club': 'https://lirp.cdn-website.com/9fed8a20/dms3rep/multi/opt/lotte-course-map-2025-1920w.jpg',
    'Buick Championship': '/course-maps/buick-map.png',
    'Hoakalei Country Club': '/course-maps/buick-map.png',
    // Add more mappings as needed
  };
  
  // Check for exact course name match
  if (courseMapMappings[courseName]) {
    return courseMapMappings[courseName];
  }
  
  // Check for partial matches (case insensitive)
  const lowerCourseName = courseName.toLowerCase();
  for (const [key, value] of Object.entries(courseMapMappings)) {
    if (lowerCourseName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerCourseName)) {
      return value;
    }
  }
  
  return undefined;
}

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
      // Handle client errors (400-499) gracefully
      if (response.status >= 400 && response.status < 500) {
        console.warn(`⚠️ Client error ${response.status} for course holes data. Using fallback.`);
        return null; // Return null for client errors instead of throwing
      }
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
  eventId = "401734781",
  aonRiskHole = 17,
  hardestHole = 8
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
  const displayYardage = courseData?.totalYards?.toLocaleString() || "6,566";

  // Don't render if still loading
  if (loading) {
    return null;
  }

  // If no course data, show a fallback with static course info
  if (!courseData || holes.length === 0) {
    const fallbackCourseMapUrl = getCourseMapUrl(undefined);
    
    
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2 p-1 sm:p-2">
          {/* Fallback course display */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 py-2">
            {/* Front 9 */}
            <div className="flex flex-col">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Front 9</h4>
              <div>
                <table className="w-full text-[10px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-1 px-1 sm:px-2 font-medium text-gray-500">Hole</th>
                      <th className="text-center py-1 px-1 sm:px-2 font-medium text-gray-500">Par</th>
                      <th className="text-right py-1 px-1 sm:px-2 font-medium text-gray-500">Yards</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 9 }, (_, i) => (
                      <tr key={i + 1} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-1 px-1 sm:px-2 font-medium">{i + 1}</td>
                        <td className="text-center py-1 px-1 sm:px-2">-</td>
                        <td className="text-right py-1 px-1 sm:px-2">-</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                      <td className="py-1 px-1 sm:px-2">Out</td>
                      <td className="text-center py-1 px-1 sm:px-2">-</td>
                      <td className="text-right py-1 px-1 sm:px-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Back 9 */}
            <div className="flex flex-col">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Back 9</h4>
              <div>
                <table className="w-full text-[10px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-1 px-1 sm:px-2 font-medium text-gray-500">Hole</th>
                      <th className="text-center py-1 px-1 sm:px-2 font-medium text-gray-500">Par</th>
                      <th className="text-right py-1 px-1 sm:px-2 font-medium text-gray-500">Yards</th>
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
                          <td className="py-1 px-1 sm:px-2 font-medium">
                            <div className="flex items-center gap-0.5">
                              {holeNumber}
                              {isAonRisk && (
                                <svg className="w-2 h-2 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
                                </svg>
                              )}
                            </div>
                          </td>
                          <td className="text-center py-1 px-1 sm:px-2">-</td>
                          <td className="text-right py-1 px-1 sm:px-2">-</td>
                        </tr>
                      );
                    })}
                    <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                      <td className="py-1 px-1 sm:px-2">In</td>
                      <td className="text-center py-1 px-1 sm:px-2">-</td>
                      <td className="text-right py-1 px-1 sm:px-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Total and Legend */}
          <div className="space-y-1 sm:space-y-2">
            <div className="bg-primary-50 rounded p-1 sm:p-2">
              <div className="flex justify-between items-center text-[10px] sm:text-xs font-semibold">
                <span>Total</span>
                <span>Par {displayPar} • {displayYardage}y</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded p-2 sm:p-3 border border-gray-200">
              <div className="flex justify-center items-center text-center">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
                  </svg>
                  <span className="text-[10px] sm:text-xs font-medium text-purple-700 whitespace-nowrap">AON Risk #{aonRiskHole}</span>
                </div>
            </div>
          </div>
        </div>

        {/* Course Map - Bottom - Fallback */}
        <CourseMap 
          courseMapUrl={fallbackCourseMapUrl || '/course-maps/buick-map.png'}
          courseName="Lotte Championship"
          className="mt-2"
        />
      </div>
    </div>
  );
  }

  const courseMapUrl = getCourseMapUrl(courseData?.courseName);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 p-1 sm:p-2">
        {/* Side-by-side Front 9 and Back 9 on all devices */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 py-2">
          {/* Front 9 */}
          <div className="flex flex-col">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Front 9</h4>
            <div>
              <table className="w-full text-[10px] sm:text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-1 px-1 sm:px-2 font-medium text-gray-500">Hole</th>
                    <th className="text-center py-1 px-1 sm:px-2 font-medium text-gray-500">Par</th>
                    <th className="text-right py-1 px-1 sm:px-2 font-medium text-gray-500">Yards</th>
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
                        <td className="py-1 px-1 sm:px-2 font-medium">
                          <div className="flex items-center gap-0.5">
                            {hole.number}
                            {isLongest && (
                              <svg className="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            )}
                            {isShortest && (
                              <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                                <circle cx="12" cy="12" r="4" fill="white"/>
                              </svg>
                            )}
                            {isHardest && (
                              <svg className="w-2 h-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            )}
                            {isAonRisk && (
                              <svg className="w-2 h-2 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
                              </svg>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-1 px-1 sm:px-2">{hole.shotsToPar}</td>
                        <td className="text-right py-1 px-1 sm:px-2">{hole.totalYards.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                  <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                    <td className="py-1 px-1 sm:px-2">Out</td>
                    <td className="text-center py-1 px-1 sm:px-2">{courseData?.parOut || holes.slice(0, 9).reduce((sum, hole) => sum + hole.shotsToPar, 0)}</td>
                    <td className="text-right py-1 px-1 sm:px-2">{holes.slice(0, 9).reduce((sum, hole) => sum + hole.totalYards, 0).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Back 9 */}
          {holes.length > 9 && (
            <div className="flex flex-col">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Back 9</h4>
              <div>
                <table className="w-full text-[10px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-1 px-1 sm:px-2 font-medium text-gray-500">Hole</th>
                      <th className="text-center py-1 px-1 sm:px-2 font-medium text-gray-500">Par</th>
                      <th className="text-right py-1 px-1 sm:px-2 font-medium text-gray-500">Yards</th>
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
                        <td className="py-1 px-1 sm:px-2 font-medium">
                          <div className="flex items-center gap-0.5">
                            {hole.number}
                            {isLongest && (
                              <svg className="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            )}
                            {isShortest && (
                              <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                                <circle cx="12" cy="12" r="4" fill="white"/>
                              </svg>
                            )}
                            {isHardest && (
                              <svg className="w-2 h-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            )}
                            {isAonRisk && (
                              <svg className="w-2 h-2 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
                              </svg>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-1 px-1 sm:px-2">{hole.shotsToPar}</td>
                        <td className="text-right py-1 px-1 sm:px-2">{hole.totalYards.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                    <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                      <td className="py-1 px-1 sm:px-2">In</td>
                      <td className="text-center py-1 px-1 sm:px-2">{courseData?.parIn || holes.slice(9, 18).reduce((sum, hole) => sum + hole.shotsToPar, 0)}</td>
                      <td className="text-right py-1 px-1 sm:px-2">{holes.slice(9, 18).reduce((sum, hole) => sum + hole.totalYards, 0).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Total and Legend */}
          <div className="space-y-1 sm:space-y-2 mt-4 sm:mt-3">
          <div className="bg-primary-50 rounded p-1 sm:p-2">
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-semibold">
              <span>Total</span>
              <span>Par {displayPar} • {displayYardage}y</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded p-2 sm:p-3 border border-gray-200">
            <div className="space-y-1 sm:space-y-2">
              {/* First line: Longest and Shortest */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-[10px] sm:text-xs font-medium text-blue-700 whitespace-nowrap">Longest #{holeAnalysis?.longest?.number}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="4" fill="white"/>
                  </svg>
                  <span className="text-[10px] sm:text-xs font-medium text-green-700 whitespace-nowrap">Shortest #{holeAnalysis?.shortest?.number}</span>
                </div>
              </div>
              {/* Second line: Hardest and AON Risk */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-[10px] sm:text-xs font-medium text-red-700 whitespace-nowrap">Hardest #{holeAnalysis?.hardest?.number}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6L12 2z"/>
                  </svg>
                  <span className="text-[10px] sm:text-xs font-medium text-purple-700 whitespace-nowrap">AON Risk #{holeAnalysis?.aonRisk?.number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Map - Bottom */}
        <CourseMap 
          courseMapUrl={courseMapUrl || '/course-maps/buick-map.png'}
          courseName={courseData?.courseName || 'Lotte Championship'}
          className="mt-2"
        />

        {/* Grass Types and Mowing Schedules */}
        <div className="mt-4 space-y-3">
          {/* Grass Types */}
          <div className="bg-green-50 rounded-lg p-2 border border-green-200">
            <h4 className="text-xs sm:text-sm font-semibold text-green-800 mb-1 uppercase tracking-wide">Grass Types</h4>
            <div className="space-y-0.5 text-[10px] sm:text-xs text-green-700">
              <div className="flex justify-between">
                <span className="font-medium">Greens</span>
                <span>Sea Dwarf Paspalum</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tees, Approaches, Collars</span>
                <span>Sea Dwarf Paspalum</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Fairways, Rough</span>
                <span>Sea Dwarf Paspalum</span>
              </div>
            </div>
          </div>

          {/* Mowing Schedules */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <h4 className="text-xs sm:text-sm font-semibold text-blue-800 mb-2 uppercase tracking-wide">Mowing Schedules</h4>
            <div className="space-y-2 text-[10px] sm:text-xs text-blue-700">
              <div className="grid grid-cols-1 gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tees</span>
                  <span>PM - Mow</span>
                </div>
                <div className="text-right text-gray-600">Height of Cut - 0.420"</div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="font-medium">Fairways</span>
                  <span>PM - Mow</span>
                </div>
                <div className="text-right text-gray-600">Height of Cut - 0.490"</div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="font-medium">Collars</span>
                  <span>PM - Mow</span>
                </div>
                <div className="text-right text-gray-600">Height of Cut - 0.420"</div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="font-medium">Greens</span>
                  <span>AM - Single Cut w/single roll</span>
                </div>
                <div className="text-right text-gray-600">PM - Roll if needed</div>
                <div className="text-right text-gray-600">Height of Cut - 0.95"</div>
                <div className="text-right text-gray-600">Speed 10.0' - 10.5'</div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="font-medium">Intermediate Rough</span>
                  <span>PM - Mow</span>
                </div>
                <div className="text-right text-gray-600">Height of Cut - 1.25"</div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="font-medium">Primary Rough</span>
                  <span>Mowed as needed</span>
                </div>
                <div className="text-right text-gray-600">Height of Cut - 2.0"</div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="font-medium">Green Surrounds</span>
                  <span>Mowed as needed</span>
                </div>
                <div className="text-right text-gray-600">Height of Cut - 2.0"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}