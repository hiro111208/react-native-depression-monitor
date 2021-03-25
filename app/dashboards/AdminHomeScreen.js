import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import firebase from "../database/firebase";

import colors from "../config/colors";
import { TouchableOpacity } from "react-native";
import { Touchable } from "react-native";

export default function AdminHomeScreen({ props, navigation }) {
  const [errorMessage, setErrorMessage] = useState("");

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
    <View style={[styles.container]}>
      <View style={[styles.center, styles.shadowEffect, styles.cover]}>
        <View style={{ height: "10%" }}></View>

        <View style={[{ height: "40%" }, styles.centering]}>
          <Text style={styles.helloFont}>Hello, admin!</Text>
          <Image
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
            source={require("../assets/hand-logo.png")}
          />
        </View>

        <View style={{ height: "15%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TherapyQuestionScreen")}
            style={[styles.centering, styles.optButton, styles.cover]}
          >
            <Text style={[styles.optFont, styles.centering]}>
              Therapy Question Management
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[{ height: "10%" }, styles.centering]}>
          <TouchableOpacity
            style={[styles.bottomButton, styles.shadowEffect]}
          ></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

{
  /* <View style={styles.container}>
      <Text style={styles.textStyle}>Hello, Admin</Text>
      <Button
        color={colors.darkBorder}
        title="Go to therapy question mangement"
        onPress={() => navigation.navigate('TherapyQuestionScreen')}
      />
      <Button
        color={colors.darkBorder}
        title="Logout"
        onPress={() => signOut()}
      />
    </View> */
}

const styles = StyleSheet.create({
  bottomButton: {
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
    flex: 1,
    display: "flex",
    padding: 25,
    backgroundColor: "#fff",
  },
  cover: {
    height: "100%",
    width: "100%",
  },
  helloFont: {
    fontSize: 25,
    fontWeight: "bold",
    color: "dimgray",
  },
  optFont: {
    fontSize: 18,
    fontWeight: "bold",
    color: "dimgray",
  },
  optButton: {
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
});
