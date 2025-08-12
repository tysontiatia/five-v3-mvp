import { useEffect, useRef } from 'react';
import { useStore } from '@/src/state/store';
import { Question } from '@/src/types';

const USE_MOCK = true; // Feature flag

export const useMockRunner = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { setQuestions, mockResolve, currentGameId } = useStore();

  useEffect(() => {
    if (!USE_MOCK || !currentGameId) return;

    const runCycle = () => {
      const questionId = `q-${Date.now()}`;
      const question: Question = {
        id: questionId,
        gameId: currentGameId,
        prompt: `Will the next play gain more than 5 yards?`,
        options: [
          { id: 'yes', label: 'Yes' },
          { id: 'no', label: 'No' },
        ],
        status: 'open',
      };

      // Add question
      setQuestions(currentGameId, [question]);

      // Lock after 10 seconds
      setTimeout(() => {
        setQuestions(currentGameId, [{ ...question, status: 'locked' }]);
      }, 10000);

      // Resolve after 15 seconds
      setTimeout(() => {
        const correctId = Math.random() > 0.5 ? 'yes' : 'no';
        mockResolve(questionId, correctId);
      }, 15000);
    };

    // Run immediately, then every 45 seconds
    runCycle();
    intervalRef.current = setInterval(runCycle, 45000) as any;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentGameId, setQuestions, mockResolve]);
};