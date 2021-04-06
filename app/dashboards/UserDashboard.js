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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import firebase from "../database/firebase";
import ProgressBar from "../src/components/ProgressBar";
import { TextInput } from "react-native-gesture-handler";
import * as indexStyles from "../config/indexStyles";
import * as colors from "../config/colors";

/*
 * View the progress of all users of the app
 */
function UserDashboard(props) {
  const [isSelected, setSelection] = useState(false);
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
          // take into acount "active" is substring of "inactive"
          (activity.indexOf(textData) > -1 && activity.indexOf(textData) < 2)
        );
      });
      setItems(newData);
      setSearchQuery(text);
      setFiltering(false);
    }

    // text inserted is blank
    else {
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
    const ac = new AbortController();
    const sig = ac.signal;
    Promise.all([
      getItems(),
      { signal: sig },
      console.log("in Dashboard"),
    ]).catch((ex) => console.error(ex));
    return function cleanup() {
      console.log("out Dashboard");
      ac.abort();
    };
  }, []);

  // display user's categoryDropped
  function toggleCategory() {
    if (isSelected == false) {
      setSelection(true);
    } else {
      setSelection(false);
    }
    console.log(isSelected);
  }

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

  return (
    <View style={styles.container}>
      {/** Checkbox to toggle revealing of category */}
      <View
        flexDirection={"row"}
        justifyContent={"flex-end"}
        marginBottom={-45}
      >
        <BouncyCheckbox
          style={{ paddingTop: 10, paddingRight: 4 }}
          size={12}
          textStyle={{ fontSize: 10, fontWeight: "600", marginLeft: -10 }}
          fillColor="blue"
          unfillColor="white"
          text=" Display Category "
          iconStyle={{ borderColor: "black" }}
          onPress={() => {
            toggleCategory();
          }}
        />
      </View>

      {/** Show total number of users */}
      <View style={[styles.counter, indexStyles.shadowEffect]}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={styles.fontStyle}
        >
          Total Nº Users : {userCount}
        </Text>
      </View>

      {/** Search functionality */}
      <TextInput
        style={[
          styles.searchBar,
          indexStyles.centering,
          indexStyles.shadowEffect,
        ]}
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => onChange(text)}
        clearButtonMode={"always"}
        placeholder="Search by ID, Activity, Block Number"
        value={searchQuery}
      />

      {/** Contains list of users from the user collection on firebase */}
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
              {/** Presents the user's ID */}
              <Animated.View
                style={[styles.listComponent, indexStyles.shadowEffect]}
              >
                <View flex={1}>
                  <View flexDirection={"row"}>
                    <Text style={styles.idText}>DB{item.userID}</Text>

                    <Text style={styles.mainText}>
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

                {/** Show user's progress in the therapy sessions */}
                <View width={200} marginLeft={10}>
                  <View flexDirection={"row"}>
                    {item.block < 5 && (
                      <Text style={styles.mainText}>
                        Current Block: {item.block}
                      </Text>
                    )}
                    {item.block === 5 && (
                      <Text style={styles.mainText}>
                        All Sessions Completed!
                      </Text>
                    )}

                    {/* Space where the category is revealed on toggle */}
                    {isSelected ? (
                      <View flexDirection={"row"}>
                        <Text style={[styles.category, styles.normalFont}>Category:</Text>
                        <Text style={[styles.categoryDropped, styles.normalFont]}>
                          {item.categoryDropped}
                        </Text>
                      </View>
                    ) : null}
                  </View>
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
    backgroundColor: colors.background,
    borderRadius: 20,
    borderColor: colors.darkBorder,
    borderWidth: 3,
    flex: 1,
  },
  counter: {
    marginLeft: 5,
    width: 150,
    height: 35,
    marginTop: 30,
  },
  fontStyle: {
    fontSize: 15,
    fontWeight: "700",
  },
  idText: {
    fontSize: 22,
    fontWeight: "700",
  },
  listComponent: {
    flexDirection: "row",
    shadowColor: "#000",
    marginBottom: 10,
  },
  mainText: {
    fontSize: 10,
    fontWeight: "300",
  },
  category: {
    paddingLeft: 29,
    fontWeight: "300",
  },
  categoryDropped: {
    fontWeight: "600",
  },
  normalFont: {
    paddingBottom: 2,
    fontSize: 8,
  },
  searchBar: {
    textAlign: "center",
    fontSize: 22,
    marginTop: 20,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});

export default UserDashboard;
