import React, { useState, useEffect, createRef, useRef } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import { LinkContainer } from "react-router-bootstrap";
import { Route, Routes, useLocation } from "react-router-dom";
// import SwipeableRoutes from "react-swipeable-routes";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import styles from "./App.module.scss";
import About from "../about/About";
import Projects from "../projects/Projects";
import Contact from "../contact/Contact";
import Page from "../enums/Page";
import Transition from "../enums/Transition";

// Prop type passed to all the child components
export interface OnClickProp {
  onClickLink: (dest: Page) => void;
  innerRef: React.RefObject<HTMLDivElement>;
}

const App: React.FC = () => {
  // Determines which animation to play when switching components
  const [transition, setTransition] = useState<Transition>(
    Transition.SlideLeft
  );
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useState<boolean>(prefersDark);
  const nodeRef = createRef<HTMLDivElement>(); // removes the need for CSSTransition to call findDOMNode
  const location = useLocation();

  // DOM elements
  const navbar = useRef<HTMLDivElement>(null);
  const linkAbout = useRef<HTMLButtonElement>(null);
  const linkProjects = useRef<HTMLButtonElement>(null);
  const linkContact = useRef<HTMLButtonElement>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (navbar.current === null) return;
    let navPosition: number = navbar.current.offsetTop;

    window.onscroll = () => {
      // If the scroll position is beyond the navbar, make it sticky
      if (navbar.current === null) return;
      // Don't set navPosition to 0
      navPosition =
        navbar.current.offsetTop === 0 ? navPosition : navbar.current.offsetTop;
      window.scrollY >= navPosition
        ? navbar.current.classList.add(styles.sticky)
        : navbar.current.classList.remove(styles.sticky);
    };
  }, []); // only componentDidMount()

  useEffect(() => {
    // Change the title of the tab every page change
    // useLocation() ignores the hash at the beginning
    if (location.pathname === "/") {
      document.title = "Abhishek Chaudhuri - Home";
    } else if (
      location.pathname !== "/about" &&
      location.pathname !== "/projects" &&
      location.pathname !== "/contact"
    ) {
      document.title = "Abhishek Chaudhuri - Error";
    }
  }, [location]);

  const changeTransition = (dest: Page) => {
    const source: string = location.pathname;

    // Check how to transition between components based on the source and destination
    if (source === "/") {
      // At Home, always fade
      setTransition(Transition.Fade);
    } else if (source === "/contact") {
      // At Contact, always slide right
      setTransition(Transition.SlideRight);
    } else if (source === "/about") {
      // At About, always slide left
      setTransition(Transition.SlideLeft);
    } else {
      // At Projects, check which link was clicked
      if (dest === Page.About) {
        setTransition(Transition.SlideRight);
      } else if (
        dest === Page.Contact ||
        (dest === Page.Projects && source === "/projects")
      ) {
        setTransition(Transition.SlideLeft);
      } else {
        setTransition(Transition.Fade);
      }
    }
  };

  return (
    <div className={`${styles.app} ${isDarkMode ? styles.dark : ""}`}>
      {/* Switch to toggle between light and dark mode */}
      <Form.Check type="switch" className={styles["theme-container"]}>
        <FormCheck.Label
          className={styles["theme-label"]}
          htmlFor={styles["theme-switch"]}
          aria-label={isDarkMode ? "dark mode on" : "dark mode off"}
        >
          {isDarkMode ? "🌜" : "🌞"}
        </FormCheck.Label>
        <FormCheck.Input
          type="checkbox"
          id={styles["theme-switch"]}
          onClick={() => setIsDarkMode(!isDarkMode)}
        />
      </Form.Check>
      <header className={`${styles.heading} container-fluid`}>
        <h1 className={styles.name}>Abhishek Chaudhuri</h1>
        <h2 className={styles.headline}>
          Software Engineer | Always Learning and Growing
        </h2>
      </header>
      <ButtonGroup
        as="nav"
        // role is implied by <nav> as "navigation", not "group"
        role=""
        className={`${styles.links} container-fluid`}
        ref={navbar}
      >
        {/* Redirect routes without reloading the browser */}
        <LinkContainer to="about">
          <Button
            variant="danger"
            className="links-about"
            ref={linkAbout}
            onClick={() => {
              changeTransition(Page.About);
              linkAbout.current?.classList.add("active");
              linkProjects.current?.classList.remove("active");
              linkContact.current?.classList.remove("active");
            }}
          >
            About
          </Button>
        </LinkContainer>
        <LinkContainer to="projects">
          <Button
            variant="warning"
            className="links-projects"
            ref={linkProjects}
            onClick={() => {
              changeTransition(Page.Projects);
              linkAbout.current?.classList.remove("active");
              linkProjects.current?.classList.add("active");
              linkContact.current?.classList.remove("active");
            }}
          >
            Projects
          </Button>
        </LinkContainer>
        <LinkContainer to="contact">
          <Button
            variant="success"
            className="links-contact"
            ref={linkContact}
            onClick={() => {
              changeTransition(Page.Contact);
              linkAbout.current?.classList.remove("active");
              linkProjects.current?.classList.remove("active");
              linkContact.current?.classList.add("active");
            }}
          >
            Contact
          </Button>
        </LinkContainer>
      </ButtonGroup>
      <hr />
      <TransitionGroup
        className={`${styles["transition-group"]} ${transition}`}
        data-testid="transition"
      >
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={600}
          classNames="transition"
        >
          <Routes location={location}>
            {/* Ensure route works with any website url */}
            <Route
              path="/"
              element={
                /* Default page */
                <main className="home container-fluid" ref={nodeRef}>
                  <p className={styles["home-info"]}>
                    Hello and welcome to my website! Please click the links
                    above to learn more about me.
                  </p>
                </main>
              }
            />
            <Route
              path="about"
              element={
                <About onClickLink={changeTransition} innerRef={nodeRef} />
              }
            />
            <Route
              path="projects/*"
              element={
                <Projects
                  onClickLink={changeTransition}
                  isDarkMode={isDarkMode}
                  innerRef={nodeRef}
                />
              }
            />
            <Route
              path="contact"
              element={
                <Contact
                  onClickLink={changeTransition}
                  isDarkMode={isDarkMode}
                  innerRef={nodeRef}
                />
              }
            />
            {/* Ignore paths that take you to other repos, otherwise redirect to error page */}
            <Route
              path="*"
              element={
                <main className="error container-fluid" ref={nodeRef}>
                  <p
                    className={`${styles["error-message"]} ${
                      isDarkMode && "text-warning"
                    }`}
                  >
                    Whoops! That path is invalid. Please click the links above.
                  </p>
                </main>
              }
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <hr />
      <footer className={`${styles.foot} container-fluid`}>
        <span className={styles["foot-left"]}>
          Made using{" "}
          <a
            className={styles.react}
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <img
            className={styles["react-img"]}
            src="/img/logo.svg"
            alt="React logo (an atom)"
            width="20"
            height="20"
          />
        </span>
        <span className={styles["foot-right"]}>
          <a
            className={styles.mit}
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Abhiek187/abhiek187.github.io/blob/main/LICENSE"
          >
            MIT License
          </a>{" "}
          Copyright &copy; 2019 - {currentYear} Abhishek Chaudhuri
        </span>
      </footer>
    </div>
  );
};

export default App;
