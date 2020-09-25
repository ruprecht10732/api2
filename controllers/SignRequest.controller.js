const db = require("../config/database.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
// Models
const User = require("../models/user.model");

//Invite a new user
exports.invite = (req, res) => {
  const invite = {
    email: req.body.email,
    key: uuidv4(),
    manager: req.body.manager,
    department: req.body.department,
  };

  const template = `<h2>Welkom bij The Call Company</h2>
                <p>Je hebt een uitnodiging ontvangen om je aanmelding af te ronden, klik op onderstaande link om je gegevens aan te leveren:</p>
                <p><a href='https://www.thecallcompany.nl/invite/${invite.key}' target='_blank'>https://www.thecallcompany.nl/invite/${invite.key}</a></p>`;

  const transporter = nodemailer.createTransport({
    service: "SendinBlue", // no need to set host or port etc.
    auth: {
      user: "info@thecallcompany.nl",
      pass: "7XVgFszb9SNm1t0v",
    },
  });

  // Create a invitation in the database
  Invitees.create(invite)
    .then((data) => {
      res.send(data);
      transporter
        .sendMail({
          to: invite.email,
          from: "The Call Company <info@thecallcompany.nl>",
          subject: "Verzoek: Maak je aanmelding compleet",
          html: template,
        })
        .then((res) => console.log("Successfully sent"))
        .catch((err) => console.log("Failed ", err));
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Update a invite by the id in the request
exports.update = async (req, res) => {
  return db.transaction(async function (t) {
    Invitees.findOne({
      where: { key: req.params.id },
    })
      .then(async () => {
        const count = await User.findOne({ where: { email: req.body.email } });
        if (count === null) {
          const userEmail = {
            email: req.body.email,
          };
          const invitee = Invitees.update(
            { accepted: true },
            { where: { key: req.params.id } }
          );
          const user = await User.create(userEmail);
          const userId = await user.id;
          const loginEmail = user.email;
          const hash = bcrypt.hashSync(req.body.wachtwoord, 10);
          const loginData = {
            wachtwoord: hash,
            email: loginEmail,
            userId: userId,
          };
          const login = await Login.create(loginData);
          res.status(200).json("Gebruiker aangemaakt");
        } else {
          res.status(400).json("Gebruiker bestaat al");
        }
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  Invitees.findAll({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

// Find a single invite with an id
exports.findOne = (req, res) => {
  Invitees.findAll({
    where: { key: req.params.id, accepted: false },
  }).then((users) => res.json(users));
};
