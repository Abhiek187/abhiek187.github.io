import React, { useEffect, useRef } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import "../scss/Projects.scss";
import projectData from "../models/projects.json";
import { Direction, OnClickProp } from "./App";
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

const Projects: React.FC<ProjectsProps> = ({ onClickLink, isDarkMode }) => {
  // path is the URL relative to the parent (/projects), while URL is the entire URL
  const { path, url } = useRouteMatch();
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
  }, []);

  const scrollList = (index: number, direction: Direction) => {
    const { current: projectsLists } = projectsListRef;

    // The cards have a width of 300px + 8px * 2 of margin
    projectsLists[index]?.scrollBy({
      top: 0,
      left: direction === Direction.Right ? 316 : -316,
      behavior: "smooth",
    });
  };

  return (
    <main className="projects container-fluid">
      <Link
        className="arrow-left"
        to="/about"
        aria-label="Go to About"
        onClick={() => onClickLink("about")}
      >
        <i className="fas fa-arrow-left" />
      </Link>
      <div className="projects-wrapper">
        <h3 className="projects-heading">Projects</h3>
        {/* Show either all projects or an individual project */}
        <Switch>
          <Route exact path={path}>
            <ul className="projects-full-list">
              {(Object.keys(projects) as [ProjectTypes]).map((type, index) => (
                /* Each list item needs a key */
                <li key={type} className="projects-type-list">
                  {/* Apple does what others don't */}
                  <h4 className="projects-type">
                    {type === "ios" ? "iOS" : capitalize(type)}
                  </h4>
                  {/* Show a horizontal list of cards */}
                  <div className="projects-scrolling-list">
                    <button
                      type="button"
                      className={`projects-scroll-left btn ${
                        isDarkMode ? "btn-info" : "btn-primary"
                      }`}
                      onClick={() => scrollList(index, Direction.Left)}
                      aria-label={`Scroll ${type} projects left`}
                    >
                      <i className="fas fa-arrow-left" />
                    </button>
                    <ul
                      className="projects-list"
                      ref={(el) => (projectsListRef.current[index] = el)}
                    >
                      {projects[type].map((project) => (
                        <li
                          key={project.id}
                          className={`card ${
                            isDarkMode
                              ? "bg-dark border-light"
                              : "bg-light border-dark"
                          }`}
                        >
                          {/* View more details about each project by clicking on the card */}
                          <Link
                            to={{
                              pathname: `${url}/${type}/${project.id}`,
                              state: { from: window.location.hash },
                            }}
                            className={`projects-link ${
                              isDarkMode ? "text-light" : "text-dark"
                            }`}
                            aria-label={`Card for ${project.name}, click to learn more`}
                          >
                            <h5 className="projects-name card-title m-2">
                              {project.name}
                            </h5>
                            {/* Specifying the width and height will reduce CLS (2:3 for portrait) */}
                            <img
                              className="projects-image card-img-top mx-auto"
                              src={project.image}
                              alt={`Screenshot of ${project.name}`}
                              width="280"
                              height="420"
                            />
                            <p className="projects-about card-text mx-1 my-2">
                              {project.about}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className={`projects-scroll-right btn ${
                        isDarkMode ? "btn-info" : "btn-primary"
                      }`}
                      onClick={() => scrollList(index, Direction.Right)}
                      aria-label={`Scroll ${type} projects right`}
                    >
                      <i className="fas fa-arrow-right" />
                    </button>
                  </div>
                  <hr />
                </li>
              ))}
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
          </Route>
          <Route path={`${path}/:projectType/:projectId`}>
            <ProjectDetails isDarkMode={isDarkMode} />
          </Route>
          {/* Otherwise this is not a valid path */}
          <Route path={`${path}/:projectType`}>
            <ProjectError isDarkMode={isDarkMode} />
          </Route>
        </Switch>
      </div>
      <Link
        className="arrow-right"
        to="/contact"
        aria-label="Go to Contact"
        onClick={() => onClickLink("contact")}
      >
        <i className="fas fa-arrow-right" />
      </Link>
    </main>
  );
};

export default Projects;
