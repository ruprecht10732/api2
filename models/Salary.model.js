const Sequelize = require("sequelize");
const db = require("../config/database");

const Salary = db.define("salaries", {
  from_date: {
    type: Sequelize.DATE,
  },
  to_date: {
    type: Sequelize.DATE,
  },
  hourly_rate: {
    type: Sequelize.DECIMAL(11),
    allowNull: false,
  },
});

module.exports = Salary;
