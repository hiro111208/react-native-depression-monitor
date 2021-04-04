import * as React from "react";
import { Image } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import AccountScreen from "./AccountScreen";
import SchedulingScreen from "../screens/SchedulingScreen";

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's 'Home' as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Calendar":
      return "Calendar";
    case "Account":
      return "Account";
  }
}

const Tab = createBottomTabNavigator();

export default function PatientDashboard({ navigation, route }) {

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
                        case "Calendar":
                            imageSource = focused ? require("../assets/calendar-active.png") : require("../assets/calendar.png");
                            break;
                        case "Account":
                            imageSource = focused ? require("../assets/account-active.png") : require("../assets/account.png");
                            break;
                    }

                    return (
                        <Image
                            source={imageSource}
                            style={{ maxHeight:"75%", maxWidth:"20%" }}
                        />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: "orange",
                inactiveTintColor: "gray",
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Calendar" component={SchedulingScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}
