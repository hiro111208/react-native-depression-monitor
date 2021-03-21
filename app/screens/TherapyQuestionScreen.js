// screens/TherapyQuestionScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebase';

export default class TherapyQuestionScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('questions').orderBy('block', 'asc').orderBy('categoryDropped', 'asc').orderBy('question', 'asc');
    this.state = {
      isLoading: true,
      questionArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const questionArr = [];
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
    });
    this.setState({
      questionArr,
      isLoading: false,
   });
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
          {
            this.state.questionArr.map((item, i) => {
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
                    <ListItem.Content>
          <ListItem.Title>{item.categoryDropped} {item.block}-{item.question}</ListItem.Title>
        </ListItem.Content>
                  </ListItem>
              );
            })
          }
      </ScrollView>
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
  }
})