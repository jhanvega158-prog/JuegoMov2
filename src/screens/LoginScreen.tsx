import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Style } from '../../style/estiloGlobal';

export default function LoginScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    function login() {
        /*signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                navigation.navigate('Tab');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                // ..
                if (errorCode == 'auth/missing-password') {
                    Alert.alert('Error', 'Por favor, ingrese su contraseña');
                } else {
                    Alert.alert('Error', errorMessage);
                }
            });*/
    }

    function reestablecerContrasenia() {
        /*sendPasswordResetEmail(auth, correo)
            .then(() => {
                Alert.alert('Correo enviado', 'Se ha enviado un correo para reestablecer la contraseña')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });*/
    }

    return (
        <View>
            
            <TextInput
                placeholder="Correo"
                onChangeText={setCorreo}
                style={Style.input}
            />
            <TextInput
                placeholder="Contraseña"
                onChangeText={setContrasenia}
                style={Style.input}
            />

            <Button title="Login"
                onPress={login}
            />
            <Button
                title="olvidé mi contraseña"
                onPress={reestablecerContrasenia}
            />

            <Text
                style={{ color: 'blue', fontSize: 16 }}
                onPress={() => navigation.navigate('Registro')}
            >Registrarse aquí</Text>


            
        </View>
    )
}

const styles = StyleSheet.create({

})