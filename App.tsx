import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navegador } from './Navigation/MainNavigator';
import { useGlobalFonts } from './style/estiloGlobal';

export default function App() {
  const [loaded, error] = useGlobalFonts();

  if (error) {
    throw error;
  }

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Navegador/>
    </NavigationContainer>
  );
}
