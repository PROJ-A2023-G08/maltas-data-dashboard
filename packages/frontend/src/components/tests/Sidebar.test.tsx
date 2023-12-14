import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import useAuth from "../../../lib/util/useAuth";
import Dashboard from "../../components/Dashboard";
import Help from "../Help";
import Home from "../Home";
import Sidebar from "../Sidebar";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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

  render(<Sidebar setActiveComponent={() => { }} />);
});

describe("Sidebar rendering tests", () => {
  test("logo renders", () => {
    expect(screen.getByTestId("maltas-logo")).toBeInTheDocument();
  });

  test("User names render", () => {
    expect(screen.getByTestId("user-names")).toBeInTheDocument();
  });

  test("User email render", () => {
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

describe("Sidebar functionality tests", () => {
  test("Home button click", () => {
    const setActiveComponentMock: any = jest.fn();
    const { getAllByTestId } = render(
      <Sidebar setActiveComponent={setActiveComponentMock} />,
    );
    const homeButton = getAllByTestId("menu-item-home-0");
    fireEvent.click(homeButton[1]);
    expect(setActiveComponentMock).toHaveBeenCalledTimes(1);
  });

  test("Dashboard button click", () => {
    const setActiveComponentMock: any = jest.fn();
    const { getAllByTestId } = render(
      <Sidebar setActiveComponent={setActiveComponentMock} />,
    );
    const dashButton = getAllByTestId("menu-item-dashboard-1");
    fireEvent.click(dashButton[1]);
    expect(setActiveComponentMock).toHaveBeenCalledTimes(1);
  });

  test("Settings button click", () => {
    const setActiveComponentMock: any = jest.fn();
    const { getAllByTestId } = render(
      <Sidebar setActiveComponent={setActiveComponentMock} />,
    );
    const settingsButton = getAllByTestId("menu-item-settings-2");
    fireEvent.click(settingsButton[1]);
    expect(setActiveComponentMock).toHaveBeenCalledTimes(1);
  });

  test("Help button click", () => {
    const setActiveComponentMock: any = jest.fn();
    const { getAllByTestId } = render(
      <Sidebar setActiveComponent={setActiveComponentMock} />,
    );
    const helpButton = getAllByTestId("menu-item-help-3");
    fireEvent.click(helpButton[1]);
    expect(setActiveComponentMock).toHaveBeenCalledTimes(1);
  });
});

interface MeasurementContextConsumerProps {
  children: (value: { minDate: Date; maxDate: Date }) => React.ReactNode;
}

/*jest.mock("@maltas-dashboard/frontend/src/contexts/MeasurementProvider.context", () => ({
  MeasurementContext: {
    Consumer: ({ children }: MeasurementContextConsumerProps) =>
      children({ minDate: new Date(), maxDate: new Date() }),
  },
}));*/

describe("Correct components loads when clicked", () => {
  test("Home component loads when clicked", async () => {
    const setActiveComponentMock = jest.fn();
    const { getAllByTestId } = render(
      <Sidebar setActiveComponent={setActiveComponentMock} />,
    );
    const helpButton = getAllByTestId("menu-item-help-3");
    const homeButton = getAllByTestId("menu-item-home-0");
    fireEvent.click(helpButton[1]);
    fireEvent.click(homeButton[1]);
    expect(setActiveComponentMock).toHaveBeenCalledTimes(2);

    render(<Home />);

    await waitFor(() => {
      const homeView = screen.getByTestId("home-div");
      expect(homeView).toBeInTheDocument();
    });
  });

  test("Help component loads when clicked", async () => {
    const setActiveComponentMock = jest.fn();
    const { getAllByTestId } = render(
      <Sidebar setActiveComponent={setActiveComponentMock} />,
    );
    const helpButton = getAllByTestId("menu-item-help-3");
    fireEvent.click(helpButton[1]);
    expect(setActiveComponentMock).toHaveBeenCalledTimes(1);

    render(<Help />);

    await waitFor(() => {
      const helpView = screen.getByTestId("help-div");
      expect(helpView).toBeInTheDocument();
    });
  });

  test("Dashboard component loads when clicked", async () => {
    const setActiveComponentMock = jest.fn();
    const { getAllByTestId } = render(
      <Sidebar setActiveComponent={setActiveComponentMock} />,
    );
    const helpButton = getAllByTestId("menu-item-help-3");
    const dashButton = getAllByTestId("menu-item-dashboard-1");
    fireEvent.click(helpButton[1]);
    fireEvent.click(dashButton[1]);
    expect(setActiveComponentMock).toHaveBeenCalledTimes(2);

    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDateFns}><Dashboard /></LocalizationProvider>
    );

    await waitFor(() => {
      const dashView = getByTestId("dashboard-div");
      expect(dashView).toBeInTheDocument();
    });
  });
});
