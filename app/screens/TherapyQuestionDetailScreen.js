// screens/TherapyQuestionDetailScreen.js

import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class TherapyQuestionDetailScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="TherapyQuestions List"
          onPress={() => this.props.navigation.navigate('EditTherapyQuestionScreen')}
          color="#19AC52"
        />
    </View>
    );
  }
}