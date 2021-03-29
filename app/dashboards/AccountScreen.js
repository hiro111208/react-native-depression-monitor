import React, { useState } from "react";
<<<<<<< HEAD
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
=======
import { ScrollView ,View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
>>>>>>> origin
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
<<<<<<< HEAD
    <View style={[styles.container, styles.centering]}>
      <View style={[styles.center, styles.shadowEffect, styles.cover]}>
        <View style={{ height: "5%" }}></View>
        <View style={[{ height: "40%" }, styles.centering]}>
          <Image
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
            source={require("../assets/hand-logo.png")}
          />
        </View>
        <View style={[{ height: "10%" }]}>
=======
    <ScrollView style={styles.container}>
      <View style={styles.center}>

        <View style={[styles.welcomeArea, styles.shadowEffect]}>
          <View style={[styles.userNote]}>
            <Text>Log out information here</Text>
          </View>

>>>>>>> origin
          <TouchableOpacity
            onPress={() => navigation.navigate("SupportResources")}
            style={[styles.optButton, styles.cover, styles.centering]}
          >
            <Text style={[styles.fontStyle, { fontSize: 17 }]}>
              Support Resources
            </Text>
          </TouchableOpacity>
        </View>
<<<<<<< HEAD
        <View style={{ height: "2%" }}></View>
        <View style={[{ height: "10%" }]}>
=======
        
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

>>>>>>> origin
          <TouchableOpacity
            style={[styles.optButton, styles.cover, styles.centering]}
          >
            <Text style={[styles.fontStyle, { fontSize: 17 }]}>
              Replay Demo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: "23%" }}></View>
        <View style={[{ height: "10%" }, styles.centering]}>
          <TouchableOpacity
            onPress={() => signOut()}
            style={[
              styles.optButton,
              styles.cover,
              styles.centering,
              { borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
            ]}
          >
            <Text style={[styles.fontStyle, { fontSize: 17, color: "black" }]}>
              LOG OUT
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bottomBorder: {
    height: "100%",
    width: "40%",
    borderRadius: 50,
    backgroundColor: "#ffeed2",
  },
  center: {
    backgroundColor: "#fed8b1",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#ffeed2",
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
<<<<<<< HEAD
    flex: 1,
    display: "flex",
    padding: 25,
=======
>>>>>>> origin
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
  cover: {
    height: "100%",
    width: "100%",
<<<<<<< HEAD
  },
  fontStyle: {
    fontWeight: "bold",
    color: "dimgray",
=======
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
>>>>>>> origin
  },
  optButton: {
    backgroundColor: "#ffeed2",
  },
  scheduleText: {
    fontSize: 15,
  },
  selectButton: {
    backgroundColor: "#ffeed2",
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
    fontSize: 18,
  },
});
