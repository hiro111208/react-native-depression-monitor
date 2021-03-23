// import React, { useState, useEffect } from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   KeyboardAvoidingView,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import Constants from "expo-constants";
// import firebase from "../../firebase";

// /**
//  * Screen where the therapy session takes place. Users will
//  * answer question stored in Firebase or pause the session.
//  */
// const UserList = () => {
//   const [isWordAnswer, toggleWordAnswer] = useState(true);
//   const [loaded, setLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//   const [question, setQuestion] = useState(0);
//   const [isCorrect, toggleCorrect] = useState(false);
//   const [isIncorrect, toggleIncorrect] = useState(false);

//   const ref = firebase.firestore().collection("questions");
//   const query = ref
//     .where("categoryDropped", "==", "CONTROL")
//     .where("block", "==", 1)
//     .orderBy("question");

//   // Queries from firebase database and stores in list
//   function getItems() {
//     query.onSnapshot((querySnapshot) => {
//       const items = [];
//       querySnapshot.forEach((doc) => {
//         items.push(doc.data());
//       });
//       setItems(items);
//       setLoaded(true);
//     });
//   }

//   // Gets therapy content while screen is rendering
//   useEffect(() => {
//     getItems();
//   }, []);

// }
