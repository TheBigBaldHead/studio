
import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  "projectId": "sefoura",
  "appId": "1:556004949041:web:c0b11b4c68a9513c67a910",
  "storageBucket": "sefoura.firebasestorage.app",
  "apiKey": "AIzaSyCZ7rqVGKWHMbCW_Rqy0NwJgcHxvgmtKQw",
  "authDomain": "sefoura.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "556004949041"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
