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
import GitHubAPI from "../../api/GitHubAPI";

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
  const projectsListRef = useRef(
    Array<HTMLUListElement | null>(Object.keys(projects).length)
  );

  // If a project were to blow up, format the numbers like 1K or 1M to fit them within the cards
  const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });

  const getGithubStats = useCallback(async () => {
    const newProjects = await GitHubAPI.getStats(projects);
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
      void getGithubStats();
      fetchedStats.current = true;
    }
  }, [getGithubStats, isDarkMode]);

  const scrollList = (index: number, scrollRight: boolean) => {
    const { current: projectsLists } = projectsListRef;
    if (projectsLists[index] === null) return;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const projectsList = projectsLists[index] as HTMLUListElement;

    // Scroll multiple cards if the viewport is wide enough
    const cardLength: number = 316;
    let cardsToScroll: number = Math.floor(
      projectsList.clientWidth / cardLength
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
    updateScrollButtonVisibility(projectsList);
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
        {(Object.keys(projects) as (keyof ProjectsJSON)[]).map(
          (type, index) => (
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
                            aria-label={`${showStatLabel(
                              "fork",
                              project.forks
                            )}`}
                          >
                            <FontAwesomeIcon icon={faCodeFork} />{" "}
                            {showStat(project.forks)}
                          </span>
                          <span
                            aria-label={`${showStatLabel(
                              "star",
                              project.stars
                            )}`}
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
  );
};

export default ProjectList;
