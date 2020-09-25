const Sequelize = require("sequelize");
const db = require("../config/database");

const Login = db.define("logins", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  wachtwoord: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Login;
