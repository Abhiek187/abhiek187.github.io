import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../scss/Contact.scss";
import { OnClickProp, Page } from "./App";

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
        onClick={() => onClickLink(Page.Projects)}
      >
        <FontAwesomeIcon icon={solid("arrow-left")} />
      </Link>
      <div className="contact-wrapper">
        <h3 className="contact-heading">Contact</h3>
        {/* Each link opens in a new tab */}
        <span className="contact-row">
          <Button
            variant="outline-danger"
            className="contact-resume"
            href="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={solid("file-pdf")} /> Resume
          </Button>
          <Button
            variant="outline-primary"
            className="contact-linkedin"
            href="https://www.linkedin.com/in/abhiek187"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={brands("linkedin-in")} /> LinkedIn
          </Button>
          <Button
            variant={`outline-${isDarkMode ? "light" : "dark"}`}
            className="contact-github"
            href="https://github.com/abhiek187"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={brands("github")} /> GitHub
          </Button>
          {/* Opens default email program */}
          <Button
            variant=""
            className={`contact-email ${isDarkMode ? "dark" : ""}`}
            href="mailto:achaudhuri2011@yahoo.com"
            target="_top"
          >
            <FontAwesomeIcon icon={solid("envelope")} /> Email
          </Button>
        </span>
      </div>
    </main>
  );
};

export default Contact;
