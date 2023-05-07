import { fireEvent, screen } from "@testing-library/react";
import {
  setupTests,
  testFocusAbout,
  testFocusContact,
  testNavbar,
} from "./test-util";
import { ProjectsJSON, ProjectTypes } from "../tsx/Projects";
import projectData from "../models/projects.json";
import { Page, Transition } from "../tsx/App";

describe("Project Details", () => {
  let buttonProjects: HTMLAnchorElement;
  let leftArrow: HTMLAnchorElement;
  let rightArrow: HTMLAnchorElement;
  const projects = projectData as ProjectsJSON;

  beforeEach(async () => {
    ({ buttonProjects } = setupTests());
    fireEvent.click(buttonProjects);

    const card = screen.getByLabelText(
      /card for captain conundrum/i
    ) as HTMLAnchorElement;
    fireEvent.click(card);

    [leftArrow, rightArrow] = (await screen.findAllByLabelText(
      /Go to/
    )) as HTMLAnchorElement[];
  });

  // Separate each test by type and name
  for (const type of Object.keys(projects) as ProjectTypes[]) {
    describe(`${type}`, () => {
      for (const project of projects[type]) {
        it(`displays all information about ${project.name}`, async () => {
          // Go back to the projects page first (it's unsafe to reference buttonProjects here)
          fireEvent.click(
            screen.getByRole("button", {
              name: "Projects",
            })
          );

          // Click the appropriate card
          const cardRegex: string = `Card for ${project.name}`;
          const projectCard = (await screen.findByLabelText(
            RegExp(cardRegex, "g")
          )) as HTMLAnchorElement;
          expect(projectCard).toBeInTheDocument();
          fireEvent.click(projectCard);
          expect(window.location.hash).toBe(`#/projects/${type}/${project.id}`);

          // The fade transition should play instead of the sliding one
          const transitionGroup = screen.getByTestId(
            "transition"
          ) as HTMLDivElement;
          expect(Array.from(transitionGroup.classList)).toContain(
            Transition.Fade
          );

          // The project's name, GIF, and description should be shown
          const projectName = (await screen.findByRole("heading", {
            name: project.name,
          })) as HTMLHeadingElement;
          expect(projectName).toBeInTheDocument();

          // Check for all the required attributes for a pseudo GIF video
          const projectGif = screen.getByRole("application", {
            hidden: true,
          }) as HTMLVideoElement;
          expect(projectGif).toBeInTheDocument();
          expect(projectGif.autoplay).toBe(true);
          expect(projectGif.loop).toBe(true);
          expect(projectGif.muted).toBe(true);
          expect(projectGif.playsInline).toBe(true);
          expect(projectGif.poster).toContain(project.image);

          // Projects without GIFs shouldn't contain any sources
          const videoWebM = screen.queryByTestId(
            "video-webm"
          ) as HTMLSourceElement | null;
          expect(videoWebM?.src ?? "null").toContain(String(project.gif));
          const videoMp4 = screen.queryByTestId(
            "video-mp4"
          ) as HTMLSourceElement | null;
          expect(videoMp4?.src ?? "null").toContain(String(project.gif));
          expect(projectGif).toHaveTextContent(
            project.gif === null
              ? ""
              : /Your browser doesn't support the video tag./
          );

          const projectAbout = screen.getByText(
            project.about
          ) as HTMLParagraphElement;
          expect(projectAbout).toBeInTheDocument();

          // All technologies used should be shown
          for (const tech of project.technology) {
            // For React, don't match the footer link
            let techBadge: HTMLParagraphElement;

            if (tech === "React") {
              techBadge = screen.getAllByText(tech)[0] as HTMLParagraphElement;
            } else {
              techBadge = screen.getByText(tech) as HTMLParagraphElement;
            }

            expect(techBadge).toBeInTheDocument();
          }

          // If there's no website for the project, the website link shouldn't be present
          const demoButton = screen.queryByRole("button", {
            name: "Demo",
          }) as HTMLAnchorElement | null;

          if (demoButton !== null) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(demoButton).toBeInTheDocument();
          }

          expect(demoButton?.href ?? null).toBe(project.website);

          // Always display the repo link for the project
          const repoButton = screen.getByRole("button", {
            name: "GitHub",
          }) as HTMLAnchorElement;
          expect(repoButton).toBeInTheDocument();
          expect(repoButton.href).toBe(project.repo);

          // Check that the back button goes back to the projects list
          const backButton = screen.getByLabelText(
            /Go back/
          ) as HTMLButtonElement;
          fireEvent.click(backButton);

          expect(Array.from(transitionGroup.classList)).toContain(
            Transition.Fade
          );
          const smallProjectName = (await screen.findByRole("heading", {
            name: project.name,
            level: 5,
          })) as HTMLHeadingElement;
          expect(smallProjectName).toBeInTheDocument();
          expect(repoButton).not.toBeInTheDocument();
        });
      }
    });
  }

  testNavbar(Page.ProjectDetails);

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
