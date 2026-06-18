
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aiinterview-7311d.firebaseapp.com",
  projectId: "aiinterview-7311d",
  storageBucket: "aiinterview-7311d.firebasestorage.app",
  messagingSenderId: "894728149190",
  appId: "1:894728149190:web:09ae9af6fbf0f0bd331fc7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()


export {auth , provider}