import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGame } from '../context/GameContext';
import { QUESTIONS_ES } from '../data/questions_es';
import { RootStackParamList } from '../types/navigation';
import { GAME_CONFIG } from '../config/game.config';
import { useGameSounds } from '../hooks/useGameSounds';
import { Fonts } from '../../style/estiloGlobal';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>;
  route: RouteProp<RootStackParamList, 'Game'>;
};

const PRIZES = { easy: 10, medium: 20, hard: 30 } as const;
const DIFFICULTY_LABELS = { easy: 'Fácil', medium: 'Media', hard: 'Difícil' } as const;

export default function GameScreen({ navigation, route }: Props) {
  const { category, difficulty, roundId } = route.params;
  const game = useGame();
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.QUESTION_TIMER_SECONDS);
  const timerWidth = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { playCorrect, playWrong } = useGameSounds();

  useEffect(() => {
    const availableQuestions = QUESTIONS_ES.filter(
      question =>
        (category === 'all' || question.category === category) &&
        question.difficulty === difficulty &&
        !game.answeredQuestionIds.includes(question.id)
    );
    const question = availableQuestions.length
      ? availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
      : null;
    game.setCurrentQuestion(question);
    setTimeLeft(GAME_CONFIG.QUESTION_TIMER_SECONDS);
    timerWidth.setValue(1);
  }, [category, difficulty, roundId]);

  useEffect(() => {
    if (!game.currentQuestion || game.isAnswered) return;
    Animated.timing(timerWidth, {
      toValue: 0,
      duration: GAME_CONFIG.QUESTION_TIMER_SECONDS * 1000,
      useNativeDriver: false,
    }).start();

    timerRef.current = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          game.answerQuestion(null, PRIZES[difficulty]);
          playWrong();
          return 0;
        }
        return previous - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [game.currentQuestion?.id, game.isAnswered]);

  function answer(index: number) {
    if (game.isAnswered || !game.currentQuestion) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const correct = index === game.currentQuestion.correctIndex;
    game.answerQuestion(index, PRIZES[difficulty]);
    correct ? playCorrect() : playWrong();
  }

  function next() {
    const hasReachedLimit = game.answeredQuestionIds.length >= GAME_CONFIG.QUESTIONS_PER_GAME;
    const categoryQuestions = QUESTIONS_ES.filter((question) =>
      category === 'all' || question.category === category
    );
    const hasRemainingQuestions = categoryQuestions.some(
      (question) => !game.answeredQuestionIds.includes(question.id)
    );
    if (hasReachedLimit || !hasRemainingQuestions) {
      navigation.navigate('Results', {
        score: game.totalPrize,
        correctAnswers: game.correctAnswers,
        totalQuestions: game.answeredQuestionIds.length,
        category,
        wrongAnswers: game.wrongAnswers,
        playedAt: Date.now(),
      });
      return;
    }
    game.prepareNextQuestion();
    navigation.navigate('Roulette', { category });
  }

  function spinAgain() {
    game.prepareNextQuestion();
    navigation.navigate('Roulette', { category });
  }

  if (!game.currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyCard}>
          <Text style={styles.questionText}>
            No quedan preguntas de dificultad {DIFFICULTY_LABELS[difficulty]} en esta categoría
          </Text>
          <Text style={styles.prizeText}>Premio acumulado: ${game.totalPrize}</Text>
          <TouchableOpacity style={styles.button} onPress={spinAgain}>
            <Text style={styles.buttonText}>VOLVER A GIRAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const question = game.currentQuestion;
  const timerColor = timeLeft > 8 ? '#4caf50' : timeLeft > 4 ? '#ff9800' : '#e94560';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.meta}>{game.answeredQuestionIds.length + 1} / {GAME_CONFIG.QUESTIONS_PER_GAME}</Text>
        <Text style={styles.category}>{question.category} · {DIFFICULTY_LABELS[difficulty]}</Text>
        <Text style={styles.meta}>${game.totalPrize}</Text>
      </View>
      <View style={styles.timerTrack}>
        <Animated.View style={[styles.timerBar, { flex: timerWidth, backgroundColor: timerColor }]} />
      </View>
      <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}s</Text>
      <View style={styles.questionContainer}><Text style={styles.questionText}>{question.question}</Text></View>
      <View style={styles.options}>
        {question.options.map((option, index) => {
          const correct = game.isAnswered && index === question.correctIndex;
          const wrong = game.isAnswered && index === game.answerSelected && !correct;
          return (
            <TouchableOpacity key={index} disabled={game.isAnswered} onPress={() => answer(index)}
              style={[styles.option, correct && styles.correct, wrong && styles.wrong, game.isAnswered && !correct && !wrong && styles.dimmed]}>
              <Text style={styles.optionLetter}>{['A', 'B', 'C', 'D'][index]}</Text>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {game.isAnswered && (
        <View style={styles.resultCard}>
          <Text style={[styles.resultTitle, { color: game.questionPrize > 0 ? '#4caf50' : '#e94560' }]}>
            {game.questionPrize > 0 ? 'Correcto' : 'Incorrecto'}
          </Text>
          <Text style={styles.prizeText}>Ganaste: ${game.questionPrize}</Text>
          <Text style={styles.prizeText}>Premio acumulado: ${game.totalPrize}</Text>
          <TouchableOpacity style={styles.button} onPress={next}><Text style={styles.buttonText}>SIGUIENTE</Text></TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  meta: { fontFamily: Fonts.primary, color: '#fff', fontSize: 14 },
  category: { fontFamily: Fonts.primary, color: '#e94560', fontSize: 12, textTransform: 'uppercase' },
  timerTrack: { height: 6, backgroundColor: '#16213e', borderRadius: 3, flexDirection: 'row', overflow: 'hidden' },
  timerBar: { height: 6 }, timerText: { fontFamily: Fonts.primary, textAlign: 'right', marginTop: 5 },
  questionContainer: { flex: 1, justifyContent: 'center', paddingVertical: 12 },
  questionText: { fontFamily: Fonts.primary, color: '#fff', fontSize: 21, lineHeight: 30, textAlign: 'center' },
  options: { gap: 10 },
  option: { backgroundColor: '#16213e', borderRadius: 12, padding: 15, flexDirection: 'row', borderWidth: 1, borderColor: '#0f3460' },
  correct: { backgroundColor: '#1b4332', borderColor: '#4caf50' }, wrong: { backgroundColor: '#3b1a1a', borderColor: '#e94560' }, dimmed: { opacity: .4 },
  optionLetter: { fontFamily: Fonts.primary, color: '#e94560', width: 28 }, optionText: { fontFamily: Fonts.primary, color: '#fff', flex: 1 },
  resultCard: { backgroundColor: '#16213e', padding: 14, marginTop: 12, marginBottom: 18, borderRadius: 14, alignItems: 'center', gap: 5 },
  resultTitle: { fontFamily: Fonts.primary, fontSize: 20 }, prizeText: { fontFamily: Fonts.primary, color: '#fff', fontSize: 15 },
  button: { backgroundColor: '#e94560', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 25, alignItems: 'center', marginTop: 10 },
  buttonText: { fontFamily: Fonts.primary, color: '#fff', fontSize: 15 },
  emptyCard: { backgroundColor: '#16213e', borderRadius: 18, padding: 24, marginTop: 80, alignItems: 'center', gap: 14 },
});
