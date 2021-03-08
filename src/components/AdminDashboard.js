import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const UsersStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const AccountStack = createStackNavigator();

function A() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>A!</Text>
        </View>
    );
}

function B() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>B!</Text>
        </View>
    );
}

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={A} />
        </HomeStack.Navigator>
    );
}

function UsersStackScreen() {
    return (
        <UsersStack.Navigator>
            <UsersStack.Screen name="Users" component={A} />
        </UsersStack.Navigator>
    );
}

function CalendarStackScreen() {
    return (
        <CalendarStack.Navigator>
            <CalendarStack.Screen name="Calendar" component={B} />
        </CalendarStack.Navigator>
    );
}

function AccountStackScreen() {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen name="Account" component={B} />
        </AccountStack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-home' : 'ios-home-outline';
                        } else if (route.name === 'Users') {
                            iconName = focused ? 'ios-people' : 'ios-people-outline';
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
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={HomeStackScreen} options={{ tabBarLabel: 'Home' }} />
                <Tab.Screen name="Users" component={UsersStackScreen} options={{ tabBarLabel: 'Users' }} />
                <Tab.Screen name="Calendar" component={CalendarStackScreen} options={{ tabBarLabel: 'Calendar' }} />
                <Tab.Screen name="Account" component={AccountStackScreen} options={{ tabBarLabel: 'Account' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}