import { fireEvent, screen } from "@testing-library/react";
import { expect } from "vitest";

import {
  setupTests,
  testBaseContent,
  testNavbar,
  testFocusProjects,
} from "../utils/test-util";
import Page from "../enums/Page";
import Transition from "../enums/Transition";

describe("About", () => {
  let buttonAbout: HTMLAnchorElement;

  beforeEach(() => {
    ({ buttonAbout } = setupTests()); // parentheses required for redeclaration
    fireEvent.click(buttonAbout);
  });

  it("shows a headshot and bio", () => {
    // The About page should show the relevant information
    expect(window.location.hash).toBe("#/about");
    testBaseContent();

    const headshot = screen.getByAltText(
      "Headshot of Abhishek"
    ) as HTMLImageElement;
    const bio = screen.getByText(/My name is Abhishek/) as HTMLParagraphElement;

    expect(headshot).toBeInTheDocument();
    expect(headshot.src).toBe(`${window.location.origin}/img/headshot.webp`);
    expect(bio).toBeInTheDocument();
  });

  testNavbar(Page.About);

  // Check that the arrow button navigates to the correct page with the correct slide transition
  it("navigates to Projects after clicking the right arrow", async () => {
    // Wait until there's only one right arrow
    const rightArrow = (await screen.findByLabelText(
      /Go to Projects/
    )) as HTMLAnchorElement;
    fireEvent.click(rightArrow);

    testFocusProjects();
    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    expect(Array.from(transitionGroup.classList)).toContain(
      Transition.SlideLeft
    );
  });
});
