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
  Alert
} from "react-native";
import Constants from "expo-constants";
import firebase from "../database/firebase";
import FeelingsRadioButtons from "../src/components/FeelingsRadioButtons";
import {selectedFeeling} from "../src/components/FeelingsRadioButtons";
import FeelingsSlider from "../src/components/FeelingsSlider";
import forceUpdate from "../src/components/FeelingsSlider";
import colors from "../config/colors";

/**
 * Screen where the user logs their feelings. Users will
 * log their feelings before and after their thearapy
 */
function LogFeelingScreen({ navigation, route }) {
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

  const reset=()=>{
    setAnxious(1)
    setParanoid(1)
    setFriendly(1)
    setOverallFeeling("")
    setSad(1)
    setUser(undefined)
  }

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
        userID: user.userID,
        timeStamp: new Date()
      })
      .then(() => {
        console.log("Feelings saved");
      })
      .catch((error) => {
        console.error("Error saving feelings: ", error);
      });
  }

  function handleOnContinuePress(){
    if(overallFeeling === "") {
      Alert.alert("Please fill in how you are feeling!");
    }
    else{
      if (route.params.cameFrom === "HomeScreen") {
        saveFeelings();
        reset();
        navigation.navigate("TherapyScreen", {
          onGoBack: () => route.params.onGoBack(),
          })
       } else {
        saveFeelings(); 
        reset();
        navigation.navigate("PatientDashboard") 
       }
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <FeelingsRadioButtons 
        setOverallFeeling={setOverallFeeling}
        overallFeeling={overallFeeling}
      />
      

      <View style={styles.slidersContainer}>
        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Paranoid</Text>
          <FeelingsSlider
            setFeelingState={setParanoid}
            feelingState={paranoid}
          />
        </View>

        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Anxious</Text>
          <FeelingsSlider
            setFeelingState={setAnxious}
            feelingState={anxious}
          />
        </View>

        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Sad</Text>
          <FeelingsSlider
            setFeelingState={setSad}
            feelingState={sad}
          />
        </View>

        <View style={styles.topAndBottom}>
          <Text style={styles.text}>Friendly</Text>
          <FeelingsSlider
            setFeelingState={setFriendly}
            feelingState={friendly}
          />
        </View>
      </View>

        <TouchableOpacity 
         style={styles.optButton}
         onPress={() => {handleOnContinuePress()}}
         >
          <Text style={styles.continueButton} >Continue</Text>
        </TouchableOpacity>

    </KeyboardAvoidingView>
  );

  {
    /* Radio Button */
  }
}

export default LogFeelingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    //justifyContent: "center"
  },
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
    width: "40%",
    height: "5%",
    backgroundColor: "#c7ffd8",
    borderRadius: 20,
    alignSelf:"center",
    alignItems: "center",
    justifyContent: "center"
  },
  slidersContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingTop: 20,
    borderColor: colors.darkBorder,
    borderWidth:2
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
    color: "grey",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
  },
  topAndBottom: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: 'center'
  },
  centering: {
    alignItems: "center",
  },
  continueButton: {
    color: "black",
    fontSize: 20,
    //fontWeight: 'bold',
    textAlign: "center",
  }
});


