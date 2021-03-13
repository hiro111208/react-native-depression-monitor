//import firebase from "firebase/app";
import "firebase/firestore";
import firebase from 'firebase'
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyDwOUkdxC7kNNILoFTSx05PTUxRci_kcaw",
  authDomain: "fireship-tutorial-646fc.firebaseapp.com",
  projectId: "fireship-tutorial-646fc",
  storageBucket: "fireship-tutorial-646fc.appspot.com",
  messagingSenderId: "289064122528",
  appId: "1:289064122528:web:ee39abfa2183c8499071c5",
  measurementId: "G-D35RDH9V0E",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
