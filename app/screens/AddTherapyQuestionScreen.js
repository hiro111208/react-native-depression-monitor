// screens/AddTherapyQuestionScreen.js

import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class AddTherapyQuestionScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to TherapyQuestion list"
          onPress={() => this.props.navigation.navigate('TherapyQuestionScreen')}
          color="#19AC52"
        />
      </View>
    );
  }
}