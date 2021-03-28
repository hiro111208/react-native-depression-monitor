import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import colors from "../config/colors";
import * as indexStyles from "../config/indexStyles";
import { TouchableOpacity } from "react-native";
import { Touchable } from "react-native";
import firebase from "../database/firebase";

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
    <View style={[indexStyles.containerWhite]}>
      <View style={[indexStyles.containerOrange, indexStyles.shadowEffect, styles.cover]}>
        <View style={{ height: "10%" }}></View>

        <View style={[{ height: "40%" }, indexStyles.centering]}>
          <Text style={[indexStyles.textGrey, { fontSize: 25 }]}>
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
              style={[indexStyles.textGrey, indexStyles.centering, { fontSize: 18 }]}
            >
              Therapy Question Management
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: "22%" }}></View>

        <View style={[{ height: "10%" }, indexStyles.centering]}>
          <TouchableOpacity
            onPress={() => signOut()}
            style={[styles.bottomButton, indexStyles.shadowEffect, indexStyles.centering]}
          >
            <Text style={[indexStyles.textGrey, { fontSize: 17 }]}>Log out</Text>
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
  cover: {
    height: "100%",
    width: "100%",
  },
  optButton: {
    backgroundColor: "#ffeed2",
  },
});
