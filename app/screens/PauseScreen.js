import React, { Component } from 'react';
import { Image, View, StyleSheet} from 'react-native';

const PauseScreen = () => {
    return (
            <Image 
                 style={{ width: 300, height: 300 }}
                 resizeMode="contain"
                 source={require('../assets/pause.png')}
            />
    )
}
export default PauseScreen;
