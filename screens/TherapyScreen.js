import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const TherapyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity>
        <SafeAreaView style={styles.takebreak}>
          <Text style={styles.text}>Take a break</Text>
       </SafeAreaView>
        </TouchableOpacity>

        <View style={styles.area}>
          <View style={styles.inner_area}>
              <Text style={styles.box_text}>Question here</Text>
          </View>

          <TouchableOpacity>
            <SafeAreaView style={styles.yes}>
              <Text style={styles.text}>YES</Text>
          </SafeAreaView>
        </TouchableOpacity>

        <TouchableOpacity>
            <SafeAreaView style={styles.no}>
              <Text style={styles.text}>NO</Text>
          </SafeAreaView>
        </TouchableOpacity>

        </View>

      <TouchableOpacity>
       <SafeAreaView style={styles.next}>
          <Text style={styles.text}>Next</Text>
       </SafeAreaView>
      </TouchableOpacity>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#ffd394",
  },

  takebreak: {
    marginVertical: 20,
    marginHorizontal: 150,
    height: 40,
    backgroundColor: "#94ffd3",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  text: {
    color: "black",
    fontSize: 18,
  },

  box_text: {
    color: "black",
    fontSize: 18,
    marginVertical: 50,
  },

  next: {
    marginVertical: 20,
    marginHorizontal: 150,
    height: 40,
    backgroundColor: "#94ffd3",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  area: {
    marginHorizontal: 20,
    width: '90%',
    height: '75%',
    padding: '5',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 25,
  },

  inner_area: {
    marginHorizontal: 50,
    width: '85%',
    height: '65%',
    padding: '5',
    backgroundColor: "#f4f0eb",
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    left: -20,
    top: 20,
  },

  yes: {
    width: 200,
    height: 40,
    backgroundColor: "#ffd0c1",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'absolute',
    right: -100,
    top: 450,
  },

  no: {
    width: 200,
    height: 40,
    backgroundColor: "#ffd0c1",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'absolute',
    right: -100,
    top: 500,
  },
});

export default TherapyScreen;