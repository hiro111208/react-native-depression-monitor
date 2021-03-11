import firebase from '../../firebase.js';
import React from 'react';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import renderer from 'react-test-renderer';
import { Alert } from 'react-native';
import {cleanup, render, fireEvent, waitFor} from '@testing-library/react-native';
import "@testing-library/jest-dom/extend-expect";


describe('forgot your password', () => {
    afterEach(cleanup);

test('renders correctly', () => {
    const tree = renderer.create(<ForgotPasswordScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('sendPasswordResetEmail should be unsuccessful with no account related to email', async () => 
{
    let error = '';
    try {
        await firebase.auth().sendPasswordResetEmail('unregistered@test.com');
    } catch (err) {
        error = err.message;
    }
    expect(error).toEqual('There is no user record corresponding to this identifier. The user may have been deleted.');
},10000);

test('sendPasswordResetEmail should be successful with email related to registered account', async () => 
{
    let error= '';
    await firebase.auth().createUserWithEmailAndPassword('registered@test.com', 'password');
    try {
        await firebase.auth().sendPasswordResetEmail('registered@test.com');
    } catch (err) {
        error = err.message;
    }
    await firebase.auth().currentUser.delete().catch(error => {
        credential = firebase.auth.EmailAuthProvider.credential('registered@test.com','password');
        firebase.auth().currentUser.reauthenticateWithCredential(credential)
        firebase.auth().currentUser.delete()
    });
    expect(["","Exceeded daily quota for resetting passwords."]).toContain(error)
},10000);

test('Expect to show email required', async()=>{
    const { getByTestId } = render(<ForgotPasswordScreen />)
    const emailInput= getByTestId('TEST_ID_EMAIL_INPUT');
    const button= getByTestId('TEST_ID_FORGOT_BUTTON');

    jest.spyOn(Alert, 'alert');
    await waitFor(()=> {
        fireEvent.press(button);

        expect(Alert.alert).toHaveBeenCalledWith('Enter an email!');
    })
},10000)

test('Expect to call sendPasswordResetEmail', async()=>{
    const { getByTestId } = render(<ForgotPasswordScreen />);
    const {getByText}= render(<ForgotPasswordScreen />);
    const emailInput= getByTestId('TEST_ID_EMAIL_INPUT');
    const button= getByTestId('TEST_ID_FORGOT_BUTTON');
    const message= getByTestId('TEST_ID_MESSAGE');

    await waitFor(() => button);
    await firebase.auth().createUserWithEmailAndPassword('registered@test.com', 'password');

    jest.spyOn(firebase.auth(), 'sendPasswordResetEmail');
    await fireEvent.changeText(emailInput, 'registered@test.com');
    await fireEvent.press(button);
    
    await waitFor(() => {
        expect(firebase.auth().sendPasswordResetEmail).toHaveBeenCalled();
        expect(["You should have received an email to change your password","Exceeded daily quota for resetting passwords."]).toContain(getByTestId('TEST_ID_MESSAGE').props.children) 
    });
    
    await firebase.auth().currentUser.delete().catch(error => {
        credential = firebase.auth.EmailAuthProvider.credential('registered@test.com','password');
        firebase.auth().currentUser.reauthenticateWithCredential(credential)
        firebase.auth().currentUser.delete()
    });
},10000)
});