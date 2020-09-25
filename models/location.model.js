const Sequelize = require("sequelize");
const db = require("../config/database");

const Locations = db.define("locations", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  straat: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  huisnummer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  toevoeging: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  postcode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stad: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Locations;
