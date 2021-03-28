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
import * as indexStyles from "../config/indexStyles";

/**
 * Screen where the user logs their feelings. Users will
 * log their feelings before and after their therapy
 */
function LogFeelingScreen({ navigation, route }) {
  const [overallFeeling, setOverallFeeling] = useState("");
  const [paranoid, setParanoid] = useState(1);
  const [anxious, setAnxious] = useState(1);
  const [sad, setSad] = useState(1);
  const [friendly, setFriendly] = useState(1);
  const [user, setUser] = useState(undefined);

  //Get userID corresponding to current user
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

  //Reset all states
  const reset = () => {
    setAnxious(1);
    setParanoid(1);
    setFriendly(1);
    setOverallFeeling("");
    setSad(1);
    setUser(undefined);
  };

  //Store the user's feelings in the database
  function saveFeelings() {
    getUser();
    firebase
      .firestore()
      .collection("feelings")
      .doc()
      .set({
        overall: overallFeeling,
        paranoid: paranoid,
        friendly: friendly,
        sad: sad,
        anxious: anxious,
        userID: user.userID,
        timeStamp: new Date(),
      })
      .then(() => {
        console.log("Feelings saved");
      })
      .catch((error) => {
        console.error("Error saving feelings: ", error);
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
      <View style={[styles.header, indexStyles.centering]}>
        <Text style={styles.headerText}>How are you feeling?</Text>
      </View>

      {/* Render feeling emojis as radio buttons */}
      <FeelingsRadioButtons
        setOverallFeeling={setOverallFeeling}
        overallFeeling={overallFeeling}
      />

      {/* Render sliders for each emotion */}
      <ScrollView style={styles.slidersContainer}>
        <View style={[styles.topAndBottom, indexStyles.centering]}>
          <Text style={indexStyles.textGrey}>Paranoid</Text>
          <FeelingsSlider
            setFeelingState={setParanoid}
            feelingState={paranoid}
          />
        </View>

        <View style={[styles.topAndBottom, indexStyles.centering]}>
          <Text style={indexStyles.textGrey}>Anxious</Text>
          <FeelingsSlider setFeelingState={setAnxious} feelingState={anxious} />
        </View>

        <View style={[styles.topAndBottom, indexStyles.centering]}>
          <Text style={indexStyles.textGrey}>Sad</Text>
          <FeelingsSlider setFeelingState={setSad} feelingState={sad} />
        </View>

        <View style={[styles.topAndBottom, indexStyles.centering]}>
          <Text style={indexStyles.textGrey}>Friendly</Text>
          <FeelingsSlider
            setFeelingState={setFriendly}
            feelingState={friendly}
          />
        </View>
      </ScrollView>

      {/* Render Continue button  */}
      <TouchableOpacity
        style={[styles.continueButton, indexStyles.centering]}
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
  topAndBottom: {
    marginTop: 10,
  },
  continueText: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
});
