const Sequelize = require("sequelize");
const db = require("../config/database");

const UserContractPath = db.define("user_contract_path", {
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

module.exports = UserContractPath;
