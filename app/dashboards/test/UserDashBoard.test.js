import React from "react";
import { shallow } from "enzyme";

import UserDashboard from "../UserDashboard";

describe("Testing UserDashBoard.js", () => {
  
  it("UserDashBoard renders correctly", () => {
    const wrapper = shallow(<UserDashboard />);
    expect(wrapper.length).toBe(1);
  });

  it("Renders category drop toggle", () => {
    const wrapper = shallow(<UserDashboard />);
    expect(wrapper.find("BouncyCheckbox")).toBeTruthy();
  });

  it("Renders search bar", () => {
    const wrapper = shallow(<UserDashboard />);
    expect(wrapper.find("TextInput")).toBeTruthy();
  });

});