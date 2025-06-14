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
import colors from "../config/colors";
import * as indexStyles from "../config/indexStyles";
import DismissKeyboard from "../config/DismissKeyboard";

/*
  Screen where users can login to access their dashboards
*/
function LoginScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isVerified, setIsVerified] = useState(true);

    const db = firebase.firestore();

    /**
     * Locates the progress of the user based on their uid
     */
    function navigateUser(uid) {
        var docRef = db.collection("users").doc(uid);
        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const userProgress = doc.data();

                    // A category hasn't been dropped
                    if (userProgress.categoryDropped == "NONE") {
                        props.navigation.navigate("DemoScreen", {
                            user: userProgress,
                        });
                        setIsLoading(false);
                    }

                    // Proceeds straight to the dashboard (skipping category and demo)
                    else {
                        props.navigation.navigate("PatientDashboard");
                        setIsLoading(false);
                    }
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

    //Send verification email to user to allow them to login
    const sendVerificationEmail = () => {
        firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(function () {
                console.log("email verification sent");
                setErrorMessage(
                    `Please verify your email through the link we've sent to: ${email}`
                );
            })
            .catch(function (error) {
                //console.log("failed to send email verification");
                console.log(error.code);
                setIsLoading(false);
                setErrorMessage(error.message);
            });
        setIsVerified(true);
    };

    // Redirect the user according to their credentials
    const userLogin = () => {
        if (email === "" && password === "") {
            Alert.alert("Enter details to login!");
        } else {
            setIsLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((res) => {
                    if (
                        firebase.auth().currentUser.email == "admin@hugapp.com"
                    ) {
                        reset();
                        props.navigation.navigate("AdminDashboard");
                        setIsLoading(false);
                    } else {
                        if (firebase.auth().currentUser.emailVerified) {
                            console.log("User logged-in successfully!");
                            reset();
                            navigateUser(firebase.auth().currentUser.uid);
                        } else {
                            setIsLoading(false);
                            setErrorMessage("Your email has not been verified");
                            setIsVerified(false);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error.code);
                    setIsLoading(false);

                    switch (error.code) {
                        case "auth/invalid-email":
                            setErrorMessage(`Please enter a valid email.`);
                            break;
                        case "auth/wrong-password":
                            setErrorMessage(
                                `Incorrect password for '${email}'.`
                            );
                            break;
                        case "auth/user-not-found":
                            setErrorMessage(
                                `No account for '${email}' exists, please sign up with this email.`
                            );
                            break;
                        default:
                            setErrorMessage(error.message);
                            break;
                    }
                });
        }
    };

    //reset all states
    const reset = () => {
        setEmail("");
        setPassword("");
        setIsVerified(true);
        setErrorMessage("");
    };

    //While loading show preloader
    if (isLoading) {
        return (
            <View style={[indexStyles.preloader, indexStyles.centering]}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        );
    }
    //Render the login screen interface
    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <Image
                    resizeMode={"contain"}
                    style={indexStyles.loginImage}
                    source={require("../assets/hand-logo.png")}
                />
                {/*Render input fields for email and password*/}
                <View style={styles.loginFormContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Email"
                        value={email}
                        keyboardType="email-address"
                        onChangeText={(userEmail) => setEmail(userEmail)}
                        testID={"TEST_ID_EMAIL_INPUT"}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Password"
                        value={password}
                        onChangeText={(userPassword) =>
                            setPassword(userPassword)
                        }
                        maxLength={15}
                        secureTextEntry={true}
                        testID={"TEST_ID_PASSWORD_INPUT"}
                    />

                    {/*Render text that shows error  messages */}
                    <Text testID={"TEST_ID_MESSAGE"} style={{ color: "red" }}>
                        {errorMessage}
                    </Text>

                    {/*Render login button which calls userLogin method and checks credentials in input fields*/}
                    {isVerified ? (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={indexStyles.loginButton}
                            onPress={() => userLogin()}
                            testID={"TEST_ID_LOGIN_BUTTON"}
                        >
                            <Text style={indexStyles.loginButtonText}>
                                LOG IN
                            </Text>
                        </TouchableOpacity>
                    ) : null}

                    {/*Render button to send new verification email */}
                    {!isVerified ? (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={indexStyles.loginButton}
                            onPress={() => sendVerificationEmail()}
                            testID={"TEST_ID_VERIFY_BUTTON"}
                        >
                            <Text style={indexStyles.loginButtonText}>
                                Send verification email
                            </Text>
                        </TouchableOpacity>
                    ) : null}

                    {/*Render text to allow user to go to sign up screen*/}
                    <Text
                        style={styles.textButton}
                        onPress={() => {
                            reset();
                            props.navigation.navigate("SignupScreen");
                        }}
                        testID={"TEST_ID_SIGNUP_BUTTON"}
                    >
                        Don't have an account? Click here to signup
                    </Text>

                    {/*Render text to allow user to go to forgot password screen*/}
                    <Text
                        style={styles.textButton}
                        onPress={() => {
                            reset();
                            props.navigation.navigate("ForgotPasswordScreen");
                        }}
                        testID={"TEST_ID_FORGOT_BUTTON"}
                    >
                        Forgot your password?
                    </Text>
                </View>
            </View>
        </DismissKeyboard>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: "10%",
    },
    loginFormContainer: {
        flex: 4,
        padding: "8%",
    },
    inputStyle: {
        width: "100%",
        marginVertical: 15,
        paddingBottom: 20,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1.5,
    },
    textButton: {
        color: colors.darkBorder,
        marginTop: 25,
        textAlign: "center",
    },
});
