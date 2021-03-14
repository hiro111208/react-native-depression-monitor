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
import firebase from "../../firebase";
import ProgressBar from "../src/components/ProgressBar";

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
  const [user, setUser] = useState(undefined);

  // currentWidth + 1 / segments = progress bar filled
  state = {
    currentWidth: question - 1, // current progress (+1)
    segments: 18, // maximum progress
  };

  // accesses the user's progress
  function getItems() {
    const ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    ref
      .get()
      .then((doc) => {
        const ref = firebase.firestore().collection("questions");
        const query = ref
          .where("categoryDropped", "==", doc.data().categoryDropped)
          .where("block", "==", doc.data().block)
          .orderBy("question");
        query.onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setItems(items);
          setLoaded(true);
          setQuestion(doc.data().question - 1);
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
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
      <View style={[styles.answerArea, styles.centering, styles.shadowEffect]}>
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
      <View style={[styles.answerArea, styles.centering, styles.shadowEffect]}>
        <Text style={styles.textNote}>
          {" "}
          The correct answer was "{getCorrectAnswer()}".{" "}
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
      <View style={[styles.answerArea, styles.centering, styles.shadowEffect]}>
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
      <View style={[styles.answerArea, styles.centering, styles.shadowEffect]}>
        <Text style={styles.textNote}>{items[question].question2}</Text>
        <TouchableOpacity
          style={[styles.answerButton, styles.centering, styles.shadowEffect]}
          onPress={() => checkAnswer("Yes")}
        >
          <Text style={styles.text}>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.answerButton, styles.centering, styles.shadowEffect]}
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
      <View style={[styles.answerArea, styles.centering, styles.shadowEffect]}>
        <Text style={styles.textNote}>Enter the first missing letter</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter answer here"
          onChangeText={(value) => checkAnswer(value)}
          maxLength={1}
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
      return renderQuestionText();
    } else {
      return <Text style={styles.textNote}>Welcome to the session!</Text>;
    }
  }

  function renderQuestionText() {
    if (isWordAnswer) {
      return <Text style={styles.text}>{items[question].question1}</Text>;
    } else {
      return (
        <Text style={styles.text}>
          {items[question].question1} ({items[question].word})
        </Text>
      );
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
      <View style={[styles.top, styles.centering]}>
        <View style={styles.bar}>
          <ProgressBar
            segments={state.segments}
            nextWidth={state.currentWidth + 1}
          ></ProgressBar>
        </View>
        <TouchableOpacity
          style={[
            styles.takeBreakButton,
            styles.centering,
            styles.shadowEffect,
          ]}
        >
          <Text style={styles.text}>Take a break</Text>
        </TouchableOpacity>
      </View>

      {/* Displays therapy item story and question */}
      <View style={[styles.center, styles.centering]}>
        <View
          style={[styles.questionArea, styles.centering, styles.shadowEffect]}
        >
          {renderQuestion()}
        </View>
      </View>

      {/* Presents different answer formats */}
      {renderAnswerArea()}

      {/* Button to navigate through the therapy session */}
      <View style={[styles.bottom, styles.centering]}>
        <TouchableOpacity
          style={[styles.optButton, styles.centering, styles.shadowEffect]}
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
    backgroundColor: "#ffaa78",
    borderRadius: 10,
  },
  answerArea: {
    height: "25%",
    padding: 60,
  },
  center: {
    height: "45%",
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
  input: {
    height: "100%",
    width: "90%",
    backgroundColor: "#ffe2e6",
    borderColor: "#ffffff",
    borderWidth: 5,
    borderRadius: 40,
    padding: 8,
    fontSize: 24,
    textAlign: "center",
  },
  optButton: {
    height: "80%",
    width: "70%",
    backgroundColor: "#a9eed1",
    borderRadius: 20,
    padding: 20,
  },
  questionArea: {
    width: "85%",
    height: "100%",
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "#fff",
    backgroundColor: "#eee",
    padding: 30,
  },
  shadowEffect: {
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
  takeBreakButton: {
    height: "30%",
    width: 125,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  text: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  textNote: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  top: {
    height: "15%",
  },
  bottom: {
    height: "10%",
  },
  bar: {
    width: "85%",
    padding: 10,
  },
});

export default TherapyScreen;
