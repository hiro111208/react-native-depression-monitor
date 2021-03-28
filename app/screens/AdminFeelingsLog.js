import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ProgressBar from "../src/components/ProgressBar";
import firebase from "../database/firebase";

const feelingsRef = firebase
  .firestore()
  .collection("feelings")
  .where("userID", "==", 8)
  .orderBy("timeStamp");

const AdminFeelingsLog = () => {
  const [loading, setLoading] = useState(true);
  const [feelingsLog, setFeelingsLog] = useState([]);

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
    console.log(dateAndTime);
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
          <View id={index} style={styles.item}>
            <View style={styles.oval}>
              <Text style={styles.dateText}>
                {getDateToString(logItem.timeStamp.toDate())}
              </Text>
            </View>
            <View style={styles.largeOval}>
              <View style={styles.bars}>
                <Text style={styles.overallText}>DB8 felt very happy!</Text>
                <Text style={styles.statText}>Anxious</Text>
                <ProgressBar
                  style={styles.progressBar}
                  segments={5}
                  nextWidth={0}
                ></ProgressBar>
                <Text style={styles.statText}>Friendly</Text>
                <ProgressBar
                  style={styles.progressBar}
                  segments={5}
                  nextWidth={0}
                ></ProgressBar>
                <Text style={styles.statText}>Paranoid</Text>
                <ProgressBar
                  style={styles.progressBar}
                  segments={5}
                  nextWidth={0}
                ></ProgressBar>
                <Text style={styles.statText}>Sad</Text>
                <ProgressBar
                  style={styles.progressBar}
                  segments={5}
                  nextWidth={0}
                ></ProgressBar>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    height: 300,
    borderRadius: 50,
    borderColor: "black",
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
});

export default AdminFeelingsLog;
