import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

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

const auth = getAuth(app);
const storage = getStorage(app);

export {auth, storage};
