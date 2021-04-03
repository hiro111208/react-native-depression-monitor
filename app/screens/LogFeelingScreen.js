import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import firebase from "../database/firebase";
import FeelingsRadioButtons from "../src/components/FeelingsRadioButtons";
import FeelingsSlider from "../src/components/FeelingsSlider";
import colors from "../config/colors";
/**
 * Screen where the user logs their feelings. Users will
 * log their feelings before and after their therapy
 */
function LogFeelingScreen({ navigation, route }) {
  const [overallFeeling, setOverallFeeling] = useState("");
  const [anxious, setAnxious] = useState(1);
  const [sad, setSad] = useState(1);
  const [happy, setHappy] = useState(1);

  const user = route.params.userData;
  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);

  //Reset all states
  const reset = () => {
    setAnxious(1);
    setHappy(1);
    setOverallFeeling("");
    setSad(1);
  };

  //Store the user's feelings in the database
  function saveFeelings() {
    firebase
      .firestore()
      .collection("feelings")
      .doc()
      .set({
        overall: overallFeeling,
        happy: happy,
        sad: sad,
        anxious: anxious,
        userID: user.userID,
        timeStamp: new Date(),
      })
      .then(() => {
        console.log("Feelings saved");
        if (user.question == 0) {
          incrementQuestion();
        }
      })
      .catch((error) => {
        console.error("Error saving feelings: ", error);
      });
  }

  function incrementQuestion() {
    userRef
      .set(
        {
          question: 1,
          lastActive: new Date(),
        },
        { merge: true }
      )
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  //Handle when continue button is pressed
  //Go to either therapy screen or patient dashboard depending on whether therapy has started or ended
  function handleOnContinuePress() {
    if (overallFeeling === "") {
      Alert.alert("Please fill in how you are feeling!");
    } else {
      if (route.params.cameFrom === "HomeScreen") {
        saveFeelings();
        reset();
        navigation.navigate("TherapyScreen", {
          onGoBack: () => route.params.onGoBack(),
          question: 1,
        });
      } else {
        saveFeelings();
        reset();
        navigation.navigate("PatientDashboard");
      }
    }
  }

  //Render the log feelings screen
  return (
    <View style={styles.container}>
      {/* Render header  */}
      <View style={[styles.header, styles.centering]}>
        <Text style={styles.headerText}>How are you feeling?</Text>
      </View>

      {/* Render feeling emojis as radio buttons */}
      <FeelingsRadioButtons
        setOverallFeeling={setOverallFeeling}
        overallFeeling={overallFeeling}
      />

      {/* Render sliders for each emotion */}
      <ScrollView style={styles.slidersContainer}>
        <View style={[styles.topAndBottom, styles.centering]}>
          <Text style={styles.text}>Anxious</Text>
          <FeelingsSlider setFeelingState={setAnxious} feelingState={anxious} />
        </View>

        <View style={[styles.topAndBottom, styles.centering]}>
          <Text style={styles.text}>Sad</Text>
          <FeelingsSlider setFeelingState={setSad} feelingState={sad} />
        </View>

        <View style={[styles.topAndBottom, styles.centering]}>
          <Text style={styles.text}>Happy</Text>
          <FeelingsSlider setFeelingState={setHappy} feelingState={happy} />
        </View>
      </ScrollView>

      {/* Render Continue button  */}
      <TouchableOpacity
        style={[styles.continueButton, styles.centering]}
        onPress={() => {
          handleOnContinuePress();
        }}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LogFeelingScreen;

const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: colors.darkBorder,
    height: "12%",
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignSelf: "flex-start",
    paddingTop: 30,
  },
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#ffd390",
    paddingBottom: "5%",
  },
  continueButton: {
    width: "40%",
    height: "6%",
    backgroundColor: "#c7ffd8",
    borderRadius: 20,
    alignSelf: "center",
  },
  slidersContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingTop: 20,
    borderColor: colors.darkBorder,
    borderWidth: 2,
    width: "100%",
  },
  text: {
    color: "grey",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  topAndBottom: {
    marginTop: 10,
  },
  continueText: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
});
