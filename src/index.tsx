import React from "react";
import ReactDOMClient from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "./index.scss";
import App from "./tsx/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root") as HTMLDivElement;
const root: ReactDOMClient.Root = ReactDOMClient.createRoot(container);

root.render(
  // Enable react router and work in GitHub Pages
  <React.StrictMode>
    <HashRouter basename={import.meta.env.BASE_URL}>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
