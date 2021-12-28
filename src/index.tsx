import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faExternalLinkAlt,
  faFilePdf,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import "./index.scss";
import App from "./tsx/App";
import * as serviceWorker from "./serviceWorker";

// Add font awesome icons used in the app
library.add(
  faArrowLeft,
  faArrowRight,
  faFilePdf,
  faLinkedinIn,
  faGithub,
  faEnvelope,
  faTimes,
  faExternalLinkAlt
);

ReactDOM.render(
  // Enable react router and work in GitHub Pages
  <React.StrictMode>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
