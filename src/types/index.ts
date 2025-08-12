export interface Team {
  id: string;
  name: string;
  code?: string;
  logoUri?: string;
}

export interface Game {
  id: string;
  status: 'live' | 'upcoming' | 'final';
  home: Team;
  away: Team;
  homeScore?: number;
  awayScore?: number;
  meta: string;
}

export interface Question {
  id: string;
  gameId: string;
  prompt: string;
  options: { id: string; label: string }[];
  status: 'open' | 'locked' | 'resolved';
  correctOptionId?: string;
}

export interface Pick {
  id: string;
  questionId: string;
  optionId: string;
  wager: number;
  outcome?: 'win' | 'loss';
  coinDelta?: number;
  timestamp: number;
}