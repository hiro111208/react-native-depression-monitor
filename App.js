import * as React from "react";
import { View, Text, Button, Image, alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    HeaderBackButton,
} from "@react-navigation/stack";
import TherapyScreen from "./app/screens/TherapyScreen";
import CategoryDrop from "./app/screens/CategoryDrop";
import PlantScreen from "./app/screens/PlantScreen";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import ForgotPasswordScreen from "./app/screens/ForgotPasswordScreen";
import SchedulingScreen from "./app/screens/SchedulingScreen";
import ScheduleListScreen from "./app/screens/ScheduleListScreen";
import PatientDashboard from "./app/dashboards/PatientDashboard";
import AdminDashboard from "./app/dashboards/AdminDashboard";
import DemoScreen from "./app/screens/DemoScreen";

import TherapyQuestionScreen from "./app/screens/TherapyQuestionScreen";
import TherapyQuestionDetailScreen from "./app/screens/TherapyQuestionDetailScreen";

import PauseScreen from "./app/screens/PauseScreen";
import LogFeelingScreen from "./app/screens/LogFeelingScreen";
import colors from "./app/config/colors";
import SupportResources from "./app/screens/SupportResources";
import AccountScreen from "./app/dashboards/AccountScreen";
import { withNavigation } from "react-navigation";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
    "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
]);

function MyStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
                gestureEnabled: false,
                headerLeft: null,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: colors.darkBorder,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                },
                headerTintColor: "white",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ title: "SignUp" }}
            />

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: "Login" }}
            />

            <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{ title: "Forgot Password" }}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="DemoScreen"
                component={DemoScreen}
            />

            <Stack.Screen
                name="PatientDashboard"
                component={PatientDashboard}
            />

            <Stack.Screen
                name="AdminDashboard"
                component={AdminDashboard}
                options={{ title: "AdminDashboard" }}
            />

            <Stack.Screen
                name="SchedulingScreen"
                component={SchedulingScreen}
                options={{
                    title: "Add Schedule",
                    headerLeft: null,
                }}
            />

            <Stack.Screen
                name="ScheduleListScreen"
                component={ScheduleListScreen}
                options={{ title: "Schedule List" }}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name="TherapyScreen"
                component={TherapyScreen}
            />

            <Stack.Screen
                name="PauseScreen"
                component={PauseScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="PlantScreen"
                component={PlantScreen}
            />

            <Stack.Screen
                name="LogFeelingScreen"
                component={LogFeelingScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="CategoryDrop" component={CategoryDrop} />

            <Stack.Screen
                name="TherapyQuestionScreen"
                component={TherapyQuestionScreen}
                options={{ title: "Therapy Questions" }}
            />

            <Stack.Screen
                name="TherapyQuestionDetailScreen"
                component={TherapyQuestionDetailScreen}
                options={{ title: "Question Detail" }}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name="SupportResources"
                component={SupportResources}
            />

            <Stack.Screen name="AccountScreen" component={AccountScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
