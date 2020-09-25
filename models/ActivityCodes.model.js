const Sequelize = require("sequelize");
const db = require("../config/database");

const ActivityCodes = db.define("activity_codes", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER(11),
    unique: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  omschrijving: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = ActivityCodes;
