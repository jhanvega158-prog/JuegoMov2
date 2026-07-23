import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { StackNavigationProp } from '@react-navigation/stack';
import { auth, db } from '../../firebase/config';
import { Style } from '../../style/estiloGlobal';
import { MainStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<MainStackParamList, 'Registro'>;
};

export default function RegistroScreen({ navigation }: Props) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [edad, setEdad] = useState(0);
  const [nick, setNick] = useState('');

  async function registro() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasenia);
      await guardarUsuario(userCredential.user.uid);
      navigation.navigate('Login');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    }
  }

  async function guardarUsuario(uid: string) {
    await set(ref(db, 'usuarios/' + uid), {
      correo: correo,
      edad: edad,
      nick: nick,
    });
  }

  return (
    <View>
      <Text>RegistroScreen</Text>
      <TextInput
        placeholder="Ingresar Correo"
        onChangeText={setCorreo}
        style={Style.input}
      />
      <TextInput
        placeholder="Ingresar Contraseña"
        onChangeText={setContrasenia}
        style={Style.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Ingresar Edad"
        onChangeText={(text) => setEdad(+text)}
        style={Style.input}
      />
      <TextInput
        placeholder="Nick"
        onChangeText={setNick}
        style={Style.input}
      />
      <Button title="Registro" onPress={registro} />
    </View>
  );
}

const styles = StyleSheet.create({});
