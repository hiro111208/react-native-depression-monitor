import { getNextTriggerDateAsync } from "expo-notifications";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

function getTestDate() {
  const date = new Date();
  return date.toString().substr(4, 20);
}

function renderData() {
  return (
    <View style={styles.oval}>
      <Text> {getTestDate()}</Text>
    </View>
  );
}

const AdminFeelingsLog = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.data}>{renderData()}</ScrollView>
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
  oval: {
    width: "100%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    alignSelf: "center",
  },
});

export default AdminFeelingsLog;
