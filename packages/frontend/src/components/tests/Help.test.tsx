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

jest.mock("next-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({
    // @ts-ignore
    t: (str) => str,
  }),
}));

//U01.5
describe("FAQ Tab", () => {
  it("FAQ option renders", () => {
    render(<Help />);
    expect(screen.getByText("uiElements.FAQ")).toBeInTheDocument();
  });

  it("Contact option renders", () => {
    render(<Help />);
    expect(screen.getByText("uiElements.Contact")).toBeInTheDocument();
  });

  it("FAQ button is clickable", () => {
    const { getByText, getByTestId } = render(<Help />);
    const faqButton = getByText("uiElements.FAQ");
    expect(faqButton).toBeInTheDocument();

    fireEvent.click(faqButton);

    const faqTab = getByTestId("FAQ-id");
    expect(faqTab).toBeInTheDocument();
  });

  it("All FAQ items render", () => {
    const { getAllByTestId } = render(<Help />);
    const faqItems = getAllByTestId(/faq-item-/);
    expect(faqItems.length).toBe(7); //<---- CHANGE THIS IF FAQ AMOUNT CHANGES
  });

  it("FAQ items are clickable", () => {
    const { getByTestId } = render(<Help />);
    const faqItem1 = getByTestId("faq-item-0");

    fireEvent.click(faqItem1);
    const faqAnswer = getByTestId("FAQ-open");
    expect(faqAnswer).toBeInTheDocument();
  });
});

//Check if the contact button renders, if this was inside the describe block it would fail lol
it("Contact option renders", () => {
  render(<Help />);
  expect(screen.getByText("uiElements.Contact")).toBeInTheDocument();
});

it("Contact option is clickable", () => {
  const { getByText, getByTestId } = render(<Help />);
  const contactButton = getByText("uiElements.Contact");
  expect(contactButton).toBeInTheDocument();

  fireEvent.click(contactButton);

  const contactTab = getByTestId("Contact-id");
  expect(contactTab).toBeInTheDocument();
});

//U01.5.2
describe("Contact Tab", () => {
  //Used to open the actual contact tab, needed in order for other tests to work
  beforeEach(() => {
    const { getByText, getByTestId } = render(<Help />);
    const contactButton = getByText("uiElements.Contact");
    expect(contactButton).toBeInTheDocument();

    fireEvent.click(contactButton);
  });

  it("Contact header renders", () => {
    const { getByText } = render(<Help />);
    expect(getByText("contact.Header")).toBeInTheDocument();
  });

  it("Contact subtext renders", () => {
    const { getByText } = render(<Help />);
    expect(getByText("contact.Subtext")).toBeInTheDocument();
  });

  it("Contact info renders", () => {
    const { getByText } = render(<Help />);
    expect(getByText("Lassi Vuorinen")).toBeInTheDocument();
    expect(screen.getByText("lassi@maltastech.com")).toBeInTheDocument();
    expect(screen.getByText("050 514 2624")).toBeInTheDocument();
    expect(screen.getByText("Tampere")).toBeInTheDocument();
  });

  it("Send button renders", () => {
    const { getByText } = render(<Help />);
    expect(getByText("contact.Send")).toBeInTheDocument();
  });

  it("Send button is clickable", () => {
    const { getByTestId } = render(<Help />);
    fireEvent.click(getByTestId("Send-button"));
    //Add something to check that it works here once added to the code
  });
});
