import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../firebase.js';
import colors from '../config/colors';

export default function AccountScreen({ props, navigation }) {
    const [displayName, setDisplayName] = useState(firebase.auth().currentUser !== null ? firebase.auth().currentUser.displayName : '');

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log('Logout successful')
            navigation.popToTop()
        })
            .catch(error => setErrorMessage(error.message))
    };
    
    return (
        <View style={styles.center}>
            <View style={[styles.welcomeArea, styles.shadowEffect]}>
                <View style={[styles.userNote]}>
                    <Text>Log out informaton here</Text>
                </View>

                <TouchableOpacity style={[styles.logout]} onPress={() => signOut()}>
                    <Text style={styles.textStyle}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

//onPress={() => signOut()}

const styles = StyleSheet.create({
    center: {
        height: "100%",
        width: "100%",
        alignItems: 'center',
        padding: 25
      },
      welcomeArea: {
        width: "100%",
        height: "50%",
        borderRadius: 50,
        alignItems: 'center',
      },
      userNote: {
        height: "80%",
        width: '100%',
        backgroundColor: "#fed8b1",
        alignItems: 'center',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        padding: 20
      },
      logout:{
        height: "20%",
        width: '100%',
        backgroundColor: "#ffeed2",
        alignItems: 'center',
        borderBottomStartRadius: 50,
        borderBottomEndRadius: 50,
        padding: 20
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
      textStyle:{
          fontSize: 16
      }
})