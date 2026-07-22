export const GAME_CONFIG = {
  // Tiempo por pregunta en segundos (configurable)
  QUESTION_TIMER_SECONDS: 15,

  // Cuántas preguntas por partida
  QUESTIONS_PER_GAME: 12,

  // Puntos por respuesta correcta
  POINTS_PER_CORRECT: 100,

  // Bonus de puntos por responder rápido (dentro de 5 seg)
  SPEED_BONUS_THRESHOLD_SECONDS: 5,
  SPEED_BONUS_POINTS: 50,

  // Cuántas partidas antes de mostrar un ad interstitial
  GAMES_BEFORE_AD: 2,

  // IDs de AdMob reales
  ADMOB_APP_ID: 'ca-app-pub-6376754412949061~4625872808',
  ADMOB_INTERSTITIAL_ID: 'ca-app-pub-6376754412949061/6948783816',
  ADMOB_REWARDED_ID: 'ca-app-pub-6376754412949061/6948783816', // actualizar si creas unidad rewarded

  // Idioma por defecto
  DEFAULT_LANGUAGE: 'es' as 'es' | 'en',
};
