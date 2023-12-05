import React from "react";
import renderer from "react-test-renderer";
import {
  fireEvent,
  getAllByTestId,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";
import Help from "../Help";
import "@testing-library/jest-dom";
import exp from "constants";
import { useTranslation } from "react-i18next";
//import "@testing-library/jest-dom/extend-expect";
import Profile from "../../layouts/Settings/Profile";
//import userEvent from "@testing-library/user-event";

describe("Profile settings tests", () => {
  it("First name field renders", () => {
    const { getByTestId } = render(<Profile />);
    //expect(screen.getByTestId("firstName-field")).toBeInTheDocument();
    const firstNameField = getByTestId("firstName-field");
    expect(firstNameField).toBeInTheDocument();
  });
});
