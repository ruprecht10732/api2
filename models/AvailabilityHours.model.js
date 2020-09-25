const Sequelize = require("sequelize");
const db = require("../config/database");

const AvailabilityHours = db.define("availability_hours", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER(11),
    unique: true,
    allowNull: false,
  },
  min_hours: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
  },
  max_hours: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
  },
});

module.exports = AvailabilityHours;
