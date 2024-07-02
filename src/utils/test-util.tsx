import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { config } from "react-transition-group";
import { expect } from "vitest";

import App from "../app/App";
import Transition from "../enums/Transition";
import Page from "../enums/Page";

let buttonAbout: HTMLAnchorElement;
let buttonProjects: HTMLAnchorElement;
let buttonContact: HTMLAnchorElement;

type DOMElements = {
  buttonAbout: HTMLAnchorElement;
  buttonProjects: HTMLAnchorElement;
  buttonContact: HTMLAnchorElement;
};

// Helper functions for testing
const setupTests = (): DOMElements => {
  // Disable transitions from react-transition-group
  config.disabled = true;
  window.location.hash = ""; // start at the home page before every test

  // App must be wrapped in a HashRouter
  render(
    <HashRouter basename={process.env.PUBLIC_URL}>
      <App />
    </HashRouter>
  );

  // Specify a button, not text
  buttonAbout = screen.getByRole<HTMLAnchorElement>("button", {
    name: "About",
  });
  buttonProjects = screen.getByRole<HTMLAnchorElement>("button", {
    name: "Projects",
  });
  buttonContact = screen.getByRole<HTMLAnchorElement>("button", {
    name: "Contact",
  });
  return { buttonAbout, buttonProjects, buttonContact };
};

const testBaseContent = (): void => {
  // Check that the header, navbar, and footer are present in every page
  const headingName =
    screen.getByText<HTMLHeadingElement>("Abhishek Chaudhuri");
  const headingHeadline = screen.getByText<HTMLHeadingElement>(
    /Software Engineer \| Always Learning and Growing/
  );

  expect(headingName).toBeInTheDocument();
  expect(headingName.tagName).toBe("H1");
  expect(headingHeadline).toBeInTheDocument();
  expect(headingHeadline.tagName).toBe("H2");

  // Check that the theme toggle changes the text and background
  // &#x1F31E; = sun (light), &#x1F31C; = moon (dark)
  const lightColor: string = "rgb(248, 249, 250);"; // #f8f9fa
  const darkColor: string = "rgb(33, 37, 41);"; // #212529
  let themeLabel = screen.getByLabelText<HTMLLabelElement>("🌞");
  expect(themeLabel).toBeInTheDocument();
  fireEvent.click(themeLabel);
  expect(headingName).toHaveStyle({
    color: lightColor,
    backgroundColor: darkColor,
  });

  themeLabel = screen.getByLabelText<HTMLLabelElement>("🌜");
  expect(themeLabel).toBeInTheDocument();
  fireEvent.click(themeLabel); // revert back to light theme for the rest of the tests
  expect(headingName).toHaveStyle({
    color: darkColor,
    backgroundColor: lightColor,
  });

  expect(buttonAbout).toBeInTheDocument();
  expect(buttonProjects).toBeInTheDocument();
  expect(buttonContact).toBeInTheDocument();

  const footerLeft = screen.getByText<HTMLAnchorElement>("React");
  const footerRight = screen.getByText<HTMLAnchorElement>("MIT License");
  // Check that the copyright year range is up-to-date
  const currentYear: number = new Date().getFullYear();
  const copyrightYear = screen.getByText<HTMLSpanElement>(
    new RegExp(`2019 - ${currentYear}`)
  );

  expect(footerLeft).toBeInTheDocument();
  expect(footerRight).toBeInTheDocument();
  expect(copyrightYear).toBeInTheDocument();
};

const testFocusAbout = () => {
  expect(window.location.hash).toBe("#/about");
  expect(Array.from(buttonAbout.classList)).toContain("active");
  expect(Array.from(buttonProjects.classList)).not.toContain("active");
  expect(Array.from(buttonContact.classList)).not.toContain("active");
};

const testFocusProjects = () => {
  expect(window.location.hash).toBe("#/projects");
  expect(Array.from(buttonAbout.classList)).not.toContain("active");
  expect(Array.from(buttonProjects.classList)).toContain("active");
  expect(Array.from(buttonContact.classList)).not.toContain("active");
};

const testFocusContact = () => {
  expect(window.location.hash).toBe("#/contact");
  expect(Array.from(buttonAbout.classList)).not.toContain("active");
  expect(Array.from(buttonProjects.classList)).not.toContain("active");
  expect(Array.from(buttonContact.classList)).toContain("active");
};

const testNavbar = (source: Page) => {
  // Tests to ensure the nav buttons navigate to the correct component
  it("navigates to About after clicking About", () => {
    fireEvent.click(buttonAbout);

    // Check that the correct button is active
    testFocusAbout();
    const transitionGroup = screen.getByTestId<HTMLDivElement>("transition");

    // Check that the correct transition plays to the next component
    let transition: Transition;

    switch (source) {
      case Page.About:
        transition = Transition.SlideLeft;
        break;
      case Page.Projects:
      case Page.ProjectDetails:
      case Page.Contact:
        transition = Transition.SlideRight;
        break;
      default:
        transition = Transition.Fade;
    }

    expect(Array.from(transitionGroup.classList)).toContain(transition);
  });

  it("navigates to Projects after clicking Projects", () => {
    fireEvent.click(buttonProjects);
    testFocusProjects();

    const transitionGroup = screen.getByTestId<HTMLDivElement>("transition");
    let transition: Transition;

    switch (source) {
      case Page.About:
      case Page.Projects:
        transition = Transition.SlideLeft;
        break;
      case Page.Contact:
        transition = Transition.SlideRight;
        break;
      default:
        transition = Transition.Fade;
    }

    expect(Array.from(transitionGroup.classList)).toContain(transition);
  });

  it("navigates to Contact after clicking Contact", () => {
    fireEvent.click(buttonContact);
    testFocusContact();

    const transitionGroup = screen.getByTestId<HTMLDivElement>("transition");
    let transition: Transition;

    switch (source) {
      case Page.About:
      case Page.Projects:
      case Page.ProjectDetails:
        transition = Transition.SlideLeft;
        break;
      case Page.Contact:
        transition = Transition.SlideRight;
        break;
      default:
        transition = Transition.Fade;
    }

    expect(Array.from(transitionGroup.classList)).toContain(transition);
  });
};

export {
  setupTests,
  testBaseContent,
  testFocusAbout,
  testFocusProjects,
  testFocusContact,
  testNavbar,
};
