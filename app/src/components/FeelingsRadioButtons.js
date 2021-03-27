import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import verySad from "../../assets/images/verySad.png";
import sad from "../../assets/images/sad.png";
import neutral from "../../assets/images/neutral.png";
import happy from "../../assets/images/happy.png";
import veryHappy from "../../assets/images/veryHappy.png";
import colors from "../../config/colors";

const FeelingsRadioButtons = (props) => {
  var feelings = ["VeryHappy", "Happy", "Neutral", "Sad", "VerySad"];

  return (
    <View>
      <View style={styles.radio}>

        <TouchableOpacity
          style= {(props.overallFeeling=="VerySad") ? styles.selected : ""}
          onPress={() => {
            props.setOverallFeeling("VerySad");
          }}
        >
          <Image style={styles.logo} source={verySad} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style= {(props.overallFeeling=="Sad") ? styles.selected : ""}
          onPress={() => {
            props.setOverallFeeling("Sad");
          }}
        >
          <Image style={styles.logo} source={sad} />
        </TouchableOpacity>

        <TouchableOpacity
          style= {(props.overallFeeling=="Neutral") ? styles.selected : ""}
          onPress={() => {
            props.setOverallFeeling("Neutral");
          }}
        >
          <Image style={styles.logo} source={neutral} />
        </TouchableOpacity>

        <TouchableOpacity
          style= {(props.overallFeeling=="Happy") ? styles.selected : ""}
          onPress={() => {
            props.setOverallFeeling("Happy");
          }}
        >
          <Image style={styles.logo} source={happy} />
        </TouchableOpacity>

        <TouchableOpacity
          style={(props.overallFeeling=="VeryHappy") ? styles.selected : ""}

          onPress={() => {
            props.setOverallFeeling("VeryHappy");
          }}
        >
          <Image style={styles.logo} source={veryHappy} />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: colors.darkBorder,
    borderWidth: 2,
    width: "95%"
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 7,
    marginVertical:7
  },
  selected:{
    borderWidth:2, 
    borderColor:'rgba(0,0,0,0.2)',
    borderRadius:100,
  }
});

export default FeelingsRadioButtons;
