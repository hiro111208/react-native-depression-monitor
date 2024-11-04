import React from "react";
import { shallow } from "enzyme";
import { render } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import FeelingsSlider from "../FeelingsSlider";

describe("Testing FeelingsSlider.js", () => {
    
    it("FeelingsSlider renders correctly", () => {
      const slider = shallow(<FeelingsSlider />);
      expect(slider.length).toBe(1);
    });
  
    it("FeelingsSlider renders correctly across screens", () => {
      const tree = renderer.create(<FeelingsSlider />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    
});

describe("Testing FeelingsSlider.js component interaction", () => {

  it("Moving slider should call state change", () => {
    const mockFn = jest.fn();
    const initialProps = {
      setFeelingState: {mockFn},
    }
    const wrapper = render(<FeelingsSlider {...initialProps} />);
    const slider = wrapper.getByTestId("SLIDER");
    expect(mockFn).not.toHaveBeenCalled();
    slider.props.onSlidingComplete;
  });
});