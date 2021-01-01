import React, { useState } from "react";
import { navigate } from "@reach/router";

import axios from "axios";
import NavBar from "../components/NavBar";


const NewPlayer = (props) => {
  // console.log(props);
  // useState returns an array of two items:
  // [stateVar, funcToUpdateStateVar]
  // destructure the two arr items into the two var names [name, setName]
  const [name, setName] = useState("");
  const [preferredPosition, setPreferredPosition] = useState("");
  const [backEndErrors, setBackEndErrors] = useState(null);
  const [frontEndErrors, setFrontEndErrors] = useState("");

  const handleNameInput = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 1){
        setFrontEndErrors("Please enter a name!");
    }
    else if (e.target.value.length < 3){
        setFrontEndErrors("Name must be at least 2 characters!");
    }
    else {
        setFrontEndErrors("")
    }
};


  function handleSubmit(event) {
    event.preventDefault();

    const newPlayer = {
      name,
      preferredPosition
    };

    console.log(newPlayer);

    axios
      .post("http://localhost:8000/api/players", newPlayer)
      // response from our server
      .then((res) => {
        console.log(res);
        navigate("/players");
      })
      .catch((err) => {
        // for validation backEndErrors to be sent here, the .catch in the controller method needs:
        // res.status(400).json(err);
        setBackEndErrors(err.response.data.errors);
        console.error(err.response);
      });
  }

  return (
    <div className="container">
      <NavBar 
        page="page1" 
        url1="/players/add-player" 
        text1="Manage Players" 
        url2="/status/game/1" 
        text2="Manage Player Status"/>
     <div className="border bg-white shadow-lg p-5">
     <NavBar 
        page="page2" 
        url1="/players/list" 
        text1="List" 
        url2="/players/add-player" 
        text2="Add Player"
        />
        <form
        className="text-left border p-5"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <h3 className="mb-3">Add Player</h3>
          <div className="mb-4">
            <label className="col-3">Player Name: </label>
            <input 
              onChange={handleNameInput}
              type="text"
              className="ml-3 col-8"
            />
            {backEndErrors?.name && (
              <p className="text-danger col-8 offset-3">{backEndErrors.name?.message}" ( back end)</p>
            )}
            {frontEndErrors ?
              <p className="text-danger col-8 offset-3">{frontEndErrors} ( front end)</p> : ""}
          </div>

          <div className="mb-4">
            <label className="col-3">Preferred Position: </label>
            <input
              onChange={(event) => {
                setPreferredPosition(event.target.value);
              }}
              type="text"
              min="0"
              className="ml-3 col-8"
            />
          </div>
          <button 
          disabled={frontEndErrors ? true : false}
          className="btn btn-success col-2 offset-9">Add</button>
        </form>
     </div>
    
    </div>
  );
};

export default NewPlayer;
