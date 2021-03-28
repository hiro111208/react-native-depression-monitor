import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/firebase";
import * as indexStyles from "../config/indexStyles";
import colors from "../config/colors";
import { Alert, Platform } from "react-native";
import * as Permissions from "expo-permissions";
import { Linking } from "expo";
import * as Notifications from "expo-notifications";
//import firebase from firebase;
import Constants from "expo-constants";

export default function HomeScreen({ route, props, navigation }) {
  const [user, setUser] = useState(undefined);
  const [plant, setPlant] = useState(require("../assets/stage_1.png"));
  const [displayName, setDisplayName] = useState(
    firebase.auth().currentUser !== null
      ? firebase.auth().currentUser.displayName
      : ""
  );

  useEffect(() => {
    getLevel();
  }, []);

  function getLevel() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        setUser(doc.data());
        const level = doc.data().level;
        updatePath(level);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  function updatePath(lvl) {
    switch (lvl) {
      case 1:
        setPlant(require("../assets/stage_1.png"));
        break;
      case 2:
        setPlant(require("../assets/stage_2.png"));
        break;
      case 3:
        setPlant(require("../assets/stage_3.png"));
        break;
      case 4:
        setPlant(require("../assets/stage_4.png"));
        break;
      case 5:
        setPlant(require("../assets/stage_5.png"));
        break;
      case 6:
        setPlant(require("../assets/stage_6.png"));
        break;
      case 7:
        setPlant(require("../assets/stage_7.png"));
        break;
      case 8:
        setPlant(require("../assets/stage_8.png"));
        break;
      case 9:
        setPlant(require("../assets/stage_9.png"));
        break;
      default:
        setPlant(require("../assets/stage_9.png"));
    }
  }

  function refresh() {
    getLevel();
  }

  ///

  useEffect(() => {
    (async () => {
      const user = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();
    })();
  });

  useEffect(() => {
    (() => registerForPushNotificationsAsync())();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token; // undefined initially
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return false;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
    // save the users token in firebase
    if (token) {
      //makes sure there is a token to add to firebase
      const res = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({ token }, { merge: true });
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  ///

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={[styles.welcomeArea, indexStyles.shadowEffect]}>
          <View style={styles.userNote}>
            <Text style={[indexStyles.textGrey]}>Hello there, {displayName}!</Text>

            <View style={styles.spacer}></View>

            <View
              style={[
                styles.plantImage,
                indexStyles.centering,
                indexStyles.shadowEffect,
              ]}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
                source={plant}
              />
            </View>
          </View>

          <View style={{ height: "30%" }}></View>

          <TouchableOpacity
            style={[
              styles.sessionArea,
              indexStyles.centering,
              indexStyles.shadowEffect,
            ]}
            onPress={() => {
              if (user.question === 1) {
                navigation.navigate("LogFeelingScreen", {
                  cameFrom: "HomeScreen",
                  onGoBack: () => refresh(),
                });
              } else {
                navigation.navigate("TherapyScreen", {
                  onGoBack: () => refresh(),
                });
              }
            }}
          >
            <Text style={indexStyles.textGrey}>Go to your session</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sessionArea,
              indexStyles.centering,
              indexStyles.shadowEffect,
            ]}
            onPress={() =>
              navigation.navigate("PlantScreen", {
                currentUser: user,
                onGoBack: () => refresh(),
              })
            }
          >
            <Text style={indexStyles.textGrey}>Interact with your plant</Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#fff",
  },
  center: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  welcomeArea: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#fed8b1",
    alignItems: "center",
  },
  userNote: {
    height: "30%",
    width: "100%",
    backgroundColor: "#ffeed2",
    alignItems: "center",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    padding: 20,
  },
  sessionArea: {
    height: "17%",
    width: "90%",
    backgroundColor: "#ffeed2",
    padding: 10,
    borderRadius: 20,
  },
  spacer: {
    height: "20%",
  },
  plantImage: {
    width: 225,
    height: 225,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
});
