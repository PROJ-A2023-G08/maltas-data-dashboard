import React from "react";
import Sidebar from "../Sidebar";
import { render, screen } from "@testing-library/react";
import useAuth from "../../../lib/util/useAuth";
import "@testing-library/jest-dom";

jest.mock("../../../lib/util/useAuth");
jest.mock("../../../lib/queries");

// Mock the useTranslation hook from i18next to return a translation function
jest.mock("next-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({
    // @ts-ignore
    t: (str) => str,
  }),
}));

// Declare userData and mock setup outside the test
const userData = {
  firstName: "Tester",
  lastName: "Testerson",
  email: "tester.test@test.com",
  imageUrl: "https://example.com/image.jpg",
};

beforeEach(() => {
  // Set up the mock implementation for useAuth
  (useAuth as jest.MockedFunction<typeof useAuth>).mockReturnValue({
    isLoggedIn: true,
    accessToken: "your-access-token",
    refreshToken: "your-refresh-token",
    logout: jest.fn(),
    fastAccessToken: "your-fast-access-token",
  });

  // Set up the mock implementation for useUserProfile
  require("../../../lib/queries").useUserProfile.mockReturnValueOnce({
    data: userData,
  });

  render(<Sidebar setActiveComponent={() => {}} />);
});

describe("Sidebar rendering tests", () => {
  test("logo renders", () => {
    expect(screen.getByTestId("maltas-logo")).toBeInTheDocument();
  });

  test("User names render", () => {
    expect(screen.getByTestId("user-names")).toBeInTheDocument();
  });

  test("User email render", () => {
    screen.debug();
    expect(screen.getByText("tester.test@test.com")).toBeInTheDocument();
  });

  test("Home button renders", () => {
    expect(screen.getByText("sidebar.Home")).toBeInTheDocument();
  });

  test("Dashboard button renders", () => {
    expect(screen.getByText("sidebar.Dashboard")).toBeInTheDocument();
  });

  test("Settings button renders", () => {
    expect(screen.getByText("sidebar.Settings")).toBeInTheDocument();
  });

  test("Help button renders", () => {
    expect(screen.getByText("sidebar.Help")).toBeInTheDocument();
  });

  test("Log out button renders", () => {
    expect(screen.getByText("sidebar.LogOut")).toBeInTheDocument();
  });
});

describe("Sidebar functionality tests", () => {});
