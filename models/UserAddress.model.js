const Sequelize = require("sequelize");
const db = require("../config/database");

const UserAddress = db.define("user_address", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  straatnaam: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  huisnummer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  toevoeging: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  postcode: { type: Sequelize.STRING, allowNull: false },
  woonplaats: { type: Sequelize.STRING, allowNull: false },
});

module.exports = UserAddress;
