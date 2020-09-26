module.exports = (app) => {
  const Vestigingen = require("../controllers/department.controller");
  const authenticateToken = require("../middleware/authenticateToken");

  var router = require("express").Router();

  // Create a new department
  router.post("/", authenticateToken, Vestigingen.create);

  // Retrieve all departments
  router.get("/", authenticateToken, Vestigingen.findAll);

  // Retrieve all published departments
  router.get("/active", authenticateToken, Vestigingen.findAllPublished);

  // Retrieve a single department with id
  router.get("/:id", authenticateToken, Vestigingen.findOne);

  // Update a department with id
  router.put("/:id", authenticateToken, Vestigingen.update);

  // Delete a department with id
  router.delete("/:id", authenticateToken, Vestigingen.delete);

  // Delete all departments
  router.delete("/", authenticateToken, Vestigingen.deleteAll);

  app.use("/api/department", router);
};
