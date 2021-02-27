import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'; 

const TherapyScreen = () => {
    return (
      <View style={styles.container}>

        <View style={[styles.top, styles.centering]}>
          <TouchableOpacity style={[styles.optButton, styles.centering]}>      
                <Text style={styles.text}>Take a break</Text>             
          </TouchableOpacity>
        </View>

        <View style={[styles.center, styles.centering]}>
          <View style={styles.question}>
            <Text style={styles.text}>Question here</Text>
          </View>
        </View>

        <View style={[styles.answers, styles.centering]}>
          <TouchableOpacity style={[styles.ansButton, styles.centering]}>
              <Text style={styles.text}>YES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ansButton, styles.centering]}>
              <Text style={styles.text}>NO</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.bottom, styles.centering]}>
          <TouchableOpacity style={[styles.optButton, styles.centering]}>
              <Text style={styles.text}>Next</Text>           
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
  optButton: {
    height: '70%',
    width: 140,
    backgroundColor: '#94ffd3',
    borderRadius: 10,
  },
  ansButton: {
    height: '75%',
    width: 250,
    backgroundColor: '#ffd0c1',
    borderRadius: 10,
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
  text: {
    color: "black",
    fontSize: 18,
    marginVertical: 20,
  },
  top: {
    height: '10%',
  },
  center: {
    height: '50%',
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
    padding: 70,
  },
  bottom: {
    height: '10%',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default TherapyScreen;