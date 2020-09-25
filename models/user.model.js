const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = User;
