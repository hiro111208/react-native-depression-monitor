import React from "react";
import renderer from "react-test-renderer";
import SignUpScreen from "../screens/SignUpScreen";

import * as firebase from "../../node_modules/@firebase/testing";

describe("Testing SignUpScreen.js", () => {

    beforeAll(() => {
        jest.setTimeout(100); //find appropriate timeout after testing
    });

    it("SignUpScreen renders correctly", () => {
        const tree = renderer.create(<SignUpScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("Sign Up should work with correct credentials and verification", async () => {

    });

    test("Sign Up should not work with correct credentials but no verification", async () => {

    });

    test("Sign Up should not work with incorrect email", async () => {

    });

    test("Sign Up should not work with incorrect email", async () => {

    });

});

// test("signup should work with correct credentials and verification", () => 
// {
//     const user = createUserWithEmailAndPassword("success@signup.com", "password");
//     //verify the user
//     expect(user.user).toBeTruthy();
//     expect(isVerified()).toBe(true);
//     //test for email and password value?
// });

// test("signup should not work with correct credentials but no verification", () => 
// {
//     let error = "";
//     try {
//         createUserWithEmailAndPassword("fail@signup.com", "password");
//     } catch (err) {
//         error = err.toString();
//     }
//     expect(error).toEqual(`Please verify your email through the link we"ve sent to: fail@signup.com`);
// });

// test("signup should work not work with invalid email", () => 
// {
//     let error = "";
//     try {
//          createUserWithEmailAndPassword("fail@signup", "password");
//     } catch (err) {
//         error = err.toString();
//     }
//     expect(error).toEqual(`failed to send email verification`);
// });

//test with email that has already been signed up should fail
//The email address is already in use by another account.

// test("signup should not work with password shorter than 6 characters", async () => 
// {
//     let error = "";
//     try {
//         await createUserWithEmailAndPassword("tooshort@login.com", "short");
//     } catch (err) {
//         error = err.toString();
//     }

//     expect(error).toEqual("");//error.message?
// });

// test("signup should not work with password longer than 15 characters", async () => 
// {
//     let error = "";
//     try {
//         await createUserWithEmailAndPassword("toolong@login.com", "thispasswordistoolong");
//     } catch (err) {
//         error = err.toString();
//     }

//     expect(error).toEqual("");//error.message?
// });