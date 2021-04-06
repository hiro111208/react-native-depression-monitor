import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../config/colors";
import * as indexStyles from "../config/indexStyles";
import firebase from "../database/firebase";

/**
 * Screen that renders account options such as signing out,
 * replaying demo or navigating to support resources
 */
export default function AccountScreen({ props, navigation }) {
  const [displayName, setDisplayName] = useState(
    firebase.auth().currentUser !== null
      ? firebase.auth().currentUser.displayName
      : ""
  );

  // Sign out from the application
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
    <View style={[styles.container, styles.centering]}>
      <View style={[styles.center, styles.shadowEffect, styles.cover]}>
        <View style={{ height: "5%" }}></View>

        {/* Render logo of the app */}
        <View style={[{ height: "40%" }, styles.centering]}>
          <Image
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
            source={require("../assets/hand-logo.png")}
          />
        </View>

        {/* Support resources button */}
        <View style={[{ height: "10%" }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SupportResources")}
            style={[styles.optButton, styles.cover, styles.centering]}
          >
            <Text style={[styles.fontStyle, { fontSize: 17 }]}>
              Support Resources
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: "2%" }}></View>

        {/* Button to demo screen */}
        <View style={[{ height: "10%" }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DemoScreen")}
            style={[styles.optButton, styles.cover, styles.centering]}
          >
            <Text style={[styles.fontStyle, { fontSize: 17 }]}>
              Replay Demo
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: "23%" }}></View>

        {/* Sign out button that goes back to login screen */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBorder: {
    height: "100%",
    width: "40%",
    borderRadius: 50,
    backgroundColor: colors.lightOutline,
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
    height: "100%",
    width: "100%",
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
  scheduleText: {
    fontSize: 15,
  },
  selectButton: {
    backgroundColor: colors.lightOutline,
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
