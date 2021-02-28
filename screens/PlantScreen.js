import React from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants'; 

const PlantScreen = () => {
    return (
        <View style={styles.container}>

            <View style={[styles.top, styles.centering]}>
                <TouchableOpacity style={[styles.topItem, styles.centering]}>
                    <View style={[styles.featureButton, styles.centering]}>
                        <Text style={styles.text}>13</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={[styles.top, styles.centering]}>
                <TouchableOpacity style={[styles.topItem, styles.centering]}>
                    <View style={[styles.featureButton, styles.centering]}>
                        <Text style={styles.text}>Shop</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={[styles.message, styles.centering]}>
                <Text style={styles.text}>Keep going! You're almost there!</Text>
            </View>

            <View style={[styles.plantSpace, styles.centering]}>
                <View style={[styles.plantImage, styles.centering]}>
                    <Image 
                         style={{ width: 250, height: 250 }}
                         resizeMode="contain"
                         source={require('../assets/leaf_2.png')}
                    />
                </View>
            </View>

            <View style={[styles.nextSpace, styles.centering]}>
                <TouchableOpacity style={[styles.optButton, styles.centering]}>
                    <Text style={styles.text}>Next</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#ffd394'
    },
    featureButton: {
        height: '100%',
        width: '90%',
        backgroundColor: '#f0e5d8',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 5,
    },
    optButton: {
        height: '25%',
        width: 140,
        backgroundColor: '#94ffd3',
        borderRadius: 10,
    },
    text: {
        color: "black",
        fontSize: 18,
    },
    top: {
        height: '6%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        alignSelf: 'flex-end'
    },
    topItem:{
        width: '30%',
        height: '100%',
    },
    message: {
        height: '20%',
    },
    plantSpace: {
        height: '20%',
    },
    plantImage: {
        width: 250,
        height: 250,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#fff',
        backgroundColor: '#eee',
    },
    nextSpace: {
        height: '30%'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PlantScreen;