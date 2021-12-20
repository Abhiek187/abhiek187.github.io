import React, { useEffect } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import "../scss/Projects.scss";
import projectData from "../models/projects.json";
import { OnClickProp } from "./App";
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

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const Projects: React.FC<ProjectsProps> = ({ onClickLink, isDarkMode }) => {
  useEffect(() => {
    document.title = "Abhishek Chaudhuri - Projects";
    document.querySelector(".links-about")?.classList.remove("active");
    document.querySelector(".links-projects")?.classList.add("active");
    document.querySelector(".links-contact")?.classList.remove("active");
  }, []);
  // path is the URL relative to the parent (/projects), while URL is the entire URL
  const { path, url } = useRouteMatch();
  // Set the type of the imported JSON
  const projects: ProjectsJSON = projectData as ProjectsJSON;

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
              {(Object.keys(projects) as [ProjectTypes]).map((type) => (
                /* Each list item needs a key */
                <li key={type} className="projects-type-list">
                  {/* Apple does what others don't */}
                  <h4 className="projects-type">
                    {type === "ios" ? "iOS" : capitalize(type)}
                  </h4>
                  {/* Show a horizontal list of cards */}
                  <ul className="projects-list" data-testid="projects-list">
                    {projects[type].map((project) => (
                      /* View more details about each project by clicking on the card */
                      <Link
                        key={project.id}
                        to={`${url}/${type}/${project.id}`}
                      >
                        <li
                          className={`card mx-2 ${
                            isDarkMode
                              ? "text-light bg-dark border-light"
                              : "text-dark bg-light border-dark"
                          }`}
                        >
                          <h4 className="projects-name card-title m-2">
                            {project.name}
                          </h4>
                          <img
                            className="projects-image card-img-top mx-auto"
                            src={project.image}
                            alt={`Screenshot of ${project.name}`}
                            width="280"
                          />
                          <p className="projects-about card-text mx-1 my-2">
                            {project.about}
                          </p>
                        </li>
                      </Link>
                    ))}
                  </ul>
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
