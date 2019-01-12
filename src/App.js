import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

let navbar;
let navPosition;

class App extends Component {
  componentDidMount() {
    // Change title of tab every page change
    if (window.location.pathname === '/')
      document.querySelector('title').textContent = 'Abhishek Chaudhuri - Home';
    else if (window.location.pathname !== '/about' && window.location.pathname !== '/projects' &&
      window.location.pathname !== '/contact' && window.location.pathname !== '/Memory-Game' &&
      window.location.pathname !== '/frontend-nanodegree-arcade-game' &&
      window.location.pathname !== '/Neighborhood-Map')
      document.querySelector('title').textContent = 'Abhishek Chaudhuri - Error';
    // Check where web scroll is for sticky navbar
    navbar = document.querySelector('.links');
    navPosition = navbar.offsetTop;
  }

  checkScroll = () => {
    // If scroll position is beyond the navbar, make it sticky
    navbar = document.querySelector('.links');
    // Don't set navPosition to 0
    navPosition = navbar.offsetTop === 0 ? navPosition : navbar.offsetTop;
    window.pageYOffset >= navPosition ?
      navbar.classList.add('sticky') : navbar.classList.remove('sticky');
  };

  render() {
    window.onscroll = this.checkScroll;

    return (
      <div className="App">
        <header className="heading">
          <h1 className="heading-name" tabIndex={0}>Abhishek Chaudhuri</h1>
          {/* Add tabIndex to important information */}
          <h2 className="heading-headline" tabIndex={0}>
            Computer Engineering & Science Student at Rutgers University - New Brunswick
          </h2>
        </header>
        <nav className="links">
          <a className="links-about" href="/about">About</a>
          <a className="links-projects" href="/projects">Projects</a>
          <a className="links-contact" href="/contact">Contact</a>
        </nav>
        <hr/>
        {/* Ensure route works with any website url */}
        <Route exact path={process.env.PUBLIC_URL + '/'} render={() => (
          /* Default page */
          <main className="home">
            <p className="home-info" tabIndex={0}>
              Hello and welcome to my website! Please click the links above for more info about me.
            </p>
          </main>
        )}/>
        <Route path={process.env.PUBLIC_URL + '/about'} render={() => (
          <About/>
        )}/>
        <Route path={process.env.PUBLIC_URL + '/projects'} render={() => (
          <Projects/>
        )}/>
        <Route path={process.env.PUBLIC_URL + '/contact'} render={() => (
          <Contact/>
        )}/>
        {/* Ignore paths that take you to other repos, otherwise redirect to error page */}
        {window.location.pathname !== '/' && window.location.pathname !== '/about' &&
          window.location.pathname !== '/projects' && window.location.pathname !== '/contact' &&
          window.location.pathname !== '/Memory-Game' &&
          window.location.pathname !== '/frontend-nanodegree-arcade-game' &&
          window.location.pathname !== '/Neighborhood-Map' && <Route render={() => (
          <main className="error">
            <p className="error-message" tabIndex={0}>
              Whoops! That path is invalid. Please click the links above.
            </p>
          </main>
        )}/>}
        <hr/>
        <footer className="foot">
          <span className="foot-left">
            Made using <a className="foot-react" href="https://reactjs.org/" target="_blank"
              rel="noopener noreferrer">React</a>
            <img className="foot-react-img" src="/img/logo.svg" alt="React logo (an atom)"/>
          </span>
          <span className="foot-right">
            <a className="foot-mit" target="_blank" rel="noopener noreferrer"
              href="https://github.com/Abhiek187/abhiek187.github.io/blob/dev/LICENSE">
              MIT License</a> Copyright (c) 2019 Abhishek Chaudhuri
          </span>
        </footer>
      </div>
    );
  }
}

export default App;
