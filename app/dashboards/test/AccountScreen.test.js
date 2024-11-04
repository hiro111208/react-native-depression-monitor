import React from "react";
import { shallow } from "enzyme";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import AccountScreen from "../AccountScreen";
import firebase from "../../database/firebase";

describe("Testing AccountScreen.js rendering", () => {
  
  it("AccountScreen renders correctly", () => {
    const wrapper = shallow(<AccountScreen />);
    expect(wrapper.length).toBe(1);
  });
    
  it("AccountScreen snapshot", () => {
    const tree = renderer.create(<AccountScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
    
  it("Renders logo", () => {
    const wrapper = render(<AccountScreen />);
    expect(wrapper.queryByTestId("LOGO")).toBeTruthy();
  });
    
  it("Renders support resources button", () => {
    const wrapper = render(<AccountScreen />);
    expect(wrapper.queryByTestId("SUPPORT_BUTTON")).toBeTruthy();
  });
    
  it("Renders replay demo button", () => {
    const wrapper = render(<AccountScreen />);
    expect(wrapper.queryByTestId("DEMO_BUTTON")).toBeTruthy();
  });

  it("Renders logout button", () => {
    const wrapper = render(<AccountScreen />);
    expect(wrapper.queryByTestId("LOGOUT_BUTTON")).toBeTruthy();
  });

});

describe("Testing AccountScreen.js navigation", () => {
  
  const navigation = { navigate: jest.fn() };

  it("Navigate to SupportResources", () => {
    const wrapper = render(<AccountScreen navigation={ navigation } />);
    const button = wrapper.getByTestId("SUPPORT_BUTTON");
    expect(navigation.navigate).not.toHaveBeenCalledWith("SupportResources");
    fireEvent(button, "press");
    expect(navigation.navigate).toHaveBeenCalledWith("SupportResources");
  });

  it("Navigate to demo screen", () => {
    const wrapper = render(<AccountScreen navigation={ navigation } />);
    const button = wrapper.getByTestId("DEMO_BUTTON");
    expect(navigation.navigate).not.toHaveBeenCalledWith("DemoScreen");
    fireEvent(button, "press");
    expect(navigation.navigate).toHaveBeenCalledWith("DemoScreen");
  });

});

describe("Test logging a user out", () => {
  const signOut = jest.fn(() => Promise.resolve())

  jest.spyOn(firebase, "auth").mockImplementation(() => {
    return {
      currentUser: {
        displayName: "testUser",
      },
      signOut,
    }
  })

  it("Log out of account", () => {
    const wrapper = render(<AccountScreen />);
    const button = wrapper.getByTestId("LOGOUT_BUTTON");
    
    fireEvent(button, "press");
    expect(signOut).toHaveBeenCalled();
  });

});

afterEach(cleanup);