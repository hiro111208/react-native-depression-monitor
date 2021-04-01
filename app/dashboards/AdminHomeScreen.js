import React, { useState } from "react";
import {
   StyleSheet,
   View,
   Text,
   Button,
   Image 
} from "react-native";
import firebase from "../database/firebase";

import colors from "../config/colors";
import { TouchableOpacity } from "react-native";
import { Touchable } from "react-native";

import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import moment from 'moment';


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

  // method call on ExportCSV
  onCreateCSV = async () => {
    firebase.firestore().collection("answers").get().then(async (querySnapshot) => {
      const headerString = 'categoryDropped, question, question1IsCorrect, question1Time, question2IsCorrect, question2Time, sessionNumber, userId \n';
      let rowString = ''
      querySnapshot.forEach((doc) => {
        rowString = rowString +
          `${doc.data().categoryDropped},
        ${doc.data().question},
        ${doc.data().question1IsCorrect},
        ${doc.data().question1Time},
        ${doc.data().question2IsCorrect},
        ${doc.data().question2Time},
        ${doc.data().sessionNumber},
        ${doc.data().userID} \n`;
      });
      const csvString = `${headerString}${rowString}`;
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);



    })
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.center, styles.shadowEffect, styles.cover]}>
        <View style={{ height: "10%" }}></View>

        <View style={[{ height: "40%" }, styles.centering]}>
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
            style={[styles.centering, styles.optButton, styles.cover]}
          >
            <Text
              style={[styles.fontStyle, styles.centering, { fontSize: 18 }]}
            >
              Therapy Question Management
            </Text>
          </TouchableOpacity>

        </View>


        <View style={{ height: "10%" }}></View>

        <View style={{ height: "15%" }}>

          <TouchableOpacity
            //onPress={() => this.onCreateCSV()}
            style={[styles.centering, styles.optButton, styles.cover]}
          >
            <Text
              style={[styles.fontStyle, styles.centering, { fontSize: 18 }]}
            >
              Export CSV
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: "22%" }}></View>

        <View style={[{ height: "10%" }, styles.centering]}>
          <TouchableOpacity
            onPress={() => signOut()}
            style={[styles.bottomButton, styles.shadowEffect, styles.centering]}
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
