const sequelize = require("../config/db");
const User = require("./User");
const Student = require("./Student");
User.hasOne(Student, { foreignKey: "userId", onDelete: "CASCADE" });
Student.belongsTo(User, { foreignKey: "userId" });
const initDB = async () => {
  await sequelize.sync({ alter: true });
  console.log("SQLite DB synced!");
};
module.exports = { sequelize, User, Student, initDB };
