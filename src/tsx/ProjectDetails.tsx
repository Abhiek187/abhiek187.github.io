import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import "../scss/ProjectDetails.scss";
import { Project, ProjectTypes } from "./Projects";
import ProjectError from "./ProjectError";
import projectData from "../models/projects.json";

type ProjectDetailsProps = {
  isDarkMode: Boolean;
};

export type ProjectParams = {
  projectType: ProjectTypes;
  projectId: string;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ isDarkMode }) => {
  // Get the project object (cool rhyme) from the project type and id
  const { projectType, projectId } = useParams<ProjectParams>();
  const projects: [Project] | undefined = projectData[projectType] as [Project];
  const project: Project | undefined = projects?.find(
    (proj) => proj.id === projectId
  );
  const history = useHistory();

  useEffect(() => {
    document.title = `Abhishek Chaudhuri - Project: ${
      project?.name ?? "unknown"
    }`;
  });

  if (projects === undefined || project === undefined) {
    return <ProjectError isDarkMode={isDarkMode} />;
  } else {
    return (
      <section
        className={`project-details container-fluid card mx-auto mb-2 ${
          isDarkMode
            ? "text-light bg-dark border-light"
            : "text-dark bg-light border-dark"
        }`}
      >
        {/* Button to return to the projects list */}
        <button
          type="button"
          className="projects-back btn"
          aria-label="Go back"
          onClick={() => history.goBack()}
        >
          <i className="fas fa-arrow-left" />
        </button>
        <h4 className="projects-name card-title m-2">{project.name}</h4>
        {/* If the image is a video, make it behave like a gif */}
        {project.gif === null ? (
          <img
            className="projects-image card-img-top mx-auto"
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            width="280"
          />
        ) : (
          <video
            className="projects-video card-img-top mx-auto"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={`${project.gif}.webm`} type="video/webm" />
            <source src={`${project.gif}.mp4`} type="video/mp4" />
          </video>
        )}
        <p className="projects-about card-text mx-1 my-2">{project.about}</p>
        <p
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
        </div>
        {/* If no project link is directly available, follow the directions on GitHub */}
        <div className="projects-links mb-2">
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
        </div>
      </section>
    );
  }
};

export default ProjectDetails;
