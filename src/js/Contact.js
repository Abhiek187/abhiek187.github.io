import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../css/Contact.css";

const Contact = ({ onClickLink }) => {
  useEffect(() => {
    document.title = "Abhishek Chaudhuri - Contact";
    document.querySelector(".links-about").classList.remove("active");
    document.querySelector(".links-projects").classList.remove("active");
    document.querySelector(".links-contact").classList.add("active");
  }, []);

  return (
    <main className="contact container-fluid">
      <Link
        className="arrow-left"
        to="/projects"
        aria-label="Go to Projects"
        onClick={() => onClickLink("projects")}
      >
        <i className="fas fa-arrow-left" />
      </Link>
      <div className="contact-wrapper">
        <h3 className="contact-heading" tabIndex={0}>
          Contact
        </h3>
        {/* Each link opens in a new tab */}
        <span className="contact-row">
          <a
            className="contact-resume"
            href="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-file-pdf" /> Resume
          </a>
          <a
            className="contact-linkedin"
            href="https://www.linkedin.com/in/abhiek187"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in" /> LinkedIn
          </a>
          <a
            className="contact-github"
            href="https://github.com/abhiek187"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" /> GitHub
          </a>
          {/* Opens default email program */}
          <a
            className="contact-email"
            href="mailto:achaudhuri2011@yahoo.com"
            target="_top"
          >
            <i className="fas fa-envelope" /> Email
          </a>
        </span>
      </div>
    </main>
  );
};

Contact.propTypes = {
  onClickLink: PropTypes.func.isRequired,
};

export default Contact;
