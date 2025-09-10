const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Student } = require("../models");
const auth = require("../middleware/auth");
const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: "Provide name, email, password" });
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ msg: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashed, role: "student" });
    await Student.create({ userId: user.id, name, email, course: course || "MERN Bootcamp" });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Provide email and password" });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.role === "student") {
      const student = await Student.findOne({ where: { userId: user.id } });
      return res.json({ user, student });
    }
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
module.exports = router;
