const { Sequelize } = require("sequelize");
const path = require("path");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", process.env.DATABASE || "assignment.sqlite"),
  logging: false
});
module.exports = sequelize;
