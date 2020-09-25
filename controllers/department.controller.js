const db = require("../config/database.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
// Models
const Vestigingen = require("../models/vestigingen.model");
const VestigingenLocations = require("../models/location.model");

// Create and Save a new department
exports.create = async (req, res) => {
  const department = {
    naam: req.body.naam,
  };

  const vestigingen = await Vestigingen.create(department);
  const vestigingId = await vestigingen.id;
  const departmentAddress = {
    straat: req.body.straat,
    huisnummer: req.body.huisnummer,
    toevoeging: req.body.toevoeging,
    postcode: req.body.postcode,
    stad: req.body.stad,
    departmentId: vestigingId,
  };
  const adres = VestigingenLocations.create(departmentAddress);

  Promise.all([vestigingen, adres])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Retrieve all departments from the database.
exports.findAll = async (req, res) => {
  const departments = await Vestigingen.findAll({
    include: [
      {
        model: VestigingenLocations,
      },
    ],
  });

  Promise.all([departments])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          err.message || "Some error occurred while looking for location.",
      });
    });
};

// Find a department with an id
exports.findOne = (req, res) => {
  Vestigingen.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: VestigingenLocations,
      },
    ],
  })
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
};

// Update a User by the id in the request
exports.update = (req, res) => {};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {};

// Find all published Users
exports.findAllPublished = (req, res) => {};
