// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhW2EJjks2jjM8R6V3rIzuxqBx7Wxan7Y",
  authDomain: "recetasapp-63c14.firebaseapp.com",
  projectId: "recetasapp-63c14",
  storageBucket: "recetasapp-63c14.firebasestorage.app",
  messagingSenderId: "159389136623",
  appId: "1:159389136623:web:5ad8c15bd119a8895a0d1a",
  measurementId: "G-75DSQZDSG0"
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Exporta los servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
