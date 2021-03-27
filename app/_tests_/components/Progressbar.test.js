import React from "react";
import ProgressBar from "../../src/components/ProgressBar";

jest.mock("react-native/Libraries/LayoutAnimation/LayoutAnimation", () => ({
  ...require.requireActual(
    "react-native/Libraries/LayoutAnimation/LayoutAnimation"
  ),
  configureNext: jest.fn(),
}));

describe("Testing ProgressBar.js", () => {
  it("ProgressBar renders correctly", () => {
    mount(<ProgressBar />);
  });

  it("ProgressBar renders with width progress of 0 ", () => {
    const wrapper = mount(<ProgressBar />);
    expect(wrapper.props().nextWidth).toBe(0);
  });
});
