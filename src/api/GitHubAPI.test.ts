import { describe, expect, it, vi } from "vitest";

import GitHubAPI from "./GitHubAPI";
import { ProjectsJSON } from "../projects/list/ProjectList";
import projectsData from "../projects/projects.json";

const requestMock = vi.fn();

vi.mock("@octokit/core", () => ({
  Octokit: vi.fn(() => ({
    request: requestMock,
  })),
}));

describe("GitHubAPI", () => {
  it("should populate the project stats correctly", async () => {
    const projects: ProjectsJSON = projectsData;
    const mockResponse = {
      data: {
        subscribers_count: 10,
        forks: 5,
        watchers: 15,
      },
    };

    for (const projectType of Object.keys(projects) as (keyof ProjectsJSON)[]) {
      projects[projectType].forEach(() => {
        requestMock.mockResolvedValueOnce(mockResponse);
      });
    }

    const newProjects = await GitHubAPI.getStats(projects);

    for (const projectType of Object.keys(projects) as (keyof ProjectsJSON)[]) {
      for (const newProject of newProjects[projectType]) {
        expect(newProject.watchers).toBe(mockResponse.data.subscribers_count);
        expect(newProject.forks).toBe(mockResponse.data.forks);
        expect(newProject.stars).toBe(mockResponse.data.watchers);

        const repoSplit = newProject.repo.split("/");
        const repoName = repoSplit[repoSplit.length - 1];
        expect(requestMock).toHaveBeenCalledWith("GET /repos/{owner}/{repo}", {
          owner: "Abhiek187",
          repo: repoName,
        });
      }
    }
  });
});
