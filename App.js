import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import TherapyScreen from "./app/screens/TherapyScreen";
import CategoryDrop from "./app/screens/CategoryDrop";
import PlantScreen from "./app/screens/PlantScreen";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import ForgotPasswordScreen from "./app/screens/ForgotPasswordScreen";
import Index from "./app/src/components/Index";
import PatientDashboard from "./app/dashboards/PatientDashboard";
import AdminDashboard from "./app/dashboards/AdminDashboard";

import colors from "./app/config/colors";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignupScreen"
      screenOptions={{
        gestureEnabled: false,
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
      <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TherapyScreen"
        component={TherapyScreen}
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
    //<SignupScreen />
    //<ForgotPasswordScreen/>
    //<Index></Index> //where progressBar buttons/actions and component are
  );
}
