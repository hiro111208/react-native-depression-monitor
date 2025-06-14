import React, { Component, Fragment } from "react";
import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    View,
    Button,
    TouchableOpacity,
    Text,
    Platform,
} from "react-native";
import { ListItem } from "react-native-elements";
import * as indexStyles from "../config/indexStyles";
import firebase from "../database/firebase";
import colors from "../config/colors";
import DropDownPicker from "react-native-dropdown-picker";

// Screen to display a table of therapy questions in database
export default class TherapyQuestionScreen extends Component {
    constructor() {
        super();
        this.firestoreRef = firebase
            .firestore()
            .collection("questions")
            .orderBy("block", "asc")
            .orderBy("categoryDropped", "asc")
            .orderBy("question", "asc");
        this.state = {
            isLoading: true,
            questionArr: [],
            filteredArr: [],
        };
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const questionArr = [];
        const filteredArr = [];
        querySnapshot.forEach((res) => {
            const {
                answer1,
                answer2,
                block,
                categoryDropped,
                question,
                question1,
                question2,
                word,
            } = res.data();
            questionArr.push({
                key: res.id,
                res,
                answer1,
                answer2,
                block,
                categoryDropped,
                question,
                question1,
                question2,
                word,
            });
            filteredArr.push({
                key: res.id,
                res,
                answer1,
                answer2,
                block,
                categoryDropped,
                question,
                question1,
                question2,
                word,
            });
        });
        this.setState({
            questionArr,
            filteredArr,
            isLoading: false,
        });
    };

