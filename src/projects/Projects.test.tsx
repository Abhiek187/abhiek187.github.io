import { fireEvent, screen, within } from "@testing-library/react";
import { expect, vi } from "vitest";

import {
  setupTests,
  testBaseContent,
  testNavbar,
  testFocusAbout,
  testFocusContact,
} from "../utils/test-util";
import { ProjectsJSON, ProjectTypes } from "./Projects";
import projectData from "./projects.json";
import Page from "../enums/Page";
import Transition from "../enums/Transition";
import capitalize from "../utils/capitalize";

describe("Projects", () => {
  let buttonProjects: HTMLAnchorElement;
  let leftArrow: HTMLAnchorElement;
  let rightArrow: HTMLAnchorElement;
  const projects = projectData as ProjectsJSON;

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

  it("shows all project types", () => {
    expect(window.location.hash).toBe("#/projects");
    testBaseContent();

    // Check that each project type is shown
    for (const type of Object.keys(projects) as ProjectTypes[]) {
      let typeHeading: HTMLHeadingElement;

      if (type === "ios") {
        typeHeading = screen.getByRole("heading", {
          name: "iOS",
        }) as HTMLHeadingElement;
      } else {
        typeHeading = screen.getByRole("heading", {
          name: capitalize(type),
        }) as HTMLHeadingElement;
      }

      expect(typeHeading).toBeInTheDocument();
    }

    // Check that the bottom GitHub link is present as well
    const githubLink = screen.getByLabelText(
      /GitHub repo for My Portfolio Website/i
    ) as HTMLAnchorElement;
    expect(githubLink.href).toBe(
      "https://github.com/Abhiek187/abhiek187.github.io"
    );
  });

  it("shows each project card", () => {
    for (const type of Object.keys(projects) as [ProjectTypes]) {
      for (const project of projects[type]) {
        // Query within the card
        const card = screen.getByLabelText(
          `Card for ${project.name}, click to learn more`
        ) as HTMLAnchorElement;

        // The project's name, image, and description should be shown
        const projectName = within(card).getByRole("heading", {
          name: project.name,
        }) as HTMLHeadingElement;
        expect(projectName).toBeInTheDocument();

        const projectImage = within(card).getByAltText(
          `Screenshot of ${project.name}`
        ) as HTMLImageElement;
        expect(projectImage).toBeInTheDocument();
        // If there are any special characters in the image's url, encode them
        expect(projectImage.src).toBe(
          `${window.location.origin}${encodeURI(project.image)}`
        );

        const projectAbout = within(card).getByText(
          project.about
        ) as HTMLParagraphElement;
        expect(projectAbout).toBeInTheDocument();

        // Check that the eye, fork, and star icons are present in the footer (initially blank)
        for (const stat of ["watchers", "forks", "stars"]) {
          const blankStat = within(card).getByLabelText(
            `blank ${stat}`
          ) as HTMLSpanElement;
          expect(blankStat).toBeInTheDocument();
        }

        // Make sure the other categories aren't present in the list
        expect(screen.queryByText(project.repo)).not.toBeInTheDocument();
      }
    }
  });

  it("scrolls each list after clicking the horizontal scroll buttons", () => {
    // Test that the position of each horizontal list changes when clicking the scroll buttons
    const scrollButtons = screen.getAllByLabelText(
      /Scroll/
    ) as HTMLButtonElement[];
    const projectsLists = screen.getAllByRole("list") as HTMLUListElement[];
    // Mock the scrollBy method since it's not defined by default
    HTMLUListElement.prototype.scrollBy = vi.fn(() => {});

    for (const [index, scrollButton] of scrollButtons.entries()) {
      // [0, 1] -> 1, [2, 3] -> 2, etc.
      const projectsList: HTMLUListElement =
        projectsLists[Math.floor(index / 2) + 1];
      fireEvent.click(scrollButton);

      expect(projectsList.scrollBy).toHaveBeenCalled();
    }
  });

  it("makes the navbar sticky when scrolling down", () => {
    // Test that the navbar is sticky after scrolling down far enough
    const navbar: HTMLElement | null = (
      screen.getByText("About") as HTMLAnchorElement
    ).parentElement;
    expect(window.scrollY).toBe(0);
    expect(
      Array.from(navbar?.classList ?? ["sticky"]).some((c) =>
        c.includes("sticky")
      )
    ).toBe(false);

    // Simulate a scroll by changing the pageYOffset and activating a scroll event
    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    if (window.onscroll !== null) {
      window.onscroll(new Event("scroll")); // forcibly call window.onscroll
    }

    expect(window.scrollY).toBeGreaterThan(0);
    expect(
      Array.from(navbar?.classList ?? []).some((c) => c.includes("sticky"))
    ).toBe(true);

    // navbar.offsetTop is 0, so make pageYOffset less than that to force the navbar to not be sticky
    fireEvent.scroll(window, { target: { scrollY: -1 } });
    if (window.onscroll !== null) {
      window.onscroll(new Event("scroll"));
    }

    expect(window.scrollY).toBeLessThan(0);
    expect(
      Array.from(navbar?.classList ?? ["sticky"]).some((c) =>
        c.includes("sticky")
      )
    ).toBe(false);
    window.scrollY = 0;
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
