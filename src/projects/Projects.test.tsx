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
    [leftArrow, rightArrow] = (await screen.findAllByLabelText(
      /Go to/
    )) as HTMLAnchorElement[];
  });

  afterEach(async () => {
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

    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    expect(Array.from(transitionGroup.classList)).toContain(
      Transition.SlideRight
    );
  });

  it("navigates to Contact after clicking the right arrow", () => {
    fireEvent.click(rightArrow);
    testFocusContact();

    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    expect(Array.from(transitionGroup.classList)).toContain(
      Transition.SlideLeft
    );
  });
});
