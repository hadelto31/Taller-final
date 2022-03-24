import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD6t45vuVoReDFikWiTN9F2R2zmVwLHejM",
  authDomain: "taller-final-a3728.firebaseapp.com",
  databaseURL: "https://taller-final-a3728.firebaseio.com",
  projectId: "taller-final-a3728",
  storageBucket: "taller-final-a3728.appspot.com",
  messagingSenderId: "594664153687",
  appId: "1:594664153687:web:44c1d225cc665ebe2ff912"
};

firebase.initializeApp(firebaseConfig);

export {firebase}