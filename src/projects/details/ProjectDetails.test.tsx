import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";
import { expect } from "vitest";

import {
  setupTests,
  testFocusAbout,
  testFocusContact,
  testNavbar,
} from "../../utils/test-util";
import { ProjectsJSON } from "../list/ProjectList";
import projectData from "../projects.json";
import Transition from "../../enums/Transition";
import Page from "../../enums/Page";

describe("Project Details", () => {
  let buttonProjects: HTMLAnchorElement;
  let leftArrow: HTMLAnchorElement;
  let rightArrow: HTMLAnchorElement;
  let user: UserEvent;
  const projects = projectData as ProjectsJSON;

  beforeEach(async () => {
    ({ buttonProjects, user } = setupTests());
    await user.click(buttonProjects);

    const card = screen.getByLabelText<HTMLAnchorElement>(
      /card for captain conundrum/i
    );
    await user.click(card);

    [leftArrow, rightArrow] =
      await screen.findAllByLabelText<HTMLAnchorElement>(/Go to/);
  });

  // Separate each test by type and name
  for (const type of Object.keys(projects) as (keyof ProjectsJSON)[]) {
    describe(`${type}`, () => {
      for (const project of projects[type]) {
        it(`displays all information about ${project.name}`, async () => {
          // Go back to the projects page first (it's unsafe to reference buttonProjects here)
          await user.click(
            screen.getByRole("button", {
              name: "Projects",
            })
          );

          // Click the appropriate card
          const cardRegex: string = `Card for ${project.name}`;
          const projectCard = await screen.findByLabelText<HTMLAnchorElement>(
            RegExp(cardRegex)
          );
          expect(projectCard).toBeInTheDocument();
          await user.click(projectCard);
          expect(window.location.hash).toBe(`#/projects/${type}/${project.id}`);

          // The fade transition should play instead of the sliding one
          const transitionGroup =
            screen.getByTestId<HTMLDivElement>("transition");
          expect(Array.from(transitionGroup.classList)).toContain(
            Transition.Fade
          );

          // The project's name, GIF, and description should be shown
          const projectName = await screen.findByRole<HTMLHeadingElement>(
            "heading",
            {
              name: project.name,
            }
          );
          expect(projectName).toBeInTheDocument();

          // Check for all the required attributes for a pseudo GIF video
          const projectGif = screen.getByRole<HTMLVideoElement>("application", {
            hidden: true,
          });
          expect(projectGif).toBeInTheDocument();
          expect(projectGif.autoplay).toBe(true);
          expect(projectGif.loop).toBe(true);
          expect(projectGif.muted).toBe(true);
          expect(projectGif.playsInline).toBe(true);
          expect(projectGif.poster).toContain(project.image);

          // Projects without GIFs shouldn't contain any sources
          const videoWebM =
            screen.queryByTestId<HTMLSourceElement>("video-webm");
          expect(videoWebM?.src ?? "null").toContain(String(project.gif));
          expect(projectGif).toHaveTextContent(
            project.gif === null
              ? ""
              : /Your browser doesn't support the video tag./
          );

          const projectAbout = screen.getByText<HTMLParagraphElement>(
            project.about
          );
          expect(projectAbout).toBeInTheDocument();

          // All technologies used should be shown
          for (const tech of project.technology) {
            // For React, don't match the footer link
            let techBadge: HTMLParagraphElement;

            if (tech === "React") {
              techBadge = screen.getAllByText<HTMLParagraphElement>(tech)[0];
            } else {
              techBadge = screen.getByText<HTMLParagraphElement>(tech);
            }

            expect(techBadge).toBeInTheDocument();
          }

          // If there's no website for the project, the website link shouldn't be present
          const demoButton = screen.queryByRole<HTMLAnchorElement>("button", {
            name: "Demo",
          });

          if (demoButton !== null) {
            expect(demoButton).toBeInTheDocument();
          }

          expect(demoButton?.href ?? null).toBe(project.website);

          // Always display the repo link for the project
          const repoButton = screen.getByRole<HTMLAnchorElement>("button", {
            name: "GitHub",
          });
          expect(repoButton).toBeInTheDocument();
          expect(repoButton.href).toBe(project.repo);

          // Check that the back button goes back to the projects list
          const backButton =
            screen.getByLabelText<HTMLButtonElement>(/Go back/);
          await user.click(backButton);

          expect(Array.from(transitionGroup.classList)).toContain(
            Transition.Fade
          );
          const smallProjectName = await screen.findByRole<HTMLHeadingElement>(
            "heading",
            {
              name: project.name,
              level: 5,
            }
          );
          expect(smallProjectName).toBeInTheDocument();
          expect(repoButton).not.toBeInTheDocument();
        });
      }
    });
  }

  testNavbar(Page.ProjectDetails);

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
