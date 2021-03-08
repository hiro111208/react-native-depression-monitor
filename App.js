import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PatientDashboard from './src/components/PatientDashboard';
import AdminDashboard from './src/components/AdminDashboard';

export default function App() {
  return (
    //<PatientDashboard />
    <AdminDashboard />
  );
}