import {
  faArrowLeft,
  faEye,
  faCodeFork,
  faStar,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import styles from "./ProjectList.module.scss";
import projectData from "../projects.json";
import Page from "../../enums/Page";
import capitalize from "../../utils/capitalize";
import { OnClickProp } from "../../app/App";

// Type definitions of the JSON files
export interface Project {
  id: string;
  name: string;
  image: string;
  gif: string | null;
  about: string;
  technology: string[];
  website: string | null;
  repo: string;
  watchers?: number;
  forks?: number;
  stars?: number;
}

export type ProjectTypes = "ios" | "android" | "web" | "other";
export type ProjectsJSON = Record<ProjectTypes, Project[]>; // record === dictionary/hashmap

type ProjectListProps = OnClickProp & {
  isDarkMode: boolean;
};

const ProjectList: React.FC<ProjectListProps> = ({
  onClickLink,
  innerRef,
  isDarkMode,
}) => {
  // Set the type of the imported JSON
  const [projects, setProjects] = useState(projectData as ProjectsJSON);
  const fetchedStats = useRef<boolean>(false);

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
    // Dynamically import Octokit to chunk the build
    const { Octokit } = await import("octokit");
    const octokit = new Octokit();

    // Get the response type of the endpoint being called
    type UserRepos = Endpoints["GET /repos/{owner}/{repo}"]["response"];
    const reqs: Promise<UserRepos>[] = [];
    const flatProjects: Project[] = [];

    for (const projectType of Object.keys(projects) as ProjectTypes[]) {
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

    for (const projectType of Object.keys(projects) as ProjectTypes[]) {
      for (let i = 0; i < projects[projectType].length; i++) {
        newProjects[projectType][i] = flatProjects[pi];
        pi++;
      }
    }

    setProjects(newProjects);
  }, [projects]);

  useEffect(() => {
    document.title = "Abhishek Chaudhuri - Projects";

    // Hide the scrolling buttons if possible on startup
    for (const list of projectsListRef.current) {
      if (list !== null && list !== undefined) {
        updateScrollButtonVisibility(list);
      }
    }

    // Only fetch the stats once when the component loads
    if (!fetchedStats.current) {
      getGithubStats();
      fetchedStats.current = true;
    }
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
    projectsLists[index]?.scrollBy({
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

  // Show a hyphen as a placeholder until the number is fetched
  const showStat = (stat?: number): string =>
    stat === undefined ? "-" : numberFormatter.format(stat);

  // Can't do short-circuiting since 0 is falsy
  // Note that unit should be singular to pluralize it correctly
  const showStatLabel = (unit: string, stat?: number): string =>
    (stat === undefined ? "blank" : stat.toString()) +
    " " +
    (stat === 1 ? unit : `${unit}s`);

  return (
    <div ref={innerRef}>
      <ul className={styles["full-list"]}>
        {(Object.keys(projects) as [ProjectTypes]).map((type, index) => (
          /* Each list item needs a key */
          <li key={type} className="projects-type-list">
            {/* Apple does what others don't */}
            <h4 className="projects-type">
              {type === "ios" ? "iOS" : capitalize(type)}
            </h4>
            {/* Show a horizontal list of cards */}
            <div className={styles["scrolling-list"]}>
              <Button
                variant={isDarkMode ? "info" : "primary"}
                type="button"
                className={styles["scroll-left"]}
                onClick={() => scrollList(index, false)}
                aria-label={`Scroll ${type} projects left`}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <ul
                className={styles.list}
                ref={(el) => (projectsListRef.current[index] = el)}
                onScroll={(event) =>
                  updateScrollButtonVisibility(event.target as HTMLUListElement)
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
                      className={`${styles.link} ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                      onClick={() => onClickLink(Page.ProjectDetails)}
                      aria-label={`Card for ${project.name}, click to learn more`}
                    >
                      <Card.Title as="h5" className={`${styles.name} m-2`}>
                        {project.name}
                      </Card.Title>
                      {/* Specifying the width and height will reduce CLS (2:3 for portrait) */}
                      <Card.Img
                        variant="top"
                        className={`${styles.image} mx-auto`}
                        src={project.image}
                        alt={`Screenshot of ${project.name}`}
                        width="280"
                        height="420"
                      />
                      <Card.Text className="projects-about mx-1 my-2">
                        {project.about}
                      </Card.Text>
                      <Card.Footer className="projects-footer mx-0">
                        <span
                          aria-label={`${showStatLabel(
                            "watcher",
                            project.watchers
                          )}`}
                        >
                          <FontAwesomeIcon icon={faEye} />{" "}
                          {showStat(project.watchers)}
                        </span>
                        <span
                          aria-label={`${showStatLabel("fork", project.forks)}`}
                        >
                          <FontAwesomeIcon icon={faCodeFork} />{" "}
                          {showStat(project.forks)}
                        </span>
                        <span
                          aria-label={`${showStatLabel("star", project.stars)}`}
                        >
                          <FontAwesomeIcon icon={faStar} />{" "}
                          {showStat(project.stars)}
                        </span>
                      </Card.Footer>
                    </Link>
                  </Card>
                ))}
              </ul>
              <Button
                variant={isDarkMode ? "info" : "primary"}
                type="button"
                className={styles["scroll-right"]}
                onClick={() => scrollList(index, true)}
                aria-label={`Scroll ${type} projects right`}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
            <hr />
          </li>
        ))}
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
  );
};

export default ProjectList;
