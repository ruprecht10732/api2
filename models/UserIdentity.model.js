const Sequelize = require("sequelize");
const db = require("../config/database");

const UserIdentity = db.define("user_identity", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  soortID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  documentnummer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  BSN: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = UserIdentity;
