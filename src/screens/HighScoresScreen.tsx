import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { getScores, clearScores, HighScore } from '../utils/storage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HighScores'>;
};

const MEDAL = ['🥇', '🥈', '🥉'];

export default function HighScoresScreen({ navigation }: Props) {
  const [scores, setScores] = useState<HighScore[]>([]);

  useFocusEffect(
    useCallback(() => {
      getScores().then(setScores).catch(() => {});
    }, [])
  );

  function handleClear() {
    Alert.alert(
      'Borrar puntajes',
      '¿Estás seguro que quieres borrar todos los puntajes?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: () => {
            clearScores().then(() => setScores([])).catch(() => {});
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.headerRow}>
        <Text style={styles.title}>🏆 Mejores puntajes</Text>
        {scores.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearBtn}>Borrar</Text>
          </TouchableOpacity>
        )}
      </View>

      {scores.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🎮</Text>
          <Text style={styles.emptyText}>Aún no hay puntajes</Text>
          <Text style={styles.emptySubtext}>¡Juega tu primera partida!</Text>
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.playBtnText}>Jugar ahora</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={scores}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <View style={[styles.row, index === 0 && styles.rowFirst]}>
              <Text style={styles.medal}>
                {index < 3 ? MEDAL[index] : `${index + 1}.`}
              </Text>
              <View style={styles.rowInfo}>
                <Text style={styles.rowScore}>{item.score} pts</Text>
                <Text style={styles.rowDetail}>
                  {item.correctAnswers}/{item.totalQuestions} correctas · {item.category === 'all' ? 'General' : item.category}
                </Text>
              </View>
              <Text style={styles.rowDate}>{item.date}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  clearBtn: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 24,
  },
  row: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  rowFirst: {
    borderColor: '#e94560',
    backgroundColor: '#1e1030',
  },
  medal: {
    fontSize: 24,
    width: 36,
  },
  rowInfo: {
    flex: 1,
  },
  rowScore: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  rowDetail: {
    color: '#a8a8b3',
    fontSize: 12,
    marginTop: 2,
  },
  rowDate: {
    color: '#555577',
    fontSize: 12,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyEmoji: {
    fontSize: 64,
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  emptySubtext: {
    color: '#a8a8b3',
    fontSize: 15,
  },
  playBtn: {
    backgroundColor: '#e94560',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  playBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
