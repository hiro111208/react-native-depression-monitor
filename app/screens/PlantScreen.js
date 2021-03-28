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
import firebase from "../database/firebase";

const PlantScreen = ({ navigation, route }) => {
  var user = route.params.currentUser;

  const [coins, setCoins] = useState(user.coins);
  const [plant, setPlant] = useState(getPlant());

  function waterPlant() {
    if (user.coins >= 5) {
      user.coins += -5;
      user.level += 1;
      setCoins(user.coins);
      setPlant(getPlant());
    }
  }

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

  function renderWaterPlantButton() {
    if (user.level < 9) {
      return (
        <TouchableOpacity
          onPress={() => waterPlant()}
          style={[styles.optButton, indexStyles.centering, styles.shadowEffect]}
        >
          <Text style={styles.text}>Water your plant!</Text>
          <Text style={styles.comment}>-5 coins</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[styles.optButton, indexStyles.centering, styles.shadowEffect]}>
          <Text style={styles.text}>You reached max level!</Text>
          <Text style={styles.comment}>well done!</Text>
        </View>
      );
    }
  }

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
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error saving progress: ", error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={[styles.middle, styles.shadowEffect]}>
        <View style={{ height: "5%" }}></View>
        <View style={[styles.top, indexStyles.centering]}>
          <View style={[styles.topItem, indexStyles.centering]}>
            <View
              style={[
                styles.featureButton,
                indexStyles.centering,
                styles.shadowEffect,
              ]}
            >
              <Text style={styles.text}>{coins}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.message, indexStyles.centering]}>
          <Text style={[styles.textStyle]}>
            Keep going! {"\n"}You're almost there!
          </Text>
        </View>

        <View style={{ height: "2%" }}></View>

        <View style={[styles.plantSpace, indexStyles.centering]}>
          <View
            style={[styles.plantImage, indexStyles.centering, styles.shadowEffect]}
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
            style={[styles.homeButton, indexStyles.centering]}
            onPress={() => saveProgress()}
          >
            <Text style={styles.textStyle}>Return Home</Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  middle: {
    width: "100%",
    height: "90%",
    borderRadius: 40,
    backgroundColor: "#fed8b1",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#ffeed2",
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
    height: "100%",
    width: "100%",
    backgroundColor: "#ffeed2",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "dimgray",
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
    marginHorizontal: 5,
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
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
  nextSpace: {
    height: "20%",
    width: "100%",
  },
});

export default PlantScreen;
