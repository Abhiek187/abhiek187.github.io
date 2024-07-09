import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";
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
  let user: UserEvent;

  beforeEach(async () => {
    ({ buttonAbout, user } = setupTests()); // parentheses required for redeclaration
    await user.click(buttonAbout);
  });

  it("shows a headshot and bio", async () => {
    // The About page should show the relevant information
    expect(window.location.hash).toBe("#/about");
    await testBaseContent();

    const headshot = screen.getByAltText<HTMLImageElement>(
      "Headshot of Abhishek"
    );
    const bio = screen.getByText<HTMLParagraphElement>(/My name is Abhishek/);

    expect(headshot).toBeInTheDocument();
    expect(headshot.src).toBe(`${window.location.origin}/img/headshot.webp`);
    expect(bio).toBeInTheDocument();
  });

  testNavbar(Page.About);

  // Check that the arrow button navigates to the correct page with the correct slide transition
  it("navigates to Projects after clicking the right arrow", async () => {
    // Wait until there's only one right arrow
    const rightArrow = await screen.findByLabelText<HTMLAnchorElement>(
      /Go to Projects/
    );
    await user.click(rightArrow);

    testFocusProjects();
    const transitionGroup = screen.getByTestId<HTMLDivElement>("transition");
    expect(Array.from(transitionGroup.classList)).toContain(
      Transition.SlideLeft
    );
  });
});
