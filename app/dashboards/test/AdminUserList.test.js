import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { render, cleanup } from "@testing-library/react-native";

import AdminUserList from "../AdminUserList";

afterEach(cleanup);

describe("Testing AdminUserList.js", () => {
  
  it("AdminUserList renders correctly", () => {
    const wrapper = shallow(<AdminUserList />);
    expect(wrapper.length).toBe(1);
  });

});