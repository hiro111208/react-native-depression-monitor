import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../../firebase.js';

import colors from '../config/colors';

export default function HomeScreen({ props, navigation }) {
  const [displayName, setDisplayName] = useState(firebase.auth().currentUser !== null ? firebase.auth().currentUser.displayName : '');

  return (

    <View style={styles.container}>

      <View style={styles.center}>

        <View style={[styles.plantArea, styles.shadowEffect]}>
          <View style={styles.userNote}>
            <Text style={[styles.textStyle]}>Hello there, {displayName}!</Text>
            </View>
            
          </View>
        </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#fff'
  },
  center: {
    height: "100%",
    width: "100%",
    alignItems: 'center'
  },
  plantArea: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#fed8b1",
    alignItems: 'center',
  },
  userNote: {
    height: "40%",
    width: '100%',
    backgroundColor: "#ffeed2",
    alignItems: 'center',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    padding: 20
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'dimgray'
  },
  afterNote: {
    height: '50%'
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
});