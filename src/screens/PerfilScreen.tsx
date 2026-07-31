import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, update } from "firebase/database";
import { Style } from "../../style/estiloGlobal";

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
        console.log("No hay usuario logueado");
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
    <View>
      <Text>Correo: {usuario.correo}</Text>
      <TextInput
        placeholder="Ingrese la edad"
        value={edad.toString()}
        onChangeText={(text) => setedad(+text)}
        style={Style.input}
      />
      <TextInput
        placeholder="Ingrese su nick"
        value={nick}
        onChangeText={setnick}
        style={Style.input}
      />
      <Button title="Guardar" onPress={editarUsuario} />
    </View>
  );
}

const styles = StyleSheet.create({});
