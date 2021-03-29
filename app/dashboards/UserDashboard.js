import React, { useState, useEffect } from "react";

import {
  StatusBar,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import firebase from "../database/firebase";
import ProgressBar from "../src/components/ProgressBar";
import { TextInput } from "react-native-gesture-handler";

function UserDashboard(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [filterList, setFilterList] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const active = ["active", "inactive"];
  const activeColor = ["#00b225", "#e12800"];
  const FORTNIGHT = 1209600000;
  const ref = firebase.firestore().collection("users");
  const query = ref.orderBy("userID");

  // fliter list when search bar has input
  const onChange = (text) => {
    // Checks if text exists and a filter isn't currently happening
    if (text && !filtering) {
      setFiltering(true);
      const newData = items.filter(function (item) {
        const textData = text.toUpperCase();
        const itemIDData = `DB${item.userID}`
          ? `DB${item.userID}`.toUpperCase()
          : "".toUpperCase();
        const itemBlockData = item.block.toString()
          ? item.block.toString()
          : "".toUpperCase();
        const itemIDNumberData = item.userID
          ? item.userID.toString().toUpperCase()
          : "".toUpperCase();
        const activity = active[
          isActive(item.lastActive.toMillis())
        ].toUpperCase()
          ? active[isActive(item.lastActive.toMillis())].toUpperCase()
          : "".toUpperCase();

        // return if datasets contain data
        return (
          itemIDData.indexOf(textData) > -1 ||
          itemBlockData.indexOf(textData) > -1 ||
          itemIDNumberData.indexOf(textData) > -1 ||
          //take into acount "active" is substring of "inactive"
          (activity.indexOf(textData) > -1 && activity.indexOf(textData) < 2)
        );
      });
      setItems(newData);
      setSearchQuery(text);
      setFiltering(false);
    } else {
      // Inserted text is blank
      // Update items with filterList
      setItems(filterList);
      setSearchQuery(text);
    }
  };

  // checks if user has been active within the last 2 weeks
  const isActive = (timestamp) => {
    const TimeNow = Date.now();
    if (TimeNow - timestamp >= FORTNIGHT) {
      return 1;
    } else {
      return 0;
    }
  };

  // upon Mount get UserList
  useEffect(() => {
    getItems();
  }, []);

  // retrieve all users from the database
  function getItems() {
    query.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setItems(items);
      setFilterList(items);
      setUserCount(items.length);
    });
  }

  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={styles.fontStyle}
        >
          Total Nº Users : {userCount}
        </Text>
      </View>
      <TextInput
        style={styles.searchBar}
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => onChange(text)}
        clearButtonMode={"always"}
        placeholder="Search by ID, Activity, Block Number"
        value={searchQuery}
      />

      <Animated.FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingTop: StatusBar.currentHeight || 42,
          padding: 5,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                props.navigation.navigate("UserInfo", {
                  user: item.userID,
                  block: item.block,
                  lastActive: item.lastActive,
                  category: item.categoryDropped,
                })
              }
            >
              <Animated.View style={styles.listComponent}>
                <View flex={1}>
                  <View flexDirection={"row"}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("UserInfo", {
                          user: item.userID,
                          block: item.block,
                          lastActive: item.lastActive,
                        })
                      }
                    >
                      <Text style={{ fontSize: 22, fontWeight: "700" }}>
                        DB{item.userID}
                      </Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 10, fontWeight: "300" }}>
                      User:
                      <Text
                        style={{
                          color:
                            activeColor[isActive(item.lastActive.toMillis())],
                          fontSize: 10,
                          fontWeight: "900",
                        }}
                      >
                        {" "}
                        {active[isActive(item.lastActive.toMillis())]}
                      </Text>
                    </Text>
                  </View>
                </View>

                <View width={200} marginLeft={10}>
                  {item.block < 5 && (
                    <Text style={{ fontSize: 10, fontWeight: "300" }}>
                      Current Block: {item.block}
                    </Text>
                  )}
                  {item.block === 5 && (
                    <Text style={{ fontSize: 10, fontWeight: "300" }}>
                      All Sessions Completed!
                    </Text>
                  )}
                  <ProgressBar nextWidth={item.block - 1}></ProgressBar>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      ></Animated.FlatList>

      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#ffbe7bff",
    borderRadius: 20,
    borderColor: "#ffa351ff",
    borderWidth: 3,
    flex: 1,
  },
  fontStyle: {
    fontSize: 15,
    fontWeight: "700",
  },
  counter: {
    width: 150,
    height: 35,
    marginTop: 30,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    padding: 10,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
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
  searchBar: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 22,
    marginTop: 20,
    marginBottom: 0,
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
      borderRadius: 20,
    },
  },
});

export default UserDashboard;
