const Sequelize = require("sequelize");
const db = require("../config/database");

const UserTaxForm = db.define("user_tax_form_path", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  file_path: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = UserTaxForm;
