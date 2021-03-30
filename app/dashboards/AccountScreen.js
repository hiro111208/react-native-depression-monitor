import React, { useState } from "react";
import { ScrollView ,View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
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
    <ScrollView style={styles.container}>
      <View style={styles.center}>

        <View style={[styles.welcomeArea, styles.shadowEffect]}>
          <View style={[styles.userNote]}>
            <Text>Log out information here</Text>
          </View>

          <TouchableOpacity
            style={[styles.logout, styles.centering]}
            onPress={() => signOut()}
          >
            <Text style={styles.textStyle}>Logout</Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.welcomeArea, styles.shadowEffect]}>
          <View style={[styles.userNote]}>
            <Text>Demo</Text>
          </View>

          <TouchableOpacity
            style={[styles.logout, styles.centering]}
            onPress={() => navigation.navigate("DemoScreen")}
          >
            <Text style={styles.textStyle}>Demo</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.welcomeArea, styles.shadowEffect]}>
          <View style={[styles.userNote]}>
            <Text>Support Resources and research authors</Text>
          </View>

          <TouchableOpacity
            style={[styles.logout, styles.centering]}
            onPress={() => navigation.navigate("SupportResources")}
          >
            <Text style={styles.textStyle}>Support Resources</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
  center: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
  },
  welcomeArea: {
    width: "100%",
    height: "45%",
    borderRadius: 50,
    alignItems: "center",
    marginBottom:"10%"
  },
  userNote: {
    height: "80%",
    width: "100%",
    backgroundColor: "#ffeed2",
    alignItems: "center",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    padding: 20,
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
  shadowEffect: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "dimgray",
  },
  centering: {
    alignContent: "center",
    justifyContent: "center",
  },
});
