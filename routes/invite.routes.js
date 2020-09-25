module.exports = (app) => {
  const Invitee = require("../controllers/invites.controller");

  var router = require("express").Router();

  // Create a new invitee
  router.post("/", Invitee.invite);

  // Retrieve all invitees
  router.get("/", Invitee.findAll);

  // Retrieve all published invitees
  // router.get("/active", Invitee.findAllPublished);

  // Retrieve a single invitee with id
  router.get("/:id", Invitee.findOne);

  // Update a invitee with id
  router.put("/:id", Invitee.update);

  // // Delete a invitee with id
  // router.delete("/:id", Invitee.delete);

  // // Delete all invitees
  // router.delete("/", Invitee.deleteAll);

  app.use("/api/invite", router);
};
