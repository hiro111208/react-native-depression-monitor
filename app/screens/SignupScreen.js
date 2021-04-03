import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from "../database/firebase";
import { Tooltip } from "react-native-elements";

import colors from "../config/colors";
import * as indexStyles from "../config/indexStyles";
import DismissKeyboard from "../config/DismissKeyboard";

const db = firebase.firestore();

/*
 * Adds the newly registered user to the database, with a uniquely assigned ID
 */
function addUserToDatabase(uid) {
  //Create the ID
  var id;
  var docRef = db
    .collection("general")
    .doc("userCount")
    .get()
    .then((doc) => {
      if (doc.exists) {
        id = doc.data().count + 1;
        console.log(id);

        //Update user count for extra user added
        db.collection("general")
          .doc("userCount")
          .set({
            count: id,
          })
          .then(() => {
            console.log("Stat updated");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        //Add the user to the database with default values and assigned ID
        db.collection("users")
          .doc(uid)
          .set({
            question: 0,
            block: 1,
            categoryDropped: "NONE",
            userID: id,
            coins: 0,
            level: 1,
            lastActive: new Date(),
          })
          .then(() => {
            console.log("User added");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
      // doc.data() will be undefined in this case
      else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

/*
  Screen where users can signup to the app. First screen user sees when opening app for first time
*/
function SignUpScreen(props) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  //Create an account using firebase authentication with the credentials the user has provided.
  //If account successfully create send verification email
  const registerUser = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.updateProfile({
            displayName: displayName,
          });

          // adds the user to the user collection of firebase
          addUserToDatabase(res.user.uid);
          console.log(
            "User registered successfully with UID of " + res.user.uid
          );

          sendVerificationEmail();

          // clear data inside text fields
          setIsLoading(false);
          setDisplayName("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          console.log(error.code);
          setIsLoading(false);

          // displays an error message above the log in button according to the error
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage(
                `An account for "${email}" already exists. Please verify your email or log in.`
              );
              break;
            case "auth/invalid-email":
              setErrorMessage(`Please sign up using a valid email.`);
              break;
            case "auth/weak-password":
              setErrorMessage(
                `Your password is too short! Tap the question mark for more details.`
              );
              break;
            default:
              setErrorMessage("Sorry, an error has occurred.");
              console.log(error.message);
              break;
          }
        });
    }
  };

  //Send verification email to the email the user provided
  function sendVerificationEmail() {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(function () {
        console.log("email verification sent");
        setErrorMessage(
          `Please verify your email through the link we've sent to: ${email}`
        );
        // Email sent.
      })
      .catch(function (error) {
        console.log("failed to send email verification");
        console.log(error.code);
        setIsLoading(false);
        setErrorMessage(error.message);
        // An error happened.
      });
  }

  //reset all states
  const reset = () => {
    setIsLoading(false);
    setEmail("");
    setPassword("");
    setErrorMessage("");
    setDisplayName("");
    setMessage("");
  };

  //Render the sign up screen interface
  if (isLoading) {
    return (
      <View style={indexStyles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  //Render the form where the user can input their details
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Image
          resizeMode={"contain"}
          style={styles.image}
          source={require("../assets/hand-logo.png")}
        />
        <View style={styles.signupFormContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="First Name"
            value={displayName}
            onChangeText={(val) => setDisplayName(val)}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={(val) => setEmail(val)}
            testID={"TEST_ID_EMAIL_INPUT"}
          />
          <View style={[styles.inputStyle, styles.passwordSection]}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(val) => setPassword(val)}
              maxLength={15}
              autoCorrect={false}
              secureTextEntry={true}
              testID={"TEST_ID_PASSWORD_INPUT"}
              style={styles.passwordInput}
            />
            {/*Render tooltip with password criteria*/}
            <Tooltip
              style={styles.passwordTooltip}
              withOverlay={false}
              backgroundColor={colors.darkBorder}
              width={300}
              height={80}
              popover={
                <Text style={styles.passwordInformation}>
                  Password must be 6 to 15 characters long. Can contain any
                  alphaneumeric or special character.
                </Text>
              }
            >
              <View style={styles.helpArea}>
                <Image
                  style={styles.imageTooltip}
                  resizeMode="contain"
                  source={require("../assets/question_mark.png")}
                />
              </View>
            </Tooltip>
          </View>
          {/*Render error messages or success messages*/}
          <Text style={{ color: "red" }}>{errorMessage}</Text>
          <Text style={{ color: "red" }}>{message}</Text>

          {/*Render sign up button that calls registerUser method*/}
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.signupButton}
            onPress={() => registerUser()}
            testID={"TEST_ID_SIGNUP_BUTTON"}
          >
            <Text style={styles.signupText}>SIGNUP</Text>
          </TouchableOpacity>

          {/*Render text button that allows user to go to login screen */}
          <Text
            style={styles.loginText}
            onPress={() => {
              reset();
              props.navigation.navigate("LoginScreen");
            }}
          >
            Already Registered? Click here to login
          </Text>
        </View>
      </View>
    </DismissKeyboard>
  );
}
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "5%",
  },
  signupFormContainer: {
    flex: 5,
    paddingHorizontal: "8%",
    justifyContent: "flex-start",
  },
  image: {
    flex: 3,
    alignSelf: "center",
  },
  inputStyle: {
    width: "100%",
    marginBottom: "5%",
    marginTop: "5%",
    paddingBottom: "5%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1.5,
  },
  loginText: {
    color: colors.darkBorder,
    marginTop: 25,
    textAlign: "center",
  },
  passwordSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passwordInput: {
    width: "90%",
  },
  passwordInformation: {
    color: "white",
  },
  passwordTooltip: {
    backgroundColor: colors.darkBorder,
    width: 300,
    height: 60,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  signupButton: {
    width: "90%",
    backgroundColor: colors.darkBorder,
    alignSelf: "center",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 50,
  },
  signupText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  imageTooltip: {
    height: 22,
    width: 44,
  },
  helpArea: {
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  passwordInput: {
    width: "90%",
  },
});
