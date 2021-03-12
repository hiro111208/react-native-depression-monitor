import React, { Component } from "react";
import {
  StatusBar,
  FlatList,
  Animated,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";

import faker from "faker";
import ProgressBar from "./App/src/components/ProgressBar";
import orangeLogo from "./App/images/orangeLogo";
const { width, height } = Dimensions.get("screen");
function UserDashboard() {
  faker.seed(10);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const opacityLevel = React.useRef(new Animated.Value(0)).current;
  const spacing = 20;
  const avatar_size = 70;
  const ITEM_SIZE = avatar_size + (spacing + 3) * 3;

  const DATA = [...Array(30).keys()].map((_, i) => {
    return {
      key: faker.random.uuid(),
      image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        "men",
      ])}/${faker.random.number(60)}.jpg`,
      name: faker.name.findName(),
      jobTitle: faker.name.jobTitle(),
      email: faker.internet.email(),
    };
  });

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={orangeLogo}
        style={StyleSheet.absoluteFillObject}
        width={200}
        height={200}
      ></Image>

      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          paddingTop: StatusBar.currentHeight || 42,
          padding: spacing,
        }}
        renderItem={({ item, index }) => {
          const scale = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
            outputRange: [1, 1, 1, 0],
          });

          const opacity = opacityLevel.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)],
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: "row",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                padding: spacing,
                shadowOpacity: 0.3,
                shadowRadius: 20,
                marginBottom: spacing,

                backgroundColor: "#FFF",
                borderRadius: 12,
                opacity,
                transform: [{ scale }],
              }}
            >
              <View>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>
                  {item.name}
                </Text>

                <Text style={{ fontSize: 18, opacity: 0.7 }}>
                  {item.jobTitle}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    opacity: 0.8,
                    color: "#0099cc",
                    padding: 5,
                  }}
                >
                  <View width={200}></View>
                </Text>
                <View width={200}>
                  <ProgressBar></ProgressBar>
                </View>
              </View>
            </Animated.View>
          );
        }}
      ></Animated.FlatList>
      <StatusBar hidden />
    </View>
  );
}

export default UserDashboard;
