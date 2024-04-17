import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import styles from "./Projects.module.scss";
import { OnClickProp } from "../app/App";
import ProjectDetails from "./details/ProjectDetails";
import ProjectError from "./error/ProjectError";
import Page from "../enums/Page";
import ProjectList from "./list/ProjectList";

// Extend the OnClickProp interface
type ProjectsProps = OnClickProp & {
  isDarkMode: boolean;
};

const Projects: React.FC<ProjectsProps> = ({
  onClickLink,
  innerRef,
  isDarkMode,
}) => {
  return (
    <main className="projects container-fluid" ref={innerRef}>
      <Link
        className="arrow-left"
        to="/about"
        aria-label="Go to About"
        onClick={() => onClickLink(Page.About)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className={styles.wrapper}>
        <h3 className={styles.heading}>Projects</h3>
        {/* Show either all projects or an individual project */}
        <Routes>
          <Route
            path="/"
            element={
              <ProjectList
                onClickLink={onClickLink}
                innerRef={innerRef}
                isDarkMode={isDarkMode}
              />
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
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </main>
  );
};

export default Projects;
