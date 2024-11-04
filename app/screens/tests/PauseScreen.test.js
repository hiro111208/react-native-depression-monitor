import React from "react";
import { shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import PauseScreen from "../PauseScreen";

describe("Testing PauseScreen.js rendering", () => {
    
  it("PauseScreen renders correctly", () => {
    const wrapper = shallow(<PauseScreen />);
    expect(wrapper.length).toBe(1);
  });

  it("Renders pause image", () => {
    const wrapper = render(<PauseScreen />);
    expect(wrapper.queryByTestId("PAUSE_IMAGE")).toBeTruthy();
  });

  it("Renders back button", () => {
    const wrapper = render(<PauseScreen />);
    expect(wrapper.queryByTestId("BACK_BUTTON")).toBeTruthy();
  });

});

describe("Testing PauseScreen.js navigation", () => {

  it("Press back button should navigate to TherapyScreen", () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = render(<PauseScreen navigation={ navigation } />);
    const button = wrapper.getByTestId("BACK_BUTTON");
    expect(navigation.navigate).not.toHaveBeenCalledWith("TherapyScreen");
    fireEvent(button, "press");
    expect(navigation.navigate).toHaveBeenCalledWith("TherapyScreen");
  });
  
});