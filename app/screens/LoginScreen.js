import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import firebase from '../../firebase.js';

import colors from '../config/colors';

function LoginScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading]= useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const userLogin=()=>{
    if(email === '' && password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      setIsLoading(true)
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        setIsLoading(false)
        setEmail('')
        setPassword('')
        setErrorMessage('')
        props.navigation.navigate('DashboardScreen')
        if(firebase.auth().currentUser.email == 'admin@joyapp.com'){
          props.navigation.navigate('AdminDashboardScreen')
        } else{
          props.navigation.navigate('DashboardScreen')
        }
      })
      .catch(error => {
        console.log(error.code)
        setIsLoading(false)
        setErrorMessage(error.message)
      })
    }
  };

  if(isLoading){
    return(
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
       </View>
     )
  }    
  return (
    <View style={styles.container}>  
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        maxLength={15}
        secureTextEntry={true}
      />   
      <Text style={{color:'red'}}>{errorMessage}</Text>

      <TouchableOpacity
        activeOpacity = { .5 }
        style={styles.loginButton}
        onPress={()=>userLogin()}
      >
          <Text style= {styles.signInText}>SIGN IN</Text>
      </TouchableOpacity>

      <Text 
        style={styles.textButton}
        onPress={() => props.navigation.navigate('SignupScreen')}>
        Don't have an account? Click here to signup
      </Text>

      <Text 
        style={styles.textButton}
        onPress={() => props.navigation.navigate('ForgotPasswordScreen')}>
        Forgot your password?
      </Text>                            
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginButton:{
    width: 300,
    backgroundColor: colors.darkBorder,
    alignSelf: "center",
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:50,
  },
  textButton: {
    color: colors.darkBorder,
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  signInText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 15
  }
});