import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// You can get this from the Firebase Console > Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyAVQi10s3NiAQw1fTL3sVz4Y_4RJZcojb4",
  authDomain: "portfolio-b6aa2.firebaseapp.com",
  projectId: "portfolio-b6aa2",
  storageBucket: "portfolio-b6aa2.firebasestorage.app",
  messagingSenderId: "1066432456342",
  appId: "1:1066432456342:web:da4f06609bd3dbe2d084b7",
  measurementId: "G-9TL7FWNE7E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);