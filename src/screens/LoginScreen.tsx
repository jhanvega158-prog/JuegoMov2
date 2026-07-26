import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { auth } from '../../firebase/config';
import { Style } from '../../style/estiloGlobal';
import { MainStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<MainStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, correo, contrasenia);
      navigation.navigate('Tab');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    }
  }

  async function reestablecerContrasenia() {
    try {
      await sendPasswordResetEmail(auth, correo);
      Alert.alert('Correo enviado', 'Se ha enviado un correo para reestablecer la contraseña');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    }
  }

  return (
    <View style={Style.container}>
      <TextInput
        placeholder="Correo"
        onChangeText={setCorreo}
        style={Style.input}
      />
      <TextInput
        placeholder="Contraseña"
        onChangeText={setContrasenia}
        style={Style.input}
        secureTextEntry
      />

      <Button
        color="#930909"
        title="Login"
        onPress={login} />
      <Button
        color="#930909"
        title="olvidé mi contraseña"
        onPress={reestablecerContrasenia}
      />

      <Text
        style={Style.input2}
        onPress={() => navigation.navigate('Registro')}
      >
        No tiene cuenta, regístrese aquí
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
