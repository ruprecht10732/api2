const db = require("../config/database.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fileUpload = require("express-fileupload");
// Models
const User = require("../models/user.model");
const UserDetails = require("../models/UserDetails.model");
const UserAddress = require("../models/UserAddress.model");
const UserEmergency = require("../models/UserEmergencyContact.model");
const UserIdentity = require("../models/UserIdentity.model");
const UserToRole = require("../models/UserToRole.model");
const UserBankDetails = require("../models/UserBankDetails.model");
const UserIdPath = require("../models/UserIdPath.model");
const Login = require("../models/login.model");

exports.login = async (req, res) => {
  let getUser = Login.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.wachtwoord, user.wachtwoord);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser.userId,
        },
        process.env.SECRETKEY,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        id: getUser.userId,
        token: jwtToken,
        expiresIn: 99000,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed",
      });
    });
};

// Create and Save a new User
exports.createfromivite = async (req, res) => {
  db.transaction(async function (t) {
    const user = await User.findOne({
      where: { id: 1 },
    });

    if (user) {
      const userId = user.dataValues.id;
      const userDetails = {
        naam: req.body.naam,
        achternaam: req.body.achternaam,
        geboortedatum: req.body.geboortedatum,
        nationaliteit: req.body.nationaliteit,
        mobiel: req.body.telefoon,
        geslacht: req.body.geslacht,
        userId: userId,
      };

      const details = await UserDetails.create(userDetails);

      const userAddress = {
        straatnaam: req.body.straat,
        huisnummer: req.body.huisnummer,
        toevoeging: req.body.toevoeging,
        postcode: req.body.postcode,
        woonplaats: req.body.woonplaats,
        userId: userId,
      };
      const adres = await UserAddress.create(userAddress);

      const userIdentity = {
        soortID: req.body.type,
        documentnummer: req.body.documentnummer,
        BSN: req.body.bsn,
        userId: userId,
      };

      const identity = await UserIdentity.create(userIdentity);

      const emergencyContact = {
        naam: req.body.noodContactNaam,
        achternaam: req.body.noodContactAchternaam,
        telefoonnummer1: req.body.noodContactTelefoon,
        userId: userId,
      };

      const emergency = await UserEmergency.create(emergencyContact);

      const bankdetails = {
        banknaam: req.body.banknaam,
        iban: req.body.iban,
        userId: userId,
      };

      const bank = await UserBankDetails.create(bankdetails);

      if (!req.files) {
        console.log({
          status: false,
          message: "Geen bestanden ge-upload",
        });
      } else {
        try {
          if (!req.files) {
            console.log({
              status: false,
              message: "No file uploaded",
            });
          } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let idvoorkant = req.files.idvoorkant;
            let idachterkant = req.files.idachterkant;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            uploadPathFront = `./uploads/${req.body.naam.toLowerCase()}_${req.body.achternaam.toLowerCase()}/${
              idvoorkant.name
            }`;
            idvoorkant.mv(uploadPathFront);

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            uploadPathBack = `./uploads/${req.body.naam.toLowerCase()}_${req.body.achternaam.toLowerCase()}/${
              idachterkant.name
            }`;
            idachterkant.mv(uploadPathBack);

            const useridpath = {
              soortID: req.body.type,
              documentnummer: req.body.documentnummer,
              BSN: req.body.bsn,
              file_path_front: uploadPathFront,
              file_path_back: uploadPathBack,
              userId: userId,
            };

            UserIdPath.create(useridpath);

            //send response
            console.log({
              status: true,
              message: "File is uploaded",
              data: {
                name: idvoorkant.name,
                mimetype: idvoorkant.mimetype,
                size: idvoorkant.size,
              },
            });
          }
        } catch (err) {
          console.log(err);
        }
      }

      Promise.all([user, details, adres, identity, emergency, bank])
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(400).send({
            message:
              err.message || "Some error occurred while creating the user.",
          });
        });
    } else {
      throw new Error("Niet gelukt");
    }
  });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  User.findAll({
    include: [
      {
        model: UserDetails,
      },
      { model: UserIdentity },
      { model: UserAddress },
      { model: UserEmergency },
      { model: UserBankDetails },
    ],
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

// Create and Save a new User
exports.create = async (req, res) => {
  const userEmail = {
    email: req.body.email,
  };

  const user = await User.create(userEmail);
  const userId = await user.id;

  const userDetails = {
    naam: req.body.naam,
    achternaam: req.body.achternaam,
    geboortedatum: req.body.geboortedatum,
    nationaliteit: req.body.nationaliteit,
    mobiel: req.body.telefoon,
    geslacht: req.body.geslacht,
    userId: userId,
  };

  const details = UserDetails.create(userDetails);

  const userAddress = {
    straatnaam: req.body.straat,
    huisnummer: req.body.huisnummer,
    toevoeging: req.body.toevoeging,
    postcode: req.body.postcode,
    woonplaats: req.body.woonplaats,
    userId: userId,
  };

  const adres = UserAddress.create(userAddress);

  const userIdentity = {
    soortID: req.body.type,
    documentnummer: req.body.documentnummer,
    BSN: req.body.bsn,
    userId: userId,
  };

  const identity = UserIdentity.create(userIdentity);

  if (!req.files) {
    console.log({
      status: false,
      message: "Geen bestanden ge-upload",
    });
  } else {
    try {
      if (!req.files) {
        console.log({
          status: false,
          message: "No file uploaded",
        });
      } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let idvoorkant = req.files.idvoorkant;
        let idachterkant = req.files.idachterkant;

        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        uploadPathFront = `./uploads/${req.body.naam.toLowerCase()}_${req.body.achternaam.toLowerCase()}/${
          idvoorkant.name
        }`;
        idvoorkant.mv(uploadPathFront);

        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        uploadPathBack = `./uploads/${req.body.naam.toLowerCase()}_${req.body.achternaam.toLowerCase()}/${
          idachterkant.name
        }`;
        idachterkant.mv(uploadPathBack);

        const useridpath = {
          soortID: req.body.type,
          documentnummer: req.body.documentnummer,
          BSN: req.body.bsn,
          file_path_front: uploadPathFront,
          file_path_back: uploadPathBack,
          userId: userId,
        };

        UserIdPath.create(useridpath);

        //send response
        console.log({
          status: true,
          message: "File is uploaded",
          data: {
            name: idvoorkant.name,
            mimetype: idvoorkant.mimetype,
            size: idvoorkant.size,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const emergencyContact = {
    naam: req.body.noodContactNaam,
    achternaam: req.body.noodContactAchternaam,
    telefoonnummer1: req.body.noodContactTelefoon,
    userId: userId,
  };

  const emergency = UserEmergency.create(emergencyContact);

  const bankdetails = {
    banknaam: req.body.banknaam,
    iban: req.body.iban,
    userId: userId,
  };

  const bank = UserBankDetails.create(bankdetails);

  Promise.all([user, details, adres, identity, emergency, bank])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  User.findAll({
    include: [
      {
        model: UserDetails,
      },
      { model: UserIdentity },
      { model: UserAddress },
      { model: UserEmergency },
      { model: UserBankDetails },
    ],
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

// Find a single User with an id
exports.findOne = (req, res) => {
  User.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: UserDetails,
      },
      { model: UserIdentity },
      { model: UserAddress },
      { model: UserEmergency },
      { model: UserBankDetails },
    ],
  }).then((users) => res.json(users));
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  return db
    .transaction(async function (t) {
      User.findOne({
        where: { id: req.params.id },
      }).then((result) => {
        if (result !== null) {
          User.update(
            { email: req.body.email, userId: req.params.id },
            {
              where: { id: req.params.id },
            }
          );

          UserDetails.update(
            {
              naam: req.body.naam,
              achternaam: req.body.achternaam,
              nationaliteit: req.body.nationaliteit,
              mobiel: req.body.mobiel,
              geslacht: req.body.geslacht,
            },
            {
              where: { id: req.params.id },
            }
          );

          UserAddress.update(
            {
              straatnaam: req.body.straat,
              huisnummer: req.body.huisnummer,
              toevoeging: req.body.toevoeging,
              postcode: req.body.postcode,
              woonplaats: req.body.woonplaats,
            },
            {
              where: { id: req.params.id },
            }
          );

          UserIdentity.update(
            {
              soortID: req.body.type,
              documentnummer: req.body.documentnummer,
              BSN: req.body.bsn,
            },
            {
              where: { id: req.params.id },
            }
          );

          UserEmergency.update(
            {
              naam: req.body.noodContactNaam,
              achternaam: req.body.noodContactAchternaam,
              telefoonnummer1: req.body.noodContactTelefoon,
            },
            {
              where: { id: req.params.id },
            }
          );

          UserBankDetails.update(
            {
              banknaam: req.body.banknaam,
              iban: req.body.iban,
            },
            {
              where: { id: req.params.id },
            }
          );
        }
      });
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message || "Gebruiker kon niet worden gewijzigd.",
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  const details = UserDetails.destroy({ where: {} }).then(function () {});
  const adres = UserAddress.destroy({ where: {} }).then(function () {});
  const identity = UserIdentity.destroy({ where: {} }).then(function () {});
  const emergency = UserEmergency.destroy({ where: {} }).then(function () {});
  const bank = UserBankDetails.destroy({ where: {} }).then(function () {});
  const user = User.destroy({ where: {} }).then(function () {});

  Promise.all([user, details, adres, identity, emergency, bank])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Could not delete all users.",
      });
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {};
