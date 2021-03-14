import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import firebase from "../database/firebase";

/**
 * Screen where the therapy session takes place. Users will
 * answer question stored in Firebase or pause the session.
 */
const TherapyScreen = () => {
  const [isWordAnswer, toggleWordAnswer] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [question, setQuestion] = useState(0);
  const [isCorrect, toggleCorrect] = useState(false);
  const [isIncorrect, toggleIncorrect] = useState(false);

  const ref = firebase.firestore().collection("questions");
  const query = ref
    .where("categoryDropped", "==", "CONTROL")
    .where("block", "==", 1)
    .orderBy("question");

  // Queries from firebase database and stores in list
  function getItems() {
    query.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setItems(items);
      setLoaded(true);
    });
  }

  // Gets therapy content while screen is rendering
  useEffect(() => {
    getItems();
  }, []);

  // Returns text if the answer is wrong
  function getCorrectAnswer() {
    if (isWordAnswer) {
      return items[question].answer1;
    } else {
      return items[question].answer2;
    }
  }

  // View to display when answer is correct
  function renderCorrectAnswerArea() {
    return (
      <View style={[styles.answerArea, styles.centering]}>
        <TextInput
          style={[styles.input, styles.correctHighlight]}
          value="Well done!"
          editable={false}
        />
      </View>
    );
  }

  // View to display when answer is wrong
  function renderIncorrectAnswerArea() {
    return (
      <View style={[styles.answerArea, styles.centering]}>
        <Text styles={styles.text}>
          The correct answer was {getCorrectAnswer()}
        </Text>
        <TextInput
          style={styles.input}
          value="You can do this!"
          editable={false}
        />
      </View>
    );
  }

  // Renders whilst data is being retrieved
  function renderLoadingAnswerArea() {
    return (
      <View style={[styles.answerArea, styles.centering]}>
        <TextInput
          style={styles.input}
          placeholder="session loading..."
          editable={false}
        />
      </View>
    );
  }

  // Renders format for the answer area to the yes or no question
  function renderChoiceAnswerArea() {
    return (
      <View style={[styles.answerArea, styles.centering]}>
        <Text style={styles.text}>{items[question].question2}</Text>
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
  }

  // renders answer area to the missing word question
  function renderWordAnswerArea() {
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

  // Renders answer portion of the screen
  function renderAnswerArea() {
    if (isCorrect) {
      return renderCorrectAnswerArea();
    } else if (isIncorrect) {
      return renderIncorrectAnswerArea();
    } else if (!loaded) {
      return renderLoadingAnswerArea();
    } else if (isWordAnswer) {
      return renderWordAnswerArea();
    } else {
      return renderChoiceAnswerArea();
    }
  }

  // check answer to the missing letter question
  function checkWordAnswer(value) {
    if (value.toLowerCase() == items[question].answer1) {
      toggleCorrect(true);
    }
  }

  // check answer to the yes or no question
  function checkChoiceAnswer(value) {
    if (value.toLowerCase() == items[question].answer2) {
      toggleCorrect(true);
    } else {
      toggleIncorrect(true);
    }
  }

  // check the user's answer to any question
  function checkAnswer(value) {
    if (isWordAnswer) {
      checkWordAnswer(value);
    } else {
      checkChoiceAnswer(value);
    }
  }

  // displays the question of the therapy session
  function renderQuestion() {
    if (loaded) {
      return <Text style={styles.text}>{items[question].question1}</Text>;
    } else {
      return <Text style={styles.text}>Welcome to the session!</Text>;
    }
  }

  // Advances to the next screen of the therapy session
  function nextQuestion() {
    if (!isCorrect) {
      toggleIncorrect(true);
    }
    if (isWordAnswer && (isCorrect || isIncorrect)) {
      resetStatus();
      toggleWordAnswer(false);
    } else if (!isWordAnswer && (isCorrect || isIncorrect)) {
      resetStatus();
      setQuestion(question + 1);
      toggleWordAnswer(true);
    }
  }

  // Resets whether the user is right or wrong for a new question
  function resetStatus() {
    toggleCorrect(false);
    toggleIncorrect(false);
  }

  // Returns the whole therapy screen interface
  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
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
        <TouchableOpacity
          style={[styles.optButton, styles.centering]}
          onPress={() => nextQuestion()}
        >
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  correctHighlight: {
    borderColor: "#c7ffd8",
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
