import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { CATEGORIES } from '../data/questions_es';
import { QUESTIONS_ES } from '../data/questions_es';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CategorySelect'>;
};

const CATEGORY_ICONS: Record<string, string> = {
  Ciencia: '🔬',
  Historia: '📜',
  Geografía: '🌍',
  Deportes: '⚽',
  Entretenimiento: '🎬',
  Tecnología: '💻',
};

export default function CategorySelectScreen({ navigation }: Props) {
  const allCategories = ['all', ...CATEGORIES];

  function getCount(cat: string) {
    if (cat === 'all') return QUESTIONS_ES.length;
    return QUESTIONS_ES.filter((q) => q.category === cat).length;
  }

  function getLabel(cat: string) {
    if (cat === 'all') return 'Todas las categorías';
    return cat;
  }

  function getIcon(cat: string) {
    if (cat === 'all') return '🎲';
    return CATEGORY_ICONS[cat] ?? '❓';
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <Text style={styles.title}>Elige una categoría</Text>

      <FlatList
        data={allCategories}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Game', { category: item })}
            activeOpacity={0.8}
          >
            <Text style={styles.cardIcon}>{getIcon(item)}</Text>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{getLabel(item)}</Text>
              <Text style={styles.cardCount}>{getCount(item)} preguntas</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  cardIcon: {
    fontSize: 30,
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardCount: {
    color: '#a8a8b3',
    fontSize: 13,
    marginTop: 2,
  },
  arrow: {
    color: '#e94560',
    fontSize: 26,
    fontWeight: '700',
  },
});
