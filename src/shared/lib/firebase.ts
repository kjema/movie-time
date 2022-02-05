// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRzq6NHzIg-F01IkwbRi0Uetcu-mQGNl8",
  authDomain: "movies-crud-6dde4.firebaseapp.com",
  projectId: "movies-crud-6dde4",
  storageBucket: "movies-crud-6dde4.appspot.com",
  messagingSenderId: "4312911419",
  appId: "1:4312911419:web:f9bd175aabffa25840961e",
};

// Initialize Firebase
// export const firebaseApp = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
