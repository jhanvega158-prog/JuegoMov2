import React, { useState, useCallback } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,FlatList,StatusBar,Alert,ActivityIndicator,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getScores, HighScore } from '../utils/storage';

export default function HighScoresScreen() {
  const [scores, setScores] = useState<HighScore[]>([]);
  const [cargando, setCargando] = useState(true);

  const leerPuntajes = useCallback(async () => {
    try {
      setCargando(true);
      const lista = await getScores();
      const mejoresCinco = lista
        .sort((a, b) => b.puntaje - a.puntaje)
        .slice(0, 5);
      setScores(mejoresCinco);
      setCargando(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
      setCargando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      leerPuntajes();
    }, [leerPuntajes])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.headerRow}>
        <Text style={styles.title}>Mejores puntajes</Text>
        <TouchableOpacity onPress={leerPuntajes} activeOpacity={0.8}>
          <Text style={styles.verLista}>Ver lista</Text>
        </TouchableOpacity>
      </View>

      {cargando ? (
        <View style={styles.empty}>
          <ActivityIndicator color="#e94560" />
        </View>
      ) : (
        <FlatList
          data={scores}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <Text style={styles.listTitle}>Lista de puntajes</Text>
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay puntajes guardados</Text>
          }
          renderItem={({ item, index }) => (
            <View style={[styles.row, index === 0 && styles.rowFirst]}>
              <Text style={styles.position}>{index + 1}</Text>
              <View style={styles.rowInfo}>
                <Text style={styles.rowNick}>Nick: {item.nick || 'Sin nick'}</Text>
                <Text style={styles.rowScore}>Puntaje: {item.puntaje}</Text>
              </View>
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
  verLista: {
    color: '#e94560',
    fontSize: 15,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 24,
  },
  listTitle: {
    color: '#a8a8b3',
    fontSize: 15,
    marginBottom: 4,
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
  position: {
    color: '#e94560',
    fontSize: 18,
    fontWeight: '800',
    width: 34,
  },
  rowInfo: {
    flex: 1,
  },
  rowNick: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  rowScore: {
    color: '#a8a8b3',
    fontSize: 15,
    marginTop: 4,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    color: '#a8a8b3',
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 40,
  },
});
