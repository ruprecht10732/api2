const Sequelize = require("sequelize");

module.exports = db = new Sequelize("backstage", "robinDB", "S10732b54861!", {
  host: "145.131.29.106",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
