import { Game, Question } from '@/src/types';

export const mockGames: Game[] = [
  {
    id: 'game-1',
    status: 'live',
    home: {
      id: 'bills',
      name: 'Bills',
      code: 'BUF',
      logoUri: 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png',
    },
    away: {
      id: 'chiefs',
      name: 'Chiefs',
      code: 'KC',
      logoUri: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
    },
    homeScore: 17,
    awayScore: 21,
    meta: '2nd Quarter • 8:42',
  },
  {
    id: 'game-2',
    status: 'upcoming',
    home: {
      id: 'cowboys',
      name: 'Cowboys',
      code: 'DAL',
      logoUri: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png',
    },
    away: {
      id: '49ers',
      name: '49ers',
      code: 'SF',
      logoUri: 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png',
    },
    meta: 'Sun 4:25 PM ET',
  },
  {
    id: 'game-3',
    status: 'final',
    home: {
      id: 'packers',
      name: 'Packers',
      code: 'GB',
      logoUri: 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png',
    },
    away: {
      id: 'bears',
      name: 'Bears',
      code: 'CHI',
      logoUri: 'https://a.espncdn.com/i/teamlogos/nfl/500/chi.png',
    },
    homeScore: 24,
    awayScore: 17,
    meta: 'Final',
  },
];

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    gameId: 'game-1',
    prompt: 'Who will score the next touchdown?',
    options: [
      { id: 'opt1', label: 'Josh Allen' },
      { id: 'opt2', label: 'Patrick Mahomes' },
    ],
    status: 'resolved',
    correctOptionId: 'opt2',
  },
  {
    id: 'q2',
    gameId: 'game-1',
    prompt: 'Will the next play be a run or pass?',
    options: [
      { id: 'opt3', label: 'Run' },
      { id: 'opt4', label: 'Pass' },
    ],
    status: 'open',
  },
  {
    id: 'q3',
    gameId: 'game-1',
    prompt: 'Total points scored in the 2nd quarter?',
    options: [
      { id: 'opt5', label: 'Over 14.5' },
      { id: 'opt6', label: 'Under 14.5' },
    ],
    status: 'locked',
  },
];