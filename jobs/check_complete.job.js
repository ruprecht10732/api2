const Sequelize = require("sequelize");
const Invitees = require("../models/Invitees.model");
const mailConfig = require("../config/mailConfig");

exports.looknotaccept = async () => {
  const user = await Invitees.findAll({
    where: { accepted: false },
  });

  if (!user) {
    console.log("niemand gevonden");
  } else {
    Object.values(user).forEach(async (user) => {
      const template = `<h2>Activeer je account</h2><p>Je hebt je acocunt voor The Call Company gebruikersomgeving nog niet geactiveerd, doe dit zo snel mogelijk en vul je profiel gegevens aan</p><p><p>Je hebt een uitnodiging ontvangen om je aanmelding af te ronden, klik op onderstaande link om je gegevens aan te leveren:</p>
                <p><a href='https://onboarding.thecallcompany.nl/invite/${user.dataValues.key}' target='_blank'>https://onboarding.thecallcompany.nl/invite/${user.dataValues.key}</a></p>`;

      transporter
        .sendMail({
          to: user.email,
          from: "The Call Company <info@thecallcompany.nl>",
          subject: "Herinnering: Maak je aanmelding compleet",
          html: template,
        })
        .then((result) => {
          user.update({ reminder_count: 0 }, { where: { id: user.id } });
        })
        .catch((err) => console.log("Failed ", err));
    });
  }
};
