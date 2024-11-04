import React from "react";
import { shallow } from "enzyme";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import SchedulingScreen from "../SchedulingScreen";

//* provided by API?

describe("Testing SchedulingScreen.js", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });
    
    it("SchedulingScreen renders correctly", () => {
        const wrapper = shallow(<SchedulingScreen />);
        expect(wrapper.length).toBe(1);
    });
    
    it("SchedulingScreen snapshot test", () => {
      const tree = renderer.create(<SchedulingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    
});