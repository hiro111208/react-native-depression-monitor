import firebase from '../../firebase.js';
import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../screens/LoginScreen';

beforeAll(() => {
    jest.setTimeout(10000); //find appropriate timeout after testing
    await init(); //asynchronous calls 
    const user = firebase.auth().createUserWithEmailAndPassword('test@login.com', 'password');
});

test('renders correctly', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

//tests should cover all branches, but is this unecessary?
test('signInWithEmailAndPassword should be unsuccessful with no credentials', async () => 
{
    let error = '';
    try {
        await signInWithEmailAndPassword('', '');
    } catch (err) {
        error = err.toString();
    }

    expect(error).toEqual('Enter details to login!');
});

test('signInWithEmailAndPassword should be unsuccessful with incorrect email', async () => 
{
    let error = '';
    try {
        await signInWithEmailAndPassword('notSignedUp@login.com', 'password');
    } catch (err) {
        error = err.toString();
    }

    expect(error).toEqual();//error.message?
});

test('signInWithEmailAndPassword should be unsuccessful with incorrect credentail combination', async () => {
    let error = '';
    try {
        await signInWithEmailAndPassword('test@login.com', 'incorrect');
    } catch (err) {
        error = err.toString();
    }

    expect(error).toEqual();//error.message?
});

//is this test useless?
test('signInWithEmailAndPassword should be unsuccessful with incorrect email', async () => {
    let error = '';
    try {
        await signInWithEmailAndPassword('incorrect@login', 'password');
    } catch (err) {
        error = err.toString();
    }

    expect(error).toEqual();//error.message?
});

test('signInWithEmailAndPassword should be unsuccessful with unverified email', async () => {
    let error = '';
    try {
        await signInWithEmailAndPassword('unverified@login.com', 'password');
    } catch (err) {
        error = err.toString(); //error.message?
    }

    expect(error).toEqual('Your email has not been verified');//error.message?
});

test('signInWithEmailAndPassword should be successful with correct credentials', async () => 
{
    //should verify the user here (not above since test is used as an unverified email)
    const user = await signInWithEmailAndPassword('test@login.com', 'password');
    expect(user.user).toBeTruthy();
    expect(isAuthenticated()).toBe(true);
});