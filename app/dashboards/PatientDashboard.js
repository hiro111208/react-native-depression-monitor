import * as React from "react";
import { Image } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import AccountScreen from "./AccountScreen";
import SchedulingScreen from "../screens/SchedulingScreen";

// Gets current route name or default home
function getHeaderTitle(route) {
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

{
  /* Dashboard for the users to undertake therapy,
   *schedule notifications or view other account information
   */
}
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
              imageSource = focused
                ? require("../assets/home-active.png")
                : require("../assets/home.png");
              break;
            case "Calendar":
              imageSource = focused
                ? require("../assets/calendar-active.png")
                : require("../assets/calendar.png");
              break;
            case "Account":
              imageSource = focused
                ? require("../assets/account-active.png")
                : require("../assets/account.png");
              break;
          }

          return (
            <Image
              source={imageSource}
              style={{ maxHeight: "75%", maxWidth: "20%" }}
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
