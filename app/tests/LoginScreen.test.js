import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "../screens/LoginScreen";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import firebase from "../../firebase.js"
//import * as firebaseEmulator from "../../node_modules/@firebase/testing"; //unused firebase emulator import

describe("Testing LoginScreen.js", () => {

    beforeAll(async () => {
        jest.setTimeout(10000); 
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

    test("Expect to show enter details alert with no credentials", async () => {
        const { getByTestId } = render(<LoginScreen />);
        const button = getByTestId("TEST_ID_LOGIN_BUTTON");

        jest.spyOn(Alert, "alert");
        await waitFor(() => {
            fireEvent.press(button);
            expect(Alert.alert).toHaveBeenCalledWith("Enter details to login!");
        })
    });

    test("signInWithEmailAndPassword should be unsuccessful with incorrect email format", async () => {
        let error = "";
        try {
            await firebase.auth().signInWithEmailAndPassword("notAProperEmail", "password");
            // console.log("Test 2 passed");
        } catch (err) {
            error = err.toString();
            // console.log("Catch error 2: " + error);
        }
        expect(error).toEqual("Error: The email address is badly formatted.");
    });

    test("signInWithEmailAndPassword should be successful with correct and verified credentials", async () => {
        let error = "";
        try {
            const newUser = await firebase.auth().signInWithEmailAndPassword("login@test.com", "password");
            expect(newUser.user).toBeTruthy();
            // console.log(newUser.user.emailVerified);
            // console.log("Test 3 passed");
        } catch(err) {
            // console.log("Catch error 3: " + error);
            error = err.toString();
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

    test("signInWithEmailAndPassword with incorrect password should display message", async () => {
        const { getByTestId } = render(<LoginScreen />)
        const emailInput = getByTestId("TEST_ID_EMAIL_INPUT");
        const passwordInput = getByTestId("TEST_ID_PASSWORD_INPUT");
        const button = getByTestId("TEST_ID_LOGIN_BUTTON");

        jest.spyOn(firebase.auth(), "signInWithEmailAndPassword");
        await fireEvent.changeText(emailInput, "login@test.com");
        await fireEvent.changeText(passwordInput, "wrongpassword");           
        await fireEvent.press(button);  
        
        await waitFor(() => {
            expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalled();
            expect("The password is invalid or the user does not have a password.").toEqual(getByTestId("TEST_ID_MESSAGE").props.children) 
        });
    });

    test("signInWithEmailAndPassword should be unsuccessful with unverified email", async () => {
        const { getByTestId } = render(<LoginScreen />)
        const emailInput = getByTestId("TEST_ID_EMAIL_INPUT");
        const passwordInput = getByTestId("TEST_ID_PASSWORD_INPUT");
        const button = getByTestId("TEST_ID_LOGIN_BUTTON");

        jest.spyOn(firebase.auth(), "signInWithEmailAndPassword");
        await fireEvent.changeText(emailInput, "login@test.com");
        await fireEvent.changeText(passwordInput, "password");           
        await fireEvent.press(button);  
        
        await waitFor(() => {
            expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalled();
            expect("Your email has not been verfied").toEqual(getByTestId("TEST_ID_MESSAGE").props.children) 
        });
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
