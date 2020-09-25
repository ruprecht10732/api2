module.exports = (app) => {
  const Vestigingen = require("../controllers/department.controller");

  var router = require("express").Router();

  // Create a new department
  router.post("/", Vestigingen.create);

  // Retrieve all departments
  router.get("/", Vestigingen.findAll);

  // Retrieve all published departments
  router.get("/active", Vestigingen.findAllPublished);

  // Retrieve a single department with id
  router.get("/:id", Vestigingen.findOne);

  // Update a department with id
  router.put("/:id", Vestigingen.update);

  // Delete a department with id
  router.delete("/:id", Vestigingen.delete);

  // Delete all departments
  router.delete("/", Vestigingen.deleteAll);

  app.use("/api/department", router);
};
