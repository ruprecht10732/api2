const Sequelize = require("sequelize");
const db = require("../config/database");

const CostCenter = db.define("cost_centers", {
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
});

module.exports = CostCenter;
