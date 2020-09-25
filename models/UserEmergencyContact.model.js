const Sequelize = require("sequelize");
const db = require("../config/database");

const UserEmergencyContact = db.define("user_emergency_contact", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  naam: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  achternaam: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefoonnummer1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefoonnummer2: { type: Sequelize.STRING, allowNull: true },
});

module.exports = UserEmergencyContact;
