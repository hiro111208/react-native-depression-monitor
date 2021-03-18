// screens/TherapyQuestionScreen.js

import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class TherapyQuestionScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="TherapyQuestions List"
          onPress={() => this.props.navigation.navigate('TherapyQuestionDetailScreen')}
          color="#19AC52"
        />
    </View>
    );
  }
}