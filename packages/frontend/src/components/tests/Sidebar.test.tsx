import React from "react";
import renderer from "react-test-renderer";
import Sidebar from "../Sidebar";

// Mock the useTranslation hook from i18next to return a translation function
jest.mock('next-i18next', () => ({
    useTranslation: jest.fn().mockReturnValue({
        // @ts-ignore
        t: str => str,
    }),
}));

describe("Sidebar", () => {
    it("renders correctly", () => {
        const setActiveComponent = jest.fn();
        const tree = renderer.create(<Sidebar setActiveComponent={setActiveComponent} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});