import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../scss/Projects.scss";
import projectData from "../models/projects.json";
import { OnClickProp } from "./App";

// Type definitions of the JSON files
interface Project {
  id: string;
  name: string;
  image: string;
  gif: string | null;
  about: string;
  technology: [string];
  website: string | null;
  repo: string;
}

export type ProjectsJSON = {
  [type: string]: [Project];
};

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

  // Extract JSON data as an array
  const projects: ProjectsJSON = JSON.parse(JSON.stringify(projectData));

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
        <ul className="projects-full-list">
          {Object.keys(projects).map((type) => (
            /* Each list item needs a key */
            <li key={type} className="projects-type-list">
              {/* Apple does what others don't */}
              <h4 className="projects-type">
                {type === "ios" ? "iOS" : capitalize(type)}
              </h4>
              {/* Show a horizontal list of cards */}
              <ul className="projects-list" data-testid="projects-list">
                {projects[type].map((project) => (
                  <li
                    key={project.id}
                    className={`card mx-2 ${
                      isDarkMode
                        ? "text-light bg-dark border-light"
                        : "text-dark bg-light border-dark"
                    }`}
                  >
                    <h4 className="projects-name card-title m-2">
                      {project.name}
                    </h4>
                    {/* If the image is a video, make it behave like a gif */}
                    {project.image.endsWith(".webp") ? (
                      <img
                        className="projects-image card-img-top mx-auto"
                        src={project.image}
                        alt={`Screenshot of ${project.name}`}
                        width="280"
                      />
                    ) : (
                      <video autoPlay loop muted playsInline>
                        <source
                          src={`${project.image}.webm`}
                          type="video/webm"
                        />
                        <source src={`${project.image}.mp4`} type="video/mp4" />
                      </video>
                    )}
                    <p className="projects-about card-text mx-1 my-2">
                      {project.about}
                    </p>
                    {/* <p
                      className={`projects-technology-header mb-0 ${
                        isDarkMode ? "text-info" : ""
                      }`}
                    >
                      Made Using:
                    </p>
                    <div className="projects-technology-container mb-2">
                      {project.technology.map((tech) => (
                        <p
                          key={tech}
                          className={`projects-technology badge bg-primary m-1`}
                        >
                          {tech}
                        </p>
                      ))}
                    </div> */}
                    {/* If no project link is directly available, follow the directions on GitHub */}
                    {/* <div className="projects-links mb-2">
                      {project.website && (
                        <a
                          className="projects-website btn btn-outline-success m-1"
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-external-link-alt" /> Demo
                        </a>
                      )}
                      <a
                        className="projects-repo btn btn-outline-primary m-2"
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-github" /> GitHub
                      </a>
                    </div> */}
                  </li>
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
