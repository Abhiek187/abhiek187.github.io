import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import App from "../tsx/App";
import { ProjectsJSON } from "../tsx/Projects";
import projectData from "../models/projects.json";

let container: HTMLDivElement | null = null;
let buttonAbout: HTMLAnchorElement | null = null;
let buttonProjects: HTMLAnchorElement | null = null;
let buttonContact: HTMLAnchorElement | null = null;

beforeEach(() => {
  // Add a div to hold all the React components
  container = document.createElement("div");
  document.body.appendChild(container);
  // App must be wrapped in a BrowserRouter
  render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>,
    container
  );
  buttonAbout = container.querySelector(".links-about");
  buttonProjects = container.querySelector(".links-projects");
  buttonContact = container.querySelector(".links-contact");
});

afterEach(() => {
  // Unmount the root div container
  if (container !== null) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

const testBaseContent = (): void => {
  // Check that the header, navbar, and footer are present in every page
  expect(container?.querySelector(".heading")).not.toBeNull();
  expect(container?.querySelector(".heading-name")?.textContent).toBe(
    "Abhishek Chaudhuri"
  );
  expect(container?.querySelector(".heading-headline")?.textContent).toContain(
    "Software Engineer"
  );

  expect(container?.querySelector(".links")).not.toBeNull();

  expect(container?.querySelector(".foot")).not.toBeNull();
  expect(container?.querySelector(".foot-left")?.textContent).toContain(
    "React"
  );
  expect(container?.querySelector(".foot-right")?.textContent).toContain(
    "MIT License"
  );
};

const testFocusAbout = (): void => {
  expect(window.location.pathname).toBe("/about");
  expect(buttonAbout?.classList).toContain("active");
  expect(buttonProjects?.classList).not.toContain("active");
  expect(buttonContact?.classList).not.toContain("active");
};

const testFocusProjects = (): void => {
  expect(window.location.pathname).toBe("/projects");
  expect(buttonAbout?.classList).not.toContain("active");
  expect(buttonProjects?.classList).toContain("active");
  expect(buttonContact?.classList).not.toContain("active");
};

const testFocusContact = (): void => {
  expect(window.location.pathname).toBe("/contact");
  expect(buttonAbout?.classList).not.toContain("active");
  expect(buttonProjects?.classList).not.toContain("active");
  expect(buttonContact?.classList).toContain("active");
};

const testNavbar = (source: string): void => {
  // Tests to ensure the nav buttons navigate to the correct component
  it("navigates to About after clicking About", () => {
    // Fire a click event before testing
    act(() => {
      buttonAbout?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Check that the correct button is active
    testFocusAbout();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");

    // Check that the next component slides in the correct direction
    if (source === "Projects" || source === "Contact") {
      expect(transitionGroup?.classList).toContain("right");
    } else {
      expect(transitionGroup?.classList).toContain("left");
    }
  });

  it("navigates to Projects after clicking Projects", () => {
    act(() => {
      buttonProjects?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    testFocusProjects();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");

    if (source === "Contact") {
      expect(transitionGroup?.classList).toContain("right");
    } else {
      expect(transitionGroup?.classList).toContain("left");
    }
  });

  it("navigates to Contact after clicking Contact", () => {
    act(() => {
      buttonContact?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    testFocusContact();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");

    if (source === "Contact") {
      expect(transitionGroup?.classList).toContain("right");
    } else {
      expect(transitionGroup?.classList).toContain("left");
    }
  });
};

/* Testing Procedure:
 * - Start by rendering the App -> it should render without crashing
 * From App:
 * - The name, headline, navbar, welcome message, and footer should show
 * - Click on About -> it should render the About component (button is active)
 * - (OR) Click on Projects -> it should render the Projects component (button is active)
 * - (OR) Click on Contact -> it should render the Contact component (button is active)
 * - (OR) Set the URL to some other path -> it should show the error message
 * From About:
 * - A headshot and bio should be present in the container
 * - Click on About -> it should slide the About component to the left
 * - Click on Projects -> it should slide the Projects component to the left
 * - Click on Contact -> it should slide the Contact component to the left
 * - Click on the right arrow -> it should slide the Projects component to the left
 * - Go to some invalid page -> it should show the error message
 * From Projects:
 * - Scroll down -> the navbar should be sticky
 * - There should be 6 projects
 * - Each project's name, image, about, technology, website, and repo should be shown
 * - Click on About, Projects, Contact, invalid, left, and right arrows
 * From Contact:
 * - Click on Resume -> it should show the resume.pdf file
 * - Click on LinkedIn -> it should show the Abhiek187 LinkedIn page
 * - Click on GitHub -> it should show the Abhiek187 GitHub page
 * - Click on Email -> it should create an email to achaudhuri2011@yahoo.com
 * - Click on About, Projects, Contact, invalid, and left arrow
 * From invalid:
 * - The error message should show
 * - Click on About, Projects, and Contact
 */
describe("App", () => {
  it("renders without crashing", () => {
    // The home page should show up
    expect(window.location.pathname).toBe("/");
    testBaseContent();
    expect(container?.querySelector(".home")).not.toBeNull();
    expect(container?.querySelector(".home-info")?.textContent).toContain(
      "welcome"
    );
  });

  testNavbar("App");
});

describe("About", () => {
  beforeEach(() => {
    buttonAbout?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  it("shows a headshot and bio", () => {
    // The About page should show the relevant information
    expect(window.location.pathname).toBe("/about");
    testBaseContent();
    expect(container?.querySelector(".about")).not.toBeNull();
    expect(
      container?.querySelector(".about-headshot")?.getAttribute("src")
    ).toBe("/img/Headshot.png");
    expect(container?.querySelector(".about-bio")?.textContent).toContain(
      "Abhishek Chaudhuri"
    );
  });

  testNavbar("About");

  // Check that the arrow button navigates to the correct page with the correct slide transition
  it("navigates to Projects after clicking the right arrow", () => {
    act(() => {
      const rightArrow: HTMLAnchorElement | null | undefined =
        container?.querySelector(".arrow-right");
      rightArrow?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    testFocusProjects();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");
    expect(transitionGroup?.classList).toContain("left");
  });
});

describe("Projects", () => {
  beforeEach(() => {
    buttonProjects?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
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
    if (!projectsList) {
      expect("The list of projects is missing.").toBeFalsy(); // guaranteed failure
      return; // to please TypeScript :)
    }

    for (const [projectIndex, project] of projects.entries()) {
      // The project's name, image, and description should be shown
      const projectCard = projectsList.children[projectIndex] as HTMLLIElement;
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

      if (project.website === null) {
        // If there's no website for the project, the text should mention to view the repo below
        expect(
          projectCard.querySelector(".projects-website")?.textContent
        ).toContain("See GitHub link below");
      } else {
        // Otherwise, show a link for the website
        expect(
          projectCard.querySelector(".projects-website")?.getAttribute("href")
        ).toBe(project.website);
      }

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
    expect(transitionGroup?.classList).toContain("right");
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
    expect(transitionGroup?.classList).toContain("left");
  });
});

describe("Contact", () => {
  let buttonResume: HTMLAnchorElement | null | undefined = null;
  let buttonLinkedin: HTMLAnchorElement | null | undefined = null;
  let buttonGithub: HTMLAnchorElement | null | undefined = null;
  let buttonEmail: HTMLAnchorElement | null | undefined = null;

  beforeEach(() => {
    buttonContact?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    buttonResume = container?.querySelector(".contact-resume");
    buttonLinkedin = container?.querySelector(".contact-linkedin");
    buttonGithub = container?.querySelector(".contact-github");
    buttonEmail = container?.querySelector(".contact-email");
  });

  // Test that the resume, LinkedIn, GitHub, and email links are valid
  it("shows all contact information", () => {
    expect(window.location.pathname).toBe("/contact");
    testBaseContent();
    expect(buttonResume).not.toBeNull();
    expect(buttonLinkedin).not.toBeNull();
    expect(buttonGithub).not.toBeNull();
    expect(buttonEmail).not.toBeNull();
  });

  it("can view the resume", () => {
    act(() => {
      buttonResume?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(buttonResume?.getAttribute("href")).toBe("resume.pdf");
  });

  it("can view the LinkedIn profile", () => {
    act(() => {
      buttonLinkedin?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(buttonLinkedin?.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/abhiek187"
    );
  });

  it("can view the GitHub profile", () => {
    act(() => {
      buttonGithub?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(buttonGithub?.getAttribute("href")).toBe(
      "https://github.com/abhiek187"
    );
  });

  it("can create an email", () => {
    act(() => {
      buttonEmail?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(buttonEmail?.getAttribute("href")).toBe(
      "mailto:achaudhuri2011@yahoo.com"
    );
  });

  testNavbar("Contact");

  it("navigates to Projects after clicking the left arrow", () => {
    act(() => {
      const leftArrow: HTMLAnchorElement | null | undefined =
        container?.querySelector(".arrow-left");
      leftArrow?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    testFocusProjects();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");
    expect(transitionGroup?.classList).toContain("right");
  });
});
