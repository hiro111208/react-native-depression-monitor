import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const UsersStack = createStackNavigator();

function UserList() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>A list of users to check their activity</Text>
        </View>
    );
}

function Therapy() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Potentially used to modify the content of therapy sessions</Text>
        </View>
    );
}

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Therapy} />
        </HomeStack.Navigator>
    );
}

function UsersStackScreen() {
    return (
        <UsersStack.Navigator>
            <UsersStack.Screen name="Users" component={UserList} />
        </UsersStack.Navigator>
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
            </Tab.Navigator>
        </NavigationContainer>
    );
}