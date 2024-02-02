import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDsMR3nG41l87HZd3OPGDsEAQCUIAhD0gk",
  authDomain: "linearapp-befd3.firebaseapp.com",
  projectId: "linearapp-befd3",
  storageBucket: "linearapp-befd3.appspot.com",
  messagingSenderId: "53943566263",
  appId: "1:53943566263:web:80fdff1cb6ab2e8d783232",
  measurementId: "G-49BR9914ZH"

};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}