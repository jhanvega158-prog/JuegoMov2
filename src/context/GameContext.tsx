import React, { createContext, useContext, useMemo, useState } from 'react';
import { Question } from '../data/questions_es';
import { WrongAnswer } from '../types/navigation';

export type Difficulty = 'easy' | 'medium' | 'hard';

type GameContextValue = {
  selectedCategory: string;
  difficultySelected: Difficulty | null;
  totalPrize: number;
  questionPrize: number;
  answeredQuestionIds: number[];
  currentQuestion: Question | null;
  answerSelected: number | null;
  isAnswered: boolean;
  correctAnswers: number;
  wrongAnswers: WrongAnswer[];
  startGame: (category: string) => void;
  setDifficultySelected: (difficulty: Difficulty | null) => void;
  setCurrentQuestion: (question: Question | null) => void;
  answerQuestion: (selectedIndex: number | null, prize: number) => void;
  prepareNextQuestion: () => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficultySelected, setDifficultySelected] = useState<Difficulty | null>(null);
  const [totalPrize, setTotalPrize] = useState(0);
  const [questionPrize, setQuestionPrize] = useState(0);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answerSelected, setAnswerSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);

  function resetGame() {
    setSelectedCategory('');
    setDifficultySelected(null);
    setTotalPrize(0);
    setQuestionPrize(0);
    setAnsweredQuestionIds([]);
    setCurrentQuestion(null);
    setAnswerSelected(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setWrongAnswers([]);
  }

  function startGame(category: string) {
    resetGame();
    setSelectedCategory(category);
  }

  function answerQuestion(selectedIndex: number | null, prize: number) {
    if (isAnswered || !currentQuestion) return;
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    const earnedPrize = isCorrect ? prize : 0;

    setAnswerSelected(selectedIndex);
    setIsAnswered(true);
    setQuestionPrize(earnedPrize);
    setAnsweredQuestionIds((ids) => [...ids, currentQuestion.id]);

    if (isCorrect) {
      setTotalPrize((total) => total + earnedPrize);
      setCorrectAnswers((total) => total + 1);
    } else {
      setWrongAnswers((answers) => [...answers, {
        question: currentQuestion.question,
        options: currentQuestion.options,
        correctIndex: currentQuestion.correctIndex,
        selectedIndex,
        category: currentQuestion.category,
      }]);
    }
  }

  function prepareNextQuestion() {
    setDifficultySelected(null);
    setQuestionPrize(0);
    setCurrentQuestion(null);
    setAnswerSelected(null);
    setIsAnswered(false);
  }

  const value = useMemo(() => ({
    selectedCategory, difficultySelected, totalPrize, questionPrize,
    answeredQuestionIds, currentQuestion, answerSelected, isAnswered,
    correctAnswers, wrongAnswers, startGame, setDifficultySelected,
    setCurrentQuestion, answerQuestion, prepareNextQuestion, resetGame,
  }), [selectedCategory, difficultySelected, totalPrize, questionPrize,
    answeredQuestionIds, currentQuestion, answerSelected, isAnswered,
    correctAnswers, wrongAnswers]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame debe usarse dentro de GameProvider');
  return context;
}
