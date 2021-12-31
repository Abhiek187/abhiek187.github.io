import React from "react";
import { useParams } from "react-router-dom";

import "../scss/ProjectError.scss";
import { ProjectParams } from "./ProjectDetails";

type ProjectErrorProps = {
  isDarkMode: Boolean;
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
      className={`project-error container-fluid fs-5 ${
        isDarkMode ? "text-warning" : ""
      }`}
    >
      Error: Project (type: {projectType}, id: {projectId}) doesn't exist.
    </section>
  );
};

export default ProjectError;
