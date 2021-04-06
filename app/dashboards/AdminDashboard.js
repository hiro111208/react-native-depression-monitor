import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminHomeScreen from "./AdminHomeScreen";
import AdminUserList from "./AdminUserList";

const Tab = createBottomTabNavigator();

// set the header as the tab name
function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Users":
      return "Users";
  }
}

/**
 * Dashboard to navigate to content management or user progress tabs
 */
export default function AdminDashboard({ navigation, route }) {
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
            case "Users":
              imageSource = focused
                ? require("../assets/account-active.png")
                : require("../assets/account.png");
              break;
          }

          return <Image source={imageSource} style={styles.image} />;
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
        component={AdminUserList}
        options={{ tabBarLabel: "Users" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    maxHeight: "85%",
    maxWidth: "15%",
  },
});
