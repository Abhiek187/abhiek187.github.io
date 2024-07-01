import { fireEvent, screen } from "@testing-library/react";
import { expect, vi } from "vitest";

import {
  setupTests,
  testBaseContent,
  testNavbar,
  testFocusAbout,
  testFocusContact,
} from "../utils/test-util";
import Page from "../enums/Page";
import Transition from "../enums/Transition";

describe("Projects", () => {
  let buttonProjects: HTMLAnchorElement;
  let leftArrow: HTMLAnchorElement;
  let rightArrow: HTMLAnchorElement;

  beforeEach(async () => {
    ({ buttonProjects } = setupTests());
    fireEvent.click(buttonProjects);

    // Substring match
    [leftArrow, rightArrow] =
      await screen.findAllByLabelText<HTMLAnchorElement>(/Go to/);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("shows all base project content", () => {
    expect(window.location.hash).toBe("#/projects");
    testBaseContent();
  });

  testNavbar(Page.Projects);

  it("navigates to About after clicking the left arrow", () => {
    fireEvent.click(leftArrow);
    testFocusAbout();

    const transitionGroup = screen.getByTestId<HTMLDivElement>("transition");
    expect(Array.from(transitionGroup.classList)).toContain(
      Transition.SlideRight
    );
  });

  it("navigates to Contact after clicking the right arrow", () => {
    fireEvent.click(rightArrow);
    testFocusContact();

    const transitionGroup = screen.getByTestId<HTMLDivElement>("transition");
    expect(Array.from(transitionGroup.classList)).toContain(
      Transition.SlideLeft
    );
  });
});
