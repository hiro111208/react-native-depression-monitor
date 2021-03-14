// screens/SchedulingScreen.js

import React, { Component } from 'react';
import { Button, Dimensions, Text, StyleSheet, ScrollView, Image, ActivityIndicator, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../database/firebase';

const dimensions = Dimensions.get('window');
const imageHeight = dimensions.width;
const imageWidth = dimensions.width;

class SchedulingScreen extends Component {

  

  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('schedule');
    this.state = {
      isLoading: false,
      date: new Date(),
      mode : '',
      show : false,
    };
  }

  onChange = (event, selectedDate) => {
    const showFlag = Platform.OS === 'ios';
    this.setState({show: showFlag});
    console.log('selectedDate +++', selectedDate);
    this.setState({date: selectedDate || date});
  };

  showMode = (currentMode) => {
    this.setState({show : true});
    this.setState({mode: currentMode});
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  storeUser() {
    if(this.state.date === ''){
     alert('Pick date and time, please!');
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        scheduleDateTime: this.state.date,
      }).then((res) => {
        this.setState({
          date: new Date(),
          isLoading: false,
        });
        this.props.navigation.navigate('ScheduleListScreen');
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

          <Image
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode: 'center',
              height: Dimensions.get("window").height/2,
              width: Dimensions.get("window").width - 20 }}
            source={require('../assets/stage_9.png')}
          />

          <View>
            <Button onPress={this.showDatepicker} title="Select Date and time" />
          </View>
          <View>
            {/* <Button onPress={this.showTimepicker} title="Select Time" /> */}
          </View>
          {/* {this.state.show && (
            <DateTimePicker
              testID="datePicker"
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />
          )} */}

          <View style={styles.datepickerGroup}>
            <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
              <DateTimePicker
                testID="datePicker"
                value={this.state.date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            </View>

              <Text>                                         </Text>
            
            <View style={{ width: '50%', flex: 1, justifyContent: 'center', alignContent: 'center', }}>
              <DateTimePicker
                testID="TimePicker"
                value={this.state.date}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
           </View>
           
          </View>
          
        </View>
        <View style={styles.button}>
          <Button
            title='Add Schedule'
            onPress={() => this.storeUser()} 
            color="#19AC52"
          />
          <Button
            title='Schedule List'
            onPress={() => this.props.navigation.navigate('ScheduleListScreen')} 
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
    backgroundColor: '#ffd390'
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
  },
  button : {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  datepickerGroup:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})

export default SchedulingScreen;