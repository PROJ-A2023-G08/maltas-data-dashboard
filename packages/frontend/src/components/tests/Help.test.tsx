import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import Help from "../Help";
import "@testing-library/jest-dom";

jest.mock("next-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({
    // @ts-ignore
    t: (str) => str,
  }),
}));

it("Help component loads", () => {
  const setActiveComponent = jest.fn();
  const tree = renderer.create(<Help />).toJSON();
  expect(tree).toMatchSnapshot();
});
