import React from "react";
import { shallow } from "enzyme";
import UserInfo from "../../src/components/UserInfo";

// jest.mock("react-native/Libraries/LayoutAnimation/LayoutAnimation", () => ({
//   ...require.requireActual(
//     "react-native/Libraries/LayoutAnimation/LayoutAnimation"
//   ),
//   configureNext: jest.fn(),
// }));

describe("Testing UserDashBoard.js", () => {
  it("UserInfo renders correctly", () => {
    shallow(<UserInfo />);
  });
});
