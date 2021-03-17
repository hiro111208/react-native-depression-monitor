import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

//Progress bar dividers
function BarMarkers(props) {
  const markers = [];
  for (var i = 0; i < props.bars ; i++) {
    markers.push(<View style={styles.bar} left={props.separation * i}></View>);
  }
  return <View style={styles.barContainer}>{markers}</View>;
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
    opacity: 0.5,
    flexDirection: "column",
    backgroundColor: "black",
  },
});

export default BarMarkers;
