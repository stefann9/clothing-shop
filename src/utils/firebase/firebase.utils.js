import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";

// https://firebase.google.com/docs/auth/web/google-signin?authuser=0 --> Authenticate Using Google
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const auth = getAuth();