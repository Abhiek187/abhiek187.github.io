import React, { useState, useEffect, createRef } from "react";
import { Button, ButtonGroup, Form, FormCheck } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Route, Routes, useLocation } from "react-router-dom";
// import SwipeableRoutes from "react-swipeable-routes";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "../scss/App.scss";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

// Prop type passed to all the child components
export interface OnClickProp {
  onClickLink: (dest: string) => void;
  innerRef: React.RefObject<HTMLDivElement>;
}

// Possible transitions
export enum Transition {
  SlideLeft = "slide-left",
  SlideRight = "slide-right",
  Fade = "my-fade", // bootstrap took the fade class
}

const App: React.FC = () => {
  // Determines which animation to play when switching components
  const [transition, setTransition] = useState<Transition>(
    Transition.SlideLeft
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const nodeRef = createRef<HTMLDivElement>(); // removes the need for CSSTransition to call findDOMNode
  const location = useLocation();

  useEffect(() => {
    let navbar: HTMLElement | null = document.querySelector(".links");
    if (navbar === null) return;
    let navPosition: number = navbar.offsetTop;

    window.onscroll = () => {
      // If the scroll position is beyond the navbar, make it sticky
      navbar = document.querySelector(".links");
      if (navbar === null) return;
      // Don't set navPosition to 0
      navPosition = navbar.offsetTop === 0 ? navPosition : navbar.offsetTop;
      window.pageYOffset >= navPosition
        ? navbar.classList.add("sticky")
        : navbar.classList.remove("sticky");
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

  const htmlDecode = (input: string): string | null => {
    // Unescape HTML characters (https://stackoverflow.com/a/34064434)
    const doc: Document = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  const changeTransition = (dest: string) => {
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
      if (dest === "about") {
        setTransition(Transition.SlideRight);
      } else if (dest === "contact") {
        setTransition(Transition.SlideLeft);
      } else {
        setTransition(Transition.Fade);
      }
    }
  };

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      {/* Switch to toggle between light and dark mode */}
      <Form.Check type="switch" className="theme-container">
        <FormCheck.Label
          className="theme-label"
          htmlFor="theme-switch"
          aria-label={isDarkMode ? "dark mode on" : "dark mode off"}
        >
          {isDarkMode ? htmlDecode("&#x1F31C;") : htmlDecode("&#x1F31E;")}
        </FormCheck.Label>
        <FormCheck.Input
          type="checkbox"
          id="theme-switch"
          onClick={() => setIsDarkMode(!isDarkMode)}
        />
      </Form.Check>
      <header className="heading container-fluid">
        <h1 className="heading-name">Abhishek Chaudhuri</h1>
        <h2 className="heading-headline">
          Software Engineer | Always Learning and Growing
        </h2>
      </header>
      <ButtonGroup as="nav" className="links container-fluid">
        {/* Redirect routes without reloading the browser */}
        <LinkContainer to="about">
          <Button
            variant="danger"
            className="links-about"
            onClick={() => changeTransition("about")}
          >
            About
          </Button>
        </LinkContainer>
        <LinkContainer to="projects">
          <Button
            variant="warning"
            className="links-projects"
            onClick={() => changeTransition("projects")}
          >
            Projects
          </Button>
        </LinkContainer>
        <LinkContainer to="contact">
          <Button
            variant="success"
            className="links-contact"
            onClick={() => changeTransition("contact")}
          >
            Contact
          </Button>
        </LinkContainer>
      </ButtonGroup>
      <hr />
      <TransitionGroup
        className={`transition-group ${transition}`}
        data-testid="transition"
      >
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={transition === Transition.Fade ? 300 : 600}
          classNames="transition"
        >
          <Routes location={location}>
            {/* Ensure route works with any website url */}
            <Route
              path="/"
              element={
                /* Default page */
                <main className="home container-fluid" ref={nodeRef}>
                  <p className="home-info">
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
                    className={`error-message ${isDarkMode && "text-warning"}`}
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
      <footer className="foot container-fluid">
        <span className="foot-left">
          Made using{" "}
          <a
            className="foot-react"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <img
            className="foot-react-img"
            src="/img/logo.svg"
            alt="React logo (an atom)"
            width="20"
            height="20"
          />
        </span>
        <span className="foot-right">
          <a
            className="foot-mit"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Abhiek187/abhiek187.github.io/blob/main/LICENSE"
          >
            MIT License
          </a>{" "}
          Copyright &copy; 2019 Abhishek Chaudhuri
        </span>
      </footer>
    </div>
  );
};

export default App;
