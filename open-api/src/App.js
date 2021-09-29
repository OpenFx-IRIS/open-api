import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import KetiNavigator from "./nav/KetiNavigator";
import KetiOpenApi from "./openapi/KetiOpenApi";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <KetiNavigator />
        <BrowserRouter basename="/open-api">
          <Route path="/" component={KetiOpenApi}></Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
