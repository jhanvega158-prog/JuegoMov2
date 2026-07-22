import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { saveScore } from '../utils/storage';
import { useInterstitialAd } from '../hooks/useInterstitialAd';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Results'>;
  route: RouteProp<RootStackParamList, 'Results'>;
};

function getResultEmoji(pct: number) {
  if (pct >= 90) return '🏆';
  if (pct >= 70) return '🌟';
  if (pct >= 50) return '👍';
  return '💪';
}

function getResultMessage(pct: number) {
  if (pct >= 90) return '¡Increíble! Eres un genio';
  if (pct >= 70) return '¡Muy bien! Gran resultado';
  if (pct >= 50) return 'No estuvo mal, ¡sigue practicando!';
  return 'Sigue intentándolo, ¡puedes mejorar!';
}

export default function ResultsScreen({ navigation, route }: Props) {
  const { score, correctAnswers, totalQuestions, category, wrongAnswers } = route.params;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const { showAdIfReady } = useInterstitialAd();

  useEffect(() => {
    saveScore({ score, correctAnswers, totalQuestions, category }).catch(() => {});
    showAdIfReady();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.content}>
        <Text style={styles.emoji}>{getResultEmoji(percentage)}</Text>
        <Text style={styles.message}>{getResultMessage(percentage)}</Text>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Puntaje final</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{correctAnswers}</Text>
            <Text style={styles.statLabel}>Correctas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{totalQuestions - correctAnswers}</Text>
            <Text style={styles.statLabel}>Incorrectas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{percentage}%</Text>
            <Text style={styles.statLabel}>Acierto</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => navigation.replace('Game', { category })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTextPrimary}>🔄  Jugar de nuevo</Text>
        </TouchableOpacity>

        {wrongAnswers.length > 0 && (
          <TouchableOpacity
            style={[styles.button, styles.buttonReview]}
            onPress={() => navigation.navigate('ReviewAnswers', { wrongAnswers })}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonTextReview}>📋  Ver respuestas correctas ({wrongAnswers.length})</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate('HighScores')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTextSecondary}>🏆  Ver puntajes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => navigation.popToTop()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTextOutline}>🏠  Ir al inicio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  emoji: {
    fontSize: 80,
  },
  message: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  scoreBox: {
    backgroundColor: '#e94560',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 48,
    alignItems: 'center',
  },
  scoreLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreValue: {
    color: '#fff',
    fontSize: 52,
    fontWeight: '900',
    lineHeight: 60,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: '#a8a8b3',
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#0f3460',
  },
  buttons: {
    gap: 12,
    paddingBottom: 24,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#e94560',
  },
  buttonSecondary: {
    backgroundColor: '#16213e',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  buttonReview: {
    backgroundColor: '#16213e',
    borderWidth: 1,
    borderColor: '#e94560',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#a8a8b3',
  },
  buttonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonTextSecondary: {
    color: '#e2e2e2',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextReview: {
    color: '#e94560',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonTextOutline: {
    color: '#a8a8b3',
    fontSize: 16,
    fontWeight: '600',
  },
});
