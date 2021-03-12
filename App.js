import React from "react";
import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import PauseScreen from "./app/screens/PauseScreen";

export default class App extends React.Component {
  render() {
    return (
      //Uncomment to see different screens one at a time
      <SafeAreaView style={[styles.container]}>
        <PauseScreen />
      </SafeAreaView>
      //<CategoryDrop/>
      //<PlantScreen/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //takes up the entire screen
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#FAD8B9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
