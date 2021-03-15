// screens/SchedulingScreen.js

import React, { Component } from "react";

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
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <Image
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              resizeMode: "center",
              height: Dimensions.get("window").height / 2,
              width: Dimensions.get("window").width - 20,
            }}
            source={require("../assets/stage_9.png")}
          />

          <View>
            <Button
              onPress={this.showDatepicker}
              title="Select Date and time"
            />
          </View>
          {/* {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              minimumDate={this.state.mode === 'date' && new Date()} // to prevent user to select past date
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />
          )} */}

          <View style={styles.datepickerGroup}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
              }}
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

            <Text> </Text>

            <View
              style={{
                width: "50%",
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <DateTimePicker
                testID="TimePicker"
                value={this.state.date}
                mode="time"
                minimumDate={this.state.mode === "date" && new Date()} // to prevent user to select past date
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title="Add Schedule"
            onPress={() => this.validateAppointment()}
            color="#19AC52"
          />
          <Button
            title="Schedule List"
            onPress={() => this.props.navigation.navigate("ScheduleListScreen")}
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#ffd390",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  datepickerGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default SchedulingScreen;
