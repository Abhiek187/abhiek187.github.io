import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import App, { Direction } from "../tsx/App";

let container: HTMLDivElement | null = null;
let buttonAbout: HTMLAnchorElement | null = null;
let buttonProjects: HTMLAnchorElement | null = null;
let buttonContact: HTMLAnchorElement | null = null;

type DOMElements = {
  container: HTMLDivElement,
  buttonAbout: HTMLAnchorElement | null,
  buttonProjects: HTMLAnchorElement | null,
  buttonContact: HTMLAnchorElement | null
};

// Helper functions for testing
const setupTests = (): DOMElements => {
  // Add a div to hold all the React components
  container = document.createElement("div");
  document.body.appendChild(container);

  // App must be wrapped in a BrowserRouter
  render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>,
    container
  );

  buttonAbout = container.querySelector(".links-about");
  buttonProjects = container.querySelector(".links-projects");
  buttonContact = container.querySelector(".links-contact");
  return { container, buttonAbout, buttonProjects, buttonContact };
};

const cleanupTests = (): void => {
  // Unmount the root div container
  if (container !== null) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
};

const testBaseContent = (): void => {
  // Check that the header, navbar, and footer are present in every page
  expect(container?.querySelector(".heading")).not.toBeNull();
  expect(container?.querySelector(".heading-name")?.textContent).toBe(
    "Abhishek Chaudhuri"
  );
  expect(container?.querySelector(".heading-headline")?.textContent).toContain(
    "Software Engineer"
  );

  expect(container?.querySelector(".links")).not.toBeNull();

  expect(container?.querySelector(".foot")).not.toBeNull();
  expect(container?.querySelector(".foot-left")?.textContent).toContain(
    "React"
  );
  expect(container?.querySelector(".foot-right")?.textContent).toContain(
    "MIT License"
  );
};

const testFocusAbout = (): void => {
  expect(window.location.pathname).toBe("/about");
  expect(buttonAbout?.classList).toContain("active");
  expect(buttonProjects?.classList).not.toContain("active");
  expect(buttonContact?.classList).not.toContain("active");
};

const testFocusProjects = (): void => {
  expect(window.location.pathname).toBe("/projects");
  expect(buttonAbout?.classList).not.toContain("active");
  expect(buttonProjects?.classList).toContain("active");
  expect(buttonContact?.classList).not.toContain("active");
};

const testFocusContact = (): void => {
  expect(window.location.pathname).toBe("/contact");
  expect(buttonAbout?.classList).not.toContain("active");
  expect(buttonProjects?.classList).not.toContain("active");
  expect(buttonContact?.classList).toContain("active");
};

const testNavbar = (source: string): void => {
  // Tests to ensure the nav buttons navigate to the correct component
  it("navigates to About after clicking About", () => {
    // Fire a click event before testing
    act(() => {
      buttonAbout?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Check that the correct button is active
    testFocusAbout();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");

    // Check that the next component slides in the correct direction
    const slideDirection: Direction = source === "Projects" || source === "Contact"
      ? Direction.Right : Direction.Left;
    expect(transitionGroup?.classList).toContain(slideDirection);
  });

  it("navigates to Projects after clicking Projects", () => {
    act(() => {
      buttonProjects?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    testFocusProjects();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");

    const slideDirection: Direction = source === "Contact" ? Direction.Right : Direction.Left;
    expect(transitionGroup?.classList).toContain(slideDirection);
  });

  it("navigates to Contact after clicking Contact", () => {
    act(() => {
      buttonContact?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    testFocusContact();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");

    const slideDirection: Direction = source === "Contact" ? Direction.Right : Direction.Left;
    expect(transitionGroup?.classList).toContain(slideDirection);
  });
};

export {
  setupTests,
  cleanupTests,
  testBaseContent,
  testFocusAbout,
  testFocusProjects,
  testFocusContact,
  testNavbar
};
