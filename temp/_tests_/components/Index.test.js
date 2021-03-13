import React from "react";
import { shallow } from "enzyme";
import Index from "../../src/components/Index";

describe("Testing Index.js", () => {
  it("Index renders correctly", () => {
    shallow(<Index />);
  });

  it('Index renders a "currentWidth" of -1 upon mount', () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.state().currentWidth).toEqual(-1);
  });

  it("Index intialisses ProgressBar prop 'nextWidth' = 'currentWidth' + 1 = 0 ", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.state().currentWidth).toEqual(-1);
    const progressBar = wrapper.find("ProgressBar");
    expect(progressBar.props().nextWidth).toEqual(0);
  });

  it("'currentWidth' value updates by 1 when increment button pressed", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.state().currentWidth).toEqual(-1);
    const incrementBtn = wrapper.find("Button.increment");
    incrementBtn.simulate("press");
    expect(wrapper.state().currentWidth).toEqual(0);
  });

  it("'nextWidth' prop increases as 'currentWidth' increases ", () => {
    const wrapper = shallow(<Index />);
    const incrementBtn = wrapper.find("Button.increment");
    incrementBtn.simulate("press");
    const progressBar = wrapper.find("ProgressBar");
    expect(progressBar.props().nextWidth).toBe(1);
    // expect(progressBar).to.have.property("nextWidth", 1);
  });

  it("'currentWidth' value decreases by 1 when decrement button pressed", () => {
    const wrapper = shallow(<Index />);
    wrapper.setState({ currentWidth: 1 });
    const decrementBtn = wrapper.find("Button.decrement");
    decrementBtn.simulate("press");
    expect(wrapper.state().currentWidth).toEqual(0);
  });

  it("'nextWidth' prop decreases as 'currentWidth' decreases ", () => {
    const wrapper = shallow(<Index />);
    wrapper.setState({ currentWidth: 1 });
    const decrementBtn = wrapper.find("Button.decrement");
    decrementBtn.simulate("press");
    const progressBar = wrapper.find("ProgressBar");
    expect(progressBar.props().nextWidth).toBe(1);
  });

  it("'currentWidth' max value always less than 'segments'", () => {
    const wrapper = shallow(<Index />);
    wrapper.setState({ currentWidth: 3, segments: 4 });
    const incrementBtn = wrapper.find("Button.increment");
    incrementBtn.simulate("press");
    expect(wrapper.state().currentWidth).toEqual(3);
  });

  it("'currentWidth' min value always -1 ", () => {
    const wrapper = shallow(<Index />);
    const decrementBtn = wrapper.find("Button.decrement");
    decrementBtn.simulate("press");
    expect(wrapper.state().currentWidth).toEqual(-1);
  });
});
