import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navegador } from './Navigation/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <Navegador/>
    </NavigationContainer>
  );
}
