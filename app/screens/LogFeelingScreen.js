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
import FeelingsRadioButtons from "../src/components/FeelingsRadioButtons";
import {selectedFeeling} from "../src/components/FeelingsRadioButtons";
import FeelingsSlider from "../src/components/FeelingsSlider";

/**
 * Screen where the user logs their feelings. Users will
 * log their feelings before and after their thearapy
 */
function LogFeelingScreen(props) {
  const [overallFeeling, setOverallFeeling] = useState("");
  const [paranoid, setParanoid] = useState(1);
  const [anxious, setAnxious] = useState(1);
  const [sad, setSad] = useState(1);
  const [friendly, setFriendly] = useState(1);
  const [user, setUser] = useState(undefined);

  function getUser() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()      
      .then((doc) => {
        setUser(doc.data());
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
  
  useEffect(() => {
    getUser();
  }, []);

  function saveFeelings(){
    getUser();
    console.log(paranoid)
    console.log(sad)
    console.log(anxious)
    console.log(friendly)
    console.log(overallFeeling)
    console.log(user.userID)
    console.log(firebase.auth().currentUser.uid)
    firebase.firestore().collection("feelings")
      .doc()
      .set({
        overall: overallFeeling,
        paranoid: paranoid,
        friendly: friendly,
        sad: sad,
        anxious: anxious,
        userID: user.userID
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
          <FeelingsRadioButtons 
            setOverallFeeling={setOverallFeeling}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.slidersContainer}>
        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Paranoid</Text>
          <FeelingsSlider
            setFeelingState={setParanoid}
          />
        </View>

        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Anxious</Text>
          <FeelingsSlider
            setFeelingState={setAnxious}
          />
        </View>

        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Sad</Text>
          <FeelingsSlider
            setFeelingState={setSad}
          />
        </View>

        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Friendly</Text>
          <FeelingsSlider
            setFeelingState={setFriendly}
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

export default LogFeelingScreen;

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


