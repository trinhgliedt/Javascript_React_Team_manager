const teamController = require("../controllers/team.controller");

module.exports = (app) => {
  // in DJango: path("api/players", views.create_team)
  app.post("/api/players", teamController.create);
  app.get("/api/players", teamController.getAll);
  // this must come before the one below or else the one below will think
  // "find" from the url is the id and will cause an error
  app.get("/api/players/find", teamController.findByFormInfo);
  app.get("/api/players/:id", teamController.getOne);
  app.delete("/api/players/:id", teamController.delete);
  app.put("/api/players/:id", teamController.update);
};