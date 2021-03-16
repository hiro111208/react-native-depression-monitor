import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "../screens/LoginScreen";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import firebase from "../../firebase.js"
//import * as firebaseEmulator from "../../node_modules/@firebase/testing"; //unused firebase emulator import

describe("Testing LoginScreen.js", () => {

    beforeAll(async () => {
        jest.setTimeout(1000); 
        await firebase.auth().createUserWithEmailAndPassword("login@test.com", "password");
    });

    afterAll(async () => {
        await firebase.auth().currentUser.delete().catch(error => {
            credential = firebase.auth.EmailAuthProvider.credential("login@test.com","password");
            firebase.auth().currentUser.reauthenticateWithCredential(credential);
            firebase.auth().currentUser.delete();
        });
    })

    test("LoginScreen renders correctly", () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("Expect to show enter details", async () => {
        const { getByTestId } = render(<LoginScreen />)
        const emailInput= getByTestId("TEST_ID_EMAIL_INPUT");
        const button= getByTestId("TEST_ID_LOGIN_BUTTON");

        jest.spyOn(Alert, "alert");
        await waitFor(()=> {
            fireEvent.press(button);

            expect(Alert.alert).toHaveBeenCalledWith("Enter details to login!");
        })
    })

    test("signInWithEmailAndPassword should be unsuccessful with unverified email", async () => {
        let error = "";
        // firebase.auth().settings.appVerificationDisabledForTesting = false;
        try {
            await firebase.auth().signInWithEmailAndPassword("login@test.com", "password");
            console.log("Test 1 passed");
        } catch (err) {
            error = err.toString(); 
            console.log("Catch error 1: " + error);
        }
        expect(error).toEqual("Error: There is no user record corresponding to this identifier. The user may have been deleted.");
    });

    test("signInWithEmailAndPassword should be unsuccessful with incorrect email format", async () => {
        let error = "";
        // firebase.auth().settings.appVerificationDisabledForTesting = true;
        try {
            await firebase.auth().signInWithEmailAndPassword("notAProperEmail", "password");
            console.log("Test 2 passed");
        } catch (err) {
            error = err.toString();
            console.log("Catch error 2: " + error);
        }
        expect(error).toEqual("Error: The email address is badly formatted.");
    });

    test("signInWithEmailAndPassword should work with correct and verified credentials", async () => {
        let error = "";
        try {
            const newUser = await firebase.auth().signInWithEmailAndPassword("login@test.com", "password");
            expect(newUser).toBeTruthy();
            console.log("Test 3 passed");
        } catch(err) {
            console.log("Catch error 3: " + error);
            error = err;
        }
        expect(error).toEqual("");
    });

    test("signInWithEmailAndPassword should be unsuccessful with no credentials", async () => {
        let error = "";
        try {
            await firebase.auth().signInWithEmailAndPassword("", "");
        } catch (err) {
            error = err.toString();
        }
        expect(error).toEqual("Error: The email address is badly formatted.");
    }); 

    test("signInWithEmailAndPassword should be unsuccessful with incorrect password", async () => {
        let error = "";
        try {
            await firebase.auth().signInWithEmailAndPassword("login@test.com", "incorrect");
        } catch (err) {
            error = err.toString();
        }
        expect(error).toEqual("Error: The password is invalid or the user does not have a password.");
    });

});

//currently unused firebase emulator set up and tear down
// beforeAll(async () => {
    //Firebase emulator set-up, not currently in use
    // firebaseEmulator.initializeTestApp({
    //     projectId: "fireship-tutorial-646fc",
    //     auth: { uid: "login-test", email: "login@test.com", password:"password" } 
    //});
// });


// afterAll( async () => {
    //Promise.all(firebaseEmulator.apps().map(app => app.delete()))
// })
