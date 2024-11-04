import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import BarMarkers from "../BarMarkers";

describe("Testing BarMarkers.js", () => {
    
    it("BarMarkers renders correctly", () => {
      const component = shallow(<BarMarkers />);
      expect(component.length).toBe(1);
    });
  
    it("BarMarkers snapshot", () => {
      const tree = renderer.create(<BarMarkers />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    
});