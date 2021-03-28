import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import firebase from "../database/firebase";

import colors from "../config/colors";
import indexStyles from "../config/indexStyles";
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

        <View style={[{ height: "40%" }, indexStyles.centering]}>
          <Text style={[styles.fontStyle, { fontSize: 25 }]}>
            Hello, admin!
          </Text>
          <Image
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
            source={require("../assets/hand-logo.png")}
          />
        </View>

        <View style={{ height: "15%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TherapyQuestionScreen")}
            style={[indexStyles.centering, styles.optButton, styles.cover]}
          >
            <Text
              style={[styles.fontStyle, indexStyles.centering, { fontSize: 18 }]}
            >
              Therapy Question Management
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: "22%" }}></View>

        <View style={[{ height: "10%" }, indexStyles.centering]}>
          <TouchableOpacity
            onPress={() => signOut()}
            style={[styles.bottomButton, styles.shadowEffect, indexStyles.centering]}
          >
            <Text style={[styles.fontStyle, { fontSize: 17 }]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    height: "100%",
    width: "40%",
    borderRadius: 50,
    backgroundColor: "#ffeed2",
    position: "absolute",
    bottom: 0,
  },
  center: {
    backgroundColor: "#fed8b1",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#ffeed2",
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
  fontStyle: {
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
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 5,
  },
});
