const Sequelize = require("sequelize");
const db = require("../config/database");

const UserIdPath = db.define("user_id_path", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  file_path_front: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  file_path_back: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = UserIdPath;
