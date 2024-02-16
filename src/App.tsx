import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Catalogue from "./catalogue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountain } from "@fortawesome/free-solid-svg-icons";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={faMountain}></FontAwesomeIcon>
        <h3>Ipsum Lorem Outdoor Store</h3>
      </header>
      <div className="App-body">
        <Catalogue></Catalogue>
      </div>
    </div>
  );
}

export default App;
