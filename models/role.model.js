const Sequelize = require("sequelize");
const db = require("../config/database");

const Role = db.define("roles", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  naam: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  omschrijving: {
    type: Sequelize.STRING,
  },
});

module.exports = Role;
