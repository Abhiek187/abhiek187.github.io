import React, { useState, useEffect } from "react";
import {
  Route,
  Link,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
// import SwipeableRoutes from "react-swipeable-routes";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "../scss/App.scss";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

// Prop type passed to all the child components
export interface OnClickProp {
  onClickLink: (dest: string) => void;
}

// Possible sliding directions
export enum Direction {
  Left = "left",
  Right = "right",
}

const App: React.FC<RouteComponentProps> = ({ location }) => {
  // Determines which direction to slide the components
  const [slideDirection, setSlideDirection] = useState<Direction>(
    Direction.Left
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Change the title of the tab every page change
    if (window.location.pathname === "/") {
      document.title = "Abhishek Chaudhuri - Home";
    } else if (
      window.location.pathname !== "/about" &&
      window.location.pathname !== "/projects" &&
      window.location.pathname !== "/contact"
    ) {
      document.title = "Abhishek Chaudhuri - Error";
    }

    // Check where web scroll is for sticky navbar
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

  const htmlDecode = (input: string): string | null => {
    // Unescape HTML characters (https://stackoverflow.com/a/34064434)
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  const setSlider = (dest: string): void => {
    // Check where to slide the components
    if (window.location.pathname === "/contact") {
      // At Contact, always slide right
      setSlideDirection(Direction.Right);
    } else if (window.location.pathname === "/projects") {
      // At Projects, check which link was clicked
      if (dest === "about") {
        setSlideDirection(Direction.Right);
      } else {
        setSlideDirection(Direction.Left);
      }
    } else {
      // At About, always slide left (default)
      setSlideDirection(Direction.Left);
    }
  };

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      {/* Switch to toggle between light and dark mode */}
      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          {isDarkMode ? htmlDecode("&#x1F31C;") : htmlDecode("&#x1F31E;")}
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          onClick={() => setIsDarkMode(!isDarkMode)}
        />
      </div>
      <header className="heading container-fluid">
        <h1 className="heading-name">Abhishek Chaudhuri</h1>
        <h2 className="heading-headline">
          Software Engineer | Always Learning and Growing
        </h2>
      </header>
      <nav className="links container-fluid btn-group">
        {/* Redirect routes without reloading the browser */}
        <Link
          className="links-about btn btn-danger"
          to="/about"
          onClick={() => setSlider("about")}
        >
          About
        </Link>
        <Link
          className="links-projects btn btn-warning"
          to="/projects"
          onClick={() => setSlider("projects")}
        >
          Projects
        </Link>
        <Link
          className="links-contact btn btn-success"
          to="/contact"
          onClick={() => setSlider("contact")}
        >
          Contact
        </Link>
      </nav>
      <hr />
      <TransitionGroup
        className={`transition-group ${slideDirection}`}
        data-testid="transition"
      >
        <CSSTransition
          key={location.key}
          timeout={{ enter: 600, exit: 600 }}
          classNames={"slide"}
        >
          <Switch location={location}>
            {/* Ensure route works with any website url */}
            <Route exact path={`${process.env.PUBLIC_URL}/`}>
              {/* Default page */}
              <main className="home container-fluid">
                <p className="home-info">
                  Hello and welcome to my website! Please click the links above
                  to learn more about me.
                </p>
              </main>
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/about`}>
              <About onClickLink={setSlider} />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/projects`}>
              <Projects onClickLink={setSlider} isDarkMode={isDarkMode} />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/contact`}>
              <Contact onClickLink={setSlider} />
            </Route>
            {/* Ignore paths that take you to other repos, otherwise redirect to error page */}
            <Route>
              <main className="error container-fluid">
                <p className="error-message text-danger">
                  Whoops! That path is invalid. Please click the links above.
                </p>
              </main>
            </Route>
          </Switch>
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
            href="https://github.com/Abhiek187/abhiek187.github.io/blob/dev/LICENSE"
          >
            MIT License
          </a>{" "}
          Copyright &copy; 2019 Abhishek Chaudhuri
        </span>
      </footer>
    </div>
  );
};

export default withRouter(App); // Get access to match, location, and history
