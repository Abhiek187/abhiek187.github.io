import { act } from "react-dom/test-utils";
import { Direction } from "../tsx/App";
import {
  setupTests, cleanupTests, testBaseContent, testNavbar, testFocusAbout, testFocusContact
} from "./test-util";
import { ProjectsJSON } from "../tsx/Projects";
import projectData from "../models/projects.json";

let container: HTMLDivElement | null = null;
let buttonProjects: HTMLAnchorElement | null = null;

describe("Projects", () => {
  beforeEach(() => {
    ({ container, buttonProjects } = setupTests());
    buttonProjects?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  afterEach(() => {
    cleanupTests();
  });

  // Check that all the project cards show the proper information
  it("shows six projects", () => {
    expect(window.location.pathname).toBe("/projects");
    testBaseContent();
    const projectsList: HTMLUListElement | null | undefined =
      container?.querySelector(".projects-list");
    expect(projectsList?.children).toHaveLength(6);
  });

  it("shows all data about a project", () => {
    const projects: ProjectsJSON = JSON.parse(JSON.stringify(projectData));
    const projectsList: HTMLUListElement | null | undefined =
      container?.querySelector(".projects-list");
    expect(projectsList).toBeTruthy();

    for (const [projectIndex, project] of projects.entries()) {
      // The project's name, image, and description should be shown
      const projectCard = projectsList?.children[projectIndex] as HTMLLIElement;
      expect(projectCard.querySelector(".projects-name")?.textContent).toBe(
        project.name
      );
      expect(
        projectCard.querySelector(".projects-image")?.getAttribute("src")
      ).toBe(project.image);
      expect(projectCard.querySelector(".projects-about")?.textContent).toBe(
        project.about
      );
      const technologyContainer: HTMLDivElement | null =
        projectCard.querySelector(".projects-technology-container");

      // All technologies used should be shown
      for (const [techIndex, tech] of project.technology.entries()) {
        expect(technologyContainer?.children[techIndex].textContent).toBe(tech);
      }

      // If there's no website for the project, the text should mention to view the repo below
      // Otherwise, show a link for the website
      const projectWebsite: HTMLAnchorElement | HTMLParagraphElement | null =
        projectCard.querySelector(".projects-website");

      expect(projectWebsite?.textContent).toContain(
        project.website === null ? "See GitHub link below" : "View Project"
      );
      expect(projectWebsite?.getAttribute("href")).toBe(project.website); // no href === null

      // Always display the repo link for the project
      expect(
        projectCard.querySelector(".projects-repo")?.getAttribute("href")
      ).toBe(project.repo);
    }
  });

  it("makes the navbar sticky when scrolling down", () => {
    // Test that the navbar is sticky after scrolling down far enough
    const navbar: HTMLElement | null | undefined =
      container?.querySelector(".links");
    expect(window.pageYOffset).toBe(0);
    expect(navbar?.classList).not.toContain("sticky");

    // Simulate a scroll by changing the pageYOffset and activating a scroll event
    (window as any).pageYOffset = 1000;
    window.dispatchEvent(new Event("scroll"));
    expect(window.pageYOffset).toBeGreaterThan(0);
    expect(navbar?.classList).toContain("sticky");

    // navbar.offsetTop is 0, so make pageYOffset less than that to force the navbar to not be sticky
    (window as any).pageYOffset = -1;
    window.dispatchEvent(new Event("scroll"));
    expect(window.pageYOffset).toBeLessThan(0);
    expect(navbar?.classList).not.toContain("sticky");
    (window as any).pageYOffset = 0;
  });

  testNavbar("Projects");

  it("navigates to About after clicking the left arrow", () => {
    act(() => {
      const leftArrow: HTMLAnchorElement | null | undefined =
        container?.querySelector(".arrow-left");
      leftArrow?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    testFocusAbout();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");
    expect(transitionGroup?.classList).toContain(Direction.Right);
  });

  it("navigates to Contact after clicking the right arrow", () => {
    act(() => {
      const rightArrow: HTMLAnchorElement | null | undefined =
        container?.querySelector(".arrow-right");
      rightArrow?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    testFocusContact();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");
    expect(transitionGroup?.classList).toContain(Direction.Left);
  });
});
