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
import { Notifications, Permissions } from "expo";

/**
 * Page that displays all of the scheduled notifications for the patient
 */
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

  // Rerenders the page with all the schedules
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  // Unsubscribe all trigerred actions when a component is unmounted
  componentWillUnmount() {
    this.unsubscribe();
  }

  // Retrieves the schedule data from firebase
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

  // Present the schedules in a readable format
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

  // Returns an alert upon deleting a schedule
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
        <View style={[styles.preloader, styles.centering]}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={[styles.container, styles.centering]}>
        <View style={[styles.center, styles.cover, styles.shadowEffect]}>
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
          <View style={[styles.backContainer, styles.centering]}>
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
  backButton: {
    height: "90%",
    width: "40%",
    backgroundColor: "#ffeed2",
    borderRadius: 50,
  },
  backContainer: {
    height: "10%",
    width: "100%",
    position: "absolute",
    bottom: 10,
    left: 0,
  },
  backText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "dimgray",
  },
  center: {
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
  container: {
    flex: 1,
    display: "flex",
    padding: 30,
    backgroundColor: "#fff",
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    height: "60%",
    width: "30%",
    backgroundColor: "#ffeed2",
    borderRadius: 10,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
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
});

export default ScheduleListScreen;
