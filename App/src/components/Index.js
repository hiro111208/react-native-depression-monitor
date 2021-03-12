import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import ProgressBar from "./ProgressBar";

export default class Index extends Component {
  state = {
    steps: -1,
    segments: 4,
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
        <Button
          className="increment"
          title=" + "
          onPress={this.incrementBar}
        ></Button>
        <ProgressBar
          segments={this.state.segments}
          nextWidth={this.state.steps + 1}
        ></ProgressBar>
        <Button
          className="decrement"
          title=" - "
          onPress={this.decrementBar}
        ></Button>
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
