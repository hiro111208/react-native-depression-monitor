import React from "react";
import ProgressBar from "../../src/components/ProgressBar";

describe("Testing ProgressBar.js", () => {
  it("ProgressBar renders correctly", () => {
    mount(<ProgressBar />);
  });

  it("ProgressBar renders with width progress of 0 ", () => {
    const wrapper = mount(<ProgressBar />);
    expect(wrapper.props().nextWidth).toEqual(0);
  });
});
