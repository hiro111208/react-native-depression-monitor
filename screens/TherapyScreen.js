import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import firebase from "../firebase";

/**
 * Screen where the therapy session takes place. Users will
 * answer question stored in Firebase or pause the session.
 */
const TherapyScreen = () => {
  const [isWordAnswer, toggleWordAnswer] = useState(true);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [question, setQuestion] = useState(0);

  const ref = firebase.firestore().collection("questions");
  const query = ref
    .where("categoryDropped", "==", "CONTROL")
    .where("block", "==", 1)
    .orderBy("question");

  function getItems() {
    query.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setItems(items);
      setLoading(true);
    });
  }

  useEffect(() => {
    getItems();
  }, []);

  function renderAnswerArea() {
    if (!loading) {
      return (
        <View style={[styles.answerArea, styles.centering]}>
          <TextInput
            style={styles.input}
            placeholder="session loading..."
            editable={false}
          />
        </View>
      );
    } else if (!isWordAnswer) {
      return (
        <View style={[styles.answerArea, styles.centering]}>
          <TouchableOpacity
            style={[styles.answerButton, styles.centering]}
            onPress={() => checkAnswer("Yes")}
          >
            <Text style={styles.text}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.answerButton, styles.centering]}
            onPress={() => checkAnswer("No")}
          >
            <Text style={styles.text}>NO</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={[styles.answerArea, styles.centering]}>
          <TextInput
            style={styles.input}
            placeholder="enter answer here"
            onChangeText={(value) => checkAnswer(value)}
            editable={true}
          />
        </View>
      );
    }
  }

  function checkAnswer(value) {
    if (isWordAnswer) {
      if (value.toLowerCase() == items[question].answer1) {
        toggleWordAnswer(false);
      }
    } else {
      if (value.toLowerCase() == items[question].answer2) {
        toggleWordAnswer(true);
        setQuestion(question + 1);
      }
    }
  }

  function renderQuestion() {
    if (loading) {
      return <Text style={styles.text}>{items[question].question1}</Text>;
    } else {
      return <Text style={styles.text}>Welcome to the session!</Text>;
    }
  }

  return (
    <View style={styles.container}>
      {/* Button to take a break */}
      <View style={[styles.topAndBottom, styles.centering]}>
        <TouchableOpacity style={[styles.optButton, styles.centering]}>
          <Text style={styles.text}>Take a break</Text>
        </TouchableOpacity>
      </View>

      {/* Displays therapy item story and question */}
      <View style={[styles.center, styles.centering]}>
        <View style={[styles.questionArea, styles.centering]}>
          {renderQuestion()}
        </View>
      </View>

      {/* Presents different answer formats */}
      {renderAnswerArea()}

      {/* Button to navigate through the therapy session */}
      <View style={[styles.topAndBottom, styles.centering]}>
        <TouchableOpacity style={[styles.optButton, styles.centering]}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  answerButton: {
    height: "75%",
    width: 250,
    backgroundColor: "#ffd0c1",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
  },
  answerArea: {
    height: "30%",
    padding: 70,
  },
  center: {
    height: "50%",
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#ffd390",
  },
  optButton: {
    height: "70%",
    width: 150,
    backgroundColor: "#c7ffd8",
    borderRadius: 10,
  },
  input: {
    height: "75%",
    width: "100%",
    backgroundColor: "#ffcccb",
    borderColor: "#ffffff",
    borderWidth: 2,
    padding: 8,
    fontSize: 24,
    textAlign: "center",
  },
  questionArea: {
    width: "80%",
    height: "100%",
    borderRadius: 8,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#eee",
    padding: 5,
  },
  text: {
    color: "black",
    fontSize: 18,
  },
  topAndBottom: {
    height: "10%",
  },
});

export default TherapyScreen;
