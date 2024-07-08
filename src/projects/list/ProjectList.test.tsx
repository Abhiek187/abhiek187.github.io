import { fireEvent, screen, within } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";
import { expect, vi } from "vitest";

import { setupTests, testBaseContent } from "../../utils/test-util";
import { ProjectsJSON } from "./ProjectList";
import projectData from "../projects.json";
import capitalize from "../../utils/capitalize";

describe("Project List", () => {
  let buttonProjects: HTMLAnchorElement;
  let user: UserEvent;
  const projects = projectData as ProjectsJSON;

  beforeEach(async () => {
    ({ buttonProjects, user } = setupTests());
    await user.click(buttonProjects);
  });

  afterEach(() => {
    // Don't reset spies or mock implementations, according to: https://stackoverflow.com/a/59792748
    vi.clearAllMocks();
  });

  it("shows all project types", async () => {
    expect(window.location.hash).toBe("#/projects");
    await testBaseContent();

    // Check that each project type is shown
    for (const type of Object.keys(projects) as (keyof ProjectsJSON)[]) {
      let typeHeading: HTMLHeadingElement;

      if (type === "ios") {
        typeHeading = screen.getByRole<HTMLHeadingElement>("heading", {
          name: "iOS",
        });
      } else {
        typeHeading = screen.getByRole<HTMLHeadingElement>("heading", {
          name: capitalize(type),
        });
      }

      expect(typeHeading).toBeInTheDocument();
    }

    // Check that the bottom GitHub link is present as well
    const githubLink = screen.getByLabelText<HTMLAnchorElement>(
      /GitHub repo for My Portfolio Website/i
    );
    expect(githubLink.href).toBe(
      "https://github.com/Abhiek187/abhiek187.github.io"
    );
  });

  it("shows each project card", () => {
    for (const type of Object.keys(projects) as (keyof ProjectsJSON)[]) {
      for (const project of projects[type]) {
        // Query within the card
        const card = screen.getByLabelText<HTMLAnchorElement>(
          `Card for ${project.name}, click to learn more`
        );

        // The project's name, image, and description should be shown
        const projectName = within(card).getByRole<HTMLHeadingElement>(
          "heading",
          {
            name: project.name,
          }
        );
        expect(projectName).toBeInTheDocument();

        const projectImage = within(card).getByAltText<HTMLImageElement>(
          `Screenshot of ${project.name}`
        );
        expect(projectImage).toBeInTheDocument();
        // If there are any special characters in the image's url, encode them
        expect(projectImage.src).toBe(
          `${window.location.origin}${encodeURI(project.image)}`
        );

        const projectAbout = within(card).getByText<HTMLParagraphElement>(
          project.about
        );
        expect(projectAbout).toBeInTheDocument();

        // Check that the eye, fork, and star icons are present in the footer
        for (const stat of ["watcher", "fork", "star"]) {
          const statLabel = within(card).getByLabelText<HTMLSpanElement>(
            RegExp(stat)
          );
          expect(statLabel).toBeInTheDocument();
        }

        // Make sure the other categories aren't present in the list
        expect(screen.queryByText(project.repo)).not.toBeInTheDocument();
      }
    }
  });

  it("scrolls each list after clicking the horizontal scroll buttons", async () => {
    // Test that the position of each horizontal list changes when clicking the scroll buttons
    const scrollButtons = screen.getAllByLabelText<HTMLButtonElement>(/Scroll/);
    const projectsLists = screen.getAllByRole<HTMLUListElement>("list");
    // Mock the scrollBy method since it's not defined by default
    HTMLUListElement.prototype.scrollBy = vi.fn(() => {});

    for (const [index, scrollButton] of scrollButtons.entries()) {
      // [0, 1] -> 1, [2, 3] -> 2, etc.
      const projectsList: HTMLUListElement =
        projectsLists[Math.floor(index / 2) + 1];
      await user.click(scrollButton);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(projectsList.scrollBy).toHaveBeenCalled();
    }
  });

  it("makes the navbar sticky when scrolling down", () => {
    // Test that the navbar is sticky after scrolling down far enough
    const navbar: HTMLElement | null =
      screen.getByText<HTMLAnchorElement>("About").parentElement;
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
});
