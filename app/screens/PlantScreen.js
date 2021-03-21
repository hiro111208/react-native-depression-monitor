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

const PlantScreen = ({ navigation, route }) => {
  var user = route.params.currentUser;

  const [coins, setCoins] = useState(user.coins);
  const [plant, setPlant] = useState(getPlant());

  function waterPlant() {
    if (user.coins >= 5) {
      user.coins += -5;
      user.level += 1;
      setCoins(user.coins);
    }
  }

  function getPlant() {
    switch (user.level) {
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
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.middle, styles.shadowEffect]}>
        <View style={{ height: "5%" }}></View>
        <View style={[styles.top, styles.centering]}>
          <View style={[styles.topItem, styles.centering]}>
            <View
              style={[
                styles.featureButton,
                styles.centering,
                styles.shadowEffect,
              ]}
            >
              <Text style={styles.text}>{coins}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.message, styles.centering]}>
          <Text style={[styles.textStyle]}>
            Keep going! {"\n"}You're almost there!
          </Text>
        </View>

        <View style={{ height: "2%" }}></View>

        <View style={[styles.plantSpace, styles.centering]}>
          <View
            style={[styles.plantImage, styles.centering, styles.shadowEffect]}
          >
            <Image
              style={{ width: 225, height: 225 }}
              resizeMode="contain"
              source={require("../assets/stage_9.png")}
            />
          </View>
        </View>

        <View style={[styles.nextSpace, styles.centering]}>
          <TouchableOpacity
            onPress={() => waterPlant()}
            style={[styles.optButton, styles.centering, styles.shadowEffect]}
          >
            <Text style={styles.text}>Water your plant!</Text>
            <Text style={styles.comment}>-5 coins</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: "2%" }}></View>

        <View style={[{ height: "9%", width: "100%" }, styles.centering]}>
          <TouchableOpacity
            style={[styles.homeButton, styles.centering]}
            onPress={() => navigation.goBack()}
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
  centering: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlantScreen;
