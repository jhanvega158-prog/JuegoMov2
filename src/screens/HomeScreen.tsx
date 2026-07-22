import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { CATEGORIES } from '../data/questions_es';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.header}>
        <Text style={styles.emoji}>🧠</Text>
        <Text style={styles.title}>TriviaRápida</Text>
        <Text style={styles.subtitle}>Pon a prueba tu conocimiento</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => navigation.navigate('Game', { category: 'all' })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTextPrimary}>▶  Jugar ahora</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate('CategorySelect')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTextSecondary}>📂  Por categoría</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => navigation.navigate('HighScores')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTextOutline}>🏆  Mejores puntajes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{CATEGORIES.length} categorías · 72 preguntas</Text>
        <Text style={styles.footerCopy}>© 2025 Ansaross · Todos los derechos reservados</Text>
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
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#e94560',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#a8a8b3',
    marginTop: 8,
  },
  buttons: {
    gap: 14,
    paddingBottom: 20,
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
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#a8a8b3',
  },
  buttonTextPrimary: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonTextSecondary: {
    color: '#e2e2e2',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextOutline: {
    color: '#a8a8b3',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingBottom: 24,
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    color: '#555577',
    fontSize: 13,
  },
  footerCopy: {
    color: '#3a3a5c',
    fontSize: 11,
  },
});
