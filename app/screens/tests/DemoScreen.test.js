import React from "react";
import { shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import DemoScreen from "../DemoScreen";


describe("Testing", () => {

    it("DemoScreen renders correctly", () => {
        const tree = renderer.create(<DemoScreen route={params=""}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("Navigate function should go to category drop screen", () =>{
        const fakeNavigation = {
            navigate: jest.fn(),
          };
        const wrapper = shallow(<DemoScreen route={params=""} navigation={fakeNavigation} />);
        expect(fakeNavigation.navigate).not.toBeCalled();
        wrapper.navigate;
    })

});