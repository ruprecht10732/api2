const Sequelize = require("sequelize");
const db = require("../config/database");

const UserBankDetails = db.define("user_bank_details", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  banknaam: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  iban: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = UserBankDetails;
