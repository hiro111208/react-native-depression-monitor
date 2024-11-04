import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
} from "react-native";
import firebase from "../database/firebase";

import colors from "../config/colors";
import * as indexStyles from "../config/indexStyles";
import DismissKeyboard from "../config/DismissKeyboard";

/*
 * Screen where users can try to reset their passwords if forgotten
 */
function ForgotPasswordScreen(props) {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // Send reset password email to the email provided if there is an account associated to it
    const forgotPassword = () => {
        if (email === "") {
            Alert.alert("Enter an email!");
        } else {
            firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    setMessage(
                        "You should have received an email to change your password"
                    );
                })
                .catch((error) => setMessage(error.message));
        }
    };

    // Render forgot password screen interface
    return (
        <DismissKeyboard>
            {/*Render field to input user email*/}
            <View style={styles.container}>
                <Image
                    resizeMode={"contain"}
                    style={indexStyles.loginImage}
                    source={require("../assets/hand-logo.png")}
                />
                <View style={styles.forgotFormContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Email"
                        value={email}
                        onChangeText={(val) => setEmail(val)}
                        testID={"TEST_ID_EMAIL_INPUT"}
                    />

                    {/*Render button that calls forgotPassword method */}
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={indexStyles.loginButton}
                        onPress={() => forgotPassword()}
                        testID={"TEST_ID_FORGOT_BUTTON"}
                    >
                        <Text style={indexStyles.loginButtonText}>
                            RESET PASSWORD
                        </Text>
                    </TouchableOpacity>

                    {/*Render button that allows user to go back to login screen*/}
                    <Text
                        style={styles.textButton}
                        onPress={() => props.navigation.navigate("LoginScreen")}
                    >
                        Back to Login
                    </Text>

                    {/*Render text that shows error or success messages */}
                    <Text testID={"TEST_ID_MESSAGE"} style={{ color: "red" }}>
                        {message}
                    </Text>
                </View>
            </View>
        </DismissKeyboard>
    );
}
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "8%",
        top: "5%",
    },
    inputStyle: {
        width: "100%",
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },
    textButton: {
        color: colors.darkBorder,
        marginTop: 25,
        textAlign: "center",
    },
});
