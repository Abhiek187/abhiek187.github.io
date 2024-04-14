import {
  faArrowLeft,
  faEnvelope,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import styles from "./Contact.module.scss";
import { OnClickProp, Page } from "../app/App";

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
  }, []);

  return (
    <main className="contact container-fluid" ref={innerRef}>
      <Link
        className="arrow-left"
        to="/projects"
        aria-label="Go to Projects"
        onClick={() => onClickLink(Page.Projects)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className="contact-wrapper">
        <h3 className="contact-heading">Contact</h3>
        {/* Each link opens in a new tab */}
        <span className={styles.row}>
          <Button
            variant="outline-danger"
            className={styles.resume}
            href="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFilePdf} /> Resume
          </Button>
          <Button
            variant="outline-primary"
            className={styles.linkedin}
            href="https://www.linkedin.com/in/abhiek187"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn
          </Button>
          <Button
            variant={`outline-${isDarkMode ? "light" : "dark"}`}
            className={styles.github}
            href="https://github.com/abhiek187"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </Button>
          {/* Opens default email program */}
          <Button
            variant=""
            className={`${styles.email} ${isDarkMode ? styles.dark : ""}`}
            href="mailto:achaudhuri2011@yahoo.com"
            target="_top"
          >
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </Button>
        </span>
      </div>
    </main>
  );
};

export default Contact;
