import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link, navigate } from "@reach/router";
import NavBar from "../components/NavBar";
import { navigate } from "@reach/router";

const Players = (props) => {
  // console.log(props);

  // before we get a response from our DB, our data is null
  const [players, setPlayers] = useState(null);

  // arguments passed to useEffect
  // arg1: call back function
  // arg2: empty array which means run this only once
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/players")
      .then((res) => {
        console.log(res);
        setPlayers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleDelete(delId, name) {
    if (window.confirm(`Are you sure you want to remove ${name}?`) == true){
        axios
          .delete("http://localhost:8000/api/players/" + delId)
          .then((res) => {
            // console.log(res);
    
            const filteredPlayers = players.filter((player) => {
              // returns false only when the player._id === delId
              // when false is returned to .filter, it will filter this one out
              return player._id !== delId;
            });
    
            // update the state to cause a re-render so our player that was
            // deleted from DB will be removed from being displayed as well
            setPlayers(filteredPlayers);
          })
          .catch((err) => {
            console.error(err);
          });
    }
    navigate("/players/list");
    }

  if (players === null) {
    return "Loading...";
  }

  return (
    <div className="container mt-5">
     <NavBar 
     page="page1" 
     url1="/players/list" 
     text1="Manage Players" 
     url2="/status/game/1" 
     text2="Manage Player Status"/>
     <div className="border bg-white shadow-lg px-5 py-2">
        <NavBar 
        page="page1" 
        url1="/players/list" 
        text1="List" 
        url2="/players/add-player" 
        text2="Add Player"
        />
        <table className="table border">
            <thead>
                <tr>
                    <th scope="col">Player Name</th>
                    <th scope="col">Preferred Position</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {players.map((player) => {
                return (
                    <tr key={player._id}>
                        <td>{player.name}</td>
                        <td>{player.preferredPosition}</td>
                        <td>
                            <button className="btn btn-danger shadow mr-3" onClick= {(event) => {handleDelete(player._id, player.name)}}>
                                Delete
                            </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
     </div>
    </div>
  );
};

export default Players;
