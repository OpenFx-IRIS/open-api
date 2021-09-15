import logo from './logo.svg';
import './App.css';
import React from "react";

class App extends React.Component {
  componentDidMount () {
    const script = document.createElement("script");
    script.src = "http://10.0.0.144:8080/js/test.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}


export default App;
