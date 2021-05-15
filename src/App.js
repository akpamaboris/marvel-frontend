import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Cookies from "js-cookie";

//import different components
import Characters from "./Components/Characters";
import Comics from "./Components/Comics";
import Favorites from "./Components/Favorites";
import MenuBar from "./Components/MenuBar";
import Home from "./Components/Home";
import CardCharacter from "./Components/CardCaracter";

const App = () => {
  const [cookie, setCookie] = useState(Cookies.get("marvel"));
  return (
    <Router>
      <MenuBar />
      <div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/characters">
            <Characters setCookie={setCookie} cookies={cookie} />
          </Route>
          <Route path="/comics">
            <Comics setCookie={setCookie} cookies={cookie} />
          </Route>
          <Route path="/characters:id">
            <CardCharacter />
          </Route>
          <Route path="/favorites">
            <Favorites cookies={cookie} setCookie={setCookie} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
