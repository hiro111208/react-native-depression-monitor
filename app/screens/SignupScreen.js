import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import firebase from "../../firebase.js";

import colors from "../config/colors";

/*
  Screen where users can signup to the app. First screen user sees when opening app for first time
*/
function SignupScreen(props) {
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
          console.log(
            "User registered successfully with UID of " + res.user.uid
          );

          sendVerificationEmail();

          setIsLoading(false);
          setDisplayName("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          console.log(error.code);
          setIsLoading(false);
          setErrorMessage(error.message);
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
        setMessage(
          `Please verify your email through the link we've sent to: ` + email
        );
        setErrorMessage("");
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
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
  //Render the form where the user can input their details
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Name"
        value={displayName}
        onChangeText={(val) => setDisplayName(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}
      />
      {/*Render error messages or success messages*/}
      <Text style={{ color: "red" }}>{errorMessage}</Text>
      <Text style={{ color: "red" }}>{message}</Text>

      {/*Render sign up button that calls registerUser method*/}
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.signupButton}
        onPress={() => registerUser()}
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
  );
}
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: colors.darkBorder,
    marginTop: 25,
    textAlign: "center",
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
    width: 300,
    backgroundColor: colors.darkBorder,
    alignSelf: "center",
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 50,
  },
  signupText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
});
