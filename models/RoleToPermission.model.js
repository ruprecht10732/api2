const Sequelize = require("sequelize");
const db = require("../config/database");

const RoleToPermission = db.define("role_to_permission", {});

module.exports = RoleToPermission;
