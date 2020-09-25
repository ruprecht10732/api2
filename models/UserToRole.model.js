const Sequelize = require("sequelize");
const db = require("../config/database");

const UserToRole = db.define("user_to_role", {});

module.exports = UserToRole;
