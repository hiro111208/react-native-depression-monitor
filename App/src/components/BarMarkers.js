import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class BarMarkers extends Component {
  static defaultProps = {
    separation: 0,
    bars: 4,
  };
  state = {
    bar: [],
  };

  render() {
    return (
      <View style={styles.barContainer}>
        <View style={styles.bar} left={this.props.separation * 1}></View>
        <View style={styles.bar} left={this.props.separation * 2}></View>
        <View style={styles.bar} left={this.props.separation * 3}></View>
        <View style={styles.bar} left={this.props.separation * 4}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  barContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  bar: {
    width: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
});
