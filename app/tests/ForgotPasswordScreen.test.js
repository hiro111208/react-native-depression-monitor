import firebase from '../../firebase.js';
import React from 'react';
import renderer from 'react-test-renderer';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

test('renders correctly', () => {
    const tree = renderer.create(<ForgotPasswordScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});