import React from "react";
import { shallow } from "enzyme";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import SupportResources from "../SupportResources";

describe("Testing SupportResources.js rendering", () => {
    
    it("SupportResources renders correctly", () => {
      const wrapper = shallow(<SupportResources />);
      expect(wrapper.length).toBe(1);
    });
  
    it("SupportResources snapshot test", () => {
      const tree = renderer.create(<SupportResources />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it("Renders quote", () => {
      const wrapper = render(<SupportResources />);
      expect(wrapper.queryByTestId("QUOTE")).toBeTruthy();
    });
  
    it("Renders NHS hyperlink", () => {
      const wrapper = render(<SupportResources />);
      expect(wrapper.queryByTestId("NHS")).toBeTruthy();
    });

    it("Renders BIPOLAR hyperlink", () => {
      const wrapper = render(<SupportResources />);
      expect(wrapper.queryByTestId("BIPOLAR")).toBeTruthy();
    });
  
    it("Renders CALMZONE hyperlink", () => {
      const wrapper = render(<SupportResources />);
      expect(wrapper.queryByTestId("CALMZONE")).toBeTruthy();
    });

    it("Renders SAMARITANS hyperlink", () => {
      const wrapper = render(<SupportResources />);
      expect(wrapper.queryByTestId("SAMARITANS")).toBeTruthy();
    });

    it("Renders WLM hyperlink", () => {
      const wrapper = render(<SupportResources />);
      expect(wrapper.queryByTestId("WLM")).toBeTruthy();
    });

    it("Renders return button", () => {
      const wrapper = render(<SupportResources />);
      expect(wrapper.queryByTestId("RETURN_BUTTON")).toBeTruthy();
    });

    it("Renders contributor list", () => {
      const wrapper = render(<SupportResources />);
      expect(wrapper.queryByTestId("CONTRIBUTORS")).toBeTruthy();
    });

});

describe("Testing SupportResources.js navigation", () => {

  it("Navigate to the previous screen", () => {
    const navigation = { goBack: jest.fn() };
    const wrapper = render(<SupportResources navigation={ navigation } />);
    const button = wrapper.getByTestId("RETURN_BUTTON");
    expect(navigation.goBack).not.toHaveBeenCalled();
    fireEvent(button, "press");
    expect(navigation.goBack).toHaveBeenCalled();
  });

});


afterAll(cleanup); 