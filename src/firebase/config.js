// Sirve para poder inicializar la aplicacion
import { initializeApp } from "firebase/app";
// Conseguir una instancia de autenticacion del servicio de autenticacion de firebase
import { getAuth  } from "firebase/auth";

import { getFirestore } from "firebase/firestore/lite";


// Configuracion de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCG9Ks2uo0t1UrrwWIHPtiMl4g2i72oMT8",
  authDomain: "react-marvel-app-be2cb.firebaseapp.com",
  projectId: "react-marvel-app-be2cb",
  storageBucket: "react-marvel-app-be2cb.appspot.com",
  messagingSenderId: "414610222092",
  appId: "1:414610222092:web:572e3fdbe6aeeaa8331229"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
// Creamos una instancia de Autenticacion
export const FirebaseAuth = getAuth( FirebaseApp );
// Creamos una instancia de almacenamiento
export const FirebaseDB = getFirestore( FirebaseApp );
