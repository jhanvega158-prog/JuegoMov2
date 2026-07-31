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
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { auth } from '../../firebase/config';
import { Colors, Style } from '../../style/estiloGlobal';
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
                <Text style={Style.brandMarkText}>?</Text>
              </View>
              <Text style={Style.eyebrow}>TriviaRápida</Text>
              <Text style={Style.title}>Bienvenido</Text>
              <Text style={Style.subtitle}>
                Inicia sesión para jugar, superar tus marcas y seguir avanzando.
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
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor={Colors.textMuted}
                    onChangeText={setContrasenia}
                    style={Style.input}
                    secureTextEntry
                  />
                </View>

                <Pressable
                  style={({ pressed }) => [
                    Style.button,
                    Style.buttonPrimary,
                    pressed && Style.buttonPrimaryPressed,
                  ]}
                  onPress={login}
                >
                  <Text style={Style.buttonTextPrimary}>Iniciar sesión</Text>
                </Pressable>
              </View>

              <Pressable style={Style.linkButton} onPress={reestablecerContrasenia}>
                <Text style={Style.linkText}>Olvidé mi contraseña</Text>
              </Pressable>

              <View style={Style.divider}>
                <View style={Style.dividerLine} />
                <Text style={Style.dividerText}>Nuevo jugador</Text>
                <View style={Style.dividerLine} />
              </View>

              <Pressable
                style={({ pressed }) => [
                  Style.button,
                  Style.buttonSecondary,
                  pressed && Style.buttonSecondaryPressed,
                ]}
                onPress={() => navigation.navigate('Registro')}
              >
                <Text style={Style.buttonTextSecondary}>Crear una cuenta</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
