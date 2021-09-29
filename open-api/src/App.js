import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import KetiNavigator from "./nav/KetiNavigator";
import BlankPage from "./BlankPage";
import KetiAbout from "./about/KetiAbout";
import KetiGuide from "./guide/KetiGuide";
import KetiOpenApi from "./openapi/KetiOpenApi";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <KetiNavigator />
        <BrowserRouter basename="/open-api">
          <Route path="/" component={BlankPage}></Route>
          <Route path="/about" component={KetiAbout}></Route>
          <Route path="/guide" component={KetiGuide}></Route>
          <Route path="/open-api" component={KetiOpenApi}></Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
