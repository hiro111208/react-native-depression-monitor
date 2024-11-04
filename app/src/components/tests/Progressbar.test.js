import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import ProgressBar from "../ProgressBar";
import Index from "../Index";

describe("Testing ProgressBar.js", () => {

  it("ProgressBar renders correctly", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.find("ProgressBar")).toHaveLength(1);
  });

  it("ProgressBar renders correctly across screens", () => {
    const tree = renderer.create(<ProgressBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("ProgressBar renders with width progress of 0 ", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.find("ProgressBar").props().nextWidth).toBe(0);
  });
});