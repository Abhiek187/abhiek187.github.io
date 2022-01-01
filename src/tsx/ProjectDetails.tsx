import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef, useEffect } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import "../scss/ProjectDetails.scss";
import { Project, ProjectTypes } from "./Projects";
import ProjectError from "./ProjectError";
import projectData from "../models/projects.json";
import { OnClickProp, Page } from "./App";

type ProjectDetailsProps = OnClickProp & {
  isDarkMode: Boolean;
};

export type ProjectParams = {
  projectType: ProjectTypes;
  projectId: string;
};

type LocationStateProps = {
  from: string;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  onClickLink,
  innerRef,
  isDarkMode,
}) => {
  // Get the project object (cool rhyme) from the project type and id
  const { projectType, projectId } = useParams<
    keyof ProjectParams
  >() as ProjectParams;
  const projects: [Project] | undefined = projectData[projectType] as [Project];
  const project: Project | undefined = projects?.find(
    (proj) => proj.id === projectId
  );
  const navigate: NavigateFunction = useNavigate();
  const locationState = useLocation().state as LocationStateProps | null;
  const videoRef = createRef<HTMLVideoElement>();

  useEffect(() => {
    document.title = `Abhishek Chaudhuri - Project: ${
      project?.name ?? "unknown"
    }`;

    // Fixes a bug with the muted property of a video in React
    // https://stackoverflow.com/questions/62732346/test-exception-unstable-flushdiscreteupdates
    const { current: video } = videoRef;

    if (video !== null) {
      video.muted = true;
    }
  }, [project?.name, videoRef]);

  if (projects === undefined || project === undefined) {
    return <ProjectError isDarkMode={isDarkMode} />;
  } else {
    return (
      <Card
        as="section"
        ref={innerRef}
        className={`project-details container-fluid mx-auto mb-2 ${
          isDarkMode
            ? "text-light bg-dark border-light"
            : "text-dark bg-light border-dark"
        }`}
      >
        {/* Button to return to the projects list */}
        <Button
          variant=""
          type="button"
          className={`projects-back ${isDarkMode ? "text-light" : "text-dark"}`}
          aria-label="Go back"
          onClick={() => {
            onClickLink(Page.Projects);

            // Go back if the previous page was projects or push to go to projects
            locationState?.from === "#/projects"
              ? navigate(-1) // go back one page
              : navigate("/projects");
          }}
        >
          <FontAwesomeIcon icon="times" />
        </Button>
        <Card.Title as="h4" className="projects-name m-2">
          {project.name}
        </Card.Title>
        {/* If the image is a video, make it behave like a gif, otherwise leave the poster as-is */}
        <Card.Img
          as="video"
          variant="top"
          ref={videoRef}
          className="projects-video mx-auto"
          autoPlay
          loop
          playsInline
          poster={project.image}
          role="application"
          aria-hidden={true}
        >
          {project.gif !== null && (
            /* <> === React.Fragment */
            <>
              <source
                src={`${project.gif}.webm`}
                type="video/webm"
                data-testid="video-webm"
              />
              <source
                src={`${project.gif}.mp4`}
                type="video/mp4"
                data-testid="video-mp4"
              />
              Your browser doesn't support the video tag.
            </>
          )}
        </Card.Img>
        <Card.Text className="projects-about mx-1 my-2">
          {project.about}
        </Card.Text>
        <p
          className={`projects-technology-header mb-0 ${
            isDarkMode ? "text-info" : ""
          }`}
        >
          Made Using:
        </p>
        <div className="projects-technology-container mb-2">
          {project.technology.map((tech) => (
            <Badge
              key={tech}
              bg="primary"
              pill
              className={`projects-technology m-1`}
            >
              {tech}
            </Badge>
          ))}
        </div>
        {/* If no project link is directly available, follow the directions on GitHub */}
        <div className="projects-links mb-2">
          {project.website && (
            <Button
              variant={`outline-${isDarkMode ? "warning" : "success"}`}
              className="projects-website m-1"
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon="external-link-alt" /> Demo
            </Button>
          )}
          <Button
            variant={`outline-${isDarkMode ? "info" : "primary"}`}
            className="projects-repo m-2"
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={["fab", "github"]} /> GitHub
          </Button>
        </div>
      </Card>
    );
  }
};

export default ProjectDetails;
