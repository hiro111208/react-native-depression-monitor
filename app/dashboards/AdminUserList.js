import React from "react";
import UserDashboard from "./UserDashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserInfo from "./UserInfo";

const AdminUserList = () => {
  const userList = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <userList.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <userList.Screen name="UserDashboard" component={UserDashboard} />
        <userList.Screen name="UserInfo" component={UserInfo} />
      </userList.Navigator>
    </NavigationContainer>
  );
};

export default AdminUserList;
