import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import { Constants } from "expo-constants";

import PauseScreen from "./app/screens/PauseScreen";

import colors from '.app/config/colors';

const Stack = createStackNavigator();

function MyStack() {
    return (
      <Stack.Navigator 
        initialRouteName="PauseScreen" //change to signup/login later
        screenOptions={{
            headerLeft: null,
            headerTitleAlign: 'center',
            headerStyle: {
             backgroundColor: colors.darkBorder,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            backgroundColor: '#fad8B9'
        }}>
          <Stack.Screen 
            name="PauseScreen" 
            component={ PauseScreen } 
            options={{ title: 'Take a break' }}
          />   
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

const styles = StyleSheet.create({
  container: {
    flex: 1, //takes up the entire screen
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#FAD8B9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
