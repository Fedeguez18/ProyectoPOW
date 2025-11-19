// credenciales.js (para Next.js Web)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase Web
const firebaseConfig = {
  apiKey: "AIzaSyCesa9ooxKpAIfSdFmk0SjaiN8L5v8VZ0U",
  authDomain: "appmuseo-9e4c7.firebaseapp.com",
  projectId: "appmuseo-9e4c7",
  storageBucket: "appmuseo-9e4c7.firebasestorage.app",
  messagingSenderId: "551952786487",
  appId: "1:551952786487:web:e4609e29cc1a83452c0bb2"
};

// Inicializar Firebase
const appFirebase = initializeApp(firebaseConfig);

// Auth para web
export const auth = getAuth(appFirebase);

export default appFirebase;

/*import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCesa9ooxKpAIfSdFmk0SjaiN8L5v8VZ0U",
  authDomain: "appmuseo-9e4c7.firebaseapp.com",
  projectId: "appmuseo-9e4c7",
  storageBucket: "appmuseo-9e4c7.firebasestorage.app",
  messagingSenderId: "551952786487",
  appId: "1:551952786487:web:e4609e29cc1a83452c0bb2"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);
export const auth = initializeAuth(appFireBase, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export default appFireBase;*/