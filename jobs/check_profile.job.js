const Sequelize = require("sequelize");
const mailConfig = require("../config/mailConfig");
const Op = Sequelize.Op;
const User = require("../models/User.model.js");
const UserDetails = require("../models/UserDetails.model.js");

UserDetails.belongsTo(User);
User.hasOne(UserDetails);

exports.loginprofile = async () => {
  await User.findAll({
    include: [
      {
        model: UserDetails,
        required: false,
      },
    ],
  })
    .then((result) => {
      let object = Object.values(result);
      let newObject = object.filter((user) => user.user_detail === null);

      if (!newObject) {
        console.log("alles is prima");
      } else {
        newObject.forEach((person) => {
          const template = `<h2>Maak je profiel compleet</h2><p>Je hebt je acocunt voor The Call Company gebruikersomgeving geactiveerd, dechter heb je nog niet je gegevens ingevoerd vul je profiel gegevens aan</p><p>Log via de volgende link in om je profiel compleet te maken:</p>
       <p><a href='https://onboarding.thecallcompany.nl/login' target='_blank'>https://onboarding.thecallcompany.nl/login</a></p>`;

          transporter
            .sendMail({
              to: person.email,
              from: "The Call Company <info@thecallcompany.nl>",
              subject: "Herinnering: Maak je aanmelding compleet",
              html: template,
            })
            .then((result) => {
              // user.update({ reminder_count: 0 }, { where: { id: user.id } });
            })
            .catch((err) => console.log("Failed ", err));
        });
      }
    })
    .catch((error) => console.log(error));
};
