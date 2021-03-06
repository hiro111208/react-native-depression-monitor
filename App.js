import { StatusBar } from "expo-status-bar";
import React from "react";
import TherapyScreen from "./screens/TherapyScreen";
import CategoryDrop from "./screens/CategoryDrop";
import PlantScreen from "./screens/PlantScreen";

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
