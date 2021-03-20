import React from "react";
import renderer from "react-test-renderer";
import SignUpScreen from "../screens/SignUpScreen";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import firebase from "../database/firebase"

describe("Testing SignupScreen.js", () => {

    beforeAll(() => {
        jest.setTimeout(10000);
    });

    afterAll( async () => {
        await firebase.auth().currentUser.delete().catch(error => {
            credential = firebase.auth.EmailAuthProvider.credential("signup@test.com","password");
            firebase.auth().currentUser.reauthenticateWithCredential(credential);
            firebase.auth().currentUser.delete();
        });
    })

    it("SignUpScreen renders correctly", () => {
        const tree = renderer.create(<SignUpScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("Expect to show enter details", async () => {
        const { getByTestId } = render(<SignUpScreen />);
        const button= getByTestId("TEST_ID_SIGNUP_BUTTON");

        jest.spyOn(Alert, "alert");
        await waitFor(()=> {
            fireEvent.press(button);
            expect(Alert.alert).toHaveBeenCalledWith("Enter details to signup!");
        })
    });

    test("Sign Up should be successful with correct credentials", async () => {
        let error = "";
        try {
            await firebase.auth().createUserWithEmailAndPassword("signup@test.com", "password");
        } catch (err) {
            error = err.toString();
        }
        expect(error).toEqual("");
    });

    test("Sign Up should be unsuccessful with invalid email", async () => {
        let error = "";
        try {
            await firebase.auth().createUserWithEmailAndPassword("incorrectemail", "password");
        } catch (err) {
            error = err.toString();
        }
        expect(error).toEqual("Please sign up using a valid email.");
    });

    test("Sign Up should be unsuccessful with invalid password - too short", async () => {
        let error = "";
        try {
            await firebase.auth().createUserWithEmailAndPassword("signup@test.com", "short");
        } catch (err) {
            error = err.toString();
        }
        expect(error).toEqual("Your password is too short! Tap the question mark for more details.");
    });

    test("Sign up should be unsuccessful with an email that has already been registered", async () => {
        let error = "";
        try {
            await firebase.auth().createUserWithEmailAndPassword("signup@test.com", "password");
        } catch(err) {
            error = err.toString();
        }
        expect(error).toEqual("An account for 'signup@test.com' already exists. Please verify your email or log in.");
    });

});

