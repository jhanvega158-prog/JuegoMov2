import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, update } from "firebase/database";
import { Colors, Style } from "../../style/estiloGlobal";

export default function PerfilScreen() {
  const [usuario, setUsuario] = useState<any>({});
  const [edad, setedad] = useState(0);
  const [nick, setnick] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        leerUsuario(uid);
      } else {
        Alert.alert("Error", "No hay usuario logueado");
      }
    });
  }, []);

  function leerUsuario(uid: string) {
    const starCountRef = ref(db, "usuarios/" + uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setUsuario(data);
      setedad(data.edad);
      setnick(data.nick);
    });
  }

  function editarUsuario() {
    const user = auth.currentUser;
    if (user) {
      update(ref(db, "usuarios/" + user.uid), {
        edad: edad,
        nick: nick,
      })
        .then(() => {
          Alert.alert("Mensaje", "Actualizado");
        })
        .catch(() => {
          Alert.alert("Error", "No se actualizó los datos");
        });
    }
  }

  return (
    <SafeAreaView style={Style.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        contentContainerStyle={Style.profileScrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={Style.content}>
          <View style={Style.profileHeader}>
            <View style={Style.profileBadge}>
              <Text style={Style.profileBadgeText}>
                {nick ? nick.charAt(0).toUpperCase() : "J"}
              </Text>
            </View>
            <Text style={Style.eyebrow}>Mi cuenta</Text>
            <Text style={Style.title}>Perfil de jugador</Text>
            <Text style={Style.subtitle}>
              Mantén actualizados los datos que identifican tu progreso.
            </Text>
          </View>

          <View style={Style.card}>
            <Text style={Style.sectionTitle}>Datos de la cuenta</Text>
            <View style={Style.readOnlyField}>
              <Text style={Style.readOnlyLabel}>Correo electrónico</Text>
              <Text style={Style.readOnlyValue} numberOfLines={1}>
                {usuario.correo || "Sin correo registrado"}
              </Text>
            </View>

            <View style={Style.divider}>
              <View style={Style.dividerLine} />
              <Text style={Style.dividerText}>Datos del jugador</Text>
              <View style={Style.dividerLine} />
            </View>

            <View style={Style.form}>
              <View style={Style.fieldGroup}>
                <Text style={Style.label}>Edad</Text>
                <TextInput
                  placeholder="Ingrese la edad"
                  placeholderTextColor={Colors.textMuted}
                  value={edad.toString()}
                  onChangeText={(text) => setedad(+text)}
                  style={Style.input}
                  keyboardType="number-pad"
                />
              </View>

              <View style={Style.fieldGroup}>
                <Text style={Style.label}>Nick de jugador</Text>
                <TextInput
                  placeholder="Ingrese su nick"
                  placeholderTextColor={Colors.textMuted}
                  value={nick}
                  onChangeText={setnick}
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
                onPress={editarUsuario}
              >
                <Text style={Style.buttonTextPrimary}>Guardar cambios</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
