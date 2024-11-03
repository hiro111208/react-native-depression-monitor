import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import "react-native-gesture-handler/jestSetup";
import "./node_modules/@unimodules/react-native-adapter";
import "./node_modules/@unimodules/core/src/AdapterProxy";
import "./node_modules/expo-notifications";

//*https://blog.codemagic.io/testing-react-native-apps-with-jest/
jest.mock("react-native-reanimated", () => {
    const Reanimated = require("node_modules/react-native-reanimated/mock");
    Reanimated.default.call = () => {};
    return Reanimated;
});

jest.mock("expo-notifications", () => {
    return {
        addEventListener: jest.fn(),
        requestPermissions: jest.fn(() => Promise.resolve()),
        getInitialNotification: jest.fn(() => Promise.resolve()),
    };
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

jest.mock("@unimodules/react-native-adapter");

jest.mock("@unimodules/core/src/AdapterProxy");
