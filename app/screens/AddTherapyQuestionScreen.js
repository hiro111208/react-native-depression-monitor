// screens/AddTherapyQuestionScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebase';

export default class AddTherapyQuestionScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('questions');
    this.state = {
      answer1: '',
      answer2: '',
      block: '',
      categoryDropped: '',
      question: '',
      question1: '',
      question2: '',
      word: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeTherapyQuestion() {
    if(this.state.answer1 === '' ||
    this.state.answer2 === '' ||
    this.state.block === '' ||
    this.state.categoryDropped === '' ||
    this.state.question === '' ||
    this.state.question1 === '' ||
    this.state.question2 === '' ||
    this.state.word === ''){
     alert('Fill everything!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        answer1: this.state.answer1,
        answer2: this.state.answer2,
        block: this.state.block,
        categoryDropped: this.state.categoryDropped,
        question: this.state.question,
        question1: this.state.question1,
        question2: this.state.question2,
        word: this.state.word,
      }).then((res) => {
        this.setState({
          answer1: '',
          answer2: '',
          block: '',
          categoryDropped: '',
          question: '',
          question1: '',
          question2: '',
          word: '',
          isLoading: false,
        });
        this.props.navigation.navigate('TherapyQuestionScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'answer1'}
              value={this.state.answer1}
              onChangeText={(val) => this.inputValueUpdate(val, 'answer1')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'answer2'}
              value={this.state.answer2}
              onChangeText={(val) => this.inputValueUpdate(val, 'answer2')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'block'}
              value={this.state.block}
              onChangeText={(val) => this.inputValueUpdate(val, 'block')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'categoryDropped'}
              value={this.state.categoryDropped}
              onChangeText={(val) => this.inputValueUpdate(val, 'categoryDropped')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'question'}
              value={this.state.question}
              onChangeText={(val) => this.inputValueUpdate(val, 'question')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'question1'}
              value={this.state.question1}
              onChangeText={(val) => this.inputValueUpdate(val, 'question1')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'question2'}
              value={this.state.question2}
              onChangeText={(val) => this.inputValueUpdate(val, 'question2')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'word'}
              value={this.state.word}
              onChangeText={(val) => this.inputValueUpdate(val, 'word')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add TherapyQuestion'
            onPress={() => this.storeTherapyQuestion()} 
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
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})