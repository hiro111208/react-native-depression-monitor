import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as indexStyles from "../config/indexStyles";
import firebase from "../database/firebase";

/*
 * Option for the user to drop a category
 */
const CategoryDrop = ({ route, navigation }) => {
    // Stores user data passed from the previous screen
    const userProgress = route.params.user;

    // Reference to the path of the user's data
    const ref = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);

    // Drops the category for the user or assigns them to control data set
    function chooseOption(chosenCategory) {
        var num = Math.random();
        if (num <= 0.5) {
            chosenCategory = "CONTROL";
        }
        userProgress.categoryDropped = chosenCategory;

        //Update the database with new category
        ref.set(
            {
                categoryDropped: userProgress.categoryDropped,
                lastActive: new Date(),
            },
            { merge: true }
        )
            .then(() => {
                console.log(
                    "Category successfully dropped" +
                        userProgress.categoryDropped
                );
                navigation.navigate("PatientDashboard");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={[styles.top, indexStyles.centering]}>
                <Text style={styles.text} testID={"INSTRUCTIONS"}>
                    Drop the subject you are least interested in.
                </Text>
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.bottomItem}
                    onPress={() => chooseOption("SOCIAL")}
                    testID={"SOCIAL_BUTTON"}
                >
                    <View
                        style={[
                            styles.bottomItemInner,
                            indexStyles.shadowEffect,
                            indexStyles.centering,
                        ]}
                    >
                        <Text style={styles.text}>Social</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bottomItem}
                    onPress={() => chooseOption("ACADEMIC")}
                    testID={"ACADEMIC_BUTTON"}
                >
                    <View
                        style={[
                            styles.bottomItemInner,
                            indexStyles.shadowEffect,
                            indexStyles.centering,
                        ]}
                    >
                        <Text style={styles.text}>Academic</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bottomItem}
                    onPress={() => chooseOption("HEALTH")}
                    testID={"MOOD_BUTTON"}
                >
                    <View
                        style={[
                            styles.bottomItemInner,
                            indexStyles.shadowEffect,
                            indexStyles.centering,
                        ]}
                    >
                        <Text style={styles.text}>Mood</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bottomItem}
                    onPress={() => chooseOption("HEALTH")}
                    testID={"HEALTH_BUTTON"}
                >
                    <View
                        style={[
                            styles.bottomItemInner,
                            indexStyles.shadowEffect,
                            indexStyles.centering,
                        ]}
                    >
                        <Text style={styles.text}>Health</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bottomItem}
                    onPress={() => chooseOption("HOBBIES")}
                    testID={"HOBBIES_BUTTON"}
                >
                    <View
                        style={[
                            styles.bottomItemInner,
                            indexStyles.shadowEffect,
                            indexStyles.centering,
                        ]}
                    >
                        <Text style={styles.text}>Hobbies</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bottomItem}
                    onPress={() => chooseOption("FAMILY")}
                    testID={"FAMILY_BUTTON"}
                >
                    <View
                        style={[
                            styles.bottomItemInner,
                            indexStyles.shadowEffect,
                            indexStyles.centering,
                        ]}
                    >
                        <Text style={styles.text}>Family</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bottomItem}
                    onPress={() => chooseOption("WORK")}
                    testID={"WORK_BUTTON"}
                >
                    <View
                        style={[
                            styles.bottomItemInner,
                            indexStyles.shadowEffect,
                            indexStyles.centering,
                        ]}
                    >
                        <Text style={styles.text}>Work</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bottomItem}
                    onPress={() => chooseOption("RELATIONSHIP")}
                    testID={"RELATIONSHIP_BUTTON"}
                >
                    <View
                        style={[
                            styles.bottomItemInner,
                            indexStyles.shadowEffect,
                            indexStyles.centering,
                        ]}
                    >
                        <Text style={styles.text}>Relationship</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffd394",
    },
    text: {
        color: "black",
        fontSize: 20,
    },
    top: {
        height: "10%",
    },
    bottom: {
        height: "90%",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5,
    },
    bottomItem: {
        width: "50%",
        height: "20%",
        padding: 10,
    },
    bottomItemInner: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
    },
});

export default CategoryDrop;
