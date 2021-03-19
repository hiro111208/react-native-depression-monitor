import firebase from '../database/firebase';
import React from 'react';
import renderer from 'react-test-renderer';
import DashboardScreen from '../screens/DashboardScreen';

test('renders correctly', () => {
    const tree = renderer.create(<DashboardScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});