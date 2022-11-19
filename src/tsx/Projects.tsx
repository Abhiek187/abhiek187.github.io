import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Endpoints } from "@octokit/types";
import { Octokit } from "octokit";
import React, { useCallback, useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";

import "../scss/Projects.scss";
import projectData from "../models/projects.json";
import { OnClickProp, Page } from "./App";
import ProjectDetails from "./ProjectDetails";
import ProjectError from "./ProjectError";

// Type definitions of the JSON files
export interface Project {
  id: string;
  name: string;
  image: string;
  gif: string | null;
  about: string;
  technology: [string];
  website: string | null;
  repo: string;
}

export type ProjectTypes = "ios" | "android" | "web" | "other";
export type ProjectsJSON = Record<ProjectTypes, [Project]>; // record === dictionary/hashmap

// Extend the OnClickProp interface
type ProjectsProps = OnClickProp & {
  isDarkMode: boolean;
};

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const Projects: React.FC<ProjectsProps> = ({
  onClickLink,
  innerRef,
  isDarkMode,
}) => {
  // Set the type of the imported JSON
  const projects = projectData as ProjectsJSON;
  // Save a reference to each project list
  const projectsListRef = useRef<(HTMLUListElement | null)[]>(
    Array(Object.keys(projects).length)
  );

  // If a project were to blow up, format the numbers like 1K or 1M to fit them within the cards
  const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });

  const getGithubStats = useCallback(async () => {
    // Call the GitHub API for each project in parallel
    // Rate limit of 60/hr w/o a token and 5000/hr with a token
    // https://docs.github.com/en/rest/overview/resources-in-the-rest-api#requests-from-personal-accounts
    const octokit = new Octokit();

    // Get the response type of the endpoint being called
    type UserRepos = Endpoints["GET /repos/{owner}/{repo}"]["response"];
    const reqs: Promise<UserRepos>[] = [];

    for (const projectType of Object.keys(projects) as [ProjectTypes]) {
      for (const project of projects[projectType]) {
        // Get the repo name from the end of the repo URL
        const repoSplit = project.repo.split("/");
        const repoName = repoSplit[repoSplit.length - 1];

        const req = octokit.request("GET /repos/{owner}/{repo}", {
          owner: "Abhiek187",
          repo: repoName,
        });
        reqs.push(req);
      }
    }

    // Then collect all the results and display for each project
    // Promise.all fails fast, while allSettled will handle all promises
    const resps = await Promise.allSettled(reqs);

    for (const resp of resps) {
      if (resp.status === "rejected") {
        console.error(resp.reason);
        return;
      }

      const { data } = resp.value;
      const watchers = data.subscribers_count;
      const forks = data.forks; // can also use forks_count or network_count
      // Stars used to be called watchers on GitHub
      const stars = data.watchers; // can also use stargazers_count or watchers_count

      console.log(`${watchers} watchers, ${forks} forks, and ${stars} stars`);
    }
  }, [projects]);

  useEffect(() => {
    document.title = "Abhishek Chaudhuri - Projects";

    // Hide the scrolling buttons if possible on startup
    for (const list of projectsListRef.current) {
      if (list !== null && list !== undefined) {
        updateScrollButtonVisibility(list);
      }
    }

    //getGithubStats();
  }, [getGithubStats, isDarkMode]);

  const scrollList = (index: number, scrollRight: boolean) => {
    const { current: projectsLists } = projectsListRef;
    if (projectsLists[index] === null) return;

    // Scroll multiple cards if the viewport is wide enough
    const cardLength: number = 316;
    let cardsToScroll: number = Math.floor(
      projectsLists[index]!.clientWidth / cardLength
    );

    if (cardsToScroll === 0) {
      cardsToScroll = 1; // still scroll if the full card doesn't fit in the viewport
    }

    // The cards have a width of 300px + 8px * 2 of margin
    projectsLists[index]!.scrollBy({
      top: 0,
      left: scrollRight
        ? cardsToScroll * cardLength
        : -cardsToScroll * cardLength,
      behavior: "smooth",
    });

    // Call this in case onScroll isn't triggered
    updateScrollButtonVisibility(projectsLists[index]!);
  };

  const updateScrollButtonVisibility = (projectsList: HTMLUListElement) => {
    const leftScrollingButton =
      projectsList.previousElementSibling as HTMLButtonElement | null;
    const rightScrollingButton =
      projectsList.nextElementSibling as HTMLButtonElement | null;

    // Hide the scrolling buttons if the user can't scroll in that direction
    if (projectsList.scrollLeft === 0) {
      leftScrollingButton?.classList.add("d-none");
    } else {
      leftScrollingButton?.classList.remove("d-none");
    }

    if (
      Math.abs(
        projectsList.scrollLeft +
          projectsList.clientWidth -
          projectsList.scrollWidth
      ) <= 1
    ) {
      rightScrollingButton?.classList.add("d-none");
    } else {
      rightScrollingButton?.classList.remove("d-none");
    }
  };

  return (
    <main className="projects container-fluid" ref={innerRef}>
      <Link
        className="arrow-left"
        to="/about"
        aria-label="Go to About"
        onClick={() => onClickLink(Page.About)}
      >
        <FontAwesomeIcon icon={solid("arrow-left")} />
      </Link>
      <div className="projects-wrapper">
        <h3 className="projects-heading">Projects</h3>
        {/* Show either all projects or an individual project */}
        <Routes>
          <Route
            path="/"
            element={
              <div ref={innerRef}>
                <ul className="projects-full-list">
                  {(Object.keys(projects) as [ProjectTypes]).map(
                    (type, index) => (
                      /* Each list item needs a key */
                      <li key={type} className="projects-type-list">
                        {/* Apple does what others don't */}
                        <h4 className="projects-type">
                          {type === "ios" ? "iOS" : capitalize(type)}
                        </h4>
                        {/* Show a horizontal list of cards */}
                        <div className="projects-scrolling-list">
                          <Button
                            variant={isDarkMode ? "info" : "primary"}
                            type="button"
                            className="projects-scroll-left"
                            onClick={() => scrollList(index, false)}
                            aria-label={`Scroll ${type} projects left`}
                          >
                            <FontAwesomeIcon icon={solid("arrow-left")} />
                          </Button>
                          <ul
                            className="projects-list"
                            ref={(el) => (projectsListRef.current[index] = el)}
                            onScroll={(event) =>
                              updateScrollButtonVisibility(
                                event.target as HTMLUListElement
                              )
                            }
                          >
                            {projects[type].map((project) => (
                              <Card
                                key={project.id}
                                as="li"
                                className={`${
                                  isDarkMode
                                    ? "bg-dark border-light"
                                    : "bg-light border-dark"
                                }`}
                              >
                                {/* View more details about each project by clicking on the card */}
                                <Link
                                  to={`${type}/${project.id}`}
                                  state={{ from: window.location.hash }}
                                  className={`projects-link ${
                                    isDarkMode ? "text-light" : "text-dark"
                                  }`}
                                  onClick={() =>
                                    onClickLink(Page.ProjectDetails)
                                  }
                                  aria-label={`Card for ${project.name}, click to learn more`}
                                >
                                  <Card.Title
                                    as="h5"
                                    className="projects-name m-2"
                                  >
                                    {project.name}
                                  </Card.Title>
                                  {/* Specifying the width and height will reduce CLS (2:3 for portrait) */}
                                  <Card.Img
                                    variant="top"
                                    className="projects-image mx-auto"
                                    src={project.image}
                                    alt={`Screenshot of ${project.name}`}
                                    width="280"
                                    height="420"
                                  />
                                  <Card.Text className="projects-about mx-1 my-2">
                                    {project.about}
                                  </Card.Text>
                                  <Card.Footer className="projects-footer mx-0">
                                    <span aria-label="blank watchers">
                                      <FontAwesomeIcon icon={solid("eye")} />{" "}
                                      {numberFormatter.format(888e6)}
                                    </span>
                                    <span aria-label="blank forks">
                                      <FontAwesomeIcon
                                        icon={solid("code-fork")}
                                      />{" "}
                                      {numberFormatter.format(888e6)}
                                    </span>
                                    <span aria-label="blank stars">
                                      <FontAwesomeIcon icon={solid("star")} />{" "}
                                      {numberFormatter.format(888e6)}
                                    </span>
                                  </Card.Footer>
                                </Link>
                              </Card>
                            ))}
                          </ul>
                          <Button
                            variant={isDarkMode ? "info" : "primary"}
                            type="button"
                            className="projects-scroll-right"
                            onClick={() => scrollList(index, true)}
                            aria-label={`Scroll ${type} projects right`}
                          >
                            <FontAwesomeIcon icon={solid("arrow-right")} />
                          </Button>
                        </div>
                        <hr />
                      </li>
                    )
                  )}
                </ul>
                <p className="projects-addendum">
                  P.S. Check out the{" "}
                  <a
                    className="projects-github-link"
                    href="https://github.com/Abhiek187/abhiek187.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub repo for My Portfolio Website"
                  >
                    GitHub repo
                  </a>{" "}
                  for this website as well.
                </p>
              </div>
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
        <FontAwesomeIcon icon={solid("arrow-right")} />
      </Link>
    </main>
  );
};

export default Projects;
