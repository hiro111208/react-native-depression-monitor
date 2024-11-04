import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../config/colors";
import firebase from "../database/firebase";
import * as indexStyles from "../config/indexStyles";

/**
 * Screen that renders account options such as signing out,
 * replaying demo or navigating to support resources
 */
export default function AccountScreen({ props, navigation }) {
    const [displayName, setDisplayName] = useState(
        firebase.auth().currentUser !== null
            ? firebase.auth().currentUser.displayName
            : ""
    );

    // Sign out from the application
    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("Logout successful");
                navigation.popToTop();
            })
            .catch((error) => setErrorMessage(error.message));
    };

    return (
        <View
            style={[styles.container, indexStyles.centering, indexStyles.cover]}
        >
            <View
                style={[
                    styles.center,
                    indexStyles.shadowEffect,
                    indexStyles.cover,
                ]}
            >
                <View style={{ height: "5%" }}></View>

                {/* Render logo of the app */}
                <View style={[{ height: "40%" }, indexStyles.centering]}>
                    <Image
                        style={{ width: 200, height: 200 }}
                        resizeMode="contain"
                        source={require("../assets/hand-logo.png")}
                        testID={"LOGO"}
                    />
                </View>

                {/* Support resources button */}
                <View style={[{ height: "10%" }]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SupportResources")}
                        style={[
                            styles.optButton,
                            indexStyles.cover,
                            indexStyles.centering,
                        ]}
                        testID={"SUPPORT_BUTTON"}
                    >
                        <Text style={[styles.fontStyle, { fontSize: 17 }]}>
                            Support Resources
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: "2%" }}></View>

                {/* Button to demo screen */}
                <View style={[{ height: "10%" }]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("DemoScreen")}
                        style={[
                            styles.optButton,
                            indexStyles.cover,
                            indexStyles.centering,
                        ]}
                        testID={"DEMO_BUTTON"}
                    >
                        <Text style={[styles.fontStyle, { fontSize: 17 }]}>
                            Replay Demo
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: "23%" }}></View>

                {/* Sign out button that goes back to login screen */}
                <View style={[{ height: "10%" }, indexStyles.centering]}>
                    <TouchableOpacity
                        onPress={() => signOut()}
                        style={[
                            styles.optButton,
                            indexStyles.cover,
                            indexStyles.centering,
                            {
                                borderBottomLeftRadius: 40,
                                borderBottomRightRadius: 40,
                            },
                        ]}
                        testID={"LOGOUT_BUTTON"}
                    >
                        <Text
                            style={[
                                styles.fontStyle,
                                { fontSize: 17, color: "black" },
                            ]}
                        >
                            LOG OUT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        backgroundColor: colors.mainPanel,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: colors.lightOutline,
    },
    container: {
        flex: 1,
        display: "flex",
        padding: 25,
        backgroundColor: "#fff",
    },
    fontStyle: {
        fontWeight: "bold",
        color: "dimgray",
    },
    optButton: {
        backgroundColor: colors.lightOutline,
    },
});
