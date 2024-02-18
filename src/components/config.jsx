// Import the functions you need from the SDKs you need
import { getDatabase} from "firebase/database";

import { initializeApp } from "firebase/app";

import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9GUVG9AbgYvNT9dNTXRBPB8_K4h1GXL8",
  authDomain: "ipoursmartkettle.firebaseapp.com",
  projectId: "ipoursmartkettle",
  storageBucket: "ipoursmartkettle.appspot.com",
  messagingSenderId: "362748832854",
  appId: "1:362748832854:web:2787a38812fa6fea215ff7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getDatabase(app);
export { auth};