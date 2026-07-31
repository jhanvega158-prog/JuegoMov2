import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { StackNavigationProp } from '@react-navigation/stack';
import { auth, db } from '../../firebase/config';
import { Colors, Style } from '../../style/estiloGlobal';
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
    <SafeAreaView style={Style.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView
        style={Style.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={Style.authScrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={Style.content}>
            <View style={Style.brandBlock}>
              <View style={Style.brandMark}>
                <Text style={Style.brandMarkText}>+</Text>
              </View>
              <Text style={Style.eyebrow}>TriviaRápida</Text>
              <Text style={Style.title}>Crea tu cuenta</Text>
              <Text style={Style.subtitle}>
                Registra tus datos y empieza a competir por el mejor puntaje.
              </Text>
            </View>

            <View style={Style.card}>
              <View style={Style.form}>
                <View style={Style.fieldGroup}>
                  <Text style={Style.label}>Correo electrónico</Text>
                  <TextInput
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor={Colors.textMuted}
                    onChangeText={setCorreo}
                    style={Style.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={Style.fieldGroup}>
                  <Text style={Style.label}>Contraseña</Text>
                  <TextInput
                    placeholder="Crea una contraseña"
                    placeholderTextColor={Colors.textMuted}
                    onChangeText={setContrasenia}
                    style={Style.input}
                    secureTextEntry
                  />
                </View>

                <View style={Style.fieldGroup}>
                  <Text style={Style.label}>Edad</Text>
                  <TextInput
                    placeholder="Ingresa tu edad"
                    placeholderTextColor={Colors.textMuted}
                    onChangeText={(text) => setEdad(+text)}
                    style={Style.input}
                    keyboardType="number-pad"
                  />
                </View>

                <View style={Style.fieldGroup}>
                  <Text style={Style.label}>Nick de jugador</Text>
                  <TextInput
                    placeholder="¿Cómo quieres que te llamemos?"
                    placeholderTextColor={Colors.textMuted}
                    onChangeText={setNick}
                    style={Style.input}
                    autoCapitalize="none"
                  />
                </View>

                <Pressable
                  style={({ pressed }) => [
                    Style.button,
                    Style.buttonPrimary,
                    pressed && Style.buttonPrimaryPressed,
                  ]}
                  onPress={registro}
                >
                  <Text style={Style.buttonTextPrimary}>Registrarme</Text>
                </Pressable>
              </View>

              <View style={Style.footer}>
                <Text style={Style.footerText}>
                  Al crear tu cuenta podrás guardar tus avances y puntajes.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
