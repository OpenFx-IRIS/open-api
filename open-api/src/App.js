import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import KetiNavigator from "./component/nav/KetiNavigator";
import KetiOpenApi from "./component/openapi/KetiOpenApi";
import Guide from "./component/openapi/Guide";

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
