import React from "react";
import Home from "./Components/Home/Home.js";
import Game from "./Components/Game/Game.js";
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom';

function App(){
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/game" exact component={Game}/>
      </Switch>
    </Router>
  );
}

export default App;