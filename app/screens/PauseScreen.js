import firebase from '../../firebase';

import React from 'react';
import { Image, Text, SafeAreaView, StyleSheet, TouchableOpacity, Button } from 'react-native';

//retrieve progress from database e.g., well done, you're over halfway through
const currentQuestions = firebase.firestore().collection("questions");

const backButton = () => console.log("Back to the therapy screen");

const messages = 
[
    "Well done! Return to the session when you are ready.",
    "Looking forward to seeing you after your break. Well done!",
    "You can do it! Pause. Breathe. Keep going.",
    "When you get tired, learn to rest, not quit - Banksy"
];

const randomMessage = (
     messages[Math.floor(Math.random()*messages.length)]
);


const PauseScreen = () => {
    return (
        <SafeAreaView>
            <Text>
                { randomMessage }
            </Text>
            <TouchableOpacity style={styles.image}>
                <Image
                    style={{ width: 200 }}
                    resizeMode="contain"
                    source={require('../assets/pause.png')}
                />
            </TouchableOpacity> 
            <Button title="Back to the Session" onPress={backButton}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    container: {
    },
    image: {
        alignItems: 'center',
    },
    text: {
        
    }
});
export default PauseScreen;
