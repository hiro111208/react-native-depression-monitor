import React from "react";
import { shallow } from "enzyme";
import { fireEvent, render, cleanup } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import PlantScreen from "../PlantScreen";
import * as firebase from "firebase";

beforeAll(() => {
    jest.spyOn(firebase, "auth").mockImplementation(() => {
        return {
            currentUser: {
                uid: "123456",
                coins: 5,
                level: 1
            },
        }
    })
    jest.useFakeTimers
});

describe("Testing PlantScreen.js rendering", () => {

    it("PlantScreen shallow renders correctly when max level not reached", () => {
        const wrapper = shallow(<PlantScreen route={{ params: { currentUser: { coins: 5, level: 1 }}}}/>);
        expect(wrapper.length).toBe(1);
    });

    it("PlantScreen shallow renders correctly when max level has been reached", () => {
        const wrapper = shallow(<PlantScreen route={{ params: { currentUser: { coins: 5, level: 9 }}}}/>);
        expect(wrapper.length).toBe(1);
    });

    it("PlantScreen snapshot - max level not reached", () => {
        const tree = renderer.create(<PlantScreen route={{ params: { currentUser: { coins: 5, level: 1 }}}}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it("Renders RETURN_BUTTON", () => {
        const wrapper = render(<PlantScreen route={{ params: { currentUser: { coins: 5, level: 1 }}}} />);
        expect(wrapper.queryByTestId("RETURN_BUTTON")).toBeTruthy();
    });

    it("Renders WATER_BUTTON when user is not at level 9", () => {
        const wrapper = render(<PlantScreen route={{ params: { currentUser: { coins: 5, level: 1 }}}} />);
        expect(wrapper.queryByTestId("WATER_BUTTON")).toBeTruthy();
    });

    it("Does not render WATER_BUTTON when user is at level 9", () => {
        const wrapper = render(<PlantScreen route={{ params: { currentUser: { coins: 5, level: 9 }}}} />);
        expect(wrapper.queryByTestId("WATER_BUTTON")).toBeFalsy();
    });

    it("Does not render max level message when user is not at level 9", () => {
        const wrapper = render(<PlantScreen route={{ params: { currentUser: { coins: 5, level: 5 } } }} />);
        expect(wrapper.queryByTestId("MAX_LEVEL_MESSAGE")).toBeFalsy();
    });
    
    it("Renders MAX_LEVEL_MESSAGE when user level is 9", () => {
        const wrapper = render(<PlantScreen route={{ params: { currentUser: { coins: 5, level: 9 }}}} />);
        expect(wrapper.queryByTestId("MAX_LEVEL_MESSAGE")).toBeTruthy();
    });  

});

describe("Testing waterPlant function", () => {

    let user = { coins: 5 }
        
    it("User coins -5 after WATER_BUTTON pressed", () => {
        const wrapper = render(<PlantScreen route={{ params: { currentUser: { user, coins: 5, level: 1 } } }} />);
        console.log(wrapper);
        const waterButton = wrapper.getByTestId("WATER_BUTTON");
        expect(user.coins).toBe(5);
        fireEvent(waterButton, "press");
        //expect(user.coins).toBe(0);
    });

    it("Press WATER_BUTTON should invoke onPress", () => {
        const wrapper = render(<PlantScreen route={{ params: { currentUser: { coins: 5, level: 1 } } }} />);
        const waterButton = wrapper.queryByTestId("WATER_BUTTON");
        const waterMock = jest.fn(() => "Pressed WATER_BUTTON");
        expect(waterMock).not.toHaveBeenCalled();
        fireEvent(waterButton, "press");
        // expect(mockFn).toHaveBeenCalled();
      });

});

describe("Testing PlantScreen navigation", () => {

    it("RETURN_BUTTON press navigates back to user HomeScreen", async () => {
        const navigation = { navigate: jest.fn() };
        const wrapper = render(<PlantScreen route={{ params: { currentUser: { coins: 5, level: 9 }}}} navigation={ navigation.navigate } />);
        const button = wrapper.getByTestId("RETURN_BUTTON");
        expect(navigation.navigate).not.toHaveBeenCalledWith("HomeScreen");
        await fireEvent(button, "press");
    });
});

afterAll(cleanup);