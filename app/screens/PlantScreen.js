import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Constants from "expo-constants";
import * as indexStyles from "../config/indexStyles";
import firebase from "../database/firebase";
import colors from "../config/colors";

{
  /** Screen to interact with the plant mascot */
}
const PlantScreen = ({ navigation, route }) => {
  var user = route.params.currentUser;
  const [coins, setCoins] = useState(user.coins);
  const [plant, setPlant] = useState(getPlant());

  // level up if the user has the required coins
  function waterPlant() {
    if (user.coins >= 5) {
      user.coins += -5;
      user.level += 1;
      setCoins(user.coins);
      setPlant(getPlant());
    }
  }

  // return image of plant according to the level
  function getPlant() {
    switch (user.level) {
      case 1:
        return require("../assets/stage_1.png");
      case 2:
        return require("../assets/stage_2.png");
      case 3:
        return require("../assets/stage_3.png");
      case 4:
        return require("../assets/stage_4.png");
      case 5:
        return require("../assets/stage_5.png");
      case 6:
        return require("../assets/stage_6.png");
      case 7:
        return require("../assets/stage_7.png");
      case 8:
        return require("../assets/stage_8.png");
      case 9:
        return require("../assets/stage_9.png");
    }
  }

  // renders level up button which is capped at level 9
  function renderWaterPlantButton() {
    if (user.level < 9) {
      return (
        <TouchableOpacity
          onPress={() => waterPlant()}
          style={[
            styles.optButton,
            indexStyles.centering,
            indexStyles.shadowEffect,
          ]}
        >
          <Text style={styles.text}>Water your plant!</Text>
          <Text style={styles.comment}>-5 coins</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={[
            styles.optButton,
            indexStyles.centering,
            indexStyles.shadowEffect,
          ]}
        >
          <Text style={styles.text}>You reached max level!</Text>
          <Text style={styles.comment}>well done!</Text>
        </View>
      );
    }
  }

  // sync progress to firestore
  function saveProgress() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set(
        {
          level: user.level,
          coins: user.coins,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Progress saved");
        route.params.onGoBack();
        navigation.navigate("PatientDashboard");
      })
      .catch((error) => {
        console.error("Error saving progress: ", error);
      });
  }

  return (
    <View style={[styles.container, indexStyles.centering]}>
      <View style={[styles.middle, indexStyles.shadowEffect]}>
        <View style={{ height: "5%" }}></View>
        <View style={[styles.top, indexStyles.centering]}>
          <View style={[styles.topItem, indexStyles.centering]}>
            <View
              style={[
                styles.featureButton,
                indexStyles.centering,
                indexStyles.shadowEffect,
              ]}
            >
              <Text style={styles.text}>{coins}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.message, indexStyles.centering]}>
          <Text style={[indexStyles.textGrey]}>
            Keep going! {"\n"}You're almost there!
          </Text>
        </View>

        <View style={{ height: "2%" }}></View>

        <View style={[styles.plantSpace, indexStyles.centering]}>
          <View
            style={[
              styles.plantImage,
              indexStyles.centering,
              indexStyles.shadowEffect,
            ]}
          >
            <Image
              style={{ width: 225, height: 225 }}
              resizeMode="contain"
              source={plant}
            />
          </View>
        </View>

        <View style={[styles.nextSpace, indexStyles.centering]}>
          {renderWaterPlantButton()}
        </View>

        <View style={{ height: "2%" }}></View>

        <View style={[{ height: "9%", width: "100%" }, indexStyles.centering]}>
          <TouchableOpacity
            style={[
              styles.homeButton,
              indexStyles.centering,
              indexStyles.cover,
            ]}
            onPress={() => saveProgress()}
          >
            <Text style={indexStyles.textGrey}>Return Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 30,
    backgroundColor: "white",
  },
  middle: {
    width: "100%",
    height: "90%",
    borderRadius: 40,
    backgroundColor: "#fed8b1",
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.lightOutline,
  },
  featureButton: {
    height: "100%",
    width: "90%",
    backgroundColor: "#f0e5d8",
    borderRadius: 10,
  },
  optButton: {
    height: "50%",
    width: "60%",
    backgroundColor: "#94ffd3",
    borderRadius: 30,
  },
  homeButton: {
    backgroundColor: colors.lightOutline,
  },
  comment: {
    color: "dodgerblue",
    fontSize: 16,
    fontStyle: "italic",
  },
  top: {
    height: "6%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    alignSelf: "flex-end",
  },
  topItem: {
    width: "30%",
    height: "100%",
  },
  message: {
    height: "10%",
  },
  plantSpace: {
    height: "40%",
  },
  plantImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    backgroundColor: "#eee",
  },
  nextSpace: {
    height: "20%",
    width: "100%",
  },
});

export default PlantScreen;
