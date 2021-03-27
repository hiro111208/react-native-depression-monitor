import React from "react";
import { shallow } from "enzyme";

import UserDashboard from "../../dashboards/UserDashboard";

// jest.mock("react-native/Libraries/LayoutAnimation/LayoutAnimation", () => ({
//   ...require.requireActual(
//     "react-native/Libraries/LayoutAnimation/LayoutAnimation"
//   ),
//   configureNext: jest.fn(),
// }));

describe("Testing UserDashBoard.js", () => {
  it("UserDashBoard renders correctly", () => {
    shallow(<UserDashboard />);
  });
});
