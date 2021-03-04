import React, {useState} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../../firebase.js';

import colors from '../config/colors';

function DashboardScreen(props) {
  const [uid, setUid] = useState(firebase.auth().currentUser.uid);
  const [errorMessage, setErrorMessage] = useState('');
  const [displayName, setDisplayName] = useState(firebase.auth().currentUser.displayName);

  const signOut=()=>{
    firebase.auth().signOut().then(() => {
      console.log('Logout successful')
      props.navigation.navigate('LoginScreen')
    })
    .catch(error => setErrorMessage(error.message))
  };  

  return (
    <View style={styles.container}>
      <Text style = {styles.textStyle}>
          Hello, {displayName}
      </Text>

      <Button
        color={colors.darkBorder}
        title="Logout"
        onPress={() => signOut()}
      />
    </View>
  );
}
export default DashboardScreen;

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