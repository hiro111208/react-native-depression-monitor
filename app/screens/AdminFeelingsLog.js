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
import { render } from "enzyme";
import { floor } from "react-native-reanimated";

var feelingsDifference = [];

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

  function calculateDifference(index) {
    if (index < feelingsLog.length && index + 1 < feelingsLog.length) {
      return {
        anxiousDiff:
          switchScore(feelingsLog[index + 1].anxious) -
          switchScore(feelingsLog[index].anxious),
        sadDiff:
          switchScore(feelingsLog[index + 1].sad) -
          switchScore(feelingsLog[index].sad),
        happyDiff: feelingsLog[index + 1].happy - feelingsLog[index].happy,
        overall: feelingsLog[index + 1].overall,
        anxiousFinal: feelingsLog[index + 1].anxious,
        sadFinal: feelingsLog[index + 1].sad,
        happyFinal: feelingsLog[index + 1].happy,
      };
    } else {
      return {
        anxiousDiff: 0,
        sadDiff: 0,
        happyDiff: 0,
      };
    }
  }

  function getDateToString(dateAndTime) {
    const calender = dateAndTime.toString().substr(0, 15);
    const time = dateAndTime.toString().substr(16, 5);
    return calender + "  @ " + time;
  }

  function renderData() {
    return (
      <View style={styles.oval}>
        <Text style={styles.dateText}>{getDateToString()}</Text>
      </View>
    );
  }

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

  function renderDifferenceText() {
    if (!difference) {
      return "Show feelings difference";
    } else {
      return "Show feelings log";
    }
  }

  function getCorrectArray() {
    if (!difference) {
      return feelingsLog;
    } else {
      return feelingsDifference;
    }
  }

  function getCorrectHeader(logItem) {
    if (!difference) {
      return getDateToString(logItem.timeStamp.toDate());
    } else {
      return logItem.date;
    }
  }
  function getCorrectOverallFeeling(logItem) {
    if (!difference) {
      return (
        "DB" + route.params.currentUserID + " felt " + logItem.overall + "!"
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

  function generatePercentage(number) {
    if (number < 0) {
      return "-" + number * 20 + "%";
    } else {
      return "+" + number * 20 + "%";
    }
  }

  function getCorrectAnxiety(logItem) {
    if (!difference) {
      return "Free from anxiety";
    } else {
      return (
        "Free from anxiety: " + generatePercentage(logItem.data.anxiousDiff)
      );
    }
  }

  function getCorrectSadness(logItem) {
    if (!difference) {
      return "Free from sadness";
    } else {
      return "Free from sadness: " + generatePercentage(logItem.data.sadDiff);
    }
  }
  function getCorrectHappiness(logItem) {
    if (!difference) {
      return "Happiness";
    } else {
      return "Happiness: " + generatePercentage(logItem.data.happyDiff);
    }
  }

  function getCorrectAnxietyScore(logItem) {
    if (!difference) {
      return switchScore(logItem.anxious);
    } else {
      return switchScore(logItem.data.anxiousFinal);
    }
  }

  function getCorrectSadScore(logItem) {
    if (!difference) {
      return switchScore(logItem.sad);
    } else {
      return switchScore(logItem.data.sadFinal);
    }
  }

  function getCorrectHappyScore(logItem) {
    if (!difference) {
      return logItem.happy;
    } else {
      return logItem.data.happyFinal;
    }
  }

  function getCorrectColour(logItem, field) {
    if (!difference) {
      return "#000000";
    } else {
      return getCorrectDifferenceColour(logItem, field);
    }
  }

  function getCorrectDifferenceColour(logItem, field) {
    if (field == "anxious") {
      return getColour(logItem.data.anxiousDiff);
    } else if (field == "sad") {
      return getColour(logItem.data.sadDiff);
    } else {
      return getColour(logItem.data.happyDiff);
    }
  }

  function getColour(number) {
    if (number > 0) {
      return "#013220";
    } else if (number < 0) {
      return "#ff0000";
    } else {
      return "#ffff00";
    }
  }

  function toggleView() {
    if (!difference) {
      mapFeelingsLog();
    }
    setDifference(!difference);
  }

  //Render the data of the feelings log
  if (loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.data}>
        {getCorrectArray().map((logItem, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.oval}>
              <Text style={styles.dateText}>{getCorrectHeader(logItem)}</Text>
            </View>
            <View style={styles.largeOval}>
              <View style={styles.bars}>
                <Text style={styles.overallText}>
                  {getCorrectOverallFeeling(logItem)}
                </Text>
                <Text
                  style={[
                    styles.statText,
                    { color: getCorrectColour(logItem, "anxious") },
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
                    { color: getCorrectColour(logItem, "sad") },
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
                    { color: getCorrectColour(logItem, "happy") },
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
        <View style={styles.buttonsBlock}>
          <TouchableOpacity
            onPress={() => toggleView()}
            style={[styles.centering, styles.backButton]}
          >
            <Text style={[, { fontSize: 20 }]}>{renderDifferenceText()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.centering, styles.backButton]}
          >
            <Text style={[, { fontSize: 20 }]}>Return to user stats</Text>
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
    flex: 1,
    backgroundColor: "#ffbe7bff",
    alignItems: "center",
    justifyContent: "center",
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
    width: "100%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  largeOval: {
    width: "90%",
    height: 250,
    borderRadius: 50,
    borderColor: "black",
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
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffbe7bff",
  },
  item: { paddingVertical: 15 },
  centering: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AdminFeelingsLog;
