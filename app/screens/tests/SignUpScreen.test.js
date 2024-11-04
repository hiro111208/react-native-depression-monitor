import React from "react";
import renderer from "react-test-renderer";
import SignUpScreen from "../SignUpScreen";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import firebase from "../../database/firebase"

describe("Testing SignUpScreen.js", () => {

    beforeAll(() => {
        jest.setTimeout(10000);
    });

    afterAll( async () => {
        await firebase.auth().currentUser.delete().catch(error => {
            credential = firebase.auth.EmailAuthProvider.credential("signup@test.com","password");
            firebase.auth().currentUser.reauthenticateWithCredential(credential);
            firebase.auth().currentUser.delete();
        });
    });

    it("SignupScreen renders correctly", () => {
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
        expect(error).toEqual("Error: The email address is badly formatted.");
    });

    test("Sign Up should be unsuccessful with invalid password - too short", async () => {
        let error = "";
        try {
            await firebase.auth().createUserWithEmailAndPassword("signup@test.com", "short");
        } catch (err) {
            error = err.toString();
        }
        expect(error).toEqual("Error: Password should be at least 6 characters");
    });

    test("Sign up should be unsuccessful with an email that has already been registered", async () => {
        let error = "";
        try {
            await firebase.auth().createUserWithEmailAndPassword("signup@test.com", "password");
        } catch(err) {
            error = err.toString();
        }
        expect(error).toEqual("Error: The email address is already in use by another account.");
    });

});

