import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen
} from "@testing-library/react";
import React from "react";
import Help from "../Help";

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
    expect(screen.getByTestId("FAQ-id")).toBeInTheDocument();
  });

  it("Contact option renders", () => {
    render(<Help />);
    expect(screen.getByText("uiElements.Contact")).toBeInTheDocument();
  });

  it("FAQ button is clickable", () => {
    const { getByText, getByTestId } = render(<Help />);
    const faqButton = getByTestId("FAQ-id");
    expect(faqButton).toBeInTheDocument();

    fireEvent.click(faqButton);

    const faqTab = getByTestId("FAQ-tab");
    expect(faqTab).toBeInTheDocument();
  });

  it("All FAQ items render", () => {
    const { getAllByTestId } = render(<Help />);
    const faqItems = getAllByTestId(/faq-item-/);
    expect(faqItems.length).toBe(10); //<---- CHANGE THIS IF FAQ AMOUNT CHANGES
  });

  it("FAQ items are clickable", () => {
    const { getByTestId } = render(<Help />);
    const faqItem = getByTestId("faq-item-2");

    fireEvent.click(faqItem);
    const faqAnswer = getByTestId("FAQ-item-answer");
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
  const contactButton = getByTestId("contact-button");
  expect(contactButton).toBeInTheDocument();

  fireEvent.click(contactButton);

  const contactTab = getByTestId("contact-tab");
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
    fireEvent.click(getByTestId("send-button"));
  });
});
