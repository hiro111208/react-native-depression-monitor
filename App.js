import StatusBar from "expo-status-bar";
import React from "react";
import { StyleSheet, Component, View } from "react-native";
import PauseScreen from "./app/screens/PauseScreen";

export default class App extends React.Component {
  render() {
    return (
      //Uncomment to see different screens one at a time
      <View style={styles.container}>
        <PauseScreen />
      </View>
      //<CategoryDrop/>
      //<PlantScreen/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
