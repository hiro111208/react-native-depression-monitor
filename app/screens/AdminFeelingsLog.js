import { getNextTriggerDateAsync } from "expo-notifications";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import ProgressBar from "../src/components/ProgressBar";

const AdminFeelingsLog = () => {
  function getDateToString() {
    const date = new Date();
    const calender = date.toString().substr(4, 11);
    const time = date.toString().substr(15, 6);
    return calender + "  @ " + time;
  }

  function renderData() {
    return (
      <View style={styles.oval}>
        <Text style={styles.dateText}>{getDateToString()}</Text>
      </View>
    );
  }

  function renderStats() {
    return (
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
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.data}>
        {renderData()}
        {renderStats()}
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
});

export default AdminFeelingsLog;
