import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import AdminUserList from "./AdminUserList";

/** Returns the progress of all the current users  */
export default function AdminUsersScreen() {
  return <AdminUserList />;
}