    // filter therapy questions by categoryDropped
    filterCollection(categoryDropped) {
        this.setState({
            filteredArr: this.state.questionArr.filter(
                (questionArr) => questionArr.categoryDropped === categoryDropped
            ),
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
            <View style={[indexStyles.containerWhite, indexStyles.centering]}>
                <View
                    style={[
                        indexStyles.containerOrange,
                        indexStyles.cover,
                        indexStyles.shadowEffect,
                    ]}
                >
                    <View style={{ height: "3%" }}></View>

                    {/** Dropdown list for all the categories */}
                    {Platform.OS === "ios" && (
                        <Fragment>
                            <View
                                style={[
                                    { height: "10%", zIndex: 5 },
                                    indexStyles.centering,
                                ]}
                            >
                                <DropDownPicker
                                    items={[
                                        { label: "CONTROL", value: "CONTROL" },
                                        { label: "SOCIAL", value: "SOCIAL" },
                                        {
                                            label: "ACADEMIC",
                                            value: "ACADEMIC",
                                        },
                                        { label: "MOOD", value: "HEALTH" },
                                        { label: "HEALTH", value: "HEALTH" },
                                        { label: "HOBBIES", value: "HOBBIES" },
                                        { label: "FAMILY", value: "FAMILY" },
                                        { label: "WORK", value: "WORK" },
                                        {
                                            label: "RELATIONSHIPS",
                                            value: "RELATIONSHIPS",
                                        },
                                    ]}
                                    placeholder="Select a category"
                                    defaultIndex={0}
                                    onChangeItem={(item) =>
                                        this.filterCollection(item.value)
                                    }
                                    containerStyle={{
                                        width: "80%",
                                        height: "100%",
                                    }}
                                    selectedLabelStyle={indexStyles.textGrey}
                                    placeholderStyle={indexStyles.textGrey}
                                    style={[
                                        {
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                            borderBottomLeftRadius: 20,
                                            borderBottomRightRadius: 20,
                                            backgroundColor:
                                                colors.lightOutline,
                                            borderWidth: 0,
                                        },
                                        indexStyles.shadowEffect,
                                    ]}
                                    dropDownStyle={[
                                        {
                                            backgroundColor:
                                                colors.lightOutline,
                                            borderBottomLeftRadius: 20,
                                            borderBottomRightRadius: 20,
                                        },
                                        indexStyles.shadowEffect,
                                    ]}
                                />
                            </View>

                            <View
                                style={[
                                    indexStyles.centering,
                                    { height: "70%" },
                                ]}
                            >
                                <ScrollView style={{ width: "90%" }}>
                                    {this.state.filteredArr.map((item, i) => {
                                        return (
                                            <ListItem
                                                containerStyle={{
                                                    backgroundColor:
                                                        colors.mainPanel,
                                                }}
                                                key={i}
                                                chevron
                                                bottomDivider
                                                onPress={() => {
                                                    this.props.navigation.navigate(
                                                        "TherapyQuestionDetailScreen",
                                                        {
                                                            questionkey:
                                                                item.key,
                                                        }
                                                    );
                                                }}
                                            >
                                                <ListItem.Content
                                                    style={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <ListItem.Title>
                                                        {item.categoryDropped}{" "}
                                                        {item.block}-
                                                        {item.question}
                                                    </ListItem.Title>
                                                </ListItem.Content>
                                            </ListItem>
                                        );
                                    })}
                                </ScrollView>
                            </View>

                            <View style={{ height: "7%" }}></View>

                            <View
                                style={[
                                    { height: "9%" },
                                    indexStyles.centering,
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            "AdminDashboard"
                                        )
                                    }
                                    style={[
                                        indexStyles.roundButton,
                                        indexStyles.shadowEffect,
                                        indexStyles.centering,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            indexStyles.textGrey,
                                            { fontSize: 17 },
                                        ]}
                                    >
                                        Go Back
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    )}

                    {Platform.OS === "android" && (
                        <Fragment>
                            <View
                                style={[
                                    {
                                        height: "100%",
                                        width: "100%",
                                        paddingBottom: "10%",
                                    },
                                    indexStyles.centering,
                                ]}
                            >
                                <DropDownPicker
                                    items={[
                                        { label: "CONTROL", value: "CONTROL" },
                                        { label: "SOCIAL", value: "SOCIAL" },
                                        {
                                            label: "ACADEMIC",
                                            value: "ACADEMIC",
                                        },
                                        { label: "MOOD", value: "HEALTH" },
                                        { label: "HEALTH", value: "HEALTH" },
                                        { label: "HOBBIES", value: "HOBBIES" },
                                        { label: "FAMILY", value: "FAMILY" },
                                        { label: "WORK", value: "WORK" },
                                        {
                                            label: "RELATIONSHIP",
                                            value: "RELATIONSHIP",
                                        },
                                    ]}
                                    placeholder="Select a category!"
                                    defaultIndex={0}
                                    onChangeItem={(item) =>
                                        this.filterCollection(item.value)
                                    }
                                    containerStyle={{
                                        width: "80%",
                                        height: "10%",
                                    }}
                                    selectedLabelStyle={{
                                        color: "dimgrey",
                                        fontWeight: "bold",
                                        fontSize: 20,
                                    }}
                                    placeholderStyle={indexStyles.textGrey}
                                    style={{
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 20,
                                        borderBottomLeftRadius: 20,
                                        borderBottomRightRadius: 20,
                                        backgroundColor: colors.lightOutline,
                                        borderWidth: 0,
                                    }}
                                    dropDownStyle={{
                                        backgroundColor: colors.lightOutline,
                                        borderBottomLeftRadius: 20,
                                        borderBottomRightRadius: 20,
                                    }}
                                />

                                <ScrollView
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                        padding: 10,
                                    }}
                                >
                                    {this.state.filteredArr.map((item, i) => {
                                        return (
                                            <ListItem
                                                containerStyle={{
                                                    backgroundColor:
                                                        colors.mainPanel,
                                                }}
                                                key={i}
                                                chevron
                                                bottomDivider
                                                onPress={() => {
                                                    this.props.navigation.navigate(
                                                        "TherapyQuestionDetailScreen",
                                                        {
                                                            questionkey:
                                                                item.key,
                                                        }
                                                    );
                                                }}
                                            >
                                                <ListItem.Content
                                                    style={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <ListItem.Title>
                                                        {item.categoryDropped}{" "}
                                                        {item.block}-
                                                        {item.question}
                                                    </ListItem.Title>
                                                </ListItem.Content>
                                            </ListItem>
                                        );
                                    })}
                                </ScrollView>

                                <View>
                                    <Button
                                        title="Go back"
                                        onPress={() =>
                                            this.props.navigation.navigate(
                                                "AdminDashboard"
                                            )
                                        }
                                        color={"#ffa351ff"}
                                    />
                                </View>
                            </View>
                        </Fragment>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dropdown: {
        flex: 1,
        paddingBottom: 10,
        fontWeight: "bold",
    },
});
