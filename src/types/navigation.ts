export type WrongAnswer = {
  question: string;
  options: string[];
  correctIndex: number;
  selectedIndex: number | null; // null = tiempo agotado
  category: string;
};

export type Resultado = {
  id: string;
  uid: string;
  nick: string;
  puntaje: number;
  respuestasCorrectas: number;
  totalPreguntas: number;
  categoria: string;
  fecha: string;
};

export type MainStackParamList = {
  Login: undefined;
  Registro: undefined;
  Tab: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  CategorySelect: undefined;
  Game: {
    category: string | 'all';
    gameId?: number;
  };
  Results: {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    category: string;
    wrongAnswers: WrongAnswer[];
    playedAt: number;
  };
  ReviewAnswers: {
    wrongAnswers: WrongAnswer[];
  };
  HighScores: undefined;
  Perfil: undefined;
};
