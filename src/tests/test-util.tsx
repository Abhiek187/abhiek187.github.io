import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { config } from "react-transition-group";
import App, { Transition } from "../tsx/App";

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

  // App must be wrapped in a HashRouter
  render(
    <HashRouter basename={process.env.PUBLIC_URL}>
      <App />
    </HashRouter>
  );

  // Specify a button, not text
  buttonAbout = screen.getByRole("button", {
    name: "About",
  }) as HTMLAnchorElement;
  buttonProjects = screen.getByRole("button", {
    name: "Projects",
  }) as HTMLAnchorElement;
  buttonContact = screen.getByRole("button", {
    name: "Contact",
  }) as HTMLAnchorElement;
  return { buttonAbout, buttonProjects, buttonContact };
};

const testBaseContent = (): void => {
  // Check that the header, navbar, and footer are present in every page
  const headingName = screen.getByText(
    "Abhishek Chaudhuri"
  ) as HTMLHeadingElement;
  const headingHeadline = screen.getByText(
    /Software Engineer \| Always Learning and Growing/
  ) as HTMLHeadingElement;

  expect(headingName).toBeInTheDocument();
  expect(headingName.tagName).toBe("H1");
  expect(headingHeadline).toBeInTheDocument();
  expect(headingHeadline.tagName).toBe("H2");

  // Check that the theme toggle changes the text and background
  // &#x1F31E; = sun (light), &#x1F31C; = moon (dark)
  const lightColor: string = "rgb(248, 249, 250);"; // #f8f9fa
  const darkColor: string = "rgb(33, 37, 41);"; // #212529
  let themeLabel = screen.getByLabelText("🌞") as HTMLLabelElement;
  expect(themeLabel).toBeInTheDocument();
  fireEvent.click(themeLabel);
  expect(headingName).toHaveStyle({
    color: lightColor,
    backgroundColor: darkColor,
  });

  themeLabel = screen.getByLabelText("🌜") as HTMLLabelElement;
  expect(themeLabel).toBeInTheDocument();
  fireEvent.click(themeLabel); // revert back to light theme for the rest of the tests
  expect(headingName).toHaveStyle({
    color: darkColor,
    backgroundColor: lightColor,
  });

  expect(buttonAbout).toBeInTheDocument();
  expect(buttonProjects).toBeInTheDocument();
  expect(buttonContact).toBeInTheDocument();

  const footerLeft = screen.getByText("React") as HTMLAnchorElement;
  const footerRight = screen.getByText("MIT License") as HTMLAnchorElement;

  expect(footerLeft).toBeInTheDocument();
  expect(footerRight).toBeInTheDocument();
};

const testFocusAbout = (): void => {
  expect(window.location.hash).toBe("#/about");
  expect(buttonAbout.classList).toContain("active");
  expect(buttonProjects.classList).not.toContain("active");
  expect(buttonContact.classList).not.toContain("active");
};

const testFocusProjects = (): void => {
  expect(window.location.hash).toBe("#/projects");
  expect(buttonAbout.classList).not.toContain("active");
  expect(buttonProjects.classList).toContain("active");
  expect(buttonContact.classList).not.toContain("active");
};

const testFocusContact = (): void => {
  expect(window.location.hash).toBe("#/contact");
  expect(buttonAbout.classList).not.toContain("active");
  expect(buttonProjects.classList).not.toContain("active");
  expect(buttonContact.classList).toContain("active");
};

const testNavbar = (source: string): void => {
  // Tests to ensure the nav buttons navigate to the correct component
  it("navigates to About after clicking About", () => {
    fireEvent.click(buttonAbout);

    // Check that the correct button is active
    testFocusAbout();
    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;

    // Check that the next component slides in the correct direction
    const slideDirection: Transition =
      source === "Projects" || source === "Contact"
        ? Transition.SlideRight
        : Transition.SlideLeft;
    expect(transitionGroup.classList).toContain(slideDirection);
  });

  it("navigates to Projects after clicking Projects", () => {
    fireEvent.click(buttonProjects);
    testFocusProjects();

    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    const slideDirection: Transition =
      source === "Contact" ? Transition.SlideRight : Transition.SlideLeft;
    expect(transitionGroup.classList).toContain(slideDirection);
  });

  it("navigates to Contact after clicking Contact", () => {
    fireEvent.click(buttonContact);
    testFocusContact();

    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    const slideDirection: Transition =
      source === "Contact" ? Transition.SlideRight : Transition.SlideLeft;
    expect(transitionGroup.classList).toContain(slideDirection);
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
