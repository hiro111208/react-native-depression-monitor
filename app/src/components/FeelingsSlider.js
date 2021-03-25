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
  const [selectedValue, setSelectValue] = useState("");
  const { setFeelingState, feelingName, feelingState } = props;

  const onChange = (value) => {
    setSelectValue(value);
    setFeelingState({
      ...feelingState,
      [`${feelingName}`]: selectedValue,
    });
  };
  return (
    <View style={styles.root}>
        <MarkSlider
          style={styles.sliderStyle}
          step={25}
          max={100}
          marks={marks}
          onChange={value => onChange({ value })}
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
