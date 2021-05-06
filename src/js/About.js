import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../css/About.css';

const About = ({ onClickLink }) => {
  useEffect(() => {
    document.title = 'Abhishek Chaudhuri - About';
    document.querySelector('.links-about').classList.add('active');
    document.querySelector('.links-projects').classList.remove('active');
    document.querySelector('.links-contact').classList.remove('active');
  }, []);

  const bio = "Abhishek Chaudhuri is a recent graduate of Rutgers University-New Brunswick. " +
    "He studied Electrical & Computer Engineering as an undergraduate and Software Engineering " +
    "as a graduate. His interests include machine learning and front-end web and mobile " +
    "development (with plans of expanding to full-stack development). Some of his hobbies include " +
    "exercising, playing the flute, and playing video games. His ultimate goal in life is to " +
    "improve society by bringing innovation to a collaborative environment. He can put his " +
    "technical skills to good use by gaining experience and constantly growing from other " +
    "companies that value his ambitions.";

  return (
    <main className="about container-fluid">
      <div className="about-wrapper">
        <h3 className="about-heading" tabIndex={0}>About</h3>
        <div className="about-container">
          <img className="about-headshot" tabIndex={0}
            src="/img/Headshot.png" alt="Headshot of Abhishek"/>
          <p className="about-bio" tabIndex={0}>{bio}</p>
        </div>
      </div>
      <Link className="arrow-right" to="/projects" aria-label="Go to Projects"
        onClick={() => onClickLink('projects')}>
        <i className="fas fa-arrow-right"/>
      </Link>
    </main>
  );
};

About.propTypes = {
  onClickLink: PropTypes.func.isRequired
};

export default About;
