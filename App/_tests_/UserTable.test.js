import React from "react";
import { shallow } from "enzyme";
import UserTable from "../src/components/UserTable";

// jest.mock("react-native/Libraries/LayoutAnimation/LayoutAnimation", () => ({
//   ...require.requireActual(
//     "react-native/Libraries/LayoutAnimation/LayoutAnimation"
//   ),
//   configureNext: jest.fn(),
// }));

describe("Testing UserTable.js", () => {
  it("UserTable renders correctly", () => {
    shallow(<UserTable />);
  });
});
