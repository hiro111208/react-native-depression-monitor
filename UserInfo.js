import React, { Component, useState, useEffect } from "react";
import {
  StatusBar,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as shape from "d3-shape";
import * as scale from "d3-scale";
import firebase from "./firebase";
import ProgressBar from "./App/src/components/ProgressBar";
import UserTable from "./App/src/components/UserTable";
import { LineChart, XAxis } from "react-native-svg-charts";
import { Circle, G, Line } from "react-native-svg";

export default class UserInfo extends Component {
  constructor({ route }) {
    super();
    this.state = {
      sessions: [[], [], [], []],
      averageTimePerBlockQ1: [],
      averageTimePerBlockQ2: [],
      currentUser: route.params.user,
      currentBlock: route.params.block,
    };
  }

  getItems = () => {
    const ref = firebase.firestore().collection("answers");
    const tempSessions = [[], [], [], []];
    for (let i = 0; i < 4; i++) {
      const query = ref
        .where("userID", "==", this.state.currentUser)
        .where("sessionNumber", "==", i + 1);
      query.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        tempSessions[i] = items;
        this.setState({ sessions: tempSessions });
        this.setState({ loaded: true });
        //filter session questions
      });
    }
  };

  calculateAverages = () => {
    const avg1Temp = [];
    const avg2Temp = [];
    const tempBlocks = [];
    const tempSessions = this.state.sessions;

    for (let i = 0; i < 4; i++) {
      if (this.state.sessions[i].length > 0) {
        tempBlocks.push(i + 1);
      } else {
        tempBlocks.push(0);
      }
    }

    //calculate average response times per type of question
    for (let i = 0; i < 4; i++) {
      if (tempBlocks[i] === 0) {
      } else {
        const avg1 = tempSessions[i].reduce(
          (a, b) => (a = a + b.question1Time),
          0
        );
        avg1Temp.push(Math.floor(avg1 / tempSessions[i].length));
        const avg2 = tempSessions[i].reduce(
          (a, b) => (a = a + b.question2Time),
          0
        );
        avg2Temp.push(Math.floor(avg2 / tempSessions[i].length));
      }
    }
    this.setState({ averageTimePerBlockQ1: avg1Temp });
    this.setState({ averageTimePerBlockQ2: avg2Temp });
    console.log("1 :", this.state.averageTimePerBlockQ1);
    console.log("2 :", this.state.averageTimePerBlockQ2);
  };

  componentDidMount() {
    this.getItems();
    this.calculateAverages();
  }

  render() {
    console.log(this.state.averageTimePerBlockQ1);
    console.log(this.state.averageTimePerBlockQ2);
    const { height, width } = Dimensions.get("window");
    const data = [
      {
        data: this.state.averageTimePerBlockQ1,
        svg: { stroke: "purple" },
      },
      {
        data: this.state.averageTimePerBlockQ2,
        svg: { stroke: "green" },
      },
    ];

    console.log("current user ", this.state.currentUser);
    console.log("current block", this.state.currentBlock);
    return (
      <ImageBackground
        source={require("./App/images/OrangeLogo.jpeg")}
        style={{
          shadowColor: "#000",
          height: "100%",
          width: "100%",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 20,
        }}
      >
        <TouchableOpacity
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontWeight: "700",
          }}
          onPress={() => this.props.navigation.goBack()}
        >
          <View
            style={{
              width: 150,
              height: 35,
              margin: 11,
              marginTop: 60,
              shadowOffset: {
                width: 0,
                height: 10,
              },
              textAlign: "center",
              padding: 10,
              shadowOpacity: 0.4,
              shadowRadius: 20,
              backgroundColor: "#FFF",
              borderRadius: 10,
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={{
                fontSize: 35,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Back
            </Text>
          </View>
        </TouchableOpacity>

        <View
          flex={0.9}
          style={{
            width: width - 50,

            marginTop: 30,
            marginLeft: 26,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            padding: 10,
            shadowOpacity: 0.4,
            shadowRadius: 20,
            backgroundColor: "#FFF",
            borderRadius: 10,
          }}
        >
          <View flexDirection={"row"}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>
              DB{this.state.currentUser}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "300" }}>User</Text>
          </View>
          <View flex={0.5}>
            <UserTable
              average1={this.state.averageTimePerBlockQ1}
              average2={this.state.averageTimePerBlockQ2}
            />
          </View>
          <View width={width - 50} alignItems={"center"} marginBottom={10}>
            <Text
              style={{
                fontSize: 10,
                textDecorationLine: "underline",
                fontWeight: "300",
              }}
            >
              Average Response Times Trend Over Sessions (ms)
            </Text>
          </View>

          <View flexDirection={"row"} flex={1}>
            <View flex={1}>
              <XAxis
                data={data[1].data}
                svg={{
                  fill: data[1].svg.stroke,
                  fontSize: 8,
                }}
                xAccessor={({ item }) => item}
                scale={scale.scaleTime}
                numberOfTicks={data[1].data.length}
                style={{ marginHorizontal: -10 }}
                contentInset={{ left: 10, right: 10 }}
                formatLabel={(value) => Math.floor(value)}
              />

              <View borderWidth={0.2} borderRadius={10}>
                <LineChart
                  style={{ height: 120 }}
                  data={data}
                  // svg={{ stroke: "rgb(134, 65, 244)" }}
                  curve={shape.curveLinear}
                  contentInset={{ top: 20, bottom: 20 }}
                >
                  {/* <CustomGrid /> */}
                  <Decorator1 />
                  <Decorator2 />
                </LineChart>
              </View>

              <View padding={2}>
                <XAxis
                  data={data[0].data}
                  svg={{
                    fill: data[0].svg.stroke,
                    fontSize: 8,
                  }}
                  xAccessor={({ item }) => item}
                  scale={scale.scaleTime}
                  numberOfTicks={data[0].data.length}
                  style={{ marginHorizontal: -10 }}
                  contentInset={{ left: 10, right: 10 }}
                  formatLabel={(value) => Math.floor(value)}
                />

                {/* <XAxis
                style={{ marginHorizontal: -10 }}
                data={data1}
                formatLabel={(value, index) => index + 1}
                contentInset={{ left: 10, right: 10, top: 10, bottom: 30 }}
                svg={{ fontSize: 10, fill: "black" }}
              /> */}
              </View>
            </View>
          </View>

          <View
            padding={5}
            justifyContents={"center"}
            borderWidth={0.4}
            borderRadius={10}
          >
            {this.state.currentBlock < 4 && (
              <Text style={{ fontSize: 10, fontWeight: "300" }}>
                Current Block: {this.state.currentBlock}
              </Text>
            )}
            {this.state.currentBlock == 5 && (
              <Text style={{ fontSize: 10, fontWeight: "300" }}>
                All Sessions Completed!
              </Text>
            )}
            <ProgressBar nextWidth={this.state.currentBlock - 1}></ProgressBar>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
function CustomGrid({ x, y, data, ticks }) {
  return null;
  // <G>
  //   {
  //     // Horizontal grid
  //     ticks.map((tick) => (
  //       <Line
  //         key={tick}
  //         x1={"0%"}
  //         x2={"100%"}
  //         y1={y(tick)}
  //         y2={y(tick)}
  //         stroke={"rgba(0,0,0,0.2)"}
  //       />
  //     ))
  //   }
  // </G>;
}

const Decorator1 = ({ x, y, data }) => {
  return data[0].data.map((value, index) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)}
      r={4}
      stroke={"rgb(134, 65, 244)"}
      fill={"white"}
    />
  ));
};
function Decorator2({ x, y, data }) {
  return data[1].data.map((value, index) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)}
      r={4}
      stroke={"rgb(134, 65, 244)"}
      fill={"white"}
    />
  ));
}
