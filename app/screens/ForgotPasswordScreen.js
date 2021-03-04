import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from '../../firebase.js';

import colors from '../config/colors';

function ForgotPasswordScreen(props) {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const forgotPassword=()=>{
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        setMessage('You should have received an email to change your password')
      })
      .catch(error => setMessage(error.message))
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(val) => setEmail(val)}
      />

      <TouchableOpacity
        activeOpacity = { .5 }
        style={styles.submitButton}
        onPress={()=>forgotPassword()}
      >
        <Text style= {styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>

      <Text 
        style = {styles.textButton}
        onPress={() => props.navigation.navigate('LoginScreen')}>
          Back to Login
      </Text>

      <Text style={{color:'red'}}>{message}</Text>

    </View>
  );
}
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  submitButton:{
    width: 300,
    backgroundColor: colors.darkBorder,
    alignSelf: "center",
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:50,
  },
  submitText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 15
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  textButton: {
    color: colors.darkBorder,
    marginTop: 25,
    textAlign: 'center'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});