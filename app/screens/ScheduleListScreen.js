// screens/ScheduleListScreen.js

import React, { Component } from 'react';
import { Button } from 'react-native';
import { StyleSheet, ScrollView, ActivityIndicator, View, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from '../database/firebase';

import { withNavigation } from 'react-navigation';


class ScheduleListScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('schedule');
    this.state = {
      isLoading: true,
      scheduleArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const scheduleArr = [];
    querySnapshot.forEach((res) => {
      const { scheduleDateTime } = res.data();
      console.log(res.data());
      scheduleArr.push({
        key: res.id,
        res,
        nanoseconds: scheduleDateTime.nanoseconds,
        seconds: scheduleDateTime.seconds
      });
    });
    this.setState({
      scheduleArr,
      isLoading: false,
   });
  }

  convertDateTime(ss) {
    let date_ob = new Date(ss * 1000);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
  }

  openTwoButtonAlert = (id) => {
    Alert.alert(
      'Delete Schedule',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteSchedule(id)},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  deleteSchedule(id) {
    const dbRef = firebase.firestore().collection('schedule').doc(id);
    dbRef.delete().then((res) => {
      console.log('Item removed from db +++++++')
      this.props.navigation.navigate('ScheduleListScreen');
    })
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
      <View style={styles.container}>
        <ScrollView>
          {
            this.state.scheduleArr.map((item, i) => {
              return (
                <ListItem key={i} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{this.convertDateTime(item.seconds)}</ListItem.Title>
                  </ListItem.Content>
                  <Button onPress={() => this.openTwoButtonAlert(item.key)} title="Delete"></Button>
                </ListItem>

              );
            })
          }
        </ScrollView>

        <View>
          <Button
            title='Calander'
            onPress={() => this.props.navigation.goBack()}
            color="#19AC52"
          />
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22,
  backgroundColor: '#ffd390'
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
})

export default ScheduleListScreen;