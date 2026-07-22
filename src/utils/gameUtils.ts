import { Question, QUESTIONS_ES } from '../data/questions_es';
import { GAME_CONFIG } from '../config/game.config';

export function getQuestions(category: string | 'all'): Question[] {
  const pool =
    category === 'all'
      ? QUESTIONS_ES
      : QUESTIONS_ES.filter((q) => q.category === category);

  // Mezclar y tomar las primeras N preguntas
  return shuffle(pool).slice(0, GAME_CONFIG.QUESTIONS_PER_GAME);
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function calculateScore(
  isCorrect: boolean,
  secondsRemaining: number
): number {
  if (!isCorrect) return 0;
  const base = GAME_CONFIG.POINTS_PER_CORRECT;
  const bonus =
    secondsRemaining >= GAME_CONFIG.QUESTION_TIMER_SECONDS - GAME_CONFIG.SPEED_BONUS_THRESHOLD_SECONDS
      ? GAME_CONFIG.SPEED_BONUS_POINTS
      : 0;
  return base + bonus;
}
