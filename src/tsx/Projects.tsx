import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";

import "../scss/Projects.scss";
import projectData from "../models/projects.json";
import { OnClickProp, Page } from "./App";
import ProjectDetails from "./ProjectDetails";
import ProjectError from "./ProjectError";

// Type definitions of the JSON files
export interface Project {
  id: string;
  name: string;
  image: string;
  gif: string | null;
  about: string;
  technology: [string];
  website: string | null;
  repo: string;
}

export type ProjectTypes = "ios" | "android" | "web" | "other";
export type ProjectsJSON = Record<ProjectTypes, [Project]>; // record === dictionary/hashmap

// Extend the OnClickProp interface
type ProjectsProps = OnClickProp & {
  isDarkMode: boolean;
};

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const Projects: React.FC<ProjectsProps> = ({
  onClickLink,
  innerRef,
  isDarkMode,
}) => {
  // Set the type of the imported JSON
  const projects = projectData as ProjectsJSON;
  // Save a reference to each project list
  const projectsListRef = useRef<(HTMLUListElement | null)[]>(
    Array(Object.keys(projects).length)
  );

  useEffect(() => {
    document.title = "Abhishek Chaudhuri - Projects";
    document.querySelector(".links-about")?.classList.remove("active");
    document.querySelector(".links-projects")?.classList.add("active");
    document.querySelector(".links-contact")?.classList.remove("active");

    // Hide the scrolling buttons if possible on startup
    for (const list of projectsListRef.current) {
      if (list !== null && list !== undefined) {
        updateScrollButtonVisibility(list);
      }
    }
  }, [isDarkMode]);

  const scrollList = (index: number, scrollRight: boolean) => {
    const { current: projectsLists } = projectsListRef;
    if (projectsLists[index] === null) return;

    // Scroll multiple cards if the viewport is wide enough
    const cardLength: number = 316;
    let cardsToScroll: number = Math.floor(
      projectsLists[index]!.clientWidth / cardLength
    );

    if (cardsToScroll === 0) {
      cardsToScroll = 1; // still scroll if the full card doesn't fit in the viewport
    }

    // The cards have a width of 300px + 8px * 2 of margin
    projectsLists[index]!.scrollBy({
      top: 0,
      left: scrollRight
        ? cardsToScroll * cardLength
        : -cardsToScroll * cardLength,
      behavior: "smooth",
    });

    // Call this in case onScroll isn't triggered
    updateScrollButtonVisibility(projectsLists[index]!);
  };

  const updateScrollButtonVisibility = (projectsList: HTMLUListElement) => {
    const leftScrollingButton =
      projectsList.previousElementSibling as HTMLButtonElement | null;
    const rightScrollingButton =
      projectsList.nextElementSibling as HTMLButtonElement | null;

    // Hide the scrolling buttons if the user can't scroll in that direction
    if (projectsList.scrollLeft === 0) {
      leftScrollingButton?.classList.add("d-none");
    } else {
      leftScrollingButton?.classList.remove("d-none");
    }

    if (
      Math.abs(
        projectsList.scrollLeft +
          projectsList.clientWidth -
          projectsList.scrollWidth
      ) <= 1
    ) {
      rightScrollingButton?.classList.add("d-none");
    } else {
      rightScrollingButton?.classList.remove("d-none");
    }
  };

  return (
    <main className="projects container-fluid" ref={innerRef}>
      <Link
        className="arrow-left"
        to="/about"
        aria-label="Go to About"
        onClick={() => onClickLink(Page.About)}
      >
        <FontAwesomeIcon icon="arrow-left" />
      </Link>
      <div className="projects-wrapper">
        <h3 className="projects-heading">Projects</h3>
        {/* Show either all projects or an individual project */}
        <Routes>
          <Route
            path="/"
            element={
              /* <> === React.Fragment */
              <div ref={innerRef}>
                <ul className="projects-full-list">
                  {(Object.keys(projects) as [ProjectTypes]).map(
                    (type, index) => (
                      /* Each list item needs a key */
                      <li key={type} className="projects-type-list">
                        {/* Apple does what others don't */}
                        <h4 className="projects-type">
                          {type === "ios" ? "iOS" : capitalize(type)}
                        </h4>
                        {/* Show a horizontal list of cards */}
                        <div className="projects-scrolling-list">
                          <Button
                            variant={isDarkMode ? "info" : "primary"}
                            type="button"
                            className="projects-scroll-left"
                            onClick={() => scrollList(index, false)}
                            aria-label={`Scroll ${type} projects left`}
                          >
                            <FontAwesomeIcon icon="arrow-left" />
                          </Button>
                          <ul
                            className="projects-list"
                            ref={(el) => (projectsListRef.current[index] = el)}
                            onScroll={(event) =>
                              updateScrollButtonVisibility(
                                event.target as HTMLUListElement
                              )
                            }
                          >
                            {projects[type].map((project) => (
                              <Card
                                key={project.id}
                                as="li"
                                className={`${
                                  isDarkMode
                                    ? "bg-dark border-light"
                                    : "bg-light border-dark"
                                }`}
                              >
                                {/* View more details about each project by clicking on the card */}
                                <Link
                                  to={`${type}/${project.id}`}
                                  state={{ from: window.location.hash }}
                                  className={`projects-link ${
                                    isDarkMode ? "text-light" : "text-dark"
                                  }`}
                                  onClick={() =>
                                    onClickLink(Page.ProjectDetails)
                                  }
                                  aria-label={`Card for ${project.name}, click to learn more`}
                                >
                                  <Card.Title
                                    as="h5"
                                    className="projects-name m-2"
                                  >
                                    {project.name}
                                  </Card.Title>
                                  {/* Specifying the width and height will reduce CLS (2:3 for portrait) */}
                                  <Card.Img
                                    variant="top"
                                    className="projects-image mx-auto"
                                    src={project.image}
                                    alt={`Screenshot of ${project.name}`}
                                    width="280"
                                    height="420"
                                  />
                                  <Card.Text className="projects-about mx-1 my-2">
                                    {project.about}
                                  </Card.Text>
                                </Link>
                              </Card>
                            ))}
                          </ul>
                          <Button
                            variant={isDarkMode ? "info" : "primary"}
                            type="button"
                            className="projects-scroll-right"
                            onClick={() => scrollList(index, true)}
                            aria-label={`Scroll ${type} projects right`}
                          >
                            <FontAwesomeIcon icon="arrow-right" />
                          </Button>
                        </div>
                        <hr />
                      </li>
                    )
                  )}
                </ul>
                <p className="projects-addendum">
                  ...And much more on{" "}
                  <a
                    className="projects-github-link"
                    href="https://github.com/abhiek187"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub!
                  </a>
                </p>
              </div>
            }
          />
          <Route
            path=":projectType/:projectId"
            element={
              <ProjectDetails
                onClickLink={onClickLink}
                innerRef={innerRef}
                isDarkMode={isDarkMode}
              />
            }
          />
          {/* Otherwise this is not a valid path */}
          <Route
            path=":projectType"
            element={
              <ProjectError innerRef={innerRef} isDarkMode={isDarkMode} />
            }
          />
        </Routes>
      </div>
      <Link
        className="arrow-right"
        to="/contact"
        aria-label="Go to Contact"
        onClick={() => onClickLink(Page.Contact)}
      >
        <FontAwesomeIcon icon="arrow-right" />
      </Link>
    </main>
  );
};

export default Projects;
