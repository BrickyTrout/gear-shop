import "./App.scss";
import Catalogue from "./catalogue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountain } from "@fortawesome/free-solid-svg-icons";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={faMountain}></FontAwesomeIcon>
        <h3>Gear</h3>
        <h3 className="title-light">haus</h3>
      </header>
      <div className="App-body">
        <Catalogue></Catalogue>
      </div>
    </div>
  );
}

export default App;
