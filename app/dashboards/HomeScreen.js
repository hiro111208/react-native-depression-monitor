import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import firebase from "../../firebase.js";

import colors from "../config/colors";

export default function HomeScreen({ route, props, navigation }) {
  const [displayName, setDisplayName] = useState(
    firebase.auth().currentUser !== null
      ? firebase.auth().currentUser.displayName
      : ""
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Hello, {displayName}</Text>

      <Button
        color={colors.darkBorder}
        title="Go to Sessions"
        onPress={() => navigation.navigate("TherapyScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});
