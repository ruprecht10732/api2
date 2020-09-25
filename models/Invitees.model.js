const Sequelize = require("sequelize");
const db = require("../config/database");

const Invitees = db.define("invitees", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
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

module.exports = Invitees;
