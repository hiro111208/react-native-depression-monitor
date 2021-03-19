import React from "react";
import renderer from "react-test-renderer";
import PauseScreen from "../screens/PauseScreen";

test("renders correctly", () => {
  const tree = renderer.create(<PauseScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
