const Sequelize = require("sequelize");
const db = require("../config/database");

const Vestigingen = db.define("departments", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  naam: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Vestigingen;
