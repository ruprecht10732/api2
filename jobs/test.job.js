const Sequelize = require("sequelize");
const mailConfig = require("../config/mailConfig");
const Op = Sequelize.Op;
const User = require("../models/user.model.js");
const UserDetails = require("../models/UserDetails.model.js");

exports.testjob = async () => {
  const template = `<h2>Maak je profiel compleet</h2><p>Je hebt je acocunt voor The Call Company gebruikersomgeving geactiveerd, echter heb je nog niet je gegevens ingevoerd. Vul je profiel gegevens aan.</p><p>Log via de volgende link in om je profiel compleet te maken:</p>
       <p><a href='https://onboarding.thecallcompany.nl/login' target='_blank'>https://onboarding.thecallcompany.nl/login</a></p>`;

  transporter
    .sendMail({
      to: "oostrobin1989@gmail.com",
      from: "The Call Company <info@thecallcompany.nl>",
      subject: "Herinnering: Maak je aanmelding compleet",
      html: template,
    })
    .then((result) => {
      console.log("sent", process.env.NODE_ENV);
    })
    .catch((err) => console.log("Failed ", err));
};
