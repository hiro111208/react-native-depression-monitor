import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import ProgressBar from "../src/components/ProgressBar";
import firebase from "../database/firebase";
import * as indexStyles from "../config/indexStyles";
import colors from "../config/colors";

// option to toggle view to see the difference of feelings
var feelingsDifference = [];

/** Returns the feelings data for a user */
const AdminFeelingsLog = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [feelingsLog, setFeelingsLog] = useState([]);
    const [difference, setDifference] = useState(false);

    const feelingsRef = firebase
        .firestore()
        .collection("feelings")
        .where("userID", "==", route.params.currentUserID)
        .orderBy("timeStamp");

    // Gets therapy content while screen is rendering
    useEffect(() => {
        getFeelingsData();
    }, []);

    // accesses the user's progress and gets the questions
    function getFeelingsData() {
        feelingsRef
            .get()
            .then((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                });
                setFeelingsLog(items);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    // maps the feelings data to each session for comparison
    function mapFeelingsLog() {
        var indexCount = 0;
        var i;
        for (i = 0; i < Math.floor(feelingsLog.length / 2); i++) {
            feelingsDifference.push({
                date: "End of Session " + (i + 1),
                data: calculateDifference(indexCount),
            });
            indexCount += 2;
        }
        console.log(feelingsDifference);
    }

    // calculates the difference between both data
    function calculateDifference(index) {
        if (index < feelingsLog.length && index + 1 < feelingsLog.length) {
            return {
                anxiousDiff:
                    switchScore(feelingsLog[index + 1].anxious) -
                    switchScore(feelingsLog[index].anxious),
                sadDiff:
                    switchScore(feelingsLog[index + 1].sad) -
                    switchScore(feelingsLog[index].sad),
                happyDiff:
                    feelingsLog[index + 1].happy - feelingsLog[index].happy,
                overall: feelingsLog[index + 1].overall,
                anxiousFinal: feelingsLog[index + 1].anxious,
                sadFinal: feelingsLog[index + 1].sad,
                happyFinal: feelingsLog[index + 1].happy,
            };
        } else {
            // no data is present
            return {
                anxiousDiff: 0,
                sadDiff: 0,
                happyDiff: 0,
            };
        }
    }

    // return firestore timestamp in a readable format
    function getDateToString(dateAndTime) {
        const calender = dateAndTime.toString().substr(0, 15);
        const time = dateAndTime.toString().substr(16, 5);
        return calender + "  @ " + time;
    }

    // convert a negative score into a positive (changing sad to freedom from sadness)
    function switchScore(score) {
        switch (score) {
            case 1:
                return 5;
            case 2:
                return 4;
            case 3:
                return 3;
            case 4:
                return 2;
            case 5:
                return 1;
        }
    }

    // render's button text to toggle between the views
    function renderDifferenceText() {
        if (!difference) {
            return "Show feelings difference";
        } else {
            return "Show feelings log";
        }
    }

    // return correct array according to the toggle
    function getCorrectArray() {
        if (!difference) {
            return feelingsLog;
        } else {
            return feelingsDifference;
        }
    }

    // converts dates to sessions if the difference view is shown
    function getCorrectHeader(logItem) {
        if (!difference) {
            return getDateToString(logItem.timeStamp.toDate());
        } else {
            return logItem.date;
        }
    }

    // presents the overall stat from firebase according to the view
    function getCorrectOverallFeeling(logItem) {
        if (!difference) {
            return (
                "DB" +
                route.params.currentUserID +
                " felt " +
                logItem.overall +
                "!"
            );
        } else {
            return (
                "DB" +
                route.params.currentUserID +
                " became " +
                logItem.data.overall +
                "!"
            );
        }
    }

    // shows the change of value in a percentage
    function generatePercentage(number) {
        if (number < 0) {
            return number * 20 + "%";
        } else {
            return "+" + number * 20 + "%";
        }
    }

    // presents the correct header for the anxiety bar
    function getCorrectAnxiety(logItem) {
        if (!difference) {
            return "Free from anxiety";
        } else {
            return (
                "Free from anxiety: " +
                generatePercentage(logItem.data.anxiousDiff)
            );
        }
    }

    // presents the correct header for the sadness bar
    function getCorrectSadness(logItem) {
        if (!difference) {
            return "Free from sadness";
        } else {
            return (
                "Free from sadness: " + generatePercentage(logItem.data.sadDiff)
            );
        }
    }

    // presents the correct header for the happiness bar
    function getCorrectHappiness(logItem) {
        if (!difference) {
            return "Happiness";
        } else {
            return "Happiness: " + generatePercentage(logItem.data.happyDiff);
        }
    }

    // presents the correct score for anxiety
    function getCorrectAnxietyScore(logItem) {
        if (!difference) {
            return switchScore(logItem.anxious);
        } else {
            return switchScore(logItem.data.anxiousFinal);
        }
    }

    // presents the correct score for sadness
    function getCorrectSadScore(logItem) {
        if (!difference) {
            return switchScore(logItem.sad);
        } else {
            return switchScore(logItem.data.sadFinal);
        }
    }

    // presents the correct score for happiness
    function getCorrectHappyScore(logItem) {
        if (!difference) {
            return logItem.happy;
        } else {
            return logItem.data.happyFinal;
        }
    }

    // shows difference in a customised colour
    function getCorrectColour(logItem, field) {
        if (!difference) {
            return "#000000";
        } else {
            return getCorrectDifferenceColour(logItem, field);
        }
    }

    // returns green for positive numbers and red for negative
    function getCorrectDifferenceColour(logItem, field) {
        if (field == "anxious") {
            return getColour(logItem.data.anxiousDiff);
        } else if (field == "sad") {
            return getColour(logItem.data.sadDiff);
        } else {
            return getColour(logItem.data.happyDiff);
        }
    }

    // returns the correct colour according to the value
    function getColour(number) {
        if (number > 0) {
            return "#013220";
        } else if (number < 0) {
            return "#ff0000";
        } else {
            return "#ffff00";
        }
    }

    // switch to compare difference between feelings data
    function toggleView() {
        if (!difference && feelingsDifference.length == 0) {
            mapFeelingsLog();
        }
        setDifference(!difference);
    }

    //Render the data of the feelings log
    if (loading) {
        return (
            <View style={[indexStyles.preloader, indexStyles.centering]}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.data}>
                {/** Map data to a view to present each element */}
                {getCorrectArray().map((logItem, index) => (
                    <View key={index} style={styles.item}>
                        <View style={[styles.oval, indexStyles.centering]}>
                            <Text style={styles.dateText}>
                                {getCorrectHeader(logItem)}
                            </Text>
                        </View>
                        <View style={styles.largeOval}>
                            {/** Present stats as progress bars */}
                            <View style={styles.bars}>
                                <Text style={styles.overallText}>
                                    {getCorrectOverallFeeling(logItem)}
                                </Text>
                                <Text
                                    style={[
                                        styles.statText,
                                        {
                                            color: getCorrectColour(
                                                logItem,
                                                "anxious"
                                            ),
                                        },
                                    ]}
                                >
                                    {getCorrectAnxiety(logItem)}
                                </Text>
                                <ProgressBar
                                    style={styles.progressBar}
                                    segments={5}
                                    nextWidth={getCorrectAnxietyScore(logItem)}
                                ></ProgressBar>
                                <Text
                                    style={[
                                        styles.statText,
                                        {
                                            color: getCorrectColour(
                                                logItem,
                                                "sad"
                                            ),
                                        },
                                    ]}
                                >
                                    {getCorrectSadness(logItem)}
                                </Text>
                                <ProgressBar
                                    style={styles.progressBar}
                                    segments={5}
                                    nextWidth={getCorrectSadScore(logItem)}
                                ></ProgressBar>
                                <Text
                                    style={[
                                        styles.statText,
                                        {
                                            color: getCorrectColour(
                                                logItem,
                                                "happy"
                                            ),
                                        },
                                    ]}
                                >
                                    {getCorrectHappiness(logItem)}
                                </Text>
                                <ProgressBar
                                    style={styles.progressBar}
                                    segments={5}
                                    nextWidth={getCorrectHappyScore(logItem)}
                                ></ProgressBar>
                            </View>
                        </View>
                    </View>
                ))}

                {/** button to switch to feelings comparison and vice versa */}
                <View style={styles.buttonsBlock}>
                    <TouchableOpacity
                        onPress={() => toggleView()}
                        style={[indexStyles.centering, styles.backButton]}
                    >
                        <Text style={{ fontSize: 20 }}>
                            {renderDifferenceText()}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[indexStyles.centering, styles.backButton]}
                    >
                        <Text style={{ fontSize: 20 }}>
                            Return to user stats
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backButton: {
        width: "80%",
        height: 50,
        marginHorizontal: 11,
        marginBottom: 15,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        textAlign: "center",
        padding: 10,
        shadowOpacity: 0.4,
        shadowRadius: 10,
        backgroundColor: "#FFF",
        borderRadius: 10,
        alignSelf: "center",
    },
    buttonsBlock: {
        marginTop: 15,
        marginBottom: 30,
    },
    container: {
        marginTop: 3,
        backgroundColor: colors.background,
        borderRadius: 20,
        borderColor: colors.darkBorder,
        borderWidth: 3,
        flex: 1,
    },
    data: {
        paddingTop: 20,
        width: "100%",
        padding: 5,
    },
    dateText: {
        fontWeight: "bold",
        fontSize: 24,
    },
    oval: {
        width: "90%",
        height: 50,
        borderRadius: 50,
        backgroundColor: "white",
        alignSelf: "center",
    },
    largeOval: {
        width: "90%",
        height: 250,
        borderRadius: 50,
        borderColor: "dimgray",
        marginTop: 5,
        padding: 10,
        borderWidth: 5,
        backgroundColor: "transparent",
        alignSelf: "center",
    },
    statText: {
        fontSize: 20,
        paddingLeft: 10,
        paddingVertical: 7,
    },
    overallText: {
        paddingVertical: 10,
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    item: { paddingVertical: 15 },
});

export default AdminFeelingsLog;
