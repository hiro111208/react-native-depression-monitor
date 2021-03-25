import React, { useState, useEffect } from "react";
import {
  Button,
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
import {FeelingsRadioButtons, selectedFeeling} from "../src/components/FeelingsRadioButtons";
import FeelingsSlider from "../src/components/FeelingsSlider";
const db = firebase.firestore();

/**
 * Screen where the user logs their feelings. Users will
 * log their feelings before and after their thearapy
 */
function LogFeelingScreen(props) {
  const [feelingState, setFeelingState] = useState({
    paranoid: 0,
    anxious: 0,
    sad: 0,
    friendly: 0,
  });
//const [overallEmotion, setOverallEmotion]= useState("")

/*   function getFeelings() {
    let feelingScore = {};
    console.log(feelingState);
    for (const key in feelingState) {
      const value = feelingState[key];
      if (value == 0) {
        feelingScore[key] = 1;
      } else if (value == 25) {
        feelingScore[key] = 2;
      } else if (value == 50) {
        feelingScore[key] = 3;
      } else if (value == 75) {
        feelingScore[key] = 4;
      } else if (value == 100) {
        feelingScore[key] = 5;
      }
    }
    return feelingScore;
  } */
  /* function handleOnClickContinue() {
    const id = firebase.auth().currentUser.uid;
    if (id != -1) {
      let feelings = getFeelings();
      // console.log(feelings);
      feelings.userID = id;
      const feeling = {
        ...feelings,
      };
      db.collection("feelings")
        .doc()
        .set({
          feeling,
        })
        .then(() => {
          console.log("Stat updated");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  } */

  function getUserID() {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        return doc.userID;
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }


  function saveFeelings(){
    let feelings = feelingState;
    console.log(feelings.paranoid)
    console.log(feelings.paranoid)
    console.log(feelings.paranoid)
    console.log(feelings.paranoid)
    db.collection("feelings")
      .doc()
      .set({
        overall: selectedFeeling,
        paranoid: feelings.paranoid,
        friendly: feelings.friendly,
        sad: feelings.sad,
        anxious: feelings.anxious,
        userID: getUserID()
      })
      .then(() => {
        console.log("Feelings saved");
      })
      .catch((error) => {
        console.error("Error saving feelings: ", error);
      });
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      {/* How are you feeling text */}
      <View style={styles.centering}>
        <Text style={styles.text}>How are you feeling?</Text>
      </View>
      <View style={styles.feelingBox}>
        <TouchableOpacity style={styles.centering}>
          <FeelingsRadioButtons />
        </TouchableOpacity>
      </View>

      <View style={styles.slidersContainer}>
        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Paranoid</Text>
          <FeelingsSlider
            setFeelingState={setFeelingState}
            feelingName={"paranoid"}
            feelingState={feelingState}
          />
        </View>

        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Anxious</Text>
          <FeelingsSlider
            setFeelingState={setFeelingState}
            feelingName={"anxious"}
            feelingState={feelingState}
          />
        </View>

        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Sad</Text>
          <FeelingsSlider
            setFeelingState={setFeelingState}
            feelingName={"sad"}
            feelingState={feelingState}
          />
        </View>

        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Friendly</Text>
          <FeelingsSlider
            setFeelingState={setFeelingState}
            feelingName={"friendly"}
            feelingState={feelingState}
          />
        </View>
      </View>

      <View style={styles.centering}>
        <TouchableOpacity style={styles.optButton}>
          <Button title="Continue" onPress={() => {saveFeelings(); props.navigation.navigate("TherapyScreen")} } />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  {
    /* Radio Button */
  }
}

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
  container: {
    // marginTop: Constants.statusBarHeight,
    height: '100%',
    justifyContent: "space-around",
    // flex: 1,
    backgroundColor: "#ffd390",
  },
  correctHighlight: {
    borderColor: "#c7ffd8",
  },
  optButton: {
    width: 150,
    backgroundColor: "#c7ffd8",
    borderRadius: 10,
  },
  slidersContainer: {
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
    textAlign: "center",
  },
  topAndBottom: {
    marginTop: 10,
  },
  centering: {
    alignItems: "center",
  },
  feelingBox: {
    width: '100%',
    backgroundColor: "#c7ffd8",
    borderRadius: 10,
  },
});

export default LogFeelingScreen;
