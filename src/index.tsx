import React from "react";
import ReactDOMClient from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "./index.scss";
import App from "./app/App";
import reportWebVitals from "./utils/reportWebVitals";

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
