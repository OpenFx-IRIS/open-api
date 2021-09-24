import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import KetiNavigator from "./nav/KetiNavigator";
import KetiOpenApi from "./openapi/KetiOpenApi";
import KetiAbout from "./about/KetiAbout";
import KetiGuide from "./guide/KetiGuide";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Router basename="/open-api">
    <KetiNavigator />
    <Route path="about">
      <KetiAbout />
    </Route>
    <Route path="guide">
      <KetiGuide />
    </Route>
    <Route path="open-api">
      <KetiOpenApi />
    </Route>
  </Router>,
  document.getElementById("root")
);
reportWebVitals();
