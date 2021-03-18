import React from 'react';
import { 
    Image, 
    Text, 
    SafeAreaView, 
    StyleSheet, 
    TouchableOpacity, 
    Dimensions
} from 'react-native';

// Constant measurements depending on device screen size
const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;

const messages = 
[
    "Well done! Remember to come back and water your plant.",
    "Well done! Return to the session when you are ready.",
    "Look forward to seeing you after your break. Well done!",
    "Pause. Breathe. Keep going.\nYou can do it!",
];

/* Generate a random message from the messages array */
const randomMessage = (
     messages[Math.floor(Math.random()*messages.length)]
);

export default function PauseScreen({ props, navigation }) {
  
    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={[styles.center, styles.area]}>
                <SafeAreaView style={styles.messageArea}>
                    <Text style={[styles.text, styles.message]}>{ randomMessage }</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.centering}>
                    <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={require('../assets/pause.png')}
                    />
                </SafeAreaView>

                <SafeAreaView style={{ height: "7%" }}></SafeAreaView>

                <SafeAreaView style={styles.centering, styles.buttonArea}>
                    <TouchableOpacity
                        style={[styles.backButton, styles.shadowEffect]}
                        onPress={() => navigation.navigate("TestScreen") }
                    >
                        <Text style={[styles.text, styles.backText]}>Back to the session</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.remindButton]}
                        onPress={() => navigation.navigate("TherapyScreen") } //record the time
                    >
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    center: {
        height: "100%",
        width: "100%",
        alignItems: "center",
    },
    
    text: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#4a4b4b",
        maxWidth: winWidth/1.3,
        lineHeight: winHeight/27,
        letterSpacing: winWidth/400,
    },
    messageArea: {
        width: "85%",
        height: "18%",
        marginTop: winHeight/15,
        borderRadius: 20,
        backgroundColor: "#fed8b1",
        alignItems: "center",
        justifyContent: "center"
    },
    message: {
        fontSize: 21,
    },
    image: {
        marginTop: winHeight/20,
        maxHeight: winHeight/2.5,
    },
    shadowEffect: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        marginVertical: 5,
    },
    buttonArea: {
        width: "100%",
        height: "100%",
        alignItems: "center",    
    },
    backButton: {  
        height: "9%",
        width: "70%",
        backgroundColor: "#ffeed2",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
    },
    backText: {
        fontSize: 18,
        color: "dimgray"
    },
    centering: {
        alignItems: "center",
        justifyContent: "center",
    },
});
