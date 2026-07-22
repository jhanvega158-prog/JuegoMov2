import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReviewAnswers'>;
  route: RouteProp<RootStackParamList, 'ReviewAnswers'>;
};

const LETTERS = ['A', 'B', 'C', 'D'];

export default function ReviewAnswersScreen({ route }: Props) {
  const { wrongAnswers } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          {wrongAnswers.length} pregunta{wrongAnswers.length !== 1 ? 's' : ''} fallida{wrongAnswers.length !== 1 ? 's' : ''}
        </Text>

        {wrongAnswers.map((item, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardCategory}>{item.category}</Text>
              <Text style={styles.cardNumber}>#{i + 1}</Text>
            </View>

            <Text style={styles.question}>{item.question}</Text>

            <View style={styles.options}>
              {item.options.map((option, idx) => {
                const isCorrect = idx === item.correctIndex;
                const isSelected = idx === item.selectedIndex;

                let optStyle = styles.option;
                let letterStyle = styles.optionLetter;
                let textStyle = styles.optionText;

                if (isCorrect) {
                  optStyle = { ...styles.option, ...styles.optionCorrect };
                  letterStyle = { ...styles.optionLetter, ...styles.optionLetterCorrect };
                  textStyle = { ...styles.optionText, ...styles.optionTextCorrect };
                } else if (isSelected) {
                  optStyle = { ...styles.option, ...styles.optionWrong };
                  letterStyle = { ...styles.optionLetter, ...styles.optionLetterWrong };
                  textStyle = { ...styles.optionText, ...styles.optionTextWrong };
                }

                return (
                  <View key={idx} style={optStyle}>
                    <Text style={letterStyle}>{LETTERS[idx]}</Text>
                    <Text style={textStyle}>{option}</Text>
                    {isCorrect && <Text style={styles.badge}>✓ Correcta</Text>}
                    {isSelected && !isCorrect && (
                      <Text style={styles.badgeWrong}>
                        {item.selectedIndex === null ? '⏱ Tiempo' : '✗ Tu resp.'}
                      </Text>
                    )}
                  </View>
                );
              })}
              {item.selectedIndex === null && (
                <View style={styles.timeoutBadge}>
                  <Text style={styles.timeoutText}>⏱ Se acabó el tiempo</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 20,
  },
  subtitle: {
    color: '#a8a8b3',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#0f3460',
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCategory: {
    color: '#e94560',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardNumber: {
    color: '#a8a8b3',
    fontSize: 12,
    fontWeight: '600',
  },
  question: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  options: {
    gap: 8,
  },
  option: {
    backgroundColor: '#0f3460',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    opacity: 0.5,
  },
  optionCorrect: {
    backgroundColor: '#1b4332',
    borderColor: '#4caf50',
    opacity: 1,
  },
  optionWrong: {
    backgroundColor: '#3b1a1a',
    borderColor: '#e94560',
    opacity: 1,
  },
  optionLetter: {
    color: '#a8a8b3',
    fontWeight: '800',
    fontSize: 14,
    width: 24,
  },
  optionLetterCorrect: {
    color: '#4caf50',
  },
  optionLetterWrong: {
    color: '#e94560',
  },
  optionText: {
    color: '#a8a8b3',
    fontSize: 14,
    flex: 1,
  },
  optionTextCorrect: {
    color: '#4caf50',
    fontWeight: '700',
  },
  optionTextWrong: {
    color: '#e94560',
    fontWeight: '600',
  },
  badge: {
    color: '#4caf50',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
  },
  badgeWrong: {
    color: '#e94560',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
  },
  timeoutBadge: {
    backgroundColor: '#2a1a0e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ff9800',
    alignSelf: 'flex-start',
  },
  timeoutText: {
    color: '#ff9800',
    fontSize: 12,
    fontWeight: '700',
  },
});
