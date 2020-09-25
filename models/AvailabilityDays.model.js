const Sequelize = require("sequelize");
const db = require("../config/database");

const AvailabilityDays = db.define("availability_days", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER(11),
    unique: true,
    allowNull: false,
  },
  weekday: {
    type: Sequelize.TINYINT,
    unique: true,
  },
});

module.exports = AvailabilityDays;
