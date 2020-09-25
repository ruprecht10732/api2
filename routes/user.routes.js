module.exports = (app) => {
  const User = require("../controllers/user.controller");

  var router = require("express").Router();

  // Create a new user
  router.post("/", User.create);

  // Create a new user from invite
  router.post("/:id", User.createfromivite);

  // Retrieve all users
  router.get("/", User.findAll);

  // Retrieve all published users
  router.get("/active", User.findAllPublished);

  // Retrieve a single user with id
  router.get("/:id", User.findOne);

  // Update a user with id
  router.put("/:id", User.update);

  // Delete a user with id
  router.delete("/:id", User.delete);

  // Delete all users
  router.delete("/", User.deleteAll);

  app.use("/api/user", router);
};
