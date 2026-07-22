import AsyncStorage from '@react-native-async-storage/async-storage';

export interface HighScore {
  id: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  category: string;
  date: string;
}

const HIGH_SCORES_KEY = '@trivia_high_scores';
const MAX_SCORES = 10;

export async function saveScore(entry: Omit<HighScore, 'id' | 'date'>): Promise<void> {
  const existing = await getScores();
  const newEntry: HighScore = {
    ...entry,
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('es-MX'),
  };
  const updated = [newEntry, ...existing]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_SCORES);
  await AsyncStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(updated));
}

export async function getScores(): Promise<HighScore[]> {
  const raw = await AsyncStorage.getItem(HIGH_SCORES_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as HighScore[];
}

export async function clearScores(): Promise<void> {
  await AsyncStorage.removeItem(HIGH_SCORES_KEY);
}
