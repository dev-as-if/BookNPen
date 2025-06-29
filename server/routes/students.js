const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");

// Utility: Generate unique 6-digit roll number
const generateUniqueRollNumber = async () => {
  let rollNumber;
  let exists = true;
  while (exists) {
    rollNumber = Math.floor(100000 + Math.random() * 900000).toString();
    exists = await Student.exists({ rollNumber });
  }
  return rollNumber;
};

// Add student (Operator only)
router.post("/add", auth, async (req, res) => {
  if (req.user.role !== "operator") return res.status(403).json({ message: "Access denied" });

  try {
    const rollNumber = req.body.rollNumber || await generateUniqueRollNumber();

    const exists = await Student.findOne({ rollNumber });
    if (exists) return res.status(400).json({ message: "Roll number already exists" });

    const student = new Student({
      ...req.body,
      rollNumber,
      admissionDate: new Date(),
    });

    await student.save();
    res.status(201).json({ message: "Student added", rollNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Auto-suggest roll numbers
router.get("/suggest-roll", auth, async (req, res) => {
  const { startsWith } = req.query;
  try {
    const suggestions = await Student.find({
      rollNumber: { $regex: "^" + startsWith },
    }).limit(10).select("rollNumber -_id");

    res.json(suggestions.map(s => s.rollNumber));
  } catch {
    res.status(500).json({ message: "Error fetching suggestions" });
  }
});

// Get all students (Admin only)
router.get("/all", auth, async (req, res) => {
  console.log("User info from token:", req.user);
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  try {
    const students = await Student.find();
    console.log("Students found:", students.length); // 👈 Confirm data
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve students" });
  }
});

// Search student by name or roll number
router.get("/search", auth, async (req, res) => {
  const { name, rollNumber, query } = req.query;
  try {
    let filter = {};
    if (query) {
      // Combined search (used in search student)
      if (!isNaN(query)) filter.rollNumber = query;
      else filter.name = new RegExp(query, "i");
    } else {
      // Used in view all
      if (name) filter.name = new RegExp(name, "i");
      if (rollNumber) filter.rollNumber = rollNumber;
    }

    const result = query
      ? await Student.findOne(filter)
      : await Student.find(filter);

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error searching student" });
  }
});

// Delete student by roll number (Admin only)
router.delete("/:rollNumber", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  try {
    const deleted = await Student.findOneAndDelete({ rollNumber: req.params.rollNumber });
    if (!deleted) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Promote all students (Operator only)
router.put("/promote", auth, async (req, res) => {
  if (req.user.role !== "operator") return res.status(403).json({ message: "Access denied" });

  try {
    const all = await Student.find();
    const updated = await Promise.all(
      all.map(async (s) => {
        const currentClass = parseInt(s.class);
        const nextClass = isNaN(currentClass) ? s.class : (currentClass + 1).toString();
        s.class = nextClass;
        return await s.save();
      })
    );

    res.json({ message: "All students promoted", count: updated.length });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Filter students by class / fee status (Admin only)
router.get("/filter", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  const { filter, class: studentClass } = req.query;
  try {
    const query = studentClass ? { class: studentClass } : {};
    const students = await Student.find(query);

    let result = students;
    if (filter === "paid") {
      result = students.filter(s => (s.feePaid || 0) >= (s.totalFee || 0));
    } else if (filter === "pending") {
      result = students.filter(s => (s.feePaid || 0) < (s.totalFee || 0));
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error filtering students" });
  }
});

module.exports = router;

