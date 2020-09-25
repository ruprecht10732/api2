const Sequelize = require("sequelize");
const db = require("../config/database");

const DepartmentEmployees = db.define("department_employees", {
  from_date: {
    type: Sequelize.DATE,
  },
  to_date: {
    type: Sequelize.DATE,
  },
});

module.exports = DepartmentEmployees;
