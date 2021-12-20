import React from "react";
import { useParams } from "react-router-dom";

import "../scss/ProjectError.scss";
import { ProjectParams } from "./ProjectDetails";

type ProjectErrorProps = {
  isDarkMode: Boolean;
};

const ProjectError: React.FC<ProjectErrorProps> = ({ isDarkMode }) => {
  const { projectType, projectId } = useParams<ProjectParams>();

  return (
    <section
      className={`project-error container-fluid fs-5 ${
        isDarkMode ? "text-warning" : ""
      }`}
    >
      Error: Project (type: {projectType}, id: {projectId}) doesn't exist.
    </section>
  );
};

export default ProjectError;
