import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MarkSlider from 'react-native-mark-slider';
import colors from "../../config/colors";


const marks = [
  {
    value: 1,
    name: "Not at all",
  },
  {
    value: 3,
    name: "Somewhat",
  },
  {
    value: 5,
    name: "Very much",
  },
];
export default function FeelingsSlider(props) {

  return (
    <View style={styles.root}>
        <MarkSlider
          style={styles.sliderStyle}
          step={1}
          max={5}
          min={1}
          value= {props.feelingState}
          marks={marks}
          minimumTrackTintColor="#ffd390"
          thumbTintColor={colors.darkBorder}
          onSlidingComplete={value => props.setFeelingState(value)}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderStyle: {
  },
  root: {
    //justifyContent: 'center',
    //alignItems: 'center',
    width: '85%'
  },
});
