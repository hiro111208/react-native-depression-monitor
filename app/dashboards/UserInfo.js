import React, { Component } from "react";
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import * as shape from "d3-shape";
import firebase from "../database/firebase";
import ProgressBar from "../src/components/ProgressBar";
import UserTable from "./UserTable";
import { LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { Circle } from "react-native-svg";

{
    /** Returns user interaction data for a particular user */
}
export default class UserInfo extends Component {
    constructor({ route }) {
        super();
        this.state = {
            sessions: [[], [], [], []],
            averageTimePerBlockQ1: [],
            averageTimePerBlockQ2: [],
            currentUser: route.params.user,
            currentBlock: route.params.block,
            lastActive: `${route.params.lastActive
                .toDate()
                .toString()
                .slice(0, 25)}${route.params.lastActive
                .toDate()
                .toString()
                .slice(35, 38)}`,
            errorsPerSession: [],
        };
    }

    // get User data and response time averages
    async getItemsAndAverages() {
        const ref = firebase.firestore().collection("answers");
        const query = ref.where("userID", "==", this.state.currentUser);

        query.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            console.log("items", items.length);
            this.getSnapshotAverages(items);
            this.getSnapshotErrors(items);
        });
    }

    async getSnapshotErrors(list) {
        const Itemlist = await list;
        const tempSessions = [];
        const errors = [];
        await Itemlist;
        for (let i = 0; i < 4; i++) {
            console.log("loops", i);
            tempSessions.push(
                Itemlist.filter((item) => item.sessionNumber == i + 1)
            );

            // if session has been started
            if (tempSessions[i].length > 0) {
                // filter incorrect questions

                errors.push(
                    tempSessions[i]
                        .filter(
                            (item) =>
                                item.question1IsCorrect != true ||
                                item.question2IsCorrect != true
                        )
                        .concat(
                            tempSessions[i].filter(
                                (item) =>
                                    item.question1IsCorrect != true &&
                                    item.question2IsCorrect != true
                            )
                        )
                );
                //if both questions wrong == 2 errors, push again to increase length of array to match this.
            } else {
                errors.push([]);
            }
            console.log(
                "errorfilter",
                errors.map((item) => item.length)
            );
            //calculate number of errors
            const numberOfErrors = errors.map((item) => item.length);

            this.setState({ errorsPerSession: numberOfErrors });
        }
    }

    async getSnapshotAverages(list) {
        const Itemlist = await list;
        const tempSessions = [];
        const avg1Temp = [];
        const avg2Temp = [];

        for (let i = 0; i < 4; i++) {
            console.log("loops", i);
            tempSessions.push(
                Itemlist.filter((item) => item.sessionNumber == i + 1)
            );

            // if session has been started
            if (tempSessions[i].length > 0) {
                //sum and store Q1 & Q2 response time averages
                const avg1 = tempSessions[i].reduce(
                    (a, b) => (a = a + b.question1Time),
                    0
                );

                const avg2 = tempSessions[i].reduce(
                    (a, b) => (a = a + b.question2Time),
                    0
                );

                // Divide total to find average
                avg1Temp.push(Math.floor(avg1 / tempSessions[i].length));
                // Divide total to find average
                avg2Temp.push(Math.floor(avg2 / tempSessions[i].length));
            } else {
                avg1Temp.push(0);
                avg2Temp.push(0);
            }
        }
        this.setState({ sessions: tempSessions });
        this.setState({ averageTimePerBlockQ1: avg1Temp });
        this.setState({ averageTimePerBlockQ2: avg2Temp });
    }

    abortController = () => new AbortController();

    //Fetch upon mount
    componentDidMount() {
        Promise.all([
            this.getItemsAndAverages(),

            { signal: this.abortController().signal },
            console.log("in userInfo"),
        ]).catch((ex) => console.error(ex));
    }

    // clean up on unmount
    componentWillUnmount() {
        this.abortController().abort();
        console.log("out userInfo");
    }

    render() {
        const { height, width } = Dimensions.get("window");

        //lineChart Data
        const data = [
            {
                data: this.state.averageTimePerBlockQ1,
                svg: { stroke: "purple" },
            },
            {
                data: this.state.averageTimePerBlockQ2,
                svg: { stroke: "green" },
            },
        ];

        console.log("data1", data[0].data);

        console.log("data2", data[1].data);

        // line Chart circular markers for question 1 type
        const Decorator1 = ({ x, y, data }) => {
            return data[0].data.map((value, index) => (
                <Circle
                    key={index}
                    cx={x(index)}
                    cy={y(value)}
                    r={4}
                    stroke={"rgb(134, 65, 244)"}
                    fill={"white"}
                />
            ));
        };

        // line Chart circular markers for question 2 type
        const Decorator2 = ({ x, y, data }) => {
            return data[1].data.map((value, index) => (
                <Circle
                    key={index}
                    cx={x(index)}
                    cy={y(value)}
                    r={4}
                    stroke={"rgb(134, 65, 244)"}
                    fill={"white"}
                />
            ));
        };

        return (
            <View style={styles.container}>
                <View style={styles.buttonsBar}>
                    {/** Return to user list */}
                    <TouchableOpacity
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                        style={[styles.button, styles.buttonShadow]}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Text
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}
                            style={styles.fontStyle}
                        >
                            Back
                        </Text>
                    </TouchableOpacity>

                    {/** View the user's feelings log */}
                    <TouchableOpacity
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                        style={[styles.button, styles.buttonShadow]}
                        onPress={() =>
                            this.props.navigation.navigate("AdminFeelingsLog", {
                                currentUserID: this.state.currentUser,
                            })
                        }
                    >
                        <Text
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}
                            style={styles.fontStyle}
                        >
                            Feelings Log
                        </Text>
                    </TouchableOpacity>
                </View>

                {/** Present the user's last active time */}
                <View
                    flex={3}
                    style={[
                        styles.dataContainer,
                        styles.buttonShadow,
                        { width: width - 50 },
                    ]}
                >
                    <View flexDirection={"row"}>
                        <Text style={{ fontSize: 22, fontWeight: "700" }}>
                            DB{this.state.currentUser}
                        </Text>
                        <Text style={{ fontSize: 10, fontWeight: "300" }}>
                            User
                        </Text>

                        <View left={80}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: "300",
                                    paddingLeft: 10,
                                }}
                            >
                                Last Active:
                            </Text>
                            <Text
                                style={{
                                    fontSize: 8,
                                    fontWeight: "800",
                                    paddingLeft: 10,
                                }}
                            >
                                {this.state.lastActive}
                            </Text>
                        </View>
                    </View>

                    {/** Return table of the therapy response times */}
                    <View flex={1.375} padding={5} marginBottom={30}>
                        <UserTable
                            average1={this.state.averageTimePerBlockQ1}
                            average2={this.state.averageTimePerBlockQ2}
                            errorNum={this.state.errorsPerSession}
                        />
                    </View>

                    <View flex={1.375} marginBottom={10}>
                        <View
                            width={width - 50}
                            alignItems={"center"}
                            marginBottom={10}
                            marginTop={20}
                        >
                            <Text
                                marginTop={20}
                                style={{
                                    padding: 5,
                                    paddingBottom: 10,
                                    fontSize: 10,
                                    textDecorationLine: "underline",
                                    fontWeight: "300",
                                }}
                            >
                                Average Response Time Trend Over Sessions(s) (
                                {this.props.route.params.category})
                            </Text>
                        </View>

                        <View flexDirection={"row"} flex={3}>
                            <YAxis
                                data={data[0].data}
                                contentInset={{ top: 20, bottom: 10 }}
                                svg={{
                                    fill: "grey",
                                    fontSize: 10,
                                }}
                                numberOfTicks={data[0].data.length}
                                formatLabel={(value) =>
                                    `${
                                        value /
                                        Math.pow(
                                            10,
                                            value.toString().length - 1
                                        )
                                    }`
                                }
                            />

                            <View
                                flex={1.375}
                                paddingLeft={30}
                                paddingRight={-30}
                            >
                                <View flexDirection={"row"}>
                                    <Text
                                        style={{
                                            left: -40,
                                            fontSize: 8,
                                            color: "purple",
                                        }}
                                    >
                                        □Q1
                                    </Text>
                                    <Text
                                        style={{
                                            left: -40,
                                            fontSize: 8,
                                            color: "green",
                                        }}
                                    >
                                        {"  "}□Q2
                                    </Text>
                                </View>

                                <View style={styles.chart}>
                                    <LineChart
                                        style={{ height: "100%" }}
                                        data={data}
                                        svg={{ stroke: "rgb(134, 65, 244)" }}
                                        curve={shape.curveLinear}
                                        contentInset={{ bottom: 10, top: 10 }}
                                    >
                                        <Decorator1 />
                                        <Decorator2 />
                                    </LineChart>

                                    <View marginTop={10}>
                                        <XAxis
                                            data={[1, 2, 3, 4]}
                                            svg={{
                                                fill: "black",
                                                fontSize: 8,
                                            }}
                                            xAccessor={({ item }) => item}
                                            numberOfTicks={4}
                                            style={{ marginHorizontal: -40 }}
                                            contentInset={{
                                                left: 40,
                                                right: 35,
                                            }}
                                            formatLabel={(value, index) =>
                                                index + 1
                                            }
                                        />
                                    </View>

                                    <Text margin={10} style={styles.label}>
                                        (Session)
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/** return completion status of the user */}
                    <View style={[styles.completionStatus, styles.shadow]}>
                        {this.state.currentBlock < 4 && (
                            <Text style={styles.text}>
                                Current Block: {this.state.currentBlock}
                            </Text>
                        )}
                        {this.state.currentBlock == 5 && (
                            <Text style={styles.text}>
                                All Sessions Completed!
                            </Text>
                        )}
                        <ProgressBar
                            nextWidth={this.state.currentBlock - 1}
                        ></ProgressBar>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 35,
        margin: 11,
        marginTop: 20,
        textAlign: "center",
    },
    buttonsBar: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    container: {
        marginTop: 3,
        height: "100%",
        backgroundColor: "#ffbe7bff",
        borderRadius: 20,
        borderColor: "#ffa351ff",
        borderWidth: 3,
    },
    dataContainer: {
        marginVertical: 10,
        marginLeft: 20,
    },
    fontStyle: {
        fontWeight: "700",
        textAlign: "center",
    },
    label: {
        marginBottom: 10,
        paddingHorizontal: 30,
        fontSize: 8,
        fontWeight: "300",
    },
    shadow: {
        marginBottom: 10,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        padding: 10,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    buttonShadow: {
        shadowOffset: {
            width: 0,
            height: 10,
        },
        padding: 10,
        shadowOpacity: 0.4,
        shadowRadius: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    completionStatus: {
        flex: 0.25,
        paddingBottom: 20,
        paddingHorizontal: 20,
        marginTop: 30,
        justifyContent: "center",
        borderWidth: 0.4,
        borderRadius: 10,
    },
    chart: {
        flex: 2,
        borderWidth: 0.5,
        borderRadius: 10,
        marginRight: 7,
        marginLeft: -25,
    },
    text: {
        fontSize: 10,
        fontWeight: "300",
        padding: 5,
    },
});
