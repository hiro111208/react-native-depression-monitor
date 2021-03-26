// screens/TherapyQuestionScreen.js

import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Button,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "../database/firebase";

import DropDownPicker from "react-native-dropdown-picker";

export default class TherapyQuestionScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase
      .firestore()
      .collection("questions")
      .orderBy("block", "asc")
      .orderBy("categoryDropped", "asc")
      .orderBy("question", "asc");
    this.state = {
      isLoading: true,
      questionArr: [],
      filteredArr: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const questionArr = [];
    const filteredArr = [];
    querySnapshot.forEach((res) => {
      const {
        answer1,
        answer2,
        block,
        categoryDropped,
        question,
        question1,
        question2,
        word,
      } = res.data();
      questionArr.push({
        key: res.id,
        res,
        answer1,
        answer2,
        block,
        categoryDropped,
        question,
        question1,
        question2,
        word,
      });
      filteredArr.push({
        key: res.id,
        res,
        answer1,
        answer2,
        block,
        categoryDropped,
        question,
        question1,
        question2,
        word,
      });
    });
    this.setState({
      questionArr,
      filteredArr,
      isLoading: false,
    });
  };

  filterCollection(categoryDropped) {
    this.setState({
      filteredArr: this.state.questionArr.filter(
        (questionArr) => questionArr.categoryDropped === categoryDropped
      ),
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
      <View style={[styles.container, styles.centering]}>
        <View style={[styles.center, styles.cover, styles.shadowEffect]}>
          <View style={{ height: "3%" }}></View>

          <View style={[{ height: "10%", zIndex: 5 }, styles.centering]}>
            <DropDownPicker
              items={[
                { label: "CONTROL", value: "CONTROL" },
                { label: "SOCIAL", value: "SOCIAL" },
                { label: "ACADEMIC", value: "ACADEMIC" },
                { label: "MOOD", value: "HEALTH" },
                { label: "HEALTH", value: "HEALTH" },
                { label: "HOBBIES", value: "HOBBIES" },
                { label: "FAMILY", value: "FAMILY" },
                { label: "WORK", value: "WORK" },
                { label: "RELATIONSHIP", value: "RELATIONSHIP" },
              ]}
              placeholder="Select a category!"
              defaultIndex={0}
              onChangeItem={(item) => this.filterCollection(item.value)}
              containerStyle={{ width: "80%", height: "100%" }}
              selectedLabelStyle={{
                color: "#dimgrey",
                fontWeight: "bold",
                fontSize: 20,
              }}
              placeholderStyle={{
                fontSize: 18,
                fontWeight: "bold",
                color: "dimgray",
              }}
              style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor: "#ffeed2",
                borderWidth: 0,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 1,
                marginVertical: 2,
              }}
              dropDownStyle={{
                backgroundColor: "#ffeed2",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2,
                marginVertical: 2,
              }}
            />
          </View>

          <View style={[styles.centering, { height: "70%" }]}>
            <ScrollView style={[styles.scrollView, { width: "90%" }]}>
              {this.state.filteredArr.map((item, i) => {
                return (
                  <ListItem
                    containerStyle={{
                      backgroundColor: "#fed8b1",
                    }}
                    key={i}
                    chevron
                    bottomDivider
                    onPress={() => {
                      this.props.navigation.navigate(
                        "TherapyQuestionDetailScreen",
                        {
                          questionkey: item.key,
                        }
                      );
                    }}
                  >
                    <ListItem.Content style={{ alignItems: "center" }}>
                      <ListItem.Title>
                        {item.categoryDropped} {item.block}-{item.question}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

{
  /* 

  <View style={{ height: "16%" }}></View>

          <View style={[styles.centering, { height: "70%" }]}>
            <ScrollView style={[styles.scrollView, { width: "90%" }]}>
              {this.state.filteredArr.map((item, i) => {
                return (
                  <ListItem
                    containerStyle={{
                      backgroundColor: "#fed8b1",
                    }}
                    key={i}
                    chevron
                    bottomDivider
                    onPress={() => {
                      this.props.navigation.navigate(
                        "TherapyQuestionDetailScreen",
                        {
                          questionkey: item.key,
                        }
                      );
                    }}
                  >
                    <ListItem.Content style={{ alignItems: "center" }}>
                      <ListItem.Title>
                        {item.categoryDropped} {item.block}-{item.question}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                );
              })}
            </ScrollView>
          </View>

*/
}

{
  /*<View style={[styles.container]}>
        
        <ScrollView style={styles.scrollView}>
          {
            this.state.filteredArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  onPress={() => {
                    this.props.navigation.navigate('TherapyQuestionDetailScreen', {
                      questionkey: item.key
                    });
                  }}>
                  <ListItem.Content style={{ alignItems: 'center', }}>
                    <ListItem.Title>
                      {item.categoryDropped} {item.block}-{item.question}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              );
            })
          }
        </ScrollView>
        <View>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.navigate('AdminDashboard')}
            color="#19AC52"
          />
        </View>
      </View>*/
}

const styles = StyleSheet.create({
  center: {
    backgroundColor: "#fed8b1",
    borderRadius: 50,
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
    padding: 25,
    backgroundColor: "#fff",
  },
  cover: {
    height: "100%",
    width: "100%",
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
  scrollView: {
    flex: 1,
    paddingBottom: 22,
  },
  dropdown: {
    flex: 1,
    paddingBottom: 10,
    fontWeight: "bold",
  },
});
