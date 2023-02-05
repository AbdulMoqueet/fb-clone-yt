// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVItin8lFq7XN7II55Fp4_GD2T_ec9gXA",
  authDomain: "fb-clone-yt-57e64.firebaseapp.com",
  projectId: "fb-clone-yt-57e64",
  storageBucket: "fb-clone-yt-57e64.appspot.com",
  messagingSenderId: "756109957764",
  appId: "1:756109957764:web:51bf61e9a3a1cd369700d1",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
