import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import Settings from "../../layouts/Settings/Settings";
import "@testing-library/jest-dom";

// Mock the useTranslation hook from i18next to return a translation function
jest.mock("next-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({
    // @ts-ignore
    t: (str) => str,
  }),
}));

//U01.2
it("Settings renders correctly", () => {
  const setActiveComponent = jest.fn();
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});
