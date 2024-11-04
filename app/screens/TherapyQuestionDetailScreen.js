import React, { Component } from "react";
import {
    Alert,
    StyleSheet,
    TextInput,
    ScrollView,
    ActivityIndicator,
    View,
    Text,
    TouchableOpacity,
    LogBox,
} from "react-native";
import firebase from "../database/firebase";
import DismissKeyboard from "../config/DismissKeyboard";
import colors from "../config/colors";
import * as indexStyles from "../config/indexStyles";

LogBox.ignoreLogs(["FirebaseError: Missing or insufficient permissions"]); // Ignore log notification by message

// Screen to edit the content of a therapy question, then update it
export default class TherapyQuestionDetailScreen extends Component {
    constructor() {
        super();
        this.state = {
            answer1: "",
            answer2: "",
            block: "",
            categoryDropped: "",
            question: "",
            question1: "",
            question2: "",
            word: "",
            isLoading: true,
        };
    }

    // reads from firebase on mount
    componentDidMount() {
        const dbRef = firebase
            .firestore()
            .collection("questions")
            .doc(this.props.route.params.questionkey);

        dbRef.get().then((res) => {
            if (res.exists) {
                const question = res.data();
                this.setState({
                    key: res.id,
                    answer1: question.answer1,
                    answer2: question.answer2,
                    block: question.block,
                    categoryDropped: question.categoryDropped,
                    question: question.question,
                    question1: question.question1,
                    question2: question.question2,
                    word: question.word,
                    isLoading: false,
                });
            } else {
                console.log("Document does not exist!");
            }
        });
    }

    // updates the state of the text input fields
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    // updates the content of a therapy question
    updateTherapyQuestion() {
        this.setState({
            isLoading: true,
        });
        const updateDBRef = firebase
            .firestore()
            .collection("questions")
            .doc(this.state.key);
        updateDBRef
            .set({
                answer1: this.state.answer1,
                answer2: this.state.answer2,
                block: this.state.block,
                categoryDropped: this.state.categoryDropped,
                question: this.state.question,
                question1: this.state.question1,
                question2: this.state.question2,
                word: this.state.word,
            })
            .then((docRef) => {
                Alert.alert(
                    `${this.state.categoryDropped} ${this.state.block}-${this.state.question} updated!`
                );
                this.setState({
                    key: "",
                    answer1: "",
                    answer2: "",
                    block: "",
                    categoryDropped: "",
                    question: "",
                    question1: "",
                    question2: "",
                    word: "",
                    isLoading: false,
                });
                this.props.navigation.navigate("TherapyQuestionScreen");
            })
            .catch((error) => {
                console.error("Error: ", error);
                Alert.alert("Fill in every fields!");
                this.setState({
                    isLoading: false,
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={[indexStyles.preloader, indexStyles.centering]}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            );
        }
        return (
            <DismissKeyboard>
                <View style={[styles.container, indexStyles.centering]}>
                    <View
                        style={[
                            styles.center,
                            indexStyles.cover,
                            indexStyles.shadowEffect,
                        ]}
                    >
                        <View style={{ height: "10%" }}>
                            <View style={[styles.title, indexStyles.centering]}>
                                <Text
                                    style={[
                                        indexStyles.fontStyle,
                                        { fontSize: 20 },
                                    ]}
                                >
                                    {this.state.categoryDropped}{" "}
                                    {this.state.block}-{this.state.question}
                                </Text>
                            </View>
                        </View>
                        <View style={indexStyles.centering}>
                            <ScrollView style={{ height: "70%", width: "80%" }}>
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Question 1:
                                    </Text>
                                </View>
                                <View style={styles.inputGroup}>
                                    <DismissKeyboard>
                                        <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            placeholder={"question1"}
                                            value={this.state.question1}
                                            onChangeText={(val) =>
                                                this.inputValueUpdate(
                                                    val,
                                                    "question1"
                                                )
                                            }
                                        />
                                    </DismissKeyboard>
                                </View>
                                <View>
                                    <Text />
                                </View>
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Word:
                                    </Text>
                                </View>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={"word"}
                                        value={this.state.word}
                                        onChangeText={(val) =>
                                            this.inputValueUpdate(val, "word")
                                        }
                                    />
                                </View>
                                <View>
                                    <Text />
                                </View>
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Answer 1:
                                    </Text>
                                </View>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={"answer1"}
                                        value={this.state.answer1}
                                        onChangeText={(val) =>
                                            this.inputValueUpdate(
                                                val,
                                                "answer1"
                                            )
                                        }
                                    />
                                </View>
                                <View>
                                    <Text />
                                </View>
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Question 2:
                                    </Text>
                                </View>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        placeholder={"question2"}
                                        value={this.state.question2}
                                        onChangeText={(val) =>
                                            this.inputValueUpdate(
                                                val,
                                                "question2"
                                            )
                                        }
                                    />
                                </View>
                                <View>
                                    <Text />
                                </View>
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Answer 2:
                                    </Text>
                                </View>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={"answer2"}
                                        value={this.state.answer2}
                                        onChangeText={(val) =>
                                            this.inputValueUpdate(
                                                val,
                                                "answer2"
                                            )
                                        }
                                    />
                                </View>
                            </ScrollView>
                        </View>

                        <View style={[{ height: "8%" }, indexStyles.centering]}>
                            <TouchableOpacity
                                onPress={() => this.updateTherapyQuestion()}
                                style={[
                                    styles.bottomButton,
                                    indexStyles.shadowEffect,
                                    indexStyles.centering,
                                ]}
                            >
                                <Text
                                    style={[
                                        indexStyles.fontStyle,
                                        { fontSize: 17 },
                                    ]}
                                >
                                    Update
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: "2%" }}></View>

                        <View
                            style={[{ height: "10%" }, indexStyles.centering]}
                        >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}
                                style={[
                                    styles.optButton,
                                    indexStyles.cover,
                                    indexStyles.centering,
                                    {
                                        borderBottomLeftRadius: 40,
                                        borderBottomRightRadius: 40,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        indexStyles.fontStyle,
                                        { fontSize: 17 },
                                    ]}
                                >
                                    Go Back
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </DismissKeyboard>
        );
    }
}

const styles = StyleSheet.create({
    bottomButton: {
        height: "100%",
        width: "40%",
        borderRadius: 50,
        backgroundColor: colors.lightOutline,
        position: "absolute",
        bottom: 0,
    },
    center: {
        backgroundColor: colors.mainPanel,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: colors.lightOutline,
    },
    container: {
        flex: 1,
        display: "flex",
        padding: 25,
        backgroundColor: "#fff",
    },
    dropdown: {
        flex: 1,
        paddingBottom: 10,
        fontWeight: "bold",
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    optButton: {
        backgroundColor: colors.lightOutline,
    },
    title: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
});
