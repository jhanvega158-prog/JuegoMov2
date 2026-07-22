export type WrongAnswer = {
  question: string;
  options: string[];
  correctIndex: number;
  selectedIndex: number | null; // null = tiempo agotado
  category: string;
};

export type RootStackParamList = {
  Home: undefined;
  CategorySelect: undefined;
  Game: {
    category: string | 'all';
  };
  Results: {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    category: string;
    wrongAnswers: WrongAnswer[];
  };
  ReviewAnswers: {
    wrongAnswers: WrongAnswer[];
  };
  HighScores: undefined;
};
