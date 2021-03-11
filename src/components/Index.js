import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import ProgressBar from "./ProgressBar";

export default class Index extends Component {
  state = {
    currentWidth: -1,
    segments: 4,
  };

  incrementBar = () => {
    if (this.state.currentWidth < this.state.segments - 1) {
      this.setState({ currentWidth: ++this.state.currentWidth });
    }
    console.log(this.state.currentWidth + 1);
  };

  decrementBar = () => {
    if (this.state.currentWidth > -1) {
      this.setState({ currentWidth: --this.state.currentWidth });
    }
    console.log(this.state.currentWidth + 1);
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
          nextWidth={this.state.currentWidth + 1}
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
