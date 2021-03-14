import * as React from 'react';
import { View, Button, Text } from 'react-native';
import {
    NavigationContainer,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import TherapyScreen from "../app/screens/TherapyScreen";

function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Home" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
        case 'Home':
            return 'Home';
        case 'Calendar':
            return 'Calendar';
        case 'Account':
            return 'Account';
    }
}


//The below three functions are temporary screens to check the tab bar is working.
function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Sessions"
                onPress={() => navigation.navigate('Sessions')}
            />
        </View>
    );
}

function CalendarScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Calendar!</Text>
        </View>
    );
}

function AccountScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Account!</Text>
        </View>
    );
}

// TherapyScreen is potentially added to below function

function SessionsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sessions!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

function HomeTabs({ navigation, route }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    }, [navigation, route]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'ios-home' : 'ios-home-outline';
                    } else if (route.name === 'Calendar') {
                        iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'ios-person' : 'ios-person-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#1999CE',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

export default function PatientDashboard() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
                <Stack.Screen name="Home" component={HomeTabs} />
                <Stack.Screen options={{ headerShown: false }} name="Sessions" component={SessionsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}