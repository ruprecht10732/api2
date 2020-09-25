const Sequelize = require("sequelize");
const db = require("../config/database");

const Managers = db.define("department_managers", {
  from_date: {
    type: Sequelize.DATE,
  },
  to_date: {
    type: Sequelize.DATE,
  },
});

module.exports = Managers;
