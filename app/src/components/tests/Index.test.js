import React from "react";
import { shallow } from "enzyme";
import Index from "../Index";

describe("Testing Index.js", () => {
  it("Index renders correctly", () => {
    shallow(<Index />);
  });

  it('Index starts with a "steps" count of -1 upon mount', () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.state().steps).toEqual(-1);
  });

  it("Index intialises ProgressBar prop 'nextWidth' as 'steps' + 1 -> 0 ", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.state().steps).toEqual(-1);
    const progressBar = wrapper.find("ProgressBar");
    expect(progressBar.props().nextWidth).toEqual(0);
  });

  it("'steps' value updates by 1 when increment button pressed", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.state().steps).toEqual(-1);
    const incrementBtn = wrapper.find("Button.increment");
    incrementBtn.simulate("press");
    expect(wrapper.state().steps).toEqual(0);
  });

  it("ProgressBar prop 'nextWidth' maintains + 1 relation with 'steps' as 'steps' increases ", () => {
    const wrapper = shallow(<Index />);
    const incrementBtn = wrapper.find("Button.increment");
    incrementBtn.simulate("press");
    const progressBar = wrapper.find("ProgressBar");
    expect(progressBar.props().nextWidth).toBe(1);
    // expect(progressBar).to.have.property("nextWidth", 1);
  });

  it("'steps' value decreases by 1 when decrement button pressed", () => {
    const wrapper = shallow(<Index />);
    wrapper.setState({ steps: 1 });
    const decrementBtn = wrapper.find("Button.decrement");
    decrementBtn.simulate("press");
    expect(wrapper.state().steps).toEqual(0);
  });

  it("ProgressBar prop 'nextWidth' maintains + 1 relation with 'steps' as 'steps' decreases ", () => {
    const wrapper = shallow(<Index />);
    wrapper.setState({ steps: 1 });
    const decrementBtn = wrapper.find("Button.decrement");
    decrementBtn.simulate("press");
    const progressBar = wrapper.find("ProgressBar");
    expect(progressBar.props().nextWidth).toBe(1);
  });

  it("'steps' maximum value remains less than 'segments' even if increment button pressed ", () => {
    const wrapper = shallow(<Index />);
    wrapper.setState({ steps: 3, segments: 4 });
    const incrementBtn = wrapper.find("Button.increment");
    incrementBtn.simulate("press");
    expect(wrapper.state().steps).toEqual(3);
  });

  it("'steps' minimum value remains as -1 even if decrement button pressed ", () => {
    const wrapper = shallow(<Index />);
    const decrementBtn = wrapper.find("Button.decrement");
    decrementBtn.simulate("press");
    expect(wrapper.state().steps).toEqual(-1);
  });
});
