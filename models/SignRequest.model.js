const Sequelize = require("sequelize");
const db = require("../config/database");

const SignRequest = db.define("sign_request", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  naam: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  achternaam: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  key: {
    type: Sequelize.DataTypes.UUID,
    unique: true,
    allowNull: false,
  },
  accepted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = SignRequest;
