import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';

import HomeScreen from './src/screens/HomeScreen';
import CategorySelectScreen from './src/screens/CategorySelectScreen';
import GameScreen from './src/screens/GameScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import HighScoresScreen from './src/screens/HighScoresScreen';
import ReviewAnswersScreen from './src/screens/ReviewAnswersScreen';
import { Navegador } from './Navigation/MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Navegador />
    </NavigationContainer>
  );
}
