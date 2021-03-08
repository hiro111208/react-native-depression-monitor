import { StatusBar } from "expo-status-bar";
import React from "react";
import TherapyScreen from "./App/screens/TherapyScreen";
import CategoryDrop from "./App/screens/CategoryDrop";
import PlantScreen from "./App/screens/PlantScreen";

export default class App extends React.Component {
  render() {
    return (
      //Uncomment to see different screens one at a time
      <TherapyScreen />
      //<CategoryDrop/>
      //<PlantScreen/>
    );
  }
}
