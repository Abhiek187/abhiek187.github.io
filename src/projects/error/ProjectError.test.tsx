import { render, screen } from "@testing-library/react";
import { vi, expect } from "vitest";

import ProjectError from "./ProjectError";
import { ProjectParams } from "../details/ProjectDetails";

// Mocks are hoisted at the beginning of the file
const mocks = vi.hoisted<{ projectParams: ProjectParams }>(() => ({
  projectParams: {
    projectType: "other",
    projectId: "mock-project",
  },
}));

vi.mock("react-router-dom", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-router-dom")>()),
  useParams: vi.fn(() => mocks.projectParams),
}));

describe("Project Error", () => {
  it.each([true, false])(
    "shows the project type and ID in the error",
    (isDarkMode: boolean) => {
      render(<ProjectError isDarkMode={isDarkMode} />);

      expect(
        screen.getByText(
          `Error: Project (type: ${mocks.projectParams.projectType}, id: ${mocks.projectParams.projectId}) doesn't exist.`
        )
      ).toBeInTheDocument();
    }
  );
});
