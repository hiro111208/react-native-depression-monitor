import { StatusBar } from 'expo-status-bar';
import React from 'react';
import TherapyScreen from './screens/TherapyScreen';
import CategoryDrop from './screens/CategoryDrop';

export default class App extends React.Component {
  render() {
    return(
      //Uncomment to see different screens
      //<TherapyScreen/> 
      <CategoryDrop/>     
    )
  }
}

