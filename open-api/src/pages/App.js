import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import KetiNavigator from "./nav/KetiNavigator";
import KetiOpenApi from "./openapi/KetiOpenApi";
import Guide from "./guide/Guide";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <KetiNavigator />
      <Route exact path="/" component={Guide} />
      <Route path="/guide" component={Guide} />
      <Route path="/api" component={KetiOpenApi} />
    </BrowserRouter>
  );
};

export default App;
