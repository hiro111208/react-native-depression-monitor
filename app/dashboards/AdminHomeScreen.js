import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Platform,
  ToastAndroid,
  ActivityIndicator,
  Modal,
} from "react-native";

import firebase from "../database/firebase";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native";
import { Touchable } from "react-native";

import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import moment from "moment";

{
  /** Default screen when logged into the admin area */
}
export default function AdminHomeScreen({ props, navigation }) {
  const [errorMessage, setErrorMessage] = useState("");

  // loading screen trigger
  const [loaded, setLoaded] = useState(false);

  // return to the log in page
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

  // loading screen executed via trigger
  const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} transparent={true} visible={visible}>
      <View style={[{ flex: 1 }, styles.centering]}>
        <View style={styles.loadingSection}>
          <ActivityIndicator size="large" color="#ffa351ff" />
        </View>
      </View>
    </Modal>
  );

  // method call on Export answers data to CSV folder
  onCreateAnswersCSV = async () => {
    setLoaded(true);
    firebase
      .firestore()
      .collection("answers")
      .get()
      .then(async (querySnapshot) => {
        const headerString =
          "userId, categoryDropped, question, question1IsCorrect, question1Time, question2IsCorrect, question2Time, sessionNumber \n";
        let rowString = "";
        querySnapshot.forEach((doc) => {
          rowString =
            rowString +
            ` ${doc.data().userID}, ${doc.data().categoryDropped}, ${
              doc.data().question
            }, ${doc.data().question1IsCorrect}, ${doc.data().question1Time}, ${
              doc.data().question2IsCorrect
            }, ${doc.data().question2Time}, ${doc.data().sessionNumber} \n`;
        });
        const csvString = `${headerString}${rowString}`;

        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // generate unique name for csv file
        if (status === "granted") {
          const csvFileName = moment().unix();
          let fileUri =
            FileSystem.documentDirectory + `Answers_${csvFileName}.csv`;

          // save csv at document directory
          await FileSystem.writeAsStringAsync(fileUri, csvString, {
            encoding: FileSystem.EncodingType.UTF8,
          });

          // save csv at specific folder
          if (Platform.OS === "ios") {
            await Sharing.shareAsync(fileUri);
            setLoaded(false);
          } else {
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            const is_save = await MediaLibrary.createAlbumAsync(
              "Answer",
              asset,
              false
            );
            if (is_save.assetCount === 1) {
              setLoaded(false);
              ToastAndroid.show("File save successfully", ToastAndroid.SHORT);
            }
          }
        }
      });
  };

  // method call on Export feelings data to CSV folder
  onCreateFeelingsCSV = async () => {
    setLoaded(true);
    firebase
      .firestore()
      .collection("feelings")
      .get()
      .then(async (querySnapshot) => {
        const headerString =
          "userId, overall, anxious, happy, sad, timeStamp \n";
        let rowString = "";
        querySnapshot.forEach((doc) => {
          rowString =
            rowString +
            ` ${doc.data().userID}, ${doc.data().overall}, ${
              doc.data().anxious
            }, ${doc.data().happy}, ${
              doc.data().sad
            }, ${doc.data().timeStamp.toDate()} \n`;
        });
        const csvString = `${headerString}${rowString}`;
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // generate unique name for csv file
        if (status === "granted") {
          const csvFileName = moment().unix();
          let fileUri =
            FileSystem.documentDirectory + `Feelings_${csvFileName}.csv`;
          await FileSystem.writeAsStringAsync(fileUri, csvString, {
            encoding: FileSystem.EncodingType.UTF8,
          });

          // save csv at specific folder
          if (Platform.OS === "ios") {
            await Sharing.shareAsync(fileUri);
            setLoaded(false);
          } else {
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            const is_save = await MediaLibrary.createAlbumAsync(
              "Feelings",
              asset,
              false
            );
            if (is_save.assetCount === 1) {
              setLoaded(false);
              ToastAndroid.show("File save successfully", ToastAndroid.SHORT);
            }
          }
        }
      });
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.center, styles.shadowEffect, styles.cover]}>
        <View style={{ height: "10%" }}></View>

        {/** Logo and display name */}
        <View style={[{ height: "30%" }, styles.centering]}>
          <Text style={[styles.fontStyle, { fontSize: 25 }]}>
            Hello, admin!
          </Text>
          <Image
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
            source={require("../assets/hand-logo.png")}
          />
        </View>

        {/** Content management navigation button */}
        <View style={{ height: "5%" }}></View>

        <View style={{ height: "10%" }}>
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

        <View style={{ height: "3%" }}></View>

        {/** Export answer data CSV navigation button */}
        <View style={{ height: "10%" }}>
          {loaded && <CustomProgressBar />}
          <TouchableOpacity
            onPress={() => this.onCreateAnswersCSV()}
            style={[styles.centering, styles.optButton, styles.cover]}
          >
            <Text
              style={[styles.fontStyle, styles.centering, { fontSize: 18 }]}
            >
              Export User Answers to CSV
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: "3%" }}></View>

        {/** Export feelings data CSV navigation button */}
        <View style={{ height: "10%" }}>
          {loaded && <CustomProgressBar />}
          <TouchableOpacity
            onPress={() => this.onCreateFeelingsCSV()}
            style={[styles.centering, styles.optButton, styles.cover]}
          >
            <Text
              style={[styles.fontStyle, styles.centering, { fontSize: 18 }]}
            >
              Export User Feelings to CSV
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: "7%" }}></View>

        {/** Back to log in screen navigation button */}
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
    backgroundColor: colors.lightOutline,
    position: "absolute",
    bottom: 0,
  },
  center: {
    backgroundColor: colors.mainPanel,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colors.lightOutline,
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
    backgroundColor: colors.lightOutline,
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
  loadingSection: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    justifyContent: "space-evenly",
  },
});
