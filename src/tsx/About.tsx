import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../scss/About.scss";
import { OnClickProp, Page } from "./App";

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

  I currently work at Prudential Financial as a Software Engineer. I develop mobile \
  applications & frameworks for the enterprise, with an emphasis on developing secure, \
  offline-first native iOS & Android apps for businesses in emerging markets. Eventually, I took \
  on more of a leadership role as I laid the roadmap for delivering features in each sprint \
  during PI planning.
  
  As a team player, I regularly help my teammates through code reviews, debug sessions, and \
  detailed documentation. I always show empathy by making sure future teammates don't experience \
  the same roadblocks I dealt with. For example, I shared 200+ pages of technical documentation \
  with my teammates and other engineers using Confluence. I also helped develop reference apps for \
  iOS, Android, and React Native that standardized MVVM architecture patterns, REST APIs, and \
  OIDC authentication with biometrics. In addition, I ensure all apps feature automated unit \
  testing, security testing, and deployment using CI/CD pipelines. By streamlining knowledge \
  sharing and app development, I reduced the amount of time engineers needed to learn new tech, \
  allowing them to focus on delivering business outcomes.
  
  I'm also not afraid to go outside my comfort zone. My role goes beyond mobile development, such \
  as developing websites, APIs, or shell scripts. During a company hackathon, I quickly learned \
  how to build an Angular website that monitored the status of various Prudential resources in \
  1 week. I received praise from senior executives for going above and beyond with the front end \
  of the website.
  
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
        <FontAwesomeIcon icon={solid("arrow-right")} />
      </Link>
    </main>
  );
};

export default About;
