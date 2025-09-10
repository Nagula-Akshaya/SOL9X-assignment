const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = sequelize.define("Student", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  course: { type: DataTypes.STRING, allowNull: false },
  enrollmentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});
module.exports = Student;
