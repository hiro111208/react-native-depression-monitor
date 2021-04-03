import React, { Component } from "react";
import { Platform } from "react-native";
import {
  Animated,
  StyleSheet,
  View,
  UIManager,
  LayoutAnimation,
  Text,
} from "react-native";
import BarMarkers from "./BarMarkers";

export default class ProgressBar extends Component {
  constructor() {
    super();
    this._animatedColor = new Animated.Value(0);
    // Enable LayoutAnimation under Android
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  static defaultProps = {
    //width of current progress
    nextWidth: 0,
    segments: 4,
  };

  state = {
    //total width of progress bar container
    width: 0,
  };

  handleLayout = ({ nativeEvent }) => {
    this.setState({ width: nativeEvent.layout.width });
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

    //animate gradual color change
    this._animatedColor.setValue(0);
    Animated.timing(this._animatedColor, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  render() {
    //constants to use
    const barSeparation = this.state.width / this.props.segments;
    const barWidthAfter = barSeparation * this.props.nextWidth;
    const colorChangeUnit =
      (255 / this.props.segments) * this.props.nextWidth - 1;
    const colorChangeUnitAfter =
      (255 / this.props.segments) * this.props.nextWidth;

    return (
      <View flexDirection={"row"} style={styles.shadow}>
        <View flexDirection={"column"} flex={1}>
          <View style={styles.barContainer} onLayout={this.handleLayout}>
            <Animated.View
              style={[
                styles.bar,
                {
                  width: barWidthAfter,
                  backgroundColor: this._animatedColor.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      `rgb(${255 - colorChangeUnit},${0 + colorChangeUnit},0)`,
                      `rgb(${255 - colorChangeUnitAfter},${
                        0 + colorChangeUnitAfter
                      },0)`,
                    ],
                  }),
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
          </View>
        </View>
        <View marginLeft={10}>
          <Text style={{ fontSize: 10, fontWeight: "300" }}>Progress</Text>
        </View>
        <View marginLeft={10} style={styles.progress} padding={0}>
          <View marginLeft={10} width={30}></View>
          <Text
            margin={5}
            style={{ height: 15, width: 30, fontSize: 11 }}
            adjustsFontSizeToFit={true}
          >
            {""}
            {Math.floor((barWidthAfter / this.state.width) * 100)}%
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  barContainer: {
    opacity: 1,
    borderWidth: 1,
    backgroundColor: "white",
    height: 15,
    borderRadius: 7,
    overflow: "hidden",
  },
  bar: {
    opacity: 0.7,
    backgroundColor: "green",
    height: 20,
    borderRadius: 7,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    maxWidth: "100%",
  },
  progress: {
    opacity: 1,
    borderWidth: 1,
    textAlign: "center",
    alignItems: "center",
    padding: 3,
    height: 15,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
