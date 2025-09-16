export interface TournamentHole {
  number: number;
  shotsToPar: number;
  totalYards: number;
}

export interface TournamentCourse {
  id: string;
  name: string;
  totalYards: number;
  shotsToPar: number;
  parIn: number;
  parOut: number;
  host: boolean;
  holes: TournamentHole[];
  address: {
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  weather: {
    type: string;
    displayValue: string;
    conditionId: string;
    zipCode: string;
    temperature: number;
    lowTemperature: number;
    highTemperature: number;
    precipitation: number;
    gust: number;
    windSpeed: number;
    windDirection: string;
    lastUpdated: string;
  };
}

export interface TournamentEvent {
  id: string;
  name: string;
  shortName: string;
  date: string;
  endDate: string;
  purse: number;
  displayPurse: string;
  tournament: {
    id: string;
    displayName: string;
    major: boolean;
    numberOfRounds: number;
  };
  defendingChampion: {
    athlete: {
      id: string;
      displayName: string;
      amateur: boolean;
    };
    displayName: string;
  };
  courses: TournamentCourse[];
}

export interface TournamentApiResponse {
  events: TournamentEvent[];
}
