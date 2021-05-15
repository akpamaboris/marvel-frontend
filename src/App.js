import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

//import different components
import Characters from "./Components/Characters";
import Comics from "./Components/Comics";
import Favorites from "./Components/Favorites";
import MenuBar from "./Components/MenuBar";
import Home from "./Components/Home";
import CardCharacter from "./Components/CardCaracter";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Logout from "./Components/Logout";

const App = () => {
  const [userToken] = useState(Cookies.get("marvelAuth"));

  return (
    <Router>
      <MenuBar userToken={userToken} />
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
          <Route path="/logout">
            <Logout userToken={userToken} />
          </Route>
          <Route path="/login">
            <Login userToken={userToken} />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
