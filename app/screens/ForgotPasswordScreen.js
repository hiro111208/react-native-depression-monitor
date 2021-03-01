import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from '../../firebase.js';

import colors from '../config/colors';

export default class ForgotPasswordScreen extends Component {
  constructor() {
    super();
    this.state={
        email: '',
        message: ''
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  forgotPassword= ()=>{
      firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
        this.setState({message: 'You should have received an email to change your password'})
      })
      .catch(error => this.setState({ message: error.message }))
  }

  render() {  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />

        <TouchableOpacity
          activeOpacity = { .5 }
          style={styles.submitButton}
          onPress={() => this.forgotPassword()}
        >
            <Text style= {styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>

        <Text 
        style = {styles.textButton}
        onPress={() => this.props.navigation.navigate('LoginScreen')}>
          Back to Login
        </Text>

        <Text style={{color:'red'}}>{this.state.message}</Text>

      </View>
    );
  }
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