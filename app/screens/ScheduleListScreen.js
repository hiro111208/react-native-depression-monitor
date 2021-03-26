// screens/ScheduleListScreen.js

import React, { Component } from "react";
import { Button } from "react-native";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "../database/firebase";
import { Notifications, Permissions } from "expo";

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
      console.log(res.data());
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
          onPress: () => console.log("No item was removed"),
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
      console.log("Item removed from db +++++++");
      this.props.navigation.navigate("ScheduleListScreen");
    });
  }
 
 
scheduleNotification1 = async () => {
  var n1 = new Date(scheduleDateTime);
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "HUG",
      body: 'The first set of questions is out now!',
    },
    {
      time: n1.setDate(n1.getDate()),
    },
  );
  console.log(notificationId);
};

scheduleNotification2 = async () => {
  var n2 = new Date(scheduleDateTime);
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "HUG",
      body: '“The secret of getting ahead is getting started.” The 2nd set of question is out now',
    },
    {
      time: n2.setDate(n2.getDate() + 7),
    },
  );
  console.log(notificationId);
};

scheduleNotification3 = async () => {
  var n3 = new Date(scheduleDateTime);
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "HUG",
      body: '“All our dreams can come true, if we have the courage to pursue them.”The 3rd set of question is out now',
    },
    {
      time: n3.setDate(n3.getDate() + 14),
    },
  );
  console.log(notificationId);
};

scheduleNotification4 = async () => {
  var n4 = new Date(scheduleDateTime);
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "HUG",
      body: '“Start where you are. Use what you have. Do what you can.” The final set of question is out now',
    },
    {
      time: n4.setDate(n4.getDate() + 21),
    },
  );
  console.log(notificationId);
};


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
        <ScrollView>
          {this.state.scheduleArr.map((item, i) => {
            return (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>
                    {this.convertDateTime(item.seconds)}
                  </ListItem.Title>
                </ListItem.Content>
                <Button
                  onPress={() => this.openTwoButtonAlert(item.key)}
                  title="Delete"
                ></Button>
              </ListItem>
            );
          })}
        </ScrollView>

        <View>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
            color="#19AC52"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
    backgroundColor: "#ffd390",
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
