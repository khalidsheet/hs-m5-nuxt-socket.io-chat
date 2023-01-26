import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBw44mtwCeZ0TTeF6twlP8aJDbK6nEJQUY",
    authDomain: "nuxtjs-firestore.firebaseapp.com",
    projectId: "nuxtjs-firestore",
    storageBucket: "nuxtjs-firestore.appspot.com",
    messagingSenderId: "204890641458",
    appId: "1:204890641458:web:27e510ec6be581e27f182b",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  nuxtApp.vueApp.provide("firebaseAuthProvider", auth);
  nuxtApp.provide("firebaseAuthProvider", auth);
});
