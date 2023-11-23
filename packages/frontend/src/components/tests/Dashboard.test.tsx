import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "../Dashboard";

// Mock the useTranslation hook from i18next to return a translation function
jest.mock('next-i18next', () => ({
    useTranslation: jest.fn().mockReturnValue({
        // @ts-ignore
        t: str => str,
    }),
}));

describe("Dashboard", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Dashboard  />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});