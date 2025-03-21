import {
  faUpRightFromSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import styles from "./ProjectDetails.module.scss";
import { Project, ProjectTypes } from "../list/ProjectList";
import ProjectError from "../error/ProjectError";
import projectData from "../projects.json";
import { OnClickProp } from "../../app/App";
import Page from "../../enums/Page";

type ProjectDetailsProps = OnClickProp & {
  isDarkMode: boolean;
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
  const projects: Project[] | undefined = projectData[projectType] as Project[];
  const project: Project | undefined = projects?.find(
    (proj) => proj.id === projectId
  );
  const navigate = useNavigate();
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
        className={`${styles.details} container-fluid mx-auto mb-2 ${
          isDarkMode
            ? "text-light bg-dark border-light"
            : "text-dark bg-light border-dark"
        }`}
      >
        {/* Button to return to the projects list */}
        <Button
          variant=""
          type="button"
          className={`${styles.back} ${
            isDarkMode ? "text-light" : "text-dark"
          }`}
          aria-label="Go back"
          onClick={() => {
            onClickLink(Page.Projects);

            // Go back if the previous page was projects or push to go to projects
            if (locationState?.from === "#/projects") {
              void navigate(-1); // go back one page
            } else {
              void navigate("/projects");
            }
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        <Card.Title as="h4" className={`${styles.name} m-2`}>
          {project.name}
        </Card.Title>
        {/* If the image is a video, make it behave like a gif, otherwise leave the poster as-is */}
        <Card.Img
          as="video"
          variant="top"
          ref={videoRef}
          className={`${styles.video} mx-auto`}
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
                src={project.gif}
                type="video/webm"
                data-testid="video-webm"
              />
              Your browser doesn&apos;t support the video tag.
            </>
          )}
        </Card.Img>
        <Card.Text className="projects-about mx-1 my-2">
          {project.about}
        </Card.Text>
        <p
          className={`${styles["technology-header"]} mb-0 ${
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
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Demo
            </Button>
          )}
          <Button
            variant={`outline-${isDarkMode ? "info" : "primary"}`}
            className="projects-repo m-2"
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </Button>
        </div>
      </Card>
    );
  }
};

export default ProjectDetails;
