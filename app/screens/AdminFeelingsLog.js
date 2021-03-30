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
          console.log(doc.data());
        });
        setFeelingsLog(items);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
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
        {feelingsLog.map((logItem, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.oval}>
              <Text style={styles.dateText}>
                {getDateToString(logItem.timeStamp.toDate())}
              </Text>
            </View>
            <View style={styles.largeOval}>
              <View style={styles.bars}>
                <Text style={styles.overallText}>
                  DB{route.params.currentUserID} felt {logItem.overall}!
                </Text>
                <Text style={styles.statText}>Free from anxiety</Text>
                <ProgressBar
                  style={styles.progressBar}
                  segments={5}
                  nextWidth={switchScore(logItem.anxious)}
                ></ProgressBar>
                <Text style={styles.statText}>Free from sadness</Text>
                <ProgressBar
                  style={styles.progressBar}
                  segments={5}
                  nextWidth={switchScore(logItem.sad)}
                ></ProgressBar>
                <Text style={styles.statText}>Happy</Text>
                <ProgressBar
                  style={styles.progressBar}
                  segments={5}
                  nextWidth={logItem.happy}
                ></ProgressBar>
              </View>
            </View>
          </View>
        ))}
        <View style={styles.buttonsBlock}>
          <TouchableOpacity
            onPress={() => setDifference(!difference)}
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
