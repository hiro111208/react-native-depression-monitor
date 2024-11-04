import React from "react";
import { shallow } from "enzyme";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import LogFeelingScreen from "../LogFeelingScreen";
import * as firebase from "firebase";

describe("Testing LogFeelingScreen.js rendering", () => {

    beforeAll(() => {
        jest.spyOn(firebase, "auth").mockImplementation(() => {
            return {
                currentUser: {
                    uid: "123456",
                },
            }
        })
    });
        

    it("LogFeelingScreen shallow renders correctly", () => {
        const wrapper = shallow(<LogFeelingScreen route={{ params: { userData: { userID: "123456", question: 0}}}}/>);
        expect(wrapper.length).toBe(1);
    });

    it("LogFeelingScreen renders correctly", () => {
        const tree = renderer.create(<LogFeelingScreen route={{ params: { userData: { userID: "123456", question: 0}}}}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders continue button", () => {
        const wrapper = render(<LogFeelingScreen route={{ params: { userData: { userID: "123456", question: 0}}}}/>);
        expect(wrapper.queryByTestId("CONTINUE_BUTTON")).toBeTruthy();
    });

});

//TODO: Add tests for branches
describe("Testing handleOnContinuePress function", () => {

    it("Should alert user", async () => {
        const { getByTestId } = render(<LogFeelingScreen route={{ params: { userData: { userID: "123456", question: 0}}}}/>);
        const button = getByTestId("CONTINUE_BUTTON");

        jest.spyOn(Alert, "alert");
        await waitFor(()=> {
            fireEvent.press(button);
            expect(Alert.alert).toHaveBeenCalledWith("Please fill in how you are feeling!");
        })
    });

});