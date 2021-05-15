import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import different components
import Characters from "./Components/Characters";
import Comics from "./Components/Comics";
import Favorites from "./Components/Favorites";
import MenuBar from "./Components/MenuBar";
import Home from "./Components/Home";
import CardCharacter from "./Components/CardCaracter";

const App = () => {
  return (
    <Router>
      <MenuBar />
      <div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route path="/comics">
            <Comics />
          </Route>
          <Route path="/characters:id">
            <CardCharacter />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
