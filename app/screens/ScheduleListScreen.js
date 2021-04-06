import React, { Component, useEffect } from "react";
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
import colors from "../config/colors";
import { Notifications } from "expo";

/**
 * Page that displays all of the scheduled notifications for the patient
 */

//function to check for inactivity every 60 seconds

var lastActivity;

function time() {
  useEffect(() => {
    const interval = setInterval(() => {
      inactivnotif();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // inactivity notifications

  const inactivitynotif = () => {
    function getLastActive() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => {
          lastActivity = doc.data().lastActive.toMillis();
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }

    var inactivityCounter = 0;
    if (Date.now() < lastActivity + 777600000) {
      if (inactivityCounter == 0) {
        scheduleInactiveNotification1 = async () => {
          let notificationId = Notifications.scheduleLocalNotificationAsync(
            {
              title: "HUG",
              body:
                "It’s been so long since we last saw you that HUG has webs everywhere. Come back and kick the spiders out.",
            },
            {
              time: Date().now,
            }
          );
          console.log(notificationId);
          inactivityCounter = inactivityCounter + 1;
        };
      }

      if (inactivityCounter == 1) {
        scheduleInactiveNotification2 = async () => {
          let notificationId = Notifications.scheduleLocalNotificationAsync(
            {
              title: "HUG",
              body: "Bro seriously? You cheating?",
            },
            {
              time: Date().now,
            }
          );
          console.log(notificationId);
        };

        scheduleInactiveNotification2 = async () => {
          let notificationId = Notifications.scheduleLocalNotificationAsync(
            {
              title: "HUG",
              body:
                "We would like to apologize for our developer Chad, who has been sending push notifications to people with better answers than him. Come back to make Chad more angry.",
            },
            {
              time: Date().now,
            }
          );
          console.log(notificationId);
          inactivityCounter = inactivityCounter + 1;
        };
      }

      if (inactivityCounter == 2) {
        scheduleInactiveNotification3 = async () => {
          let notificationId = Notifications.scheduleLocalNotificationAsync(
            {
              title: "HUG",
              body:
                "Your plant has not seen you in a long time. Come back to give her company and finish your questions.",
            },
            {
              time: Date().now,
            }
          );
          console.log(notificationId);
          inactivityCounter = inactivityCounter + 1;
        };
      }

      if (inactivityCounter == 3) {
        scheduleInactiveNotification4 = async () => {
          let notificationId = Notifications.scheduleLocalNotificationAsync(
            {
              title: "HUG",
              body:
                "Congratulation you have done more than 75% of the question. Would you like to finish them now?",
            },
            {
              time: Date().now,
            }
          );
          console.log(notificationId);
          inactivityCounter = inactivityCounter + 1;
        };
      }
    }
  };
}

class ScheduleListScreen extends Component {
  constructor() {
    time();
    super();
    this.firestoreRef = firebase
      .firestore()
      .collection("schedule")
      .where("userID", "==", firebase.auth().currentUser.uid)
      .orderBy("scheduleDateTime");
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
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
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

  // remove schedule from the firebase collection
  deleteSchedule(id) {
    const dbRef = firebase.firestore().collection("schedule").doc(id);
    dbRef.delete().then((res) => {
      this.props.navigation.navigate("ScheduleListScreen");
    });
  }

  // displays a push notification for the first schedule
  scheduleNotification1 = async () => {
    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: "HUG",
        body: "The first set of questions is out now!",
      },
      {
        time: this.state.scheduleArr[0],
      }
    );
    console.log(notificationId);
  };

  // displays a push notification for the second schedule
  scheduleNotification2 = async () => {
    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: "HUG",
        body:
          "“The secret of getting ahead is getting started.” The 2nd set of question is out now",
      },
      {
        time: this.state.scheduleArr[1],
      }
    );
    console.log(notificationId);
  };

  // displays a push notification for the third schedule
  scheduleNotification3 = async () => {
    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: "HUG",
        body:
          "“All our dreams can come true, if we have the courage to pursue them.”The 3rd set of question is out now",
      },
      {
        time: this.state.scheduleArr[2],
      }
    );
    console.log(notificationId);
  };

  // displays a push notification for the fourth schedule
  scheduleNotification4 = async () => {
    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: "HUG",
        body:
          "“Start where you are. Use what you have. Do what you can.” The final set of question is out now",
      },
      {
        time: this.state.scheduleArr[3],
      }
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
                    backgroundColor: colors.mainPanel,
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
    backgroundColor: colors.lightOutline,
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
    backgroundColor: colors.mainPanel,
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.lightOutline,
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
    backgroundColor: colors.lightOutline,
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
