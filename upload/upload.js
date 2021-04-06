const firebase = require("firebase");

require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyDwOUkdxC7kNNILoFTSx05PTUxRci_kcaw",
  authDomain: "fireship-tutorial-646fc.firebaseapp.com",
  projectId: "fireship-tutorial-646fc",
});

var db = firebase.firestore();

var questions;

questions.forEach(function (obj) {
  db.collection("questions")
    .add({
      categoryDropped: obj.categoryDropped,
      block: obj.block,
      question: obj.question,
      question1: obj.question1,
      answer1: obj.answer1,
      word: obj.word,
      question2: obj.question2,
      answer2: obj.answer2,
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});
// Avoid running this page more than once as it will store duplicate data
