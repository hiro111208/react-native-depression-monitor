import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
} from "react-native";
import firebase from "../database/firebase";
import colors from "../config/colors";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as indexStyles from "../config/indexStyles";
import Constants from "expo-constants";

/** Default screen in the patient dashboard contain links to
 * navigate to therapy screen or interact with the plant
 */
export default function HomeScreen({ navigation }) {
    const [user, setUser] = useState(undefined);
    const [plant, setPlant] = useState(require("../assets/stage_1.png"));
    const [displayName, setDisplayName] = useState(
        firebase.auth().currentUser !== null
            ? firebase.auth().currentUser.displayName
            : ""
    );

    // Sync user's previous progress
    useEffect(() => {
        getLevel();
    }, []);

    // Get data from firestore
    function getLevel() {
        firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((doc) => {
                setUser(doc.data());
                const level = doc.data().level;
                updatePath(level);
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }

    // change rendered plant image according to the level of the user
    function updatePath(lvl) {
        switch (lvl) {
            case 1:
                setPlant(require("../assets/stage_1.png"));
                break;
            case 2:
                setPlant(require("../assets/stage_2.png"));
                break;
            case 3:
                setPlant(require("../assets/stage_3.png"));
                break;
            case 4:
                setPlant(require("../assets/stage_4.png"));
                break;
            case 5:
                setPlant(require("../assets/stage_5.png"));
                break;
            case 6:
                setPlant(require("../assets/stage_6.png"));
                break;
            case 7:
                setPlant(require("../assets/stage_7.png"));
                break;
            case 8:
                setPlant(require("../assets/stage_8.png"));
                break;
            case 9:
                setPlant(require("../assets/stage_9.png"));
                break;
            default:
                setPlant(require("../assets/stage_9.png"));
        }
    }

    // Update data when returning from interaction or therapy screen
    function refresh() {
        getLevel();
    }

    // Setup push notification for user
    useEffect(() => {
        (() => registerForPushNotificationsAsync())();
    }, []);

    // Create token for push notifications and add it to the users collection
    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Permissions.askAsync(
                    Permissions.NOTIFICATIONS
                );
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                return false;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        // save the users token in firebase
        if (token) {
            const res = await firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({ token }, { merge: true });
        }
        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }
        return token;
    };

    return (
        <View style={[styles.container, indexStyles.centering]}>
            <View style={[styles.center, indexStyles.cover]}>
                <View
                    style={[
                        styles.welcomeArea,
                        indexStyles.shadowEffect,
                        indexStyles.cover,
                    ]}
                >
                    <View style={styles.userNote}>
                        <Text style={[styles.textStyle]}>
                            Hello there, {displayName}!
                        </Text>
                        <View style={{ height: "20%" }}></View>
                        <View
                            style={[
                                styles.plantImage,
                                indexStyles.centering,
                                indexStyles.shadowEffect,
                            ]}
                        >
                            <Image
                                style={{ width: "100%", height: "100%" }}
                                resizeMode="contain"
                                source={plant}
                                testID={"PLANT_IMAGE"}
                            />
                        </View>
                    </View>

                    {/** navigation button to begin therapy */}
                    <View style={{ height: "30%" }}></View>
                    <TouchableOpacity
                        style={[
                            styles.sessionArea,
                            indexStyles.centering,
                            indexStyles.shadowEffect,
                        ]}
                        onPress={() => {
                            if (user.question === 0) {
                                navigation.navigate("LogFeelingScreen", {
                                    cameFrom: "HomeScreen",
                                    onGoBack: () => refresh(),
                                    userData: user,
                                });
                            } else {
                                navigation.navigate("TherapyScreen", {
                                    onGoBack: () => refresh(),
                                    question: user.question,
                                });
                            }
                        }}
                        testID={"SESSION_BUTTON"}
                    >
                        <Text style={styles.textStyle}>Go to your session</Text>
                    </TouchableOpacity>

                    {/** interact with plant navigation button */}
                    <TouchableOpacity
                        style={[
                            styles.sessionArea,
                            indexStyles.centering,
                            indexStyles.shadowEffect,
                        ]}
                        onPress={() =>
                            navigation.navigate("PlantScreen", {
                                currentUser: user,
                                onGoBack: () => refresh(),
                            })
                        }
                        testID={"PLANT_BUTTON"}
                    >
                        <Text style={styles.textStyle}>
                            Interact with your plant
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        padding: 25,
        backgroundColor: "#fff",
    },
    center: {
        alignItems: "center",
    },
    welcomeArea: {
        borderRadius: 50,
        backgroundColor: colors.mainPanel,
        alignItems: "center",
        borderWidth: 5,
        borderColor: colors.lightOutline,
    },
    userNote: {
        height: "30%",
        width: "100%",
        backgroundColor: colors.lightOutline,
        alignItems: "center",
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        padding: 20,
    },
    sessionArea: {
        height: "17%",
        width: "90%",
        backgroundColor: colors.lightOutline,
        padding: 10,
        borderRadius: 20,
    },
    textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "dimgray",
    },
    plantImage: {
        width: 225,
        height: 225,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "#fff",
        backgroundColor: "#eee",
    },
});
