import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "../database/firebase";

class ScheduleListScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase
      .firestore()
      .collection("schedule")
      .where("userID", "==", firebase.auth().currentUser.uid);
    this.state = {
      isLoading: true,
      scheduleArr: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const scheduleArr = [];
    querySnapshot.forEach((res) => {
      const { scheduleDateTime } = res.data();
      scheduleArr.push({
        key: res.id,
        res,
        nanoseconds: scheduleDateTime.nanoseconds,
        seconds: scheduleDateTime.seconds,
      });
    });
    this.setState({
      scheduleArr,
      isLoading: false,
    });
  };

  convertDateTime(ss) {
    let date_ob = new Date(ss * 1000);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    return (
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }

  openTwoButtonAlert = (id) => {
    Alert.alert(
      "Delete Schedule",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this.deleteSchedule(id) },
        {
          text: "No",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  deleteSchedule(id) {
    const dbRef = firebase.firestore().collection("schedule").doc(id);
    dbRef.delete().then((res) => {
      this.props.navigation.navigate("ScheduleListScreen");
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={[styles.center, styles.shadowEffect]}>
          <View>
            {this.state.scheduleArr.map((item, i) => {
              return (
                <ListItem
                  containerStyle={{
                    backgroundColor: "#fed8b1",
                    flex: 1,
                  }}
                  style={{ width: 250, height: 70 }}
                  key={i}
                  bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title>
                      {this.convertDateTime(item.seconds)}
                    </ListItem.Title>
                  </ListItem.Content>
                  <TouchableOpacity
                    style={[
                      styles.centering,
                      styles.deleteButton,
                      styles.shadowEffect,
                      { alignItems: "center" },
                    ]}
                    onPress={() => this.openTwoButtonAlert(item.key)}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </ListItem>
              );
            })}
          </View>
          <View style={{ height: "10%" }}></View>
          <View
            style={[
              {
                height: "10%",
                width: "100%",
                position: "absolute",
                bottom: 10,
                left: 0,
              },
              styles.centering,
            ]}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[styles.backButton, styles.centering, styles.shadowEffect]}
            >
              <Text style={styles.backText}>Go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  center: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    backgroundColor: "#fed8b1",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#ffeed2",
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    height: "90%",
    width: "40%",
    backgroundColor: "#ffeed2",
    borderRadius: 50,
  },
  backText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "dimgray",
  },
  deleteButton: {
    height: "60%",
    width: "30%",
    backgroundColor: "#ffeed2",
    borderRadius: 10,
  },
  shadowEffect: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScheduleListScreen;
