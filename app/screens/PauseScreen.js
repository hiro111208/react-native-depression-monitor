import React from "react";
import {
    Image,
    Text,
    SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Emoji from "react-native-emoji";
import * as indexStyles from "../config/indexStyles";
import colors from "../config/colors";

/* Constant measurements depending on device screen size */
const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;

const messages = [
    "Well done! Remember to come back and water your plant.",
    "Well done! Return to the session when you are ready.",
    "Look forward to seeing you after your break. Well done!",
    "Pause. Breathe. Keep going.\nYou can do it!",
    "Enjoy your break! Remember to come and water your plant.",
];

const emojis = [
    <Emoji name="seedling" style={{ fontSize: 25 }} />,
    <Emoji name="herb" style={{ fontSize: 25 }} />,
    <Emoji name="sunflower" style={{ fontSize: 25 }} />,
    <Emoji name="sun_with_face" style={{ fontSize: 25 }} />,
];

/* Generate a random message from the messages array */
function generateMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

/* Generate a random emoji from the emojis array */
function generateEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

export default function PauseScreen({ props, navigation }) {
    return (
        <SafeAreaView style={[styles.container, indexStyles.centering]}>
            <View style={[styles.center, styles.area, indexStyles.cover]}>
                <View style={[styles.messageArea, indexStyles.centering]}>
                    <Text style={[styles.text, { textAlign: "center" }]}>
                        {generateMessage()} {generateEmoji()}{" "}
                    </Text>
                </View>
                <View style={indexStyles.centering}>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require("../assets/pause.png")}
                        testID={"PAUSE_IMAGE"}
                    />
                </View>

                <View style={{ height: "7%" }}></View>

                <View style={[indexStyles.cover, styles.center]}>
                    <TouchableOpacity
                        style={[styles.backButton, indexStyles.shadowEffect]}
                        onPress={() => navigation.navigate("TherapyScreen")}
                        testID={"BACK_BUTTON"}
                    >
                        <Text style={[styles.text, indexStyles.textGrey]}>
                            Back to the session
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff7ed",
    },
    center: {
        alignItems: "center",
    },
    text: {
        maxWidth: winWidth / 1.3,
        lineHeight: winHeight / 27,
        letterSpacing: winWidth / 400,
        fontSize: 20,
    },
    messageArea: {
        width: "85%",
        height: "18%",
        marginTop: winHeight / 15,
        borderRadius: 20,
        backgroundColor: colors.mainPanel,
    },
    image: {
        marginTop: winHeight / 20,
        maxHeight: winHeight / 2.5,
    },
    backButton: {
        height: "9%",
        width: "70%",
        backgroundColor: "#fecc91",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
    },
});
