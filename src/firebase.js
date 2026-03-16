import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6kWhbNpGFooLb3wKddCht9bkk7oTW8C8",
  authDomain: "veya-psychic-app.firebaseapp.com",
  projectId: "veya-psychic-app",
  storageBucket: "veya-psychic-app.firebasestorage.app",
  messagingSenderId: "570690279218",
  appId: "1:570690279218:web:da9b9794e59ee51b1ae92b",
  measurementId: "G-24LFG1ZPGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the tools we need
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');