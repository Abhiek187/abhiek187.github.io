import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./About.scss";
import { OnClickProp, Page } from "../app/App";

const About: React.FC<OnClickProp> = ({ onClickLink, innerRef }) => {
  useEffect(() => {
    document.title = "Abhishek Chaudhuri - About";
  }, []);

  // Forward slashes (\) prevent all the newlines from being rendered
  const bio: string = `
  Why hello there! My name is Abhishek. I'm a software engineer eager to innovate and improve \
  society one line of code at a time. Whether it's a website, a mobile app, or an API, I enjoy \
  building applications that benefit the end-user.

  The three words I live by are dream, conquer, and inspire. I dream of the opportunities that lie \
  ahead. I conquer the challenges that come my way. And I inspire others by helping them go through \
  a similar journey. The cycle repeats as new challenges present themselves. I'm always learning \
  new things and growing as a software engineer.

  At Prudential, I started my career maintaining iOS & Android enterprise apps and developing \
  offline-first mobile solutions for emerging markets. Eventually, I took on more of a \
  leadership role as I helped mentor newer teammates and planned the roadmap for features every \
  quarter. Over time, I built empathy for developers who struggled at first and sought to deliver \
  the best developer experience. My accomplishments include creating 200+ pages of technical \
  documentation on Confluence, shared internally with 3500+ total views. I also created 12 CI/CD \
  pipelines for our mobile apps & libraries using Jenkins and Fastlane to automate the testing, \
  building, and deployment processes. These reference apps are designed to be reusable by other \
  developers, so they spend less time bootstraping the project, and more time delivering \
  business impact while staying compliant with the company's standards.

  My goal is to make onboarding and everyday processes simpler and more efficient for new \
  developers compared to when I joined. As a team player, I regularly help my teammates through \
  code reviews, debug sessions, and detailed documentation. I've also received praise for quickly \
  adapting to various technologies, whether it's developing a website, building an API, \
  automating with shell scripts, or provisioning infrastructure in the cloud.

  My interests include full-stack web and mobile development, with a fascination for cloud computing \
  and machine learning. I regularly work on and improve my projects on GitHub. Some of my past \
  projects include a space shooter created in iOS, an Android game that uses machine learning to \
  recognize handwritten digits, a cheat sheet of all the languages I know, and of course, this very \
  website! Besides coding, I enjoy exercising, playing the flute, and playing video games in my \
  spare time.
  `;

  return (
    <main className="about container-fluid" ref={innerRef}>
      <div className="about-wrapper">
        <h3 className="about-heading">About</h3>
        <div className="about-container">
          <img
            className="about-headshot"
            src="/img/headshot.webp"
            alt="Headshot of Abhishek"
            width="262.5"
            height="175"
          />
          <p className="about-bio">{bio}</p>
        </div>
      </div>
      <Link
        className="arrow-right"
        to="/projects"
        aria-label="Go to Projects"
        onClick={() => onClickLink(Page.Projects)}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </main>
  );
};

export default About;
