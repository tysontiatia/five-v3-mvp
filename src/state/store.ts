import { create } from 'zustand';
import { Game, Question, Pick } from '@/src/types';

interface AppState {
  // User state
  coins: number;
  streak: number;
  bestStreak: number;
  
  // Game state
  games: Game[];
  currentGameId?: string;
  questionsByGame: Record<string, Question[]>;
  picksByGame: Record<string, Pick[]>;
  
  // Actions
  joinGame: (gameId: string) => void;
  submitPick: (questionId: string, optionId: string, wager: number) => void;
  mockResolve: (questionId: string, correctOptionId: string) => void;
  updateCoins: (delta: number) => void;
  setGames: (games: Game[]) => void;
  setQuestions: (gameId: string, questions: Question[]) => void;
}

export const useStore = create<AppState>((set, get) => ({
  coins: 500,
  streak: 0,
  bestStreak: 0,
  games: [],
  currentGameId: undefined,
  questionsByGame: {},
  picksByGame: {},
  
  joinGame: (gameId) => {
    set({ currentGameId: gameId });
  },
  
  submitPick: (questionId, optionId, wager) => {
    const state = get();
    const gameId = state.currentGameId;
    if (!gameId) return;
    
    const pick: Pick = {
      id: `pick-${Date.now()}`,
      questionId,
      optionId,
      wager,
      timestamp: Date.now(),
    };
    
    set({
      picksByGame: {
        ...state.picksByGame,
        [gameId]: [...(state.picksByGame[gameId] || []), pick],
      },
    });
  },
  
  mockResolve: (questionId, correctOptionId) => {
    const state = get();
    const gameId = state.currentGameId;
    if (!gameId) return;
    
    // Update question status
    const questions = state.questionsByGame[gameId] || [];
    const updatedQuestions = questions.map((q) =>
      q.id === questionId
        ? { ...q, status: 'resolved' as const, correctOptionId }
        : q
    );
    
    // Update picks with outcomes
    const picks = state.picksByGame[gameId] || [];
    const updatedPicks = picks.map((pick) => {
      if (pick.questionId === questionId) {
        const isCorrect = pick.optionId === correctOptionId;
        const coinDelta = isCorrect ? pick.wager * 2 : -pick.wager;
        return {
          ...pick,
          outcome: isCorrect ? 'win' as const : 'loss' as const,
          coinDelta,
        };
      }
      return pick;
    });
    
    // Calculate total coin delta
    const totalDelta = updatedPicks
      .filter((p) => p.questionId === questionId)
      .reduce((sum, p) => sum + (p.coinDelta || 0), 0);
    
    // Update streak
    const lastPick = updatedPicks.find((p) => p.questionId === questionId);
    const newStreak = lastPick?.outcome === 'win' ? state.streak + 1 : 0;
    
    set({
      questionsByGame: {
        ...state.questionsByGame,
        [gameId]: updatedQuestions,
      },
      picksByGame: {
        ...state.picksByGame,
        [gameId]: updatedPicks,
      },
      coins: state.coins + totalDelta,
      streak: newStreak,
      bestStreak: Math.max(state.bestStreak, newStreak),
    });
  },
  
  updateCoins: (delta) => {
    set((state) => ({ coins: Math.max(0, state.coins + delta) }));
  },
  
  setGames: (games) => {
    set({ games });
  },
  
  setQuestions: (gameId, questions) => {
    set((state) => ({
      questionsByGame: {
        ...state.questionsByGame,
        [gameId]: questions,
      },
    }));
  },
}));