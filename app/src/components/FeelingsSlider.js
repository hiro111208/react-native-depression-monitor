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

//These sliders are used in the LogFeelingScreen to allow users express the extent they feel an emotion
export default function FeelingsSlider(props) {

  return (
    //Render the slider 
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
  root: {
    width: '85%'
  },
});
