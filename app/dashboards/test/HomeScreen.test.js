import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import HomeScreen from "../HomeScreen";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import * as firebase from "firebase";

beforeEach(() => {
  jest.useFakeTimers();
});

describe("Testing HomeScreen.js rendering", () => {

  jest.spyOn(firebase, "auth").mockImplementation(() => {
    return {
      currentUser: {
        displayName: "TestUser",
        uid: "123456"
      },
    }
  });

  it("HomeScreen renders correctly", () => {
    const wrapper = shallow(<HomeScreen />);
    expect(wrapper.length).toBe(1);
  });
  
  it("HomeScreen snapshot test", () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders plant image", () => {
    const wrapper = render(<HomeScreen />);
    expect(wrapper.queryByTestId("PLANT_IMAGE")).toBeTruthy();
  });

  it("Renders session button", () => {
    const wrapper = render(<HomeScreen />);
    expect(wrapper.queryByTestId("SESSION_BUTTON")).toBeTruthy();
  });

  it("Renders plant button", () => {
    const wrapper = render(<HomeScreen />);
    expect(wrapper.queryByTestId("PLANT_BUTTON")).toBeTruthy();
  });

});

describe("Testing HomeScreen.js navigation", () => {

  //TODO: PLANT_BUTTON navigates to PlantScreen
  it("PLANT_BUTTON navigates to LogFeelingScreen when user question is 0", () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = render(<HomeScreen navigation={navigation}/>)
    const plantButton = wrapper.getByTestId("PLANT_BUTTON");
    expect(navigation.navigate).not.toHaveBeenCalledWith("PlantScreen");
    fireEvent(plantButton, "press");
    expect(navigation.navigate).toHaveBeenCalled();
  });

});

afterAll(cleanup);