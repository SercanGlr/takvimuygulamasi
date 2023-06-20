


// Import the functions you need from the SDKs you need

import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaywbmfwPk3NUoRrwZt-QeCoeqgbQSGA4",
  authDomain: "takvim2-d0ef7.firebaseapp.com",
  projectId: "takvim2-d0ef7",
  storageBucket: "takvim2-d0ef7.appspot.com",
  messagingSenderId: "1077297906951",
  appId: "1:1077297906951:web:a7530049c3cff15853f1a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const auth=getAuth(app);

const db=getFirestore();

export {auth,db}