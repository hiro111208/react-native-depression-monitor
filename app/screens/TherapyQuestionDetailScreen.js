// screens/TherapyQuestionDetailScreen.js

import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import * as indexStyles from "../config/indexStyles";
import firebase from "../database/firebase";

export default class TherapyQuestionDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      answer1: "",
      answer2: "",
      block: "",
      categoryDropped: "",
      question: "",
      question1: "",
      question2: "",
      word: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    const dbRef = firebase
      .firestore()
      .collection("questions")
      .doc(this.props.route.params.questionkey);

    dbRef.get().then((res) => {
      if (res.exists) {
        const question = res.data();
        this.setState({
          key: res.id,
          answer1: question.answer1,
          answer2: question.answer2,
          block: question.block,
          categoryDropped: question.categoryDropped,
          question: question.question,
          question1: question.question1,
          question2: question.question2,
          word: question.word,
          isLoading: false,
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  updateTherapyQuestion() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase
      .firestore()
      .collection("questions")
      .doc(this.state.key);
    updateDBRef
      .set({
        answer1: this.state.answer1,
        answer2: this.state.answer2,
        block: this.state.block,
        categoryDropped: this.state.categoryDropped,
        question: this.state.question,
        question1: this.state.question1,
        question2: this.state.question2,
        word: this.state.word,
      })
      .then((docRef) => {
        Alert.alert(
          `${this.state.categoryDropped} ${this.state.block}-${this.state.question} updated!`
        );
        this.setState({
          key: "",
          answer1: "",
          answer2: "",
          block: "",
          categoryDropped: "",
          question: "",
          question1: "",
          question2: "",
          word: "",
          isLoading: false,
        });
        this.props.navigation.navigate("TherapyQuestionScreen");
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={indexStyles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={[indexStyles.containerWhite, indexStyles.centering]}>
        <View style={[indexStyles.containerOrange, indexStyles.cover, indexStyles.shadowEffect]}>
          <View style={{ height: "10%" }}>
            <View style={styles.title}>
              <Text style={[indexStyles.textGrey]}>
                {this.state.categoryDropped} {this.state.block}-
                {this.state.question}
              </Text>
            </View>
          </View>

          <View style={indexStyles.centering}>
            <ScrollView style={{ height: "70%", width: "80%" }}>
              <View>
                <Text style={{ fontWeight: "bold" }}>Question 1:</Text>
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  placeholder={"question1"}
                  value={this.state.question1}
                  onChangeText={(val) =>
                    this.inputValueUpdate(val, "question1")
                  }
                />
              </View>
              <View>
                <Text />
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>Word:</Text>
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder={"word"}
                  value={this.state.word}
                  onChangeText={(val) => this.inputValueUpdate(val, "word")}
                />
              </View>
              <View>
                <Text />
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>Answer 1:</Text>
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder={"answer1"}
                  value={this.state.answer1}
                  onChangeText={(val) => this.inputValueUpdate(val, "answer1")}
                />
              </View>
              <View>
                <Text />
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>Question 2:</Text>
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  placeholder={"question2"}
                  value={this.state.question2}
                  onChangeText={(val) =>
                    this.inputValueUpdate(val, "question2")
                  }
                />
              </View>
              <View>
                <Text />
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>Answer 2:</Text>
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder={"answer2"}
                  value={this.state.answer2}
                  onChangeText={(val) => this.inputValueUpdate(val, "answer2")}
                />
              </View>
            </ScrollView>
          </View>

          <View style={[{ height: "8%" }, indexStyles.centering]}>
            <TouchableOpacity
              onPress={() => this.updateTherapyQuestion()}
              style={[
                indexStyles.roundButton,
                indexStyles.shadowEffect,
                indexStyles.centering,
              ]}
            >
              <Text style={[indexStyles.textGrey, { fontSize: 17 }]}>Update</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: "2%" }}></View>

          <View style={[{ height: "10%" }, indexStyles.centering]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[
                styles.optButton,
                indexStyles.cover,
                indexStyles.centering,
                { borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
              ]}
            >
              <Text style={[indexStyles.textGrey, { fontSize: 17 }]}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  optButton: {
    backgroundColor: "#ffeed2",
  },
  title: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
