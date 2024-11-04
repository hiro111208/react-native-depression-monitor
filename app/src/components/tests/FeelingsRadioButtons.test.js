import React from "react";
import { shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import FeelingsRadioButtons from "../FeelingsRadioButtons";

describe("Testing FeelingsRadioButtons.js", () => {
    
  it("FeelingsRadioButtons renders correctly", () => {
    const button = shallow(<FeelingsRadioButtons />);
    expect(button.length).toBe(1);
  });
    
  it("FeelingsRadioButtons renders correctly across screens", () => {
    const tree = renderer.create(<FeelingsRadioButtons />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing FeelingsRadioButtons.js component interaction", () => {

    it("Press very sad should invoke onPress", () => {
      const mockFn = jest.fn(() => "Pressed very sad");
      const initialProps = {
        setOverallFeeling: () => mockFn(),
      }
      const wrapper = render(<FeelingsRadioButtons {...initialProps} />);
      const verySad = wrapper.getByTestId("VERY_SAD");
      expect(mockFn).not.toHaveBeenCalled();
      fireEvent.press(verySad)
      expect(mockFn).toHaveBeenCalled()
    });
  
    it("Press sad should invoke onPress", () => {
      const mockFn = jest.fn(() => "Pressed sad");
      const initialProps = {
        setOverallFeeling: () => mockFn(),
      }
      const wrapper = render(<FeelingsRadioButtons {...initialProps} />);
      const verySad = wrapper.getByTestId("SAD");
      expect(mockFn).not.toHaveBeenCalled();
      fireEvent.press(verySad)
      expect(mockFn).toHaveBeenCalled()
    });

    it("Press neutral should invoke onPress", () => {
      const mockFn = jest.fn(() => "Pressed neutral");
      const initialProps = {
        setOverallFeeling: () => mockFn(),
      }
      const wrapper = render(<FeelingsRadioButtons {...initialProps} />);
      const verySad = wrapper.getByTestId("NEUTRAL");
      expect(mockFn).not.toHaveBeenCalled();
      fireEvent.press(verySad)
      expect(mockFn).toHaveBeenCalled()
    });

    it("Press happy should invoke onPress", () => {
      const mockFn = jest.fn(() => "Pressed happy");
      const initialProps = {
        setOverallFeeling: () => mockFn(),
      }
      const wrapper = render(<FeelingsRadioButtons {...initialProps} />);
      const verySad = wrapper.getByTestId("HAPPY");
      expect(mockFn).not.toHaveBeenCalled();
      fireEvent.press(verySad)
      expect(mockFn).toHaveBeenCalled()
    });

    it("Press very Happy should invoke onPress", () => {
      const mockFn = jest.fn(() => "Pressed very happy");
      const initialProps = {
        setOverallFeeling: () => mockFn(),
      }
      const wrapper = render(<FeelingsRadioButtons {...initialProps} />);
      const verySad = wrapper.getByTestId("VERY_HAPPY");
      expect(mockFn).not.toHaveBeenCalled();
      fireEvent.press(verySad)
      expect(mockFn).toHaveBeenCalled()
    });
  
});