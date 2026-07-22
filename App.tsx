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

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#16213e' },
          headerTintColor: '#e94560',
          headerTitleStyle: { fontWeight: '700', color: '#fff' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategorySelect"
          component={CategorySelectScreen}
          options={{ title: 'Categorías' }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ title: 'Trivia', headerBackVisible: false }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: 'Resultado', headerBackVisible: false }}
        />
        <Stack.Screen
          name="HighScores"
          component={HighScoresScreen}
          options={{ title: 'Puntajes' }}
        />
        <Stack.Screen
          name="ReviewAnswers"
          component={ReviewAnswersScreen}
          options={{ title: 'Respuestas correctas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
