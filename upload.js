const firebase = require("firebase");

require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyDwOUkdxC7kNNILoFTSx05PTUxRci_kcaw",
  authDomain: "fireship-tutorial-646fc.firebaseapp.com",
  projectId: "fireship-tutorial-646fc",
});

var db = firebase.firestore();

var questions = [
  {
    id: 1,
    categoryDropped: "CONTROL",
    block: 1,
    question: 1,
    question1:
      "You turn the kettle on and wait for the water to boil.  You get a teabag out of the tin, which you put into a mug, and pour the boiling water onto the teabag.  Next, you add the m- - k ",
    answer1: "milk",
    question2: "Have you made a cup of tea?",
    answer2: "yes",
  },
  {
    id: 2,
    categoryDropped: "CONTROL",
    block: 1,
    question: 2,
    question1:
      "You get into the next lift down to the platform.  You wait for four minutes until the next tube arrives.  You get onto the tube and sit down.  You get out your book and start re - di -g",
    answer1: "reading",
    question2: "Did you get a seat on the tube? ",
    answer2: "yes",
  },
  {
    id: 3,
    categoryDropped: "CONTROL",
    block: 1,
    question: 3,
    question1:
      "The first electronic digital computers were developed in the mid 20th century to efficiently carry out complex calculations. Originally, they were the size of a large room, consuming as much power as several hundred modern personal c-m-u-e-s",
    answer1: "computers",
    question2:
      "Were the first computers the size of modern personal computers?",
    answer2: "no",
  },
  {
    id: 4,
    categoryDropped: "CONTROL",
    block: 1,
    question: 4,
    question1:
      "Monarch butterflies are known for their lengthy migration. In North America they migrate downwards in August and northwards in the spring. The monarchs are the only butterflies known to migrate annually both north and south similarly to b-r-s",
    answer1: "birds",
    question2: "Do the Monarchs migrate on an annual basis? ",
    answer2: "yes",
  },
  {
    id: 5,
    categoryDropped: "CONTROL",
    block: 1,
    question: 5,
    question1:
      "You are reading a book about the history of DNA.  It describes how Watson and Crick deduced the double-helix structure with help from their collaborator Rosalind Franklin at Cambridge u-ivers- -y ",
    answer1: "university",
    question2: "Are you reading a book about DNA? ",
    answer2: "yes",
  },
  {
    id: 6,
    categoryDropped: "CONTROL",
    block: 1,
    question: 6,
    question1:
      "You are watching a clip on the internet about great engineering achievements.  It describes the construction of the Golden Gate Bridge.  The length of the bridge is over two and a half thousand met- - s ",
    answer1: "metres",
    question2: "Have you been watching a clip about a bridge? ",
    answer2: "yes",
  },
  {
    id: 7,
    categoryDropped: "CONTROL",
    block: 1,
    question: 7,
    question1:
      "You are watching a gardening program.  The presenter is explaining how to grow fruit and vegetables.  He explains that strawberries grow best in the su-m-r ",
    answer1: "summer",
    question2: "Does the program have a presenter? ",
    answer2: "yes",
  },
  {
    id: 8,
    categoryDropped: "CONTROL",
    block: 1,
    question: 8,
    question1:
      "You sort out your dirty laundry in two piles, whites and colours. You put the whites in the washing machine and select the quick and cool program. When finished, you wash the other cl-th-s ",
    answer1: "clothes",
    question2: "Have you been hoovering? ",
    answer2: "no",
  },
  {
    id: 9,
    categoryDropped: "CONTROL",
    block: 1,
    question: 9,
    question1:
      "A visual illusion is a distortion of the senses, revealing how the brain normally organises and interprets sensory stimulation. The information gathered by the eye, does not tally with a physical measurement of the stimulus s-u-ce",
    answer1: "source",
    question2:
      "Do visual illusions reveal how the brain normally organises information? ",
    answer2: "yes",
  },
  {
    id: 10,
    categoryDropped: "CONTROL",
    block: 1,
    question: 10,
    question1:
      "You queue up at the checkout with your shopping trolley.  As the person in front of you moves forward you start to put your shopping onto the conveyor belt.  Soon the sales assistant starts scanning your sh - ppi - g ",
    answer1: "shopping",
    question2: "Did you join the queue? ",
    answer2: "yes",
  },
  {
    id: 11,
    categoryDropped: "CONTROL",
    block: 1,
    question: 11,
    question1:
      "You ordered several DVDs and books from AMAZON but you missed them a few days ago. You notice that the deliveryman left a ï¿½something for youï¿½ memo card. You check your local delivery office to collect your  pa_c_ls ",
    answer1: "parcels",
    question2: "Did you order music CDs and books from AMAZON?",
    answer2: "no",
  },
  {
    id: 12,
    categoryDropped: "CONTROL",
    block: 1,
    question: 12,
    question1:
      "You preheat the oven to 200C to make chunky apple crumble cake. You peel and cut the apples into large chunks and add orange juice to the apples and mix them together. Next, you make the crumble t-pp-ng",
    answer1: "topping",
    question2: "Are you making an apple crumble cake?",
    answer2: "yes",
  },
  {
    id: 13,
    categoryDropped: "CONTROL",
    block: 1,
    question: 13,
    question1:
      "You see your neighbour on a high street and talk about their new beagle dog. They explained that Beagles are very small, energetic and good with children, and most live 12 to 17 years on a_er_ge ",
    answer1: "average",
    question2: "Did your neighbour get a golden retriever? ",
    answer2: "no",
  },
  {
    id: 14,
    categoryDropped: "CONTROL",
    block: 1,
    question: 14,
    question1:
      "You are reading an article about the weather in a science magazine.  The scientists report that low UV output from the sun might contribute to more cold winters than usual whereas high UV output has the opposite  ef-e-t",
    answer1: "effect",
    question2: "Do you review the weather broadcasting? ",
    answer2: "no",
  },
  {
    id: 15,
    categoryDropped: "CONTROL",
    block: 1,
    question: 15,
    question1:
      "Green tea originated in China and has become associated with many cultures throughout  Asia. Lately its possible health benefits have been acknowledged in the Western world. The polyphenols present in the tea are believed to have antioxidant effects on c-l-s ",
    answer1: "cells",
    question2: "Is it believed that polyphenols ï¿½have antioxidant effects?",
    answer2: "yes",
  },
  {
    id: 16,
    categoryDropped: "CONTROL",
    block: 1,
    question: 16,
    question1:
      "You are ordering grocery items online. You turn on the computer, find the website and begin adding items to your shopping cart. You now decide the delivery date and time and finish pa-me-t ",
    answer1: "payment",
    question2: "Do you go to the store for your grocery items?",
    answer2: "no",
  },
  {
    id: 17,
    categoryDropped: "CONTROL",
    block: 1,
    question: 17,
    question1:
      "You find a book in the bookstore. The story starts when a British film producer moves to Los Angeles. They then make the film called Compton Cricket Club which is about a group of young men from a homeless co-mu-ity ",
    answer1: "community",
    question2: "Have you found an interesting book? ",
    answer2: "yes",
  },
  {
    id: 18,
    categoryDropped: "CONTROL",
    block: 1,
    question: 18,
    question1:
      "Your colleague brings their new camera, Cannon EOS 600D, to the office. They said that it was on sale online, so they bought it at a cheaper price than they expected. They take a picture of everyone in the of_ice ",
    answer1: "office",
    question2: "Does your colleague bring a phone to the office?",
    answer2: "no",
  },
];

pokemon.forEach(function (obj) {
  db.collection("pokemon")
    .add({
      id: obj.id,
      categoryDropped: obj.categoryDropped,
      block: obj.block,
      question: obj.question,
      question1: obj.question1,
      answer1: obj.answer1,
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
