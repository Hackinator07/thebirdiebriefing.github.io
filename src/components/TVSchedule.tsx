'use client';

import { useState, useEffect } from 'react';
import TimezoneSelect from 'react-timezone-select';

interface ScheduleDay {
  day: string;
  times: string[];
}

interface TVScheduleProps {
  title: string;
  schedule: ScheduleDay[];
}

// Default timezone (Central Time)
const DEFAULT_TIMEZONE = 'America/Chicago';

// Function to convert time from Central to selected timezone
function convertTime(timeString: string, fromTimezone: string, toTimezone: string): string {
  try {
    // Extract time and channel info
    const match = timeString.match(/^(.+?):\s*(.+)$/);
    if (!match) return timeString;
    
    const [, channel, timeRange] = match;
    
    // Parse the time range (e.g., "2:00 PM – 5:00 PM" or "2:00 PM - 5:00 PM")
    // Handle both en dash (–) and regular hyphen (-)
    const timeMatch = timeRange.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (!timeMatch) return timeString;
    
    const [, startHour, startMinute, startPeriod, endHour, endMinute, endPeriod] = timeMatch;
    
    // Create Date objects for today with the times (assuming current date)
    const today = new Date();
    const startTime = new Date(today);
    const endTime = new Date(today);
    
    // Set start time
    let startHour24 = parseInt(startHour);
    if (startPeriod === 'PM' && startHour24 !== 12) startHour24 += 12;
    if (startPeriod === 'AM' && startHour24 === 12) startHour24 = 0;
    startTime.setHours(startHour24, parseInt(startMinute), 0, 0);
    
    // Set end time
    let endHour24 = parseInt(endHour);
    if (endPeriod === 'PM' && endHour24 !== 12) endHour24 += 12;
    if (endPeriod === 'AM' && endHour24 === 12) endHour24 = 0;
    endTime.setHours(endHour24, parseInt(endMinute), 0, 0);
    
    // Convert times to the target timezone
    const startTimeInTarget = new Date(startTime.toLocaleString('en-US', { timeZone: toTimezone }));
    const endTimeInTarget = new Date(endTime.toLocaleString('en-US', { timeZone: toTimezone }));
    
    // Format the converted times
    const startFormatted = startTimeInTarget.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: toTimezone
    });
    
    const endFormatted = endTimeInTarget.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: toTimezone
    });
    
    // Return the converted time string
    return `${channel}: ${startFormatted} – ${endFormatted}`;
  } catch {
    return timeString;
  }
}

// Function to get timezone label
function getTimezoneLabel(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'short'
    });
    const parts = formatter.formatToParts(now);
    const timezoneName = parts.find(part => part.type === 'timeZoneName')?.value || '';
    
    // Get offset in GMT format
    const offset = now.toLocaleString('en-US', {
      timeZone: timezone,
      timeZoneName: 'longOffset'
    });
    
    // Extract just the GMT offset part (e.g., "GMT-05:00")
    const gmtMatch = offset.match(/GMT[+-]\d{2}:\d{2}/);
    const gmtOffset = gmtMatch ? gmtMatch[0] : '';
    
    return `${timezoneName} (${gmtOffset})`;
  } catch {
    return timezone;
  }
}

export default function TVSchedule({ title, schedule }: TVScheduleProps) {
  const [selectedTimezone, setSelectedTimezone] = useState(DEFAULT_TIMEZONE);
  const [convertedSchedule, setConvertedSchedule] = useState(schedule);

  // Load saved timezone preference
  useEffect(() => {
    const savedTimezone = localStorage.getItem('preferred-timezone');
    if (savedTimezone) {
      setSelectedTimezone(savedTimezone);
    }
  }, []);

  // Convert schedule when timezone changes
  useEffect(() => {
    if (selectedTimezone === DEFAULT_TIMEZONE) {
      setConvertedSchedule(schedule);
    } else {
      const converted = schedule.map(day => ({
        ...day,
        times: day.times.map(time => 
          convertTime(time, DEFAULT_TIMEZONE, selectedTimezone)
        )
      }));
      setConvertedSchedule(converted);
    }
  }, [selectedTimezone, schedule]);

  // Save timezone preference
  const handleTimezoneChange = (newTimezone: string) => {
    setSelectedTimezone(newTimezone);
    localStorage.setItem('preferred-timezone', newTimezone);
  };

  return (
    <section className="my-12">
      <div className="bg-primary-50 rounded-lg p-8 border border-primary-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
        
        {/* Timezone Selector */}
        <div className="mb-6">
          <label htmlFor="timezone-select" className="block text-sm font-semibold text-gray-900 mb-2">
            Time Zone: {getTimezoneLabel(selectedTimezone)}
          </label>
          <div className="max-w-xs">
            <TimezoneSelect
              value={selectedTimezone}
              onChange={(tz) => handleTimezoneChange(tz.value)}
              onBlur={() => {}}
              placeholder="Select timezone..."
              className="w-full"
              menuPlacement="auto"
              isSearchable={true}
              isClearable={false}
              aria-label="Select timezone"
              instanceId="timezone-selector"
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? '#ad345a' : '#d1d5db',
                  borderWidth: '1px',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  minHeight: '42px',
                  boxShadow: state.isFocused ? '0 0 0 2px #ad345a' : 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#ad345a'
                  }
                }),
                menu: (base) => ({
                  ...base,
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  zIndex: 50
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected 
                    ? '#ad345a' 
                    : state.isFocused 
                    ? '#f9f3f5' 
                    : 'white',
                  color: state.isSelected ? 'white' : '#374151',
                  '&:hover': {
                    backgroundColor: state.isSelected ? '#ad345a' : '#f9f3f5'
                  }
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#374151'
                }),
                placeholder: (base) => ({
                  ...base,
                  color: '#9ca3af'
                }),
                input: (base) => ({
                  ...base,
                  color: '#374151'
                })
              }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {convertedSchedule.map((day, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-primary-100">
              <h4 className="text-lg font-semibold text-primary-700 mb-3">{day.day}</h4>
              <div className="space-y-2">
                {day.times.map((time, timeIndex) => (
                  <div key={timeIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
