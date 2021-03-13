import React from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'; 
import firebase from "../../firebase";

const CategoryDrop = () => {
    return (
        <View style={styles.container}>
            
            <View style={[styles.top, styles.centering]}>
                <Text style={styles.text}>Drop the subject you are least interested in.</Text>
            </View>

            <View style={styles.bottom}>

                <TouchableOpacity style={styles.bottomItem} onPress={() => chooseOption("SOCIAL")}>
                    <View style={[styles.bottomItemInner, styles.centering]}>
                        <Text style={styles.text}>Social</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomItem} onPress={() => chooseOption("ACADEMIC")}>
                    <View style={[styles.bottomItemInner, styles.centering]}>
                        <Text style={styles.text}>Academic</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomItem} onPress={() => chooseOption("HEALTH")}>
                    <View style={[styles.bottomItemInner, styles.centering]}>
                        <Text style={styles.text}>Mood</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomItem} onPress={() => chooseOption("HEALTH")}>
                    <View style={[styles.bottomItemInner, styles.centering]}>
                        <Text style={styles.text}>Health</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomItem} onPress={() => chooseOption("HOBBIES")}>
                    <View style={[styles.bottomItemInner, styles.centering]}>
                        <Text style={styles.text}>Hobbies</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomItem} onPress={() => chooseOption("FAMILY")}>
                    <View style={[styles.bottomItemInner, styles.centering]}>
                        <Text style={styles.text}>Family</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomItem} onPress={() => chooseOption("WORK")}>
                    <View style={[styles.bottomItemInner, styles.centering]}>
                        <Text style={styles.text}>Work</Text>                        
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomItem} onPress={() => chooseOption("RELATIONSHIP")}>
                    <View style={[styles.bottomItemInner, styles.centering]}>
                        <Text style={styles.text}>Relationship</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const ref = firebase.firestore().collection("progress");

function chooseOption(chosenCategory){
    var num = Math.random();
    if (num<=0.5) {
        return chosenCategory;
    }
    else {
        return "CONTROL";
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#ffd394'
    },
    text: {
        color: "black",
        fontSize: 20,
    },
    top: {
        height: '10%',
    },
    bottom: {
        height: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    },
    bottomItem:{
        width: '50%',
        height: '22%',
        padding: 5,
    },
    bottomItemInner: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CategoryDrop;