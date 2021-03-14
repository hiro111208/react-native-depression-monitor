import { StatusBar } from "expo-status-bar";
import React from "react";
import TherapyScreen from "./App/screens/TherapyScreen";
import CategoryDrop from "./App/screens/CategoryDrop";
import PlantScreen from "./App/screens/PlantScreen";
import SchedulingScreen from './App/screens/SchedulingScreen';
import ScheduleListScreen from './App/screens/ScheduleListScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fd9651',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="SchedulingScreen"
        component={SchedulingScreen}
        options={{ title: 'Add Schedule' }}
      />
      <Stack.Screen
        name="ScheduleListScreen"
        component={ScheduleListScreen}
        options={{ title: 'Schedule List' }}
      />
    </Stack.Navigator>
  );
}


export default class App extends React.Component {
  render() {
    return (
      //Uncomment to see different screens one at a time
      //<TherapyScreen />
      //<CategoryDrop/>
      //<PlantScreen/>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
}
