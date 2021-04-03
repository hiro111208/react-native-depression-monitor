import * as React from 'react';
import { Image } from "react-native";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AdminHomeScreen from './AdminHomeScreen';
import AdminUsersScreen from './AdminUsersScreen';


const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Home" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
        case 'Home':
            return 'Home';
        case 'Users':
            return 'Users';
    }
}

export default function AdminDashboard({ navigation, route}) {
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    }, [navigation, route]);


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let imageSource;

                    switch (route.name) {
                        case "Home":
                            imageSource = focused ? require("../assets/home-active.png") : require("../assets/home.png");
                            break;
                        case "Users":
                            imageSource = focused ? require("../assets/account-active.png") : require("../assets/account.png");
                            break;
                    }

                    // You can return any component that you like here!
                    return (
                        <Image
                            source={imageSource}
                            style={{ height:"85%", width:"15%" }}
                        />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: "orange",
                inactiveTintColor: "gray",
            }}
        >

        <Tab.Screen
            name="Home"
            component={AdminHomeScreen}
            options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
            name="Users"
            component={AdminUsersScreen}
            options={{ tabBarLabel: "Users" }}
        />
        </Tab.Navigator>
    );
}