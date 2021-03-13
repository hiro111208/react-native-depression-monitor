import { StatusBar } from "expo-status-bar";
import React from "react";
import TherapyScreen from "./App/screens/TherapyScreen";
import CategoryDrop from "./App/screens/CategoryDrop";
import PlantScreen from "./App/screens/PlantScreen";
import Index from "./App/src/components/Index";

export default class App extends React.Component {
  render() {
    return (
      //Uncomment to see different screens one at a time
      <TherapyScreen />
      //<CategoryDrop/>
      //<PlantScreen/>
      //<Index></Index> //where progressBar buttons/actions and component are
    );
  }
}
