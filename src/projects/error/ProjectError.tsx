import React from "react";
import { useParams } from "react-router-dom";

import styles from "./ProjectError.module.scss";
import { ProjectParams } from "../details/ProjectDetails";

type ProjectErrorProps = {
  isDarkMode: boolean;
  innerRef?: React.RefObject<HTMLDivElement>; // optional
};

const ProjectError: React.FC<ProjectErrorProps> = ({
  isDarkMode,
  innerRef = undefined,
}) => {
  const { projectType, projectId } = useParams<ProjectParams>();

  return (
    <section
      ref={innerRef}
      className={`${styles.error} container-fluid fs-5 ${
        isDarkMode ? "text-warning" : ""
      }`}
    >
      Error: Project (type: {projectType}, id: {projectId}) doesn&apos;t exist.
    </section>
  );
};

export default ProjectError;
