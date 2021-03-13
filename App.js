import { StatusBar } from "expo-status-bar";
import React from "react";
import TherapyScreen from "./App/screens/TherapyScreen";
import CategoryDrop from "./App/screens/CategoryDrop";
import PlantScreen from "./App/screens/PlantScreen";
import PatientDashboard from './dashboards/PatientDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

export default class App extends React.Component {
  render() {
    return (
      //Uncomment to see different screens one at a time
      //<TherapyScreen />
      //<CategoryDrop/>
      //<PlantScreen/>
      //<PatientDashboard />
      <AdminDashboard />
    );
  }
}