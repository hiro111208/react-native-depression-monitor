import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import firebase from "../database/firebase";
import colors from "../config/colors";

export default function AccountScreen({ props, navigation }) {
  const [displayName, setDisplayName] = useState(
    firebase.auth().currentUser !== null
      ? firebase.auth().currentUser.displayName
      : ""
  );

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Account</Text>
      <Button
        color={colors.darkBorder}
        title="Logout"
        onPress={() => signOut()}
      />
    </View>
  );
}
