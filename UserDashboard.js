import React, { Component, useState, useEffect } from "react";
import {
  StatusBar,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import filter from "lodash.filter";
import firebase from "./firebase";
import ProgressBar from "./App/src/components/ProgressBar";

function UserDashboard(props) {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  // const opacityLevel = React.useRef(new Animated.Value(0)).current;
  const spacing = 10;
  const ITEM_SIZE = 65 + spacing;

  const [searchQuery, setSearchQuery] = useState("");

  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [filterList, setFilterList] = useState([]);
  const [activeFilter, setActiveFilter] = useState([]);

  const ref = firebase.firestore().collection("users");
  //Default database display format
  const query = ref.orderBy("block");

  // Queries from firebase database and stores in list
  function getItems() {
    query.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setItems(items);
      setFilterList(items);
      setUserCount(items.length);
      setLoaded(true);
    });
  }

  // Gets therapy content while screen is renderings
  useEffect(() => {
    getItems();
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={searchQuery}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
        />
      </View>
    );
  }

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(filterList, (user) => {
      return contains(user, formattedQuery);
    });
    setItems(filteredData);
    setSearchQuery(text);
  };

  const contains = (user, searchQuery) => {
    if (user.includes(searchQuery)) {
      return true;
    }
    return false;
  };
  const { width, height } = Dimensions.get("window");

  return (
    <View>
      <ImageBackground
        source={require("./App/images/OrangeLogo.jpeg")}
        style={{
          absoluteFillObject: true,
          shadowColor: "#000",
          height: height,
          width: width,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          padding: spacing,
          shadowOpacity: 0.3,
          shadowRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            shadowColor: "#000",
            width: 80,
            height: 50,
            marginTop: 20,
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
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            Users: {userCount}
          </Text>
        </View>
        <Animated.FlatList
          ListHeaderComponent={renderHeader}
          data={items}
          keyExtractor={(item) => {
            item.userID;
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
            }
          )}
          contentContainerStyle={{
            paddingTop: StatusBar.currentHeight || 42,
            padding: spacing,
          }}
          renderItem={({ item, index }) => {
            // const scale = scrollY.interpolate({
            //   inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 5)],
            //   outputRange: [1, 1, 1, 0],
            // });
            return (
              <Animated.View
                key={item.userID}
                style={styles.listComponent}
                // transform={[scale]}
              >
                <View flex={1}>
                  <View flexDirection={"row"}>
                    <TouchableOpacity
                      onClick={() => props.navigation.navigate("UserInfo")}
                      // {
                      //   id: item.userID,
                      //   info: item,
                    >
                      <Text style={{ fontSize: 22, fontWeight: "700" }}>
                        DB{item.userID}
                      </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 10, fontWeight: "300" }}>
                      User
                    </Text>
                  </View>
                </View>
                <View width={200} marginLeft={10}>
                  <Text style={{ fontSize: 10, fontWeight: "300" }}>
                    Current Block: {item.block}
                  </Text>
                  <ProgressBar nextWidth={item.block}></ProgressBar>
                </View>
              </Animated.View>
            );
          }}
        ></Animated.FlatList>
        <StatusBar hidden />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  listComponent: {
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    padding: 10,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
});
export default UserDashboard;
