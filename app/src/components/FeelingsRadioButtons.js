import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import verySad from "../../assets/images/verySad.png";
import sad from "../../assets/images/sad.png";
import neutral from "../../assets/images/neutral.png";
import happy from "../../assets/images/happy.png";
import veryHappy from "../../assets/images/veryHappy.png";

const FeelingsRadioButtons = (props) => {
  //const [selectedFeeling, setSelectedFeeling] = useState(""); 
  var feelings = ["VeryHappy", "Happy", "Neutral", "Sad", "VerySad"];
  return (
    <View>
      <View style={styles.radio}>
        <TouchableOpacity
          onPress={() => {
            props.setOverallFeeling("VeryHappy");
          }}
        >
          <Image style={styles.logo} source={veryHappy} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.setOverallFeeling("Happy");
          }}
        >
          <Image style={styles.logo} source={happy} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.setOverallFeeling("Neutral");
          }}
        >
          <Image style={styles.logo} source={neutral} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.setOverallFeeling("Sad");
          }}
        >
          <Image style={styles.logo} source={sad} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.setOverallFeeling("VerySad");
          }}
        >
          <Image style={styles.logo} source={verySad} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    resizeMode: "contain",
    flex: 1,
    aspectRatio: 1, // Your aspect ratio
    // marginHorizontal: 25,
  },
  logo: {
    width: 25,
    height: 25,
    marginHorizontal: 30
  },
});

export default FeelingsRadioButtons;
