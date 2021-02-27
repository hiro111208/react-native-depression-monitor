import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'; 

const TherapyScreen = () => {
    return (
      <View style={styles.container}>

        <View style={styles.top}>
          <TouchableOpacity>
            <View style={styles.optbutton}>              
                <Text style={styles.text}>Take a break</Text>             
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <View style={styles.question}>
            <Text style={styles.text}>Question here</Text>
          </View>
        </View>

        <View style={styles.answers}>
          <TouchableOpacity>
            <View style={styles.ansbutton}>
              <Text style={styles.text}>YES</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.ansbutton}>
              <Text style={styles.text}>NO</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity>
            <View style={styles.optbutton}>
              <Text style={styles.text}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#ffd394'
  },
  optbutton: {
    height: '70%',
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#94ffd3',
    borderRadius: 10,
  },
  ansbutton: {
    height: '75%',
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffd0c1',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  text: {
    color: "black",
    fontSize: 18,
  },
  top: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  question: {
    width: '80%',
    height: '100%',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#eee'
  },
  answers: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 70,
  },
  bottom: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default TherapyScreen;