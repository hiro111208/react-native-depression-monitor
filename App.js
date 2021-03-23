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
import Index from "./app/src/components/Index";
import PatientDashboard from "./app/dashboards/PatientDashboard";
import AdminDashboard from "./app/dashboards/AdminDashboard";

import TherapyQuestionScreen from './app/screens/TherapyQuestionScreen';
import TherapyQuestionDetailScreen from './app/screens/TherapyQuestionDetailScreen';

import PauseScreen from "./app/screens/PauseScreen";
import colors from "./app/config/colors";

import { withNavigation } from "react-navigation";

const Stack = createStackNavigator();

function MyStack() {
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
        headerTintColor: "#fff",
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
      <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
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
      <Stack.Screen name="CategoryDrop" component={CategoryDrop} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>

    //Uncomment to see different screens one at a time
    //<TherapyScreen />
    //<CategoryDrop/>
    //<PlantScreen/>
    //<LoginScreen/>
    //<SignupScreen/>
    // <SchedulingScreen/>
    //<SignupScreen />
    //<ForgotPasswordScreen/>
    //<PauseScreen/>
    //<Index></Index> //where progressBar buttons/actions and component are
    
  );
}
