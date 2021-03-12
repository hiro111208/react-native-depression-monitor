import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  View,
  LayoutAnimation,
  Text,
} from "react-native";
import BarMarkers from "./BarMarkers";

export default class ProgressBar extends Component {
  constructor() {
    super();
    this._animatedColor = new Animated.Value(0);
  }

  static defaultProps = {
    //width of current progress
    nextWidth: 0,
    segments: 5,
  };

  state = {
    //total width of progress bar container
    width: 0,
  };

  handleLayout = ({ nativeEvent }) => {
    this.setState({ width: nativeEvent.layout.width });
  };

  //animate gradual color change
  animatedValue = () => {
    this._animatedColor.setValue(0);
    Animated.timing(this._animatedColor, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  //calculate container width on mount
  componentDidMount() {
    this.handleLayout;
  }
  componentDidUpdate() {
    //custom Layout animation -> animates bar's width increase
    var CustomLayoutSpring = {
      duration: 1000,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    };
    //set layout animation
    LayoutAnimation.configureNext(CustomLayoutSpring);
  }

  render() {
    //constants to use
    const barSeparation = this.state.width / this.props.segments;
    const barWidthAfter = barSeparation * this.props.nextWidth;

    //array of color interpolations: adjust to nº of Segments
    const colorGradient = [
      this._animatedColor.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(255,0,0)", "rgb(255,50,0)"],
      }),
      this._animatedColor.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(255,50,0)", "rgb(100,170,0)"],
      }),
      this._animatedColor.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(100,170,0)", "rgb(0,170,0)"],
      }),
      this._animatedColor.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(0,170,0)", "rgb(0,255,0)"],
      }),
    ];

    this.animatedValue();

    return (
      <View style={styles.barContainer} onLayout={this.handleLayout}>
        <Animated.View
          style={[
            styles.bar,
            {
              width: barWidthAfter,
              backgroundColor: colorGradient[this.props.nextWidth - 1],
            },
          ]}
        >
          <View>
            <BarMarkers
              bars={this.props.segments}
              separation={barSeparation}
            ></BarMarkers>
          </View>
        </Animated.View>
        <View justifyContent={"center"} alignItems={"center"}>
          <Text>{Math.floor((barWidthAfter / this.state.width) * 100)}%</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  barContainer: {
    opacity: 1,
    borderWidth: 1,
    backgroundColor: "white",
    height: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  bar: {
    opacity: 0.7,
    backgroundColor: "green",
    height: 20,
    borderRadius: 20,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    maxWidth: "100%",
  },
});
