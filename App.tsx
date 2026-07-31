import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navegador } from './Navigation/MainNavigator';
import { useGlobalFonts } from './style/estiloGlobal';
import { GameProvider } from './src/context/GameContext';

export default function App() {
  const [loaded, error] = useGlobalFonts();

  if (error) {
    throw error;
  }

  if (!loaded) {
    return null;
  }

  return (
    <GameProvider>
      <NavigationContainer>
        <Navegador/>
      </NavigationContainer>
    </GameProvider>
  );
}
