import React from 'react';
import './App.css';
import { Router, Redirect } from "@reach/router";
// import { Link, Redirect, Router } from "@reach/router";

// import NotFound from "./views/NotFound";
import NewPlayer from "./views/NewPlayer";
import Players from "./views/Players";
// import SinglePlayer from "./views/SinglePlayer";
// import EditPlayer from "./views/EditPlayer";

function App() {
  return (
    <div className="App">
      <Router>
          <Redirect from="/" to="/players" noThrow="true" />
          <Redirect from="/players" to="/players/list" noThrow="true" />
          <NewPlayer path="/players/add-player" />
          <Players path="/players/list" />
          <SinglePlayer path="/players/:id" />
          <EditPlayer path="/players/:id/edit" />
          <NotFound default />
        </Router>
    </div>
  );
}

export default App;
