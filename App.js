import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import TherapyScreen from "./app/screens/TherapyScreen";
import CategoryDrop from "./app/screens/CategoryDrop";
import PlantScreen from "./app/screens/PlantScreen";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import ForgotPasswordScreen from "./app/screens/ForgotPasswordScreen";

import colors from "./app/config/colors";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignupScreen"
      screenOptions={{
        headerLeft: null,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.darkBorder,
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
        options={{ title: "Signup" }}
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
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ title: "Dashboard" }}
      />
      <Stack.Screen name="TherapyScreen" component={TherapyScreen} />
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
    //<ForgotPasswordScreen/>
  );
  
}
