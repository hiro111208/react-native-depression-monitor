import React, { Component } from "react";
import { View } from "react-native";
import Index from "./App/src/components/Index";
import UserDashboard from "./UserDashboard";

export default class App extends Component {
  render() {
    return (
      <View justifyContents={"center"} alignItems={"center"}>
        {/* <Index></Index> */}
        <UserDashboard />
      </View>
    );
  }
}
