const Sequelize = require("sequelize");
const db = require("../config/database");

const Activities = db.define("activities", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER(11),
    unique: true,
    allowNull: false,
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Activities;
