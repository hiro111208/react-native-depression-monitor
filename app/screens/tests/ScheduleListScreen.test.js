import React from "react";
import { shallow } from "enzyme";
import { Alert } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import ScheduleListScreen from "../ScheduleListScreen";
import * as firebase from 'firebase'

describe("Testing ScheduleListScreen.js", () => {
    jest.spyOn(firebase, 'auth').mockImplementation(() => {
        return {
          currentUser: {
            displayName: 'testDisplayName',
            email: 'test@test.com',
            emailVerified: true,
            uid:"ABC123"
          },
        }
      })

    beforeEach(() => {
        jest.useFakeTimers();
    });
    
    it("ScheduleListScreen renders correctly", () => {
        const wrapper = shallow(<ScheduleListScreen />);
        expect(wrapper.length).toBe(1);
    });
    
    it("ScheduleListScreen snapshot test", () => {
      const tree = renderer.create(<ScheduleListScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    
});