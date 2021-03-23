// screens/TherapyQuestionScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebase';

import DropDownPicker from 'react-native-dropdown-picker';

export default class TherapyQuestionScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('questions').orderBy('block', 'asc').orderBy('categoryDropped', 'asc').orderBy('question', 'asc');
    this.state = {
      isLoading: true,
      questionArr: [],
      filteredArr: []
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
      const { answer1,
        answer2,
        block,
        categoryDropped,
        question,
        question1,
        question2,
        word } = res.data();
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
  }

  filterCollection(categoryDropped){
    this.setState({filteredArr: this.state.questionArr.filter(questionArr => questionArr.block === categoryDropped)})
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <DropDownPicker
          items={[
            { label: 'CONTROL', value: 1 },
            { label: 'SOCIAL', value: 2 },
            { label: 'ACADEMIC', value: 3 },
            { label: 'MOOD', value: 4 },
            { label: 'HEALTH', value: 'HEALTH' },
            { label: 'HOBBIES', value: 'HOBBIES' },
            { label: 'FAMILY', value: 'FAMILY' },
            { label: 'WORK', value: 'WORK' },
            { label: 'RELATIONSHIP', value: 'RELATIONSHIP' },
          ]}
          placeholder="Select a category"
          defaultIndex={0}
          containerStyle={{ height: 40 }}
          //onChangeItem={item => console.log(item.label, item.value)}
          onChangeItem={(item) => this.filterCollection(item.value)}
        />
        <ScrollView style={styles.container}>
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
                  <ListItem.Content style={styles.scrollView}>
                    <ListItem.Title>{item.categoryDropped} {item.block}-{item.question}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              );
            })
          }
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
  }
})