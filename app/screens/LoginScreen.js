import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import firebase from "../../firebase.js";

import colors from "../config/colors";

/*
  Screen where users can login to access their dashboards
*/

function LoginScreen(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading]= useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  
  //Send verification email to user to allow them to login
  const sendVerificationEmail=()=>{
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      console.log("email verification sent");
      setErrorMessage(`Please verify your email through the link we've sent to: ` + email);
    }).catch(function(error) {
      console.log("failed to send email verification");
      console.log(error.code);
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }

  //Verify user credentials with firebase. 
  //If user has verified their email, send user to dashboard
  //If not, show button to allow user to send a new verification email
  //If email used is admin email redirect to admin dashboard
  const userLogin = () => {
    if(email === "" && password === "") {
      Alert.alert("Enter details to login!");
    } else {
      setIsLoading(true)
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if(firebase.auth().currentUser.email == "admin@joyapp.com") {
          reset();
          props.navigation.navigate("AdminDashboard");
        } else {
          if(firebase.auth().currentUser.emailVerified) {
            console.log("User logged-in successfully!");
            reset();
            props.navigation.navigate("PatientDashboard");
          } else {
            setIsLoading(false);
            setErrorMessage("Your email has not been verfied");
            setIsVerified(false);
          }
        }
      })
      .catch(error => {
        console.log(error.code);
        setIsLoading(false);
        setErrorMessage(error.message);
      })
    }
  };
  
  //reset all states
  const reset = () => {
    setIsLoading(false);
    setEmail("");
    setPassword("");
    setIsVerified(true);
    setErrorMessage("");
  }

  //While loading show preloader
  if(isLoading) {
    return(
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
       </View>
     )
  }
  //Render the login screen interface
  return (
    <View style={styles.container}>  
    {/*Render input fields for email and password*/}
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        testID={"TEST_ID_EMAIL_INPUT"}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        maxLength={15}
        secureTextEntry={true}
        testID={"TEST_ID_PASSWORD_INPUT"}
      />   

      {/*Render text that shows error  messages */}
      <Text testID={"TEST_ID_MESSAGE"} style={{color:"red"}}>{errorMessage}</Text>

      {/*Render login button which calls userLogin method and checks credentials in input fields*/}
      <TouchableOpacity
        activeOpacity = { .5 }
        style={styles.loginButton}
        onPress={()=>userLogin()}
        testID={"TEST_ID_LOGIN_BUTTON"}
      >
          <Text style= {styles.signInText}>LOG IN</Text>
      </TouchableOpacity>

      {/*Render text to allow user to go to sign up screen*/}
      <Text 
        style={styles.textButton}
        onPress={() => {reset(); props.navigation.navigate("SignupScreen")}}
        testID={"TEST_ID_SIGNUP_BUTTON"}>
        Don"t have an account? Click here to signup
      </Text>

      {/*Render text to allow user to go to forgot password screen*/}
      <Text 
        style={styles.textButton}
        onPress={() => {reset();props.navigation.navigate("ForgotPasswordScreen")}}
        testID={"TEST_ID_FORGOT_BUTTON"}>
        Forgot your password?
      </Text>

      {/*Render button to send new verification email */}
      <View> 
      {!isVerified
        ? <TouchableOpacity
          activeOpacity = { .5 }
          style={styles.loginButton}
          onPress={()=>sendVerificationEmail()}
          testID={"TEST_ID_VERIFY_BUTTON"}
        ><Text style= {styles.signInText}>Send verification email</Text>
        </TouchableOpacity>
        :
        null}
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff"
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginButton:{
    width: 300,
    backgroundColor: colors.darkBorder,
    alignSelf: "center",
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:50,
  },
  textButton: {
    color: colors.darkBorder,
    marginTop: 25,
    textAlign: "center"
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  signInText:{
    color: "white",
    textAlign: "center",
    fontSize: 15
  }
});