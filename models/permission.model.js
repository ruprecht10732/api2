const Sequelize = require("sequelize");
const db = require("../config/database");

const Permission = db.define("permissions", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  naam: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
});

module.exports = Permission;
