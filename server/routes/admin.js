const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all routes with admin role
router.use(auth("admin"));

/**
 * Add Operator
 */
router.post("/add-operator", auth("admin"), async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newOperator = new User({ username, password: hashedPassword, role: "operator" });

    await newOperator.save();
    res.status(201).json({ message: "Operator created" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Get All Operators
 */
router.get("/operators", auth("admin"), async (req, res) => {
  try {
    const operators = await User.find({ role: "operator" }, "-password");
    res.json(operators);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Update Operator
 */
router.put("/update-operator/:id", auth("admin"), async (req, res) => {
  try {
    const { username, password } = req.body;
    const updateData = { username };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "Operator updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Delete Operator
 */
router.delete("/remove-operator/:id", auth("admin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Operator removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

const Student = require("../models/Student");

router.get("/students", auth, async (req, res) => {
  try {
    const { class: classFilter, status } = req.query;
    const query = {};

    if (classFilter) query.class = classFilter;
    if (status === "paid") query.pendingFee = 0;
    else if (status === "pending") query.pendingFee = { $gt: 0 };

    const students = await Student.find(query);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
