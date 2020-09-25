const Sequelize = require("sequelize");
const db = require("../config/database");

const Projects = db.define("projects", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER(11),
    unique: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  omschrijving: {
    type: Sequelize.STRING,
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

module.exports = Projects;
