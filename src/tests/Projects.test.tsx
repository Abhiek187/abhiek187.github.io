import { fireEvent, screen, within } from "@testing-library/react";
import { Page, Transition } from "../tsx/App";
import {
  setupTests,
  testBaseContent,
  testNavbar,
  testFocusAbout,
  testFocusContact,
} from "./test-util";
import { capitalize, ProjectsJSON, ProjectTypes } from "../tsx/Projects";
import projectData from "../models/projects.json";

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

  it("shows all project types", () => {
    expect(window.location.hash).toBe("#/projects");
    testBaseContent();

    // Check that each project type is shown
    for (const type of Object.keys(projects) as [ProjectTypes]) {
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
    HTMLUListElement.prototype.scrollBy = jest.fn();

    for (const [index, scrollButton] of scrollButtons.entries()) {
      // [0, 1] -> 1, [2, 3] -> 2, etc.
      const projectsList: HTMLUListElement =
        projectsLists[Math.floor(index / 2) + 1];
      fireEvent.click(scrollButton);

      expect(projectsList.scrollBy).toHaveBeenCalled();
    }

    jest.resetAllMocks();
  });

  it("makes the navbar sticky when scrolling down", () => {
    // Test that the navbar is sticky after scrolling down far enough
    const navbar: HTMLElement | null =
      // eslint-disable-next-line testing-library/no-node-access
      (screen.getByText("About") as HTMLAnchorElement).parentElement;
    expect(window.pageYOffset).toBe(0);
    expect(navbar?.classList).not.toContain("sticky");

    // Simulate a scroll by changing the pageYOffset and activating a scroll event
    (window as any).pageYOffset = 1000;
    fireEvent.scroll(window);
    expect(window.pageYOffset).toBeGreaterThan(0);
    expect(navbar?.classList).toContain("sticky");

    // navbar.offsetTop is 0, so make pageYOffset less than that to force the navbar to not be sticky
    (window as any).pageYOffset = -1;
    fireEvent.scroll(window);
    expect(window.pageYOffset).toBeLessThan(0);
    expect(navbar?.classList).not.toContain("sticky");
    (window as any).pageYOffset = 0;
  });

  testNavbar(Page.Projects);

  it("navigates to About after clicking the left arrow", () => {
    fireEvent.click(leftArrow);
    testFocusAbout();

    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    expect(transitionGroup.classList).toContain(Transition.SlideRight);
  });

  it("navigates to Contact after clicking the right arrow", () => {
    fireEvent.click(rightArrow);
    testFocusContact();

    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    expect(transitionGroup.classList).toContain(Transition.SlideLeft);
  });
});
