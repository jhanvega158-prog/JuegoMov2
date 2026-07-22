import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, WrongAnswer } from '../types/navigation';
import { getQuestions, calculateScore } from '../utils/gameUtils';
import { GAME_CONFIG } from '../config/game.config';
import { Question } from '../data/questions_es';
import { useGameSounds } from '../hooks/useGameSounds';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>;
  route: RouteProp<RootStackParamList, 'Game'>;
};

type AnswerState = 'unanswered' | 'correct' | 'wrong';

export default function GameScreen({ navigation, route }: Props) {
  const { category } = route.params;
  const [questions] = useState<Question[]>(() => getQuestions(category));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.QUESTION_TIMER_SECONDS);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerWidth = useRef(new Animated.Value(1)).current;
  const { playCorrect, playWrong } = useGameSounds();

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const goToNext = useCallback(() => {
    if (isLastQuestion) {
      navigation.replace('Results', {
        score,
        correctAnswers,
        totalQuestions: questions.length,
        category,
        wrongAnswers,
      });
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setAnswerState('unanswered');
      setTimeLeft(GAME_CONFIG.QUESTION_TIMER_SECONDS);
    }
  }, [isLastQuestion, navigation, score, correctAnswers, questions.length, category]);

  // Animación de la barra de tiempo
  useEffect(() => {
    timerWidth.setValue(1);
    Animated.timing(timerWidth, {
      toValue: 0,
      duration: GAME_CONFIG.QUESTION_TIMER_SECONDS * 1000,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  // Countdown timer
  useEffect(() => {
    if (answerState !== 'unanswered') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setAnswerState('wrong'); // tiempo agotado = respuesta incorrecta
          setWrongAnswers((prev) => [
            ...prev,
            {
              question: currentQuestion.question,
              options: currentQuestion.options,
              correctIndex: currentQuestion.correctIndex,
              selectedIndex: null,
              category: currentQuestion.category,
            },
          ]);
          playWrong();
          setTimeout(goToNext, 1200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, answerState, goToNext]);

  function handleOptionPress(index: number) {
    if (answerState !== 'unanswered') return;

    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = index === currentQuestion.correctIndex;
    setSelectedOption(index);
    setAnswerState(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      const points = calculateScore(true, timeLeft);
      setScore((s) => s + points);
      setCorrectAnswers((c) => c + 1);
      playCorrect();
    } else {
      setWrongAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          options: currentQuestion.options,
          correctIndex: currentQuestion.correctIndex,
          selectedIndex: index,
          category: currentQuestion.category,
        },
      ]);
      playWrong();
    }

    setTimeout(goToNext, 1200);
  }

  function getOptionStyle(index: number) {
    if (answerState === 'unanswered') return styles.option;
    if (index === currentQuestion.correctIndex) return [styles.option, styles.optionCorrect];
    if (index === selectedOption && answerState === 'wrong') return [styles.option, styles.optionWrong];
    return [styles.option, styles.optionDimmed];
  }

  function getOptionTextStyle(index: number) {
    if (answerState === 'unanswered') return styles.optionText;
    if (index === currentQuestion.correctIndex) return [styles.optionText, styles.optionTextCorrect];
    if (index === selectedOption && answerState === 'wrong') return [styles.optionText, styles.optionTextWrong];
    return [styles.optionText, styles.optionTextDimmed];
  }

  const timerColor = timeLeft > 8 ? '#4caf50' : timeLeft > 4 ? '#ff9800' : '#e94560';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Header: progreso + puntaje */}
      <View style={styles.header}>
        <Text style={styles.progress}>
          {currentIndex + 1} / {questions.length}
        </Text>
        <Text style={styles.category}>{currentQuestion.category}</Text>
        <Text style={styles.score}>⭐ {score}</Text>
      </View>

      {/* Barra de tiempo */}
      <View style={styles.timerTrack}>
        <Animated.View
          style={[
            styles.timerBar,
            {
              flex: timerWidth,
              backgroundColor: timerColor,
            },
          ]}
        />
      </View>
      <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}s</Text>

      {/* Pregunta */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {/* Opciones */}
      <View style={styles.options}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleOptionPress(index)}
            activeOpacity={0.8}
            disabled={answerState !== 'unanswered'}
          >
            <Text style={styles.optionLetter}>
              {['A', 'B', 'C', 'D'][index]}
            </Text>
            <Text style={getOptionTextStyle(index)}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 12,
  },
  progress: {
    color: '#a8a8b3',
    fontSize: 14,
    fontWeight: '600',
  },
  category: {
    color: '#e94560',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  score: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  timerTrack: {
    height: 6,
    backgroundColor: '#16213e',
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 6,
  },
  timerBar: {
    height: 6,
    borderRadius: 3,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 8,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  questionText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
  },
  options: {
    gap: 12,
    paddingBottom: 24,
  },
  option: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  optionCorrect: {
    backgroundColor: '#1b4332',
    borderColor: '#4caf50',
  },
  optionWrong: {
    backgroundColor: '#3b1a1a',
    borderColor: '#e94560',
  },
  optionDimmed: {
    opacity: 0.4,
  },
  optionLetter: {
    color: '#e94560',
    fontWeight: '800',
    fontSize: 15,
    width: 28,
  },
  optionText: {
    color: '#e2e2e2',
    fontSize: 15,
    flex: 1,
  },
  optionTextCorrect: {
    color: '#4caf50',
    fontWeight: '700',
  },
  optionTextWrong: {
    color: '#e94560',
    fontWeight: '700',
  },
  optionTextDimmed: {
    color: '#555577',
  },
});
