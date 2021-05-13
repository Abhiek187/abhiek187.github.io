import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../scss/Projects.scss";
import colorData from "../models/colors.json";
import projectData from "../models/projects.json";
import { OnClickProp } from "./App";

// Type definitions of the JSON files
interface Project {
  id: string;
  name: string;
  image: string;
  about: string;
  technology: [string];
  website: string | null;
  repo: string;
}

export type ColorsJSON = { [key: string]: string };
export type ProjectsJSON = [Project];

const Projects: React.FC<OnClickProp> = ({ onClickLink }) => {
  useEffect(() => {
    document.title = "Abhishek Chaudhuri - Projects";
    document.querySelector(".links-about")?.classList.remove("active");
    document.querySelector(".links-projects")?.classList.add("active");
    document.querySelector(".links-contact")?.classList.remove("active");
  }, []);

  // Extract JSON data as an array
  const colors: ColorsJSON = JSON.parse(JSON.stringify(colorData));
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
        <h3 className="projects-heading" tabIndex={0}>
          Projects
        </h3>
        <ul className="projects-list">
          {projects.map((project) => (
            /* Each list item needs a key */
            <li key={project.id} className="card">
              <h4 className="projects-name card-title" tabIndex={0}>
                {project.name}
              </h4>
              <img
                className="projects-image card-img-top"
                tabIndex={0}
                src={project.image}
                alt={project.name}
              />
              <p className="projects-about card-text" tabIndex={0}>
                {project.about}
              </p>
              <p
                className="projects-technology-header"
                tabIndex={0}
                aria-label={`Made using: ${project.technology}`}
              >
                Made Using:
              </p>
              <div className="projects-technology-container">
                {project.technology.map((tech) => (
                  <p
                    key={tech}
                    className={`projects-technology badge bg-${colors[tech]}`}
                  >
                    {tech}
                  </p>
                ))}
              </div>
              {/* If no project link is directly available, follow directions on GitHub */}
              {project.website ? (
                <a
                  className="projects-website"
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              ) : (
                <p className="projects-website" tabIndex={0}>
                  &darr; See GitHub link below &darr;
                </p>
              )}
              <a
                className="projects-repo"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </li>
          ))}
        </ul>
        <p className="projects-addendum" tabIndex={0}>
          ...And much more on GitHub!
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
