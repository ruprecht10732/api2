module.exports = (app) => {
  const User = require("../controllers/user.controller");
  var router = require("express").Router();
  const authenticateToken = require("../middleware/authenticateToken");

  // Login user
  router.post("/login", User.login);

  // Create a new user
  router.post("/", User.create);

  // Create a new user from invite
  router.post("/:id", authenticateToken, User.createfromivite);

  // Retrieve all users
  router.get("/", authenticateToken, User.findAll);

  // Retrieve all published users
  router.get("/active", authenticateToken, User.findAllPublished);

  // Retrieve a single user with id
  router.get("/:id", authenticateToken, User.findOne);

  // Update a user with id
  router.put("/:id", authenticateToken, User.update);

  // Delete a user with id
  router.delete("/:id", authenticateToken, User.delete);

  // Delete all users
  router.delete("/", authenticateToken, User.deleteAll);

  app.use("/api/user", router);
};
