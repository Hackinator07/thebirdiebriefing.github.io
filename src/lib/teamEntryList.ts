/**
 * Team Entry List data and utilities for team-based tournaments
 */

export interface TeamPlayer {
  name: string;
  worldRank: number;
  countryCode: string;
}

export interface Team {
  id: string;
  rank: number;
  name: string;
  countryCode: string;
  players: TeamPlayer[];
  pool: string;
}

export interface TeamEntryListData {
  teams: Team[];
  lastUpdated: string;
  tournament: string;
  isTeamEvent: boolean;
}

// Get team entry list data for team-based tournaments
export function getTeamEntryList(): TeamEntryListData {
  // Country code mapping for common variations
  const countryCodeMap: Record<string, string> = {
    'USA': 'USA',
    'KOR': 'KOR', 
    'NZL': 'NZL',
    'THA': 'THA',
    'JPN': 'JPN',
    'AUS': 'AUS',
    'FRA': 'FRA',
    'SWE': 'SWE',
    'UNA': 'USA', // Unaffiliated - treat as USA
    'ENG': 'GBR', // England -> Great Britain
    'GER': 'GER',
    'DEN': 'DEN',
    'MEX': 'MEX',
    'RSA': 'ZAF', // South Africa
    'CHN': 'CHN',
    'TPE': 'TWN', // Chinese Taipei -> Taiwan
    'TWN': 'TWN', // Taiwan
    'NIR': 'GBR', // Northern Ireland -> Great Britain
    'SCO': 'GBR', // Scotland -> Great Britain
    'ESP': 'ESP',
    'BEL': 'BEL',
    'CAN': 'CAN',
    'IND': 'IND',
    'PHI': 'PHL', // Philippines
    'ITA': 'ITA',
    'NED': 'NLD', // Netherlands
    'PAR': 'PRY', // Paraguay
    'ECU': 'ECU',
    'COL': 'COL', // Colombia
    'SLO': 'SVN' // Slovenia
  };

  // Team data for Maybank Championship 2025
  const teams: Team[] = [
    {
      id: 'team-1',
      rank: 1,
      name: 'United States',
      countryCode: 'USA',
      pool: 'A',
      players: [
        { name: 'Angel Yin', worldRank: 7, countryCode: 'USA' },
        { name: 'Lauren Coughlin', worldRank: 14, countryCode: 'USA' },
        { name: 'Lilia Vu', worldRank: 19, countryCode: 'USA' },
        { name: 'Yealimi Noh', worldRank: 24, countryCode: 'USA' }
      ]
    },
    {
      id: 'team-2',
      rank: 2,
      name: 'Japan',
      countryCode: 'JPN',
      pool: 'B',
      players: [
        { name: 'Miyu Yamashita', worldRank: 6, countryCode: 'JPN' },
        { name: 'Rio Takeda', worldRank: 11, countryCode: 'JPN' },
        { name: 'Mao Saigo', worldRank: 12, countryCode: 'JPN' },
        { name: 'Ayaka Furue', worldRank: 21, countryCode: 'JPN' }
      ]
    },
    {
      id: 'team-3',
      rank: 3,
      name: 'Republic of Korea',
      countryCode: 'KOR',
      pool: 'B',
      players: [
        { name: 'Hyo Joo Kim', worldRank: 8, countryCode: 'KOR' },
        { name: 'Haeran Ryu', worldRank: 9, countryCode: 'KOR' },
        { name: 'Jin Young Ko', worldRank: 16, countryCode: 'KOR' },
        { name: 'Hye-Jin Choi', worldRank: 23, countryCode: 'KOR' }
      ]
    },
    {
      id: 'team-4',
      rank: 4,
      name: 'Australia',
      countryCode: 'AUS',
      pool: 'A',
      players: [
        { name: 'Minjee Lee', worldRank: 4, countryCode: 'AUS' },
        { name: 'Hannah Green', worldRank: 15, countryCode: 'AUS' },
        { name: 'Grace Kim', worldRank: 27, countryCode: 'AUS' },
        { name: 'Steph Kyriacou', worldRank: 35, countryCode: 'AUS' }
      ]
    },
    {
      id: 'team-5',
      rank: 5,
      name: 'Thailand',
      countryCode: 'THA',
      pool: 'A',
      players: [
        { name: 'Jeeno Thitikul', worldRank: 1, countryCode: 'THA' },
        { name: 'Chanettee Wannasaen', worldRank: 36, countryCode: 'THA' },
        { name: 'Pajaree Anannarukarn', worldRank: 78, countryCode: 'THA' },
        { name: 'Jasmine Suwannapura', worldRank: 116, countryCode: 'THA' }
      ]
    },
    {
      id: 'team-6',
      rank: 6,
      name: 'Sweden',
      countryCode: 'SWE',
      pool: 'B',
      players: [
        { name: 'Maja Stark', worldRank: 13, countryCode: 'SWE' },
        { name: 'Madelene Sagstrom', worldRank: 31, countryCode: 'SWE' },
        { name: 'Ingrid Lindblad', worldRank: 40, countryCode: 'SWE' },
        { name: 'Linn Grant', worldRank: 42, countryCode: 'SWE' }
      ]
    },
    {
      id: 'team-7',
      rank: 7,
      name: 'World Team',
      countryCode: 'MIX',
      pool: 'B',
      players: [
        { name: 'Brooke Henderson', worldRank: 54, countryCode: 'CAN' },
        { name: 'Charley Hull', worldRank: 10, countryCode: 'GBR' },
        { name: 'Wei-Ling Hsu', worldRank: 83, countryCode: 'TWN' },
        { name: 'Lydia Ko', worldRank: 3, countryCode: 'NZL' }
      ]
    },
    {
      id: 'team-8',
      rank: 8,
      name: 'People\'s Republic of China',
      countryCode: 'CHN',
      pool: 'A',
      players: [
        { name: 'Ruoning Yin', worldRank: 5, countryCode: 'CHN' },
        { name: 'Weiwei Zhang', worldRank: 99, countryCode: 'CHN' },
        { name: 'Yan Liu', worldRank: 104, countryCode: 'CHN' },
        { name: 'Ruoxin Liu', worldRank: 126, countryCode: 'CHN' }
      ]
    }
  ];

  return {
    teams,
    lastUpdated: new Date().toISOString(),
    tournament: 'Maybank Championship 2025',
    isTeamEvent: true
  };
}
