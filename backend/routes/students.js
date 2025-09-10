const express = require("express");
const bcrypt = require("bcryptjs");
const { Student, User } = require("../models");
const auth = require("../middleware/auth");
const permit = require("../middleware/roles");
const router = express.Router();
router.get("/", auth, permit("admin"), async (req, res) => {
  const students = await Student.findAll({ order: [["enrollmentDate", "DESC"]] });
  res.json(students);
});
router.get("/me", auth, async (req, res) => {
  const student = await Student.findOne({ where: { userId: req.user.id } });
  res.json(student);
});
router.get("/:id", auth, async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ msg: "Student not found" });
  if (req.user.role !== "admin" && student.userId !== req.user.id) return res.status(403).json({ msg: "Forbidden" });
  res.json(student);
});
router.post("/", auth, permit("admin"), async (req, res) => {
  const { name, email, course, password } = req.body;
  const hashed = await bcrypt.hash(password || "password123", 10);
  const user = await User.create({ name, email, password: hashed, role: "student" });
  const student = await Student.create({ userId: user.id, name, email, course });
  res.json({ user, student });
});
router.put("/:id", auth, async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ msg: "Student not found" });
  if (req.user.role !== "admin" && student.userId !== req.user.id) return res.status(403).json({ msg: "Forbidden" });
  const { name, email, course } = req.body;
  await student.update({ name, email, course });
  await User.update({ name, email }, { where: { id: student.userId } });
  res.json(student);
});
router.delete("/:id", auth, permit("admin"), async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ msg: "Not found" });
  await User.destroy({ where: { id: student.userId } });
  await Student.destroy({ where: { id: req.params.id } });
  res.json({ msg: "Deleted" });
});
module.exports = router;
