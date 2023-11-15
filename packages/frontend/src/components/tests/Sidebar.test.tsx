import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import Sidebar from "../Sidebar";
import "@testing-library/jest-dom";

// Mock the useTranslation hook from i18next to return a translation function
jest.mock("next-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({
    // @ts-ignore
    t: (str) => str,
  }),
}));

describe("Sidebar", () => {
  it("Sidebar renders correctly", () => {
    const setActiveComponent = jest.fn();
    const tree = renderer
      .create(<Sidebar setActiveComponent={setActiveComponent} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

//U01.1.6
it("Maltas logo renders", () => {
  const setActiveComponent = jest.fn();
  render(<Sidebar setActiveComponent={setActiveComponent} />);
  expect(screen.getByAltText("Maltas Logo")).toBeInTheDocument();
});

//U01.1.1-4
it("Sidebar icons/buttons render", () => {
  const setActiveComponent = jest.fn();
  render(<Sidebar setActiveComponent={setActiveComponent} />);
  const menuItems = [
    "sidebar.Home",
    "sidebar.Dashboard",
    "sidebar.Settings",
    "sidebar.Help",
  ];
  menuItems.forEach((item) => {
    expect(screen.getByText(item)).toBeInTheDocument();
  });
});

//U01.1.5
it("Log out button loads", () => {
  const setActiveComponent = jest.fn();
  render(<Sidebar setActiveComponent={setActiveComponent} />);
  expect(screen.getByText("sidebar.LogOut")).toBeInTheDocument();
});

//U01.1.7
it("Sidebar buttons are clickable", () => {
  const setActiveComponent = jest.fn();
  render(<Sidebar setActiveComponent={setActiveComponent} />);
  const menuItems = [
    "sidebar.Home",
    "sidebar.Dashboard",
    "sidebar.Settings",
    "sidebar.Help",
  ];
  menuItems.forEach((item) => {
    expect(screen.getByText(item)).toBeInTheDocument();
    screen.getByText(item).click();
  });
  expect(setActiveComponent).toHaveBeenCalledTimes(4);
});
