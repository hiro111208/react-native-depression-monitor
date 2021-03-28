import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import * as indexStyles from "../config/indexStyles";
import firebase from "../database/firebase";

export default function AccountScreen({ props, navigation }) {
  const [displayName, setDisplayName] = useState(
    firebase.auth().currentUser !== null
      ? firebase.auth().currentUser.displayName
      : ""
  );

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
    <View style={[styles.container, indexStyles.centering]}>
      <View style={[styles.center, indexStyles.cover]}>
        <View style={[styles.welcomeArea, indexStyles.shadowEffect]}>
          <View style={[styles.userNoteHeight, indexStyles.userNote]}>
            <Text>Log out information here</Text>
          </View>

          <TouchableOpacity
            style={[styles.logout, indexStyles.centering]}
            onPress={() => signOut()}
          >
            <Text style={indexStyles.textGrey}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text />
        <Text />

        <View style={[styles.welcomeArea, indexStyles.shadowEffect]}>
          <View style={[styles.userNoteHeight, indexStyles.userNote]}>
            <Text>Support Resources and research authors</Text>
          </View>

          <TouchableOpacity
            style={[styles.logout, indexStyles.centering]}
            onPress={() => navigation.navigate("SupportResources")}
          >
            <Text style={indexStyles.textGrey}>Support Resources</Text>
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
    backgroundColor: "white",
  },
  center: {
    alignItems: "center",
    padding: 25,
  },
  welcomeArea: {
    width: "100%",
    height: "45%",
    borderRadius: 50,
    alignItems: "center",
  },
  userNoteHeight: {
    height: "80%",
  },
  logout: {
    height: "30%",
    width: "100%",
    backgroundColor: "#fed8b1",
    alignItems: "center",
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    padding: 20,
  },
});
