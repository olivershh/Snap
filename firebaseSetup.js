import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnJk55GXacEMFtWXIVxCTdhUZOKpdn23w",
  authDomain: "snapcamera-67a16.firebaseapp.com",
  projectId: "snapcamera-67a16",
  storageBucket: "snapcamera-67a16.appspot.com",
  messagingSenderId: "658953323817",
  appId: "1:658953323817:web:1e7e81c7cdbc3d3bd0e338",
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
const app = initializeApp(firebaseConfig);
// } else {
// app = app();
// }

const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, storage, db };
