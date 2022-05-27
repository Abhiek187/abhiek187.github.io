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
  Why hello there! My name is Abhishek. I'm a software engineer with a desire to innovate and \
  improve society one line of code at a time. Whether it's a website, a mobile app, or an API, I \
  enjoy building applications that benefit the end-user.

  The three words I live by are dream, conquer, and inspire. I dream of the opportunities that lie \
  ahead. I conquer the challenges that come my way. And I inspire others by helping them go through a \
  similar journey. The cycle always repeats itself as new challenges present themselves.

  I'm a recent graduate of Rutgers University-New Brunswick. I studied Electrical & Computer \
  Engineering as an undergraduate and Software Engineering as a graduate. During my time, I joined \
  the N2E coding club where I taught students how to code from Novice 2 Expert. Pretty soon, I was \
  promoted to being the marketing director to increase the outreach of the club. After that, I became \
  the president of N2E, where I handled the process of recruiting 11 instructors and managing \
  workshops in 7 different languages. Through my time and commitment, I increased workshop attendance \
  by 50% and earned a Leadership & Service Award from Rutgers.
  
  My interests include front-end web and mobile development and machine learning. I regularly work on \
  and improve my projects on GitHub. Some of my past projects include a space shooter created in iOS, \
  an Android game that uses machine learning to recognize handwritten digits, a cheat sheet of all \
  the languages I know, and of course, this very website!

  Besides coding, I enjoy exercising, playing the flute, and playing video games in my spare time.
  
  In the future, I plan to expand my knowledge of front-end and back-end development and become a \
  full-stack developer.
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
            width="233.33"
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
