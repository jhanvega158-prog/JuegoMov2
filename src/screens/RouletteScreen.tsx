import React, { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Difficulty, useGame } from '../context/GameContext';
import { RootStackParamList } from '../types/navigation';
import { Fonts } from '../../style/estiloGlobal';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Roulette'>;
  route: RouteProp<RootStackParamList, 'Roulette'>;
};

const SECTORS: Difficulty[] = ['easy', 'medium', 'hard', 'easy', 'medium', 'hard'];
const LABELS: Record<Difficulty, string> = { easy: 'Fácil', medium: 'Media', hard: 'Difícil' };
const COLORS = ['#1d9a6c', '#f0a23b', '#d94b64', '#36b585', '#ffc15c', '#e94560'];
const SIZE = 288;

export default function RouletteScreen({ navigation, route }: Props) {
  const { difficultySelected, setDifficultySelected, totalPrize } = useGame();
  const rotation = useRef(new Animated.Value(0)).current;
  const rotationDegrees = useRef(0);
  const [isSpinning, setIsSpinning] = useState(false);

  function spin() {
    if (isSpinning) return;
    setIsSpinning(true);
    setDifficultySelected(null);
    const sectorIndex = Math.floor(Math.random() * SECTORS.length);
    const normalized = ((rotationDegrees.current % 360) + 360) % 360;
    const targetNormalized = (360 - sectorIndex * 60) % 360;
    const adjustment = (targetNormalized - normalized + 360) % 360;
    const finalRotation = rotationDegrees.current + 5 * 360 + adjustment;

    Animated.timing(rotation, {
      toValue: finalRotation,
      duration: 3600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) return;
      rotationDegrees.current = finalRotation;
      setDifficultySelected(SECTORS[sectorIndex]);
      setIsSpinning(false);
    });
  }

  function continueToQuestion() {
    if (!difficultySelected || isSpinning) return;
    navigation.navigate('Game', {
      category: route.params.category,
      difficulty: difficultySelected,
      roundId: Date.now(),
    });
  }

  const rotate = rotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ruleta de dificultad</Text>
      <Text style={styles.subtitle}>{route.params.category === 'all' ? 'Todas las categorías' : route.params.category}</Text>
      <Text style={styles.prize}>Premio acumulado: ${totalPrize}</Text>
      <View style={styles.wheelArea}>
        <View style={styles.pointer} />
        <Animated.View style={[styles.wheel, { transform: [{ rotate }] }]}>
          {SECTORS.map((difficulty, index) => (
            <View key={index} style={[styles.sector, {
              backgroundColor: COLORS[index],
              transform: [{ rotate: `${index * 60}deg` }, { translateY: -SIZE / 4 }],
            }]}>
              <Text style={[styles.sectorLabel, { transform: [{ rotate: `${-index * 60}deg` }] }]}>
                {LABELS[difficulty]}
              </Text>
            </View>
          ))}
          <View style={styles.hub}><Text style={styles.hubText}>?</Text></View>
        </Animated.View>
      </View>
      <Text style={styles.result}>
        {difficultySelected ? `Resultado: ${LABELS[difficultySelected]}` : isSpinning ? 'Girando…' : 'Gira para descubrir la dificultad'}
      </Text>
      <TouchableOpacity style={[styles.button, isSpinning && styles.disabled]} onPress={spin} disabled={isSpinning}>
        <Text style={styles.buttonText}>GIRAR RULETA</Text>
      </TouchableOpacity>
      {difficultySelected && !isSpinning && (
        <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={continueToQuestion}>
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', alignItems: 'center', paddingHorizontal: 24 },
  title: { fontFamily: Fonts.primary, color: '#fff', fontSize: 24, marginTop: 18 },
  subtitle: { fontFamily: Fonts.primary, color: '#e94560', fontSize: 15, marginTop: 8 },
  prize: { fontFamily: Fonts.primary, color: '#fff', backgroundColor: '#16213e', padding: 10, borderRadius: 10, marginTop: 12 },
  wheelArea: { width: SIZE + 24, height: SIZE + 30, alignItems: 'center', justifyContent: 'flex-end', marginTop: 8 },
  pointer: { zIndex: 4, position: 'absolute', top: 4, borderLeftWidth: 15, borderRightWidth: 15, borderTopWidth: 28, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#fff' },
  wheel: { width: SIZE, height: SIZE, borderRadius: SIZE / 2, overflow: 'hidden', backgroundColor: '#16213e', borderWidth: 5, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  sector: { position: 'absolute', width: SIZE / 2, height: SIZE / 2, left: SIZE / 4, top: SIZE / 4, alignItems: 'center', paddingTop: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,.25)' },
  sectorLabel: { fontFamily: Fonts.primary, color: '#fff', fontSize: 13 },
  hub: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#16213e', borderWidth: 4, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  hubText: { fontFamily: Fonts.primary, color: '#fff', fontSize: 24 },
  result: { fontFamily: Fonts.primary, color: '#fff', fontSize: 17, minHeight: 28, marginVertical: 12 },
  button: { width: '100%', maxWidth: 420, backgroundColor: '#e94560', paddingVertical: 15, borderRadius: 13, alignItems: 'center', marginBottom: 10 },
  continueButton: { backgroundColor: '#0f8f68' }, disabled: { opacity: .45 },
  buttonText: { fontFamily: Fonts.primary, color: '#fff', fontSize: 16 },
});
