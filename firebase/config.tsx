// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDEhBE3yEZprlCrxJmBchPepfLvJQZw4g",
    authDomain: "app-06-833f1.firebaseapp.com",
    databaseURL: "https://app-06-833f1-default-rtdb.firebaseio.com",
    projectId: "app-06-833f1",
    storageBucket: "app-06-833f1.firebasestorage.app",
    messagingSenderId: "515721438718",
    appId: "1:515721438718:web:03017b9bffa9f385d18caf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);