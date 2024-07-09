import { Endpoints } from "@octokit/types";

import { Project, ProjectsJSON } from "../projects/list/ProjectList";

export default class GitHubAPI {
  /**
   * Call the GitHub API for each project in parallel
   *
   * Rate limit of 60/hr w/o a token and 5000/hr with a token
   *
   * https://docs.github.com/en/rest/overview/resources-in-the-rest-api#requests-from-personal-accounts
   * @param projects the list of projects
   * @returns a new list of projects with watchers, forks, and stars populated
   */
  static async getStats(projects: ProjectsJSON): Promise<ProjectsJSON> {
    // Dynamically import Octokit to chunk the build
    const { Octokit } = await import("@octokit/core");
    const octokit = new Octokit();

    // Get the response type of the endpoint being called
    type UserRepos = Endpoints["GET /repos/{owner}/{repo}"]["response"];
    const reqs: Promise<UserRepos>[] = [];
    const flatProjects: Project[] = [];

    for (const projectType of Object.keys(projects) as (keyof ProjectsJSON)[]) {
      for (const project of projects[projectType]) {
        // Get the repo name from the end of the repo URL
        const repoSplit = project.repo.split("/");
        const repoName = repoSplit[repoSplit.length - 1];

        const req = octokit.request("GET /repos/{owner}/{repo}", {
          owner: "Abhiek187",
          repo: repoName,
        });
        reqs.push(req);
        flatProjects.push(project);
      }
    }

    // Then collect all the results and display for each project
    // Promise.all fails fast, while allSettled will handle all promises
    const resps = await Promise.allSettled(reqs);

    resps.forEach((resp, i) => {
      if (resp.status === "rejected") {
        console.error(resp.reason);
      } else {
        // Assign each project with its corresponding stats
        const { data } = resp.value;
        flatProjects[i].watchers = data.subscribers_count;
        flatProjects[i].forks = data.forks; // can also use forks_count or network_count
        // Stars used to be called watchers on GitHub
        flatProjects[i].stars = data.watchers; // can also use stargazers_count or watchers_counts
      }
    });

    // Map flatProjects to a new projects state
    let pi = 0;
    const newProjects = { ...projects };

    for (const projectType of Object.keys(projects) as (keyof ProjectsJSON)[]) {
      for (let i = 0; i < projects[projectType].length; i++) {
        newProjects[projectType][i] = flatProjects[pi];
        pi++;
      }
    }

    return newProjects;
  }
}
