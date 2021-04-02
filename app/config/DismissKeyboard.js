import React from 'react';
import { Keyboard,  TouchableWithoutFeedback } from 'react-native';

// With this component, a keyboard is dismissed when tapping outside TextInput
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;