import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../../firebase.js';

import colors from '../config/colors';

export default function HomeScreen({ props, navigation }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [displayName, setDisplayName] = useState(firebase.auth().currentUser !== null ? firebase.auth().currentUser.displayName : '');

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('Logout successful')
      navigation.popToTop()
    })
      .catch(error => setErrorMessage(error.message))
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        Hello, {displayName}
      </Text>

      <Button
        color={colors.darkBorder}
        title="Go to Sessions"
        onPress={() => navigation.navigate('Sessions')}
      />

      <Button
        color={colors.darkBorder}
        title="Logout"
        onPress={() => signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});