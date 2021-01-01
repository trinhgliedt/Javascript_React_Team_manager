const Player = require("../models/team.model");

// export an object that is full of methods
module.exports = {
  // long-form - key: value format
  create: function (req, res) {
    console.log("create  method executed");
    // .create is async, we don't know exactly when it will finish, so it returns a promise
    // which we need to use .then to know when it's fulfilled
    // req.body is the data in the form that was POSTed or the data POSTed from postman
    Player.create(req.body)
      // team is just a param name, can be named anything
      // this is the newly created team that the db returned
      .then((team) => {
        res.json(team);
      })
      .catch((err) => {
        // so that axios' .catch will be triggered
        // for validation errors and other errors
        res.status(400).json(err);
      });
  },

  getAll(req, res) {
    console.log("getAll method executed");

    Player.find()
      .then((players) => {
        res.json(players);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  getOne(req, res) {
    console.log("getOne method executed", "url params:", req.params);

    // .find will always return an array even if only one object is found
    // Player.find({ _id: req.params.id })
    Player.findById(req.params.id) // .findById returns only one object, no array
      .then((team) => {
        res.json(team);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  delete(req, res) {
    console.log("delete method executed", "url params:", req.params);

    Player.findByIdAndDelete(req.params.id)
      .then((team) => {
        // the team that was deleted or null if id not found
        res.json(team);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // alternative way to delete
  delete2(req, res) {
    console.log("delete method executed", "url params:", req.params);

    Player.findById(req.params.id)
      // this .then is for the .findById
      .then((team) => {
        team
          .remove()
          // .then for after the .remove finishes
          .then((removedPlayer) => {
            res.json(removedPlayer);
          })
          .catch((err) => {
            // error from the .remove
            res.json(err);
          });
      })
      .catch((err) => {
        // error from the findById if the findById .then doesn't happen
        res.json(err);
      });
  },

  update(req, res) {
    console.log("update method executed", "url params:", req.params);

    Player.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      // return the updated object rather than the old info
      new: true,
    })
      .then((team) => {
        // the team with updated information
        console.log("update method .then");
        res.json(team);
      })
      .catch((err) => {
        // so that axios' .catch will be triggered
        // for validation errors and other errors
        console.log("update method .catch");
        res.status(400).json(err);
      });
  },

  // extra, if you want a form submission or postman submission to find by multiple keys
  findByFormInfo(req, res) {
    Player.find(req.body)
      .then((players) => {
        res.json(players);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
