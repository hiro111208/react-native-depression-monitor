import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import ProgressBar from "./ProgressBar";

export default class Index extends Component {
  state = {
    steps: -1,
    segments: 3,
  };

  incrementBar = () => {
    if (this.state.steps < this.state.segments - 1) {
      this.setState({ steps: ++this.state.steps });
    }
    console.log(this.state.steps);
  };
  decrementBar = () => {
    if (this.state.steps > -1) {
      this.setState({ steps: --this.state.steps });
    }
    console.log(this.state.steps);
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title=" + " onPress={this.incrementBar}></Button>
        <ProgressBar
          segments={this.state.segments}
          currentWidth={this.state.steps}
          nextWidth={this.state.steps + 1}
        ></ProgressBar>
        <Button title=" - " onPress={this.decrementBar}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#E6E6FA",
  },
});
