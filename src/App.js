import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

class App extends Component {
  render() {
    document.getElementsByTagName('title')[0].textContent = 'Abhishek Chaudhuri - Home';

    return (
      <div className="App">
        <header className="heading">
          <h1 className="heading-name">Abhishek Chaudhuri</h1>
          <h2 className="heading-headline">
            Computer Engineering & Science Student at Rutgers University - New Brunswick
          </h2>
        </header>
        <nav className="links">
          <a className="links-about" href="/about">About</a>
          <a className="links-projects" href="/projects">Projects</a>
          <a className="links-contact" href="/contact">Contact</a>
        </nav>
        <hr/>
        <Route exact path="/" render={() => (
          <main className="home">
            <p className="home-info">
              Hello and welcome to my website! Please click the links above for more info about me.
            </p>
          </main>
        )}/>
        <Route path="/about" render={() => (
          <About/>
        )}/>
        <Route path="/projects" render={() => (
          <Projects/>
        )}/>
        <Route path="/contact" render={() => (
          <Contact/>
        )}/>
        <hr/>
        <footer className="foot">
          <span className="foot-left">
            Made using <a className="foot-react" href="https://reactjs.org/" target="_blank"
              rel="noopener noreferrer">React</a>
            <img className="foot-react-img" src="/img/logo.svg" alt="React logo (an atom)"/>
          </span>
          <span className="foot-right">
            <a className="foot-mit" target="_blank" rel="noopener noreferrer"
              href="https://github.com/Abhiek187/abhiek187.github.io/blob/master/LICENSE">
              MIT License</a> Copyright (c) 2019 Abhishek Chaudhuri
          </span>
        </footer>
      </div>
    );
  }
}

export default App;
