import React, {useState} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../../firebase.js';

import colors from '../config/colors';

function AdminDashboardScreen(props) {
  const [errorMessage, setErrorMessage] = useState('');

  const signOut=()=>{
    firebase.auth().signOut().then(() => {
      console.log('Logout successful')
      navigation.popToTop()
    })
    .catch(error => setErrorMessage(error.message))
  };  

  return (
    <View style={styles.container}>
      <Text style = {styles.textStyle}>
          Hello, Admin
      </Text>

      <Button
        color={colors.darkBorder}
        title="Go to user dashboard"
        onPress={() => props.navigation.navigate('DashboardScreen')}
      />
      <Button
        color={colors.darkBorder}
        title="Logout"
        onPress={() => signOut()}
      />
    </View>
  );
}
export default AdminDashboardScreen;

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