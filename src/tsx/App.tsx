import React, { useState, useEffect } from "react";
import {
  Route,
  Link,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
//import SwipeableRoutes from 'react-swipeable-routes';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "../scss/App.scss";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

// Prop type passed to all the child components
export interface OnClickProp {
  onClickLink: (dest: string) => void;
}

const App: React.FC<RouteComponentProps> = ({ location }) => {
  // Determines which direction to slide the components
  const [slideDirection, setSlideDirection] = useState<string>("left");

  useEffect(() => {
    // Change the title of the tab every page change
    if (window.location.pathname === "/") {
      document.title = "Abhishek Chaudhuri - Home";
    } else if (
      window.location.pathname !== "/about" &&
      window.location.pathname !== "/projects" &&
      window.location.pathname !== "/contact" &&
      window.location.pathname !== "/Memory-Game" &&
      window.location.pathname !== "/frontend-nanodegree-arcade-game" &&
      window.location.pathname !== "/Neighborhood-Map"
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

  const setSlider = (dest: string): void => {
    // Check where to slide the components
    if (window.location.pathname === "/contact") {
      // At Contact, always slide right
      setSlideDirection("right");
    } else if (window.location.pathname === "/projects") {
      // At Projects, check which link was clicked
      if (dest === "about") {
        setSlideDirection("right");
      } else {
        setSlideDirection("left");
      }
    } else {
      // At About, always slide left (default)
      setSlideDirection("left");
    }
  };

  return (
    <div className="App">
      <header className="heading container-fluid">
        <h1 className="heading-name" tabIndex={0}>
          Abhishek Chaudhuri
        </h1>
        {/* Add tabIndex to important information */}
        <h2 className="heading-headline" tabIndex={0}>
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
      <TransitionGroup className={`transition-group ${slideDirection}`}>
        <CSSTransition
          key={location.key}
          timeout={{ enter: 600, exit: 600 }}
          classNames={"slide"}
        >
          <Switch location={location}>
            {/* Ensure route works with any website url */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              render={() => (
                /* Default page */
                <main className="home container-fluid">
                  <p className="home-info" tabIndex={0}>
                    Hello and welcome to my website! Please click the links
                    above to learn more about me.
                  </p>
                </main>
              )}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/about`}
              render={() => <About onClickLink={setSlider} />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/projects`}
              render={() => <Projects onClickLink={setSlider} />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/contact`}
              render={() => <Contact onClickLink={setSlider} />}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      {/* Ignore paths that take you to other repos, otherwise redirect to error page */}
      {window.location.pathname !== "/" &&
        window.location.pathname !== "/about" &&
        window.location.pathname !== "/projects" &&
        window.location.pathname !== "/contact" &&
        window.location.pathname !== "/Memory-Game" &&
        window.location.pathname !== "/frontend-nanodegree-arcade-game" &&
        window.location.pathname !== "/Neighborhood-Map" && (
          <Route
            render={() => (
              <main className="error container-fluid">
                <p className="error-message text-danger" tabIndex={0}>
                  Whoops! That path is invalid. Please click the links above.
                </p>
              </main>
            )}
          />
        )}
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
