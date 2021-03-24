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

  onPressButton = () => {
    this.setState({ visibility: true });
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
      <View style={[styles.container]}>
        <View style={[styles.center, styles.shadowEffect]}>
          <View style={{ height: "10%" }}></View>

          <View style={[{ height: "8%", flexDirection: "row" }]}>
            <View style={{ width: "20%" }}></View>
            <Text style={styles.textStyle}>Select a date:</Text>
          </View>

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
                  width: "33%",
                },
              ]}
            >
              <DateTimePicker
                style={{ width: 300 }}
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

          <View style={[{ height: "8%", flexDirection: "row" }]}>
            <View style={{ width: "20%" }}></View>
            <Text style={styles.textStyle}>Select a time:</Text>
          </View>

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

          <View style={{ height: "5%" }}></View>
          <View style={{ height: "10%" }}>
            <TouchableOpacity
              onPress={() => this.validateAppointment()}
              style={[styles.selectButton, styles.centering]}
            >
              <Text style={styles.textStyle}>Add Session</Text>
            </TouchableOpacity>
          </View>

          <View style={[{ height: "20%" }, styles.centering]}>
            <View style={[styles.calendarImage, styles.centering]}>
              <Image
                style={{ width: 125, height: 125 }}
                resizeMode="contain"
                source={require("../assets/sapling.png")}
              />
            </View>
          </View>

          <View style={[{ height: "10%" }, styles.centering]}>
            <TouchableOpacity style={styles.bottomBorder}>
              <Text style={styles.scheduleText}>Schedule List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

{
  /* <ScrollView style={styles.container}>

          {Platform.OS === 'android' && this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              //minimumDate={this.state.mode === 'date' && new Date()} // to prevent user to select past date
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />
          )}
          {Platform.OS === 'ios' && 
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
                  //minimumDate={this.state.mode === "date" && new Date()} // to prevent user to select past date
                  is24Hour={true}
                  display="default"
                  onChange={this.onChange}
                />
              </View>
            </View>}
          
        </View>
        <View style={styles.button}>
          <Button
            title="Add Session"
            onPress={() => this.validateAppointment()}
            color="#19AC52"
          />
          <Button
            title="Schedule List"
            onPress={() => this.props.navigation.navigate("ScheduleListScreen")}
            color="#19AC52"
          />
        </View>
      </ScrollView> */
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
    fontSize: 20,
    fontWeight: "bold",
    color: "dimgray",
  },
  scheduleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "dimgray",
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
