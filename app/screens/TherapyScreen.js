import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from "react-native";
import Constants from "expo-constants";
import * as Speech from "expo-speech";
import firebase from "../database/firebase";
import ProgressBar from "../src/components/ProgressBar";
import DismissKeyboard from "../config/DismissKeyboard";

// must be outside the therapy screen to not reset
var time1 = 0; //word answer time
var time2 = 0; //yes or no answer time
var correct1 = false;
var correct2 = false;
var store1 = 0;
var store2 = 0;

/**
 * Screen where the therapy session takes place. Users will
 * answer question stored in Firebase or pause the session.
 */
const TherapyScreen = ({ navigation, route }) => {
  const [isWordAnswer, toggleWordAnswer] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [question, setQuestion] = useState(0);
  const [isCorrect, toggleCorrect] = useState(false);
  const [isIncorrect, toggleIncorrect] = useState(false);
  const [isReading, setReading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [finished, setFinished] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const [sentenceNumber, setSentenceNumber] = useState(0);

  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);

  const answerRef = firebase.firestore().collection("answers");

  // currentWidth + 1 / segments = progress bar filled
  const state = {
    currentWidth: question - 1, // current progress (+1)
    segments: 18, // maximum progress
  };

  // accesses the user's progress and gets the questions
  function getItems() {
    userRef
      .get()
      .then((doc) => {
        setUser(doc.data());
        const ref = firebase.firestore().collection("questions");
        const query = ref
          .where("categoryDropped", "==", doc.data().categoryDropped)
          .where("block", "==", doc.data().block)
          .orderBy("question");
        if (doc.data().block == 5) setFinished(true); // Only 4 therapy sessions to complete
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

  //Split the scenario text into sentences
  function splitSentences() {
    if (loaded) {
      return items[question].question1.split(".");
    } else {
      return [];
    }
  }

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
      <DismissKeyboard>
        <View
          style={[styles.answerArea, styles.centering, styles.shadowEffect]}
        >
          <Text style={styles.textNote}>{renderInstruction()}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter answer here"
            onChangeText={(value) => checkAnswer(value)}
            maxLength={1}
            editable={sentenceNumber == splitSentences().length - 1}
          />
        </View>
      </DismissKeyboard>
    );
  }

  // Renders instruction to if sentences are still missing
  function renderInstruction() {
    if (sentenceNumber == splitSentences().length - 1) {
      return "Enter the first missing letter";
    } else {
      return "Press the arrow to continue";
    }
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
      correct1 = true;
    } else {
      toggleIncorrect(true);
      correct1 = false;
    }
  }

  // check answer to the yes or no question
  function checkChoiceAnswer(value) {
    if (value.toLowerCase() == items[question].answer2) {
      toggleCorrect(true);
      correct2 = true;
    } else {
      toggleIncorrect(true);
      correct2 = false;
    }
  }

  // check the user's answer to any question
  function checkAnswer(value) {
    if (isWordAnswer) {
      checkWordAnswer(value);
    } else {
      checkChoiceAnswer(value);
    }
    endTimer();
  }

  // displays the question of the therapy session
  function renderQuestion() {
    if (finished) {
      return (
        <Text style={styles.textNote}>
          Congratulations! You have completed all therapy sessions!
        </Text>
      );
    } else if (loaded) {
      return renderQuestionText();
    } else {
      return <Text style={styles.textNote}>Welcome to the session!</Text>;
    }
  }

  // renders the question item and the correct word once the word answer is given
  function renderQuestionText() {
    if (!timerStarted && !isWordAnswer) {
      startTimer();
    }
    if (isWordAnswer) {
      return splitSentences().map((sentence, index) => (
        <Text
          style={[styles.text, { opacity: index <= sentenceNumber ? 1 : 0 }]}
          key={index}
        >
          {sentence + "."}
        </Text>
      ));
    } else {
      return (
        <Text style={styles.text}>
          {items[question].question1} ({items[question].word})
        </Text>
      );
    }
  }

  //render the next sentence of the scenario
  function renderQuestionSentence() {
    if (sentenceNumber + 1 == splitSentences().length - 1) {
      startTimer();
    }
    setSentenceNumber(sentenceNumber + 1);
  }

  // calculates the response time and stores it in milliseconds
  function endTimer() {
    if (isWordAnswer) {
      store1 = Date.now() - time1;
    } else {
      store2 = Date.now() - time2;
    }
  }

  // records timestamp in milliseconds (will not reset if already set)
  function startTimer() {
    setTimerStarted(true);
    if (isWordAnswer) {
      time1 = Date.now();
      console.log("time 1");
    } else {
      time2 = Date.now();
      console.log("time 2");
    }
  }

  // Advances to the next screen of the therapy session or back to patient dashboard
  function nextQuestion() {
    if (finished) {
      navigation.goBack();
    } else {
      updateQuestion();
    }
  }

  // moves to the next question of the therapy session
  function updateQuestion() {
    if (!isCorrect) {
      toggleIncorrect(true);
    }
    if (isWordAnswer && (isCorrect || isIncorrect)) {
      resetStatus();
      toggleWordAnswer(false);
    } else if (!isWordAnswer && (isCorrect || isIncorrect)) {
      addAnswer(store1, correct1, store2, correct2);
      saveProgress(user.block, question + 2, 0);
      resetStatus();
      incrementQuestion();
      toggleWordAnswer(true);
    }
  }

  //Navigate to the pause screen and stop the text to speech
  function handlePauseButton() {
    setReading(false);
    Speech.stop();
    navigation.navigate("PauseScreen");
  }

  //Either start or stop reading on read text button click
  function handleReadButtonOnPress() {
    setReading(!isReading);
    {
      if (loaded) {
        if (!isReading) {
          try {
            Speech.speak(items[question].question1, {
              language: "en-US",
              onDone: () => setReading(false),
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          Speech.stop();
        }
      }
    }
  }

  // Renders button that reads text aloud
  function renderReadTextButton() {
    if (loaded) {
      if (isReading) {
        return (
          <Image
            resizeMode="contain"
            style={styles.textToSpeech}
            source={require("../assets/text_to_speech_off.png")}
          />
        );
      } else {
        return (
          <Image
            resizeMode="contain"
            style={styles.textToSpeech}
            source={require("../assets/text_to_speech_on.png")}
          />
        );
      }
    }
  }

  // Updates the question index, until the session ends.
  function incrementQuestion() {
    if (question == 17) {
      saveProgress(user.block + 1, 1, 5);
      route.params.onGoBack();
      Alert.alert(
        "Congratulations",
        "You have completed therapy set " +
          user.block +
          "! You have earned 5 coins to grow your plant.",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("LogFeelingScreen", {
                cameFrom: "TherapyScreen",
              }),
          },
        ]
      );
    } else {
      setQuestion(question + 1);
    }
  }

  // writes the progress of the user so the question isn't repeated
  function saveProgress(blockI, questionI, coinsI) {
    userRef
      .set(
        {
          question: questionI,
          block: blockI,
          coins: user.coins + coinsI,
          lastActive: new Date(),
        },
        { merge: true }
      )
      .then(() => {
        console.log("Progress saved");
      })
      .catch((error) => {
        console.error("Error saving progress: ", error);
      });
  }

  // add the data related to the user's response
  function addAnswer(q1, a1, q2, a2) {
    console.log(q1);
    console.log(q2);
    answerRef
      .add({
        userID: user.userID,
        question: question + 1,
        categoryDropped: user.categoryDropped,
        sessionNumber: user.block,
        question1Time: q1,
        question1IsCorrect: a1,
        question2Time: q2,
        question2IsCorrect: a2,
      })
      .then(() => {
        console.log("Answer added");
      })
      .catch((error) => {
        console.error("Error adding answer: ", error);
      });
  }

  // Resets whether the user is right or wrong for a new question
  // Reset text to speech to stop reading when moving on to next question
  function resetStatus() {
    toggleCorrect(false);
    toggleIncorrect(false);
    Speech.stop();
    setReading(false);
    setTimerStarted(false);
    setSentenceNumber(0);
  }

  // Can only press button when all the questions have been answered
  function checkDisabledForPause() {
    if (!isWordAnswer && (isCorrect || isIncorrect)) {
      return false;
    } else {
      return true;
    }
  }

  // Can only press button when all the questions have been answered
  function checkDisabledForNext() {
    if (isCorrect || isIncorrect) {
      return false;
    } else {
      return true;
    }
  }

  // Sets text for the button if it is disabled
  function setDisabledText() {
    if (!isWordAnswer && (isCorrect || isIncorrect)) {
      return "Take a break";
    } else {
      return "Good Luck!";
    }
  }

  // Sets text for the next question button when disabled
  function setNextText() {
    if (!loaded || finished || isCorrect || isIncorrect) {
      return "Next";
    } else {
      return "Question " + (question + 1);
    }
  }

  // Returns the whole therapy screen interface
  return (
    <KeyboardAvoidingView
      style={[styles.container, styles.centering]}
      behavior="position"
    >
      {/* Progress bar of the therapy session */}
      <View style={[styles.topTools, styles.top, styles.centering]}>
        <View style={styles.bar}>
          <ProgressBar
            segments={state.segments}
            nextWidth={state.currentWidth + 1}
          ></ProgressBar>
        </View>

        {/* Pause button to take a break */}
        <View style={[styles.horizontal, styles.centering]}>
          <TouchableOpacity
            style={[
              styles.takeBreakButton,
              styles.centering,
              styles.shadowEffect,
            ]}
            onPress={() => handlePauseButton()}
            disabled={checkDisabledForPause()}
          >
            <Text style={styles.text}>{setDisabledText()}</Text>
          </TouchableOpacity>

          {/* Button to read text aloud */}
          <TouchableOpacity
            style={[styles.readButton, styles.centering]}
            onPress={() => handleReadButtonOnPress()}
          >
            {renderReadTextButton()}
          </TouchableOpacity>
        </View>
      </View>

      {/* Displays therapy item story and question */}

      <View style={[styles.questionArea, styles.shadowEffect]}>
        <View>{renderQuestion()}</View>
        {isWordAnswer && sentenceNumber !== splitSentences().length - 1 && (
          <TouchableOpacity
            style={styles.nextSentenceButton}
            onPress={() => {
              renderQuestionSentence();
            }}
          >
            <Text style={styles.nextSentenceText}>></Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Presents different answer formats for the subquestions*/}
      {renderAnswerArea()}

      {/* Button to navigate through the therapy session */}
      <View style={[styles.nextButtonSpace, styles.centering]}>
        <TouchableOpacity
          style={[styles.optButton, styles.centering, styles.shadowEffect]}
          onPress={() => nextQuestion()}
          disabled={checkDisabledForNext()}
        >
          <Text style={styles.text}>{setNextText()}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#ffd390",
    paddingHorizontal: "7%",
    paddingVertical: "5%",
  },
  nextSentenceButton: {
    borderColor: "black",
    borderWidth: 1,
    padding: 3,
    paddingHorizontal: 9,
    borderRadius: 5,
  },
  topTools: {
    flex: 1,
    paddingBottom: "5%",
  },
  nextButtonSpace: {
    flex: 1,
  },
  answerButton: {
    height: "20%",
    width: "80%",
    backgroundColor: "#ffaa78",
    borderRadius: 10,
  },
  answerArea: {
    flex: 3,
    justifyContent: "flex-start",
  },
  bar: {
    width: "85%",
    paddingBottom: 10,
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
  },
  correctHighlight: {
    borderColor: "#c7ffd8",
  },
  horizontal: {
    flexDirection: "row",
  },
  input: {
    height: "40%",
    width: "90%",
    backgroundColor: "#ffe2e6",
    borderColor: "#ffffff",
    borderWidth: 5,
    borderRadius: 40,
    fontSize: 20,
    textAlign: "center",
  },
  optButton: {
    height: "80%",
    width: "70%",
    backgroundColor: "#a9eed1",
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
  },
  questionArea: {
    flex: 5,
    height: "100%",
    width: "100%",
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "#fff",
    backgroundColor: "#eee",
    padding: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  readButton: {
    left: "45%",
    position: "absolute",
    backgroundColor: "#ffcccb",
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
    height: "80%",
    width: "40%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  text: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
  textNote: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    flexWrap: "wrap",
  },
  textToSpeech: {
    width: 35,
    height: 40,
  },
  nextSentenceText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default TherapyScreen;
