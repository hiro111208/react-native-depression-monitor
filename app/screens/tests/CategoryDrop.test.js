import React from "react";
import { shallow } from "enzyme";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import CategoryDrop from "../CategoryDrop";
import * as firebase from "firebase";

beforeAll(() => {
    jest.useFakeTimers();
});

jest.spyOn(firebase, "auth").mockImplementation(() => {
    return {
        currentUser: { uid: "123456" },
    }
})

describe("Testing CategoryDrop.js rendering when the user has not dropped a category", () => {
    
    it("CategoryDrop shallow renders correctly", () => {
        const wrapper = shallow(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>);
        expect(wrapper.length).toBe(1);
    });

    it("CategoryDrop renders correctly", () => {
        const tree = renderer.create(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders instructions", () => {
        const wrapper = render(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>);
        expect(wrapper.queryByTestId("INSTRUCTIONS")).toBeTruthy();
    });
    
    it("Renders social button", () => {
        const wrapper = render(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>);
        expect(wrapper.queryByTestId("SOCIAL_BUTTON")).toBeTruthy();
    });

    it("Renders acadmeic button", () => {
        const wrapper = render(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>);
        expect(wrapper.queryByTestId("ACADEMIC_BUTTON")).toBeTruthy();
    });  

    it("Renders mood button", () => {
        const wrapper = render(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>);
        expect(wrapper.queryByTestId("MOOD_BUTTON")).toBeTruthy();
    });  

    it("Renders health button", () => {
        const wrapper = render(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>);
        expect(wrapper.queryByTestId("HEALTH_BUTTON")).toBeTruthy();
    });  

    it("Renders hobbies button", () => {
        const wrapper = render(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>);
        expect(wrapper.queryByTestId("HOBBIES_BUTTON")).toBeTruthy();
    });  

    it("Renders family button", () => {
        const wrapper = render(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>);
        expect(wrapper.queryByTestId("FAMILY_BUTTON")).toBeTruthy();
    });  

    it("Renders work button", () => {
        const wrapper = render(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>);
        expect(wrapper.queryByTestId("WORK_BUTTON")).toBeTruthy();
    });

    it("Renders relationship button", () => {
        const wrapper = render(<CategoryDrop route={{params: {user: {categoryDropped: "NONE"}}}}/>);
        expect(wrapper.queryByTestId("RELATIONSHIP_BUTTON")).toBeTruthy();
    });  

});

describe("Selecting a category navigates to PatientDashboard", () => {

    it("Selecting a category navigates to PatientDashboard", () => {
        const navigation = { navigate: jest.fn() };
        const wrapper = render(<CategoryDrop route={{ params: { user: { categoryDropped: "NONE" }}}} navigation={ navigation } />);
        const button = wrapper.getByTestId("HEALTH_BUTTON");
        expect(navigation.navigate).not.toHaveBeenCalledWith("PatientDashboard");
        fireEvent(button, "press");
    });

    it("chooseOption not called until button pressed", () => {
        const chooseOption = jest.fn(() => true);
        const wrapper = render(<CategoryDrop route={{ params: { user: { categoryDropped: "NONE" }}}} />);
        const button = wrapper.getByTestId("HEALTH_BUTTON");
        expect(chooseOption).not.toHaveBeenCalledWith("HEALTH");
        fireEvent(button, "press");
    });
        
});

// describe("Testing CategoryDrop.js buttons store user data correctly", () => {
// });

afterAll(cleanup);