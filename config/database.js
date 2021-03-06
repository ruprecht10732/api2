const Sequelize = require("sequelize");

// module.exports = db = new Sequelize(
//   process.env.DB_DATABASE,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",

//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );

module.exports = db = new Sequelize(
  process.env.DB_DATABASE_PRODUCTION,
  process.env.DB_USER_PRODUCTION,
  process.env.DB_PASS_PRODUCTION,
  {
    host: process.env.DB_HOST_PRODUCTION,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
