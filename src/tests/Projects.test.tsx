import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { Direction } from "../tsx/App";
import {
  setupTests,
  testBaseContent,
  testNavbar,
  testFocusAbout,
  testFocusContact,
} from "./test-util";
import { ProjectsJSON } from "../tsx/Projects";
import projectData from "../models/projects.json";

describe("Projects", () => {
  let buttonProjects: HTMLAnchorElement;
  let projectsList: HTMLUListElement;
  let leftArrow: HTMLAnchorElement;
  let rightArrow: HTMLAnchorElement;

  beforeEach(async () => {
    ({ buttonProjects } = setupTests());
    fireEvent.click(buttonProjects);

    await waitFor(() => {
      projectsList = screen.getByTestId("projects-list") as HTMLUListElement;
      // Substring match
      [leftArrow, rightArrow] = screen.getAllByLabelText(
        /Go to/
      ) as HTMLAnchorElement[];
    });
  });

  // Check that all the project cards show the proper information
  it("shows six projects", () => {
    expect(window.location.pathname).toBe("/projects");
    testBaseContent();
    expect(projectsList.children).toHaveLength(6);
  });

  it("shows all data about a project", () => {
    const projects: ProjectsJSON = JSON.parse(JSON.stringify(projectData));

    for (const [projectIndex, project] of projects.entries()) {
      // The project's name, image, and description should be shown
      const projectCard = projectsList.children[projectIndex] as HTMLLIElement;
      expect(projectCard).toBeInTheDocument();

      const projectName = projectCard.children[0] as HTMLHeadingElement;
      expect(projectName).toHaveTextContent(project.name);

      const projectImage = projectCard.children[1] as HTMLImageElement;
      // If there are any special characters in the image's url, encode them
      expect(projectImage.src).toBe(
        `${window.location.origin}${encodeURI(project.image)}`
      );
      expect(projectImage.alt).toBe(`Screenshot of ${project.name}`);

      const projectAbout = projectCard.children[2] as HTMLParagraphElement;
      expect(projectAbout).toHaveTextContent(project.about);

      const technologyContainer = projectCard.children[4] as HTMLDivElement;

      // All technologies used should be shown
      for (const [techIndex, tech] of project.technology.entries()) {
        expect(technologyContainer.children[techIndex]).toHaveTextContent(tech);
      }

      const projectLinks = projectCard.children[5] as HTMLDivElement;

      // If there's no website for the project, the website link shouldn't be present
      expect(projectLinks.children).toHaveLength(
        project.website === null ? 1 : 2
      );
      let projectWebsite: HTMLAnchorElement | null = null;

      if (project.website !== null) {
        projectWebsite = projectLinks.firstElementChild as HTMLAnchorElement;
      }

      expect(projectWebsite?.href).toBe(project.website ?? undefined);

      // Always display the repo link for the project
      const projectRepo = projectLinks.lastElementChild as HTMLAnchorElement;
      expect(projectRepo.href).toBe(project.repo);
    }
  });

  it("makes the navbar sticky when scrolling down", () => {
    // Test that the navbar is sticky after scrolling down far enough
    const navbar: HTMLElement | null = (
      screen.getByText("About") as HTMLAnchorElement
    ).parentElement;
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

  testNavbar("Projects");

  it("navigates to About after clicking the left arrow", () => {
    act(() => {
      fireEvent.click(leftArrow);
    });

    testFocusAbout();
    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    expect(transitionGroup.classList).toContain(Direction.Right);
  });

  it("navigates to Contact after clicking the right arrow", () => {
    act(() => {
      fireEvent.click(rightArrow);
    });

    testFocusContact();
    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    expect(transitionGroup.classList).toContain(Direction.Left);
  });
});
