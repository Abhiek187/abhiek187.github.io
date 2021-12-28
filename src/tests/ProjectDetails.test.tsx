import { fireEvent, screen } from "@testing-library/react";
import { setupTests } from "./test-util";
import { ProjectsJSON, ProjectTypes } from "../tsx/Projects";
import projectData from "../models/projects.json";

describe("Project Details", () => {
  let buttonProjects: HTMLAnchorElement;
  const projects = projectData as ProjectsJSON;

  beforeEach(() => {
    ({ buttonProjects } = setupTests());
    fireEvent.click(buttonProjects);
  });

  // Separate each test by type and name
  for (const type of Object.keys(projects) as [ProjectTypes]) {
    describe(`${type}`, () => {
      for (const project of projects[type]) {
        it(`displays all information about ${project.name}`, async () => {
          // Click the appropriate card
          const cardRegex: string = `Card for ${project.name}`;
          const projectCard = screen.getByLabelText(
            RegExp(cardRegex, "g")
          ) as HTMLAnchorElement;
          expect(projectCard).toBeInTheDocument();
          fireEvent.click(projectCard);

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

          const videoWebM = screen.getByTestId(
            "video-webm"
          ) as HTMLSourceElement;
          expect(videoWebM.src).toContain(String(project.gif)); // a null src is ok
          const videoMp4 = screen.getByTestId("video-mp4") as HTMLSourceElement;
          expect(videoMp4.src).toContain(String(project.gif));
          expect(projectGif).toHaveTextContent(
            /Your browser doesn't support the video tag./
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
});
