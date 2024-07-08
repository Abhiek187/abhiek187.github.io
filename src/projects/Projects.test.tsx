import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";
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
  let user: UserEvent;

  beforeEach(async () => {
    ({ buttonProjects, user } = setupTests());
    await user.click(buttonProjects);

    // Substring match
    [leftArrow, rightArrow] =
      await screen.findAllByLabelText<HTMLAnchorElement>(/Go to/);
  });

  afterEach(() => {
    // Don't reset spies or mock implementations, according to: https://stackoverflow.com/a/59792748
    vi.clearAllMocks();
  });

  it("shows all base project content", async () => {
    expect(window.location.hash).toBe("#/projects");
    await testBaseContent();
  });

  testNavbar(Page.Projects);

  it("navigates to About after clicking the left arrow", async () => {
    await user.click(leftArrow);
    testFocusAbout();

    const transitionGroup = screen.getByTestId<HTMLDivElement>("transition");
    expect(Array.from(transitionGroup.classList)).toContain(
      Transition.SlideRight
    );
  });

  it("navigates to Contact after clicking the right arrow", async () => {
    await user.click(rightArrow);
    testFocusContact();

    const transitionGroup = screen.getByTestId<HTMLDivElement>("transition");
    expect(Array.from(transitionGroup.classList)).toContain(
      Transition.SlideLeft
    );
  });
});
