import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQJXTBB_VL4kirqWUHHcAhjitEAigl4LU",
  authDomain: "fir-37727.firebaseapp.com",
  projectId: "fir-37727",
  storageBucket: "fir-37727.appspot.com",
  messagingSenderId: "914963345274",
  appId: "1:914963345274:web:c403b4a3fa938bebb670c3",
  measurementId: "G-9M3K5QWC1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  

const auth=getAuth();

export {app , auth};