// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJUh5LaCvm2THrjOaVOTXoyM0oi0G_qKo",
  authDomain: "fb-clone-4be36.firebaseapp.com",
  projectId: "fb-clone-4be36",
  storageBucket: "fb-clone-4be36.appspot.com",
  messagingSenderId: "656753289363",
  appId: "1:656753289363:web:8b9f11b364b03db770c566"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
