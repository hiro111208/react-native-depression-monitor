// screens/SchedulingScreen.js

import React, { Component, Fragment } from "react";

import {
  Button,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  ActivityIndicator,
  View,
  Platform,
  Alert,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "../database/firebase";
import moment from "moment";
import { TouchableOpacity } from "react-native";

class SchedulingScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("schedule");
    this.state = {
      isLoading: false,
      date: new Date(),
      mode: "",
      show: false,
    };
  }

  onChange = (event, selectedDate) => {
    const showFlag = Platform.OS === "ios";
    this.setState({ show: showFlag });
    console.log("selectedDate +++", selectedDate);
    this.setState({ date: selectedDate || date });
  };

  showMode = (currentMode) => {
    this.setState({ show: true });
    this.setState({ mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode("date");
  };

  showTimepicker = () => {
    this.showMode("time");
  };

  storeUser() {
    if (this.state.date === "") {
      alert("Pick date and time, please!");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          scheduleDateTime: this.state.date,
          userID: firebase.auth().currentUser.uid,
        })
        .then((res) => {
          this.setState({
            date: new Date(),
            isLoading: false,
          });
          this.props.navigation.navigate("ScheduleListScreen");
        })
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  storeFirstAppointment = (date) => {
    this.dbRef
      .add({
        scheduleDateTime: date,
        userID: firebase.auth().currentUser.uid,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
  };

  // method call on book first appointment
  onFirstAppointment = () => {
    const { date } = this.state;
    this.setState({ isLoading: true });
    const nowDate = moment(date).unix();
    const addWeekArray = [];
    addWeekArray.push(date);
    for (let i = 1; i < 4; i++) {
      const nowtoWeek = moment.unix(nowDate).add(i, "w").toDate();
      addWeekArray.push(nowtoWeek);
    }
    for (let i = 0; i < addWeekArray.length; i++) {
      this.storeFirstAppointment(addWeekArray[i]);
    }
    this.setState({
      isLoading: false,
    });
    this.props.navigation.navigate("ScheduleListScreen");
  };

  // validate appointment date
  onValidateAppointment = async (scheduleArr) => {
    const { date } = this.state;
    const diffArray = [];

    for (let i = 0; i < scheduleArr.length; i++) {
      const appointmentDate = scheduleArr[i].seconds;
      const nowDate = moment(date).unix();
      const diff = moment
        .unix(appointmentDate)
        .diff(moment.unix(nowDate), "hours");
      const validateDiff = Math.abs(diff);
      diffArray.push(validateDiff);
    }
    const isValidtoGo = await diffArray.every((el) => el >= 47);
    if (String(isValidtoGo).trim() === "true") {
      this.storeUser();
    } else {
      alert(
        "You cannot book appointments that are consecutive or on the same day, please select another date."
      );
    }
  };

  // fetch data of  ScheduleList to validate appointment date
  getCollection = async (querySnapshot) => {
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
    // first appointment functionality
    if (scheduleArr.length === 0) {
      Alert.alert(
        "First appointment",
        "Hello, would like to schedule your appointment at the same day and time every week for 4 weeks",
        [
          { text: "OK", onPress: async () => await this.onFirstAppointment() },
          {
            text: "Cancel",
            onPress: () => this.onValidateAppointment(scheduleArr),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else {
      // normal appointment
      this.onValidateAppointment(scheduleArr);
    }
  };

  // method call on Add Schedule button
  validateAppointment() {
    this.dbRef
      .where("userID", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        this.getCollection(querySnapshot);
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
      <View style={[styles.container]}>
        <View style={[styles.center, styles.shadowEffect]}>
          <View style={{ height: "7%" }}></View>

          <View style={[{ height: "6%", flexDirection: "row" }]}>
            <View style={{ width: "20%" }}></View>
            <Text style={styles.textStyle}>Select a date:</Text>
          </View>

          {Platform.OS === "android" && (
            <Button onPress={this.showDatepicker} title="Select Date" />
            )}

          {Platform.OS === "android" && this.state.show && (
              <DateTimePicker
                testID="datePicker"
                value={this.state.date}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
          )}

          {Platform.OS === "ios" && (
            <View style={{ height: "10%", flexDirection: "row" }}>
              <View
                style={{
                  height: "100%",
                  width: "33%",
                }}
              ></View>
              <View
                style={[
                  {
                    width: "40%",
                  },
                ]}
              >
                <DateTimePicker
                  testID="datePicker"
                  value={this.state.date}
                  mode="date"
                  minimumDate={this.state.mode === "date" && new Date()} // to prevent user to select past date
                  is24Hour={true}
                  display="default"
                  onChange={this.onChange}
                />
              </View>
            </View>
          )}

          <View style={[{ height: "6%", flexDirection: "row" }]}>
            <View style={{ width: "20%" }}></View>
            <Text style={styles.textStyle}>Select a time:</Text>
          </View>

          {Platform.OS === "android" && (
            <Button onPress={this.showTimepicker} title="Select Time" />
            )}

{Platform.OS === "android" && this.state.show && (
            <DateTimePicker
            testID="TimePicker"
            value={this.state.date}
            mode="time"
            //minimumDate={this.state.mode === "date" && new Date()} // to prevent user to select past date
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
            )}

{Platform.OS === "ios" && (
            <View style={{ height: "10%", flexDirection: "row" }}>
            <View
              style={{
                height: "10%",
                width: "33%",
              }}
            ></View>
            <View
              style={{
                height: "10%",
                width: "33%",
              }}
            >
              <DateTimePicker
                style={{ width: 300 }}
                testID="TimePicker"
                value={this.state.date}
                mode="time"
                //minimumDate={this.state.mode === "date" && new Date()} // to prevent user to select past date
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            </View>
          </View>
            )}

          

          <View style={{ height: "2%" }}></View>

          <View style={[{ height: "10%" }, styles.centering]}>
            <TouchableOpacity
              onPress={() => this.validateAppointment()}
              style={[styles.selectButton, styles.centering]}
            >
              <Text style={styles.textStyle}>Add Session</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: "10%" }}></View>

          <View style={[{ height: "25%" }, styles.centering]}>
            <View style={[styles.calendarImage, styles.centering]}>
              <Image
                style={{ width: 125, height: 125 }}
                resizeMode="contain"
                source={require("../assets/sapling.png")}
              />
            </View>
          </View>

          <View style={[{ height: "10%" }, styles.centering]}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ScheduleListScreen")
              }
              style={[styles.bottomBorder, styles.shadowEffect]}
            >
              <Text style={styles.scheduleText}>Schedule List</Text>
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
    padding: 25,
    backgroundColor: "#fff",
  },
  center: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fed8b1",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#ffeed2",
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
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
  calendarImage: {
    width: "100%",
    height: "100%",
  },
  selectButton: {
    height: "100%",
    width: "100%",
    backgroundColor: "#ffeed2",
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "dimgray",
  },
  scheduleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "dimgray",
  },
  bottomBorder: {
    height: "100%",
    width: "40%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#ffeed2",
  },
});

export default SchedulingScreen;
