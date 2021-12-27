import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../scss/Contact.scss";
import { OnClickProp } from "./App";

type ContactProps = OnClickProp & {
  isDarkMode: boolean;
};

const Contact: React.FC<ContactProps> = ({
  onClickLink,
  innerRef,
  isDarkMode,
}) => {
  useEffect(() => {
    document.title = "Abhishek Chaudhuri - Contact";
    document.querySelector(".links-about")?.classList.remove("active");
    document.querySelector(".links-projects")?.classList.remove("active");
    document.querySelector(".links-contact")?.classList.add("active");
  }, []);

  return (
    <main className="contact container-fluid" ref={innerRef}>
      <Link
        className="arrow-left"
        to="/projects"
        aria-label="Go to Projects"
        onClick={() => onClickLink("projects")}
      >
        <i className="fas fa-arrow-left" />
      </Link>
      <div className="contact-wrapper">
        <h3 className="contact-heading">Contact</h3>
        {/* Each link opens in a new tab */}
        <span className="contact-row">
          <a
            className="contact-resume btn btn-outline-danger"
            href="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-file-pdf" /> Resume
          </a>
          <a
            className="contact-linkedin btn btn-outline-primary"
            href="https://www.linkedin.com/in/abhiek187"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in" /> LinkedIn
          </a>
          <a
            className={`contact-github btn btn-outline-${
              isDarkMode ? "light" : "dark"
            }`}
            href="https://github.com/abhiek187"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" /> GitHub
          </a>
          {/* Opens default email program */}
          <a
            className={`contact-email btn ${isDarkMode ? "dark" : ""}`}
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

export default Contact;
