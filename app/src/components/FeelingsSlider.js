import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MarkSlider from 'react-native-mark-slider';

const marks = [
  {
    value: 1,
    label: "Not at all",
  },
  {
    value: 2,
    label: "",
  },
  {
    value: 3,
    label: "Somewhat",
  },
  {
    value: 4,
    label: "",
  },
  {
    value: 5,
    label: "Very much",
  },
];
export default function FeelingsSlider(props) {
  return (
    <View style={styles.root}>
        <MarkSlider
          style={styles.sliderStyle}
          step={1}
          max={5}
          marks={marks}
          onChange={value => props.setFeelingState(value)}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderStyle: {
    fontSize: 8,
    color: 'black',
  },
  root: {
    justifyContent: 'center',
    width: '100%'
  },
});
