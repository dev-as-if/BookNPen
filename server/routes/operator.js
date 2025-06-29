const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Admit Student (Assign Roll Number)
router.post("/add-student", auth("operator"), async (req, res) => {
  try {
    const { name, fatherName, dob, age, address, class: className, fee } = req.body;

    // Generate 6-digit roll number
    const last = await Student.findOne().sort({ rollNumber: -1 });
    const rollNumber = last ? last.rollNumber + 1 : 100001;

    const newStudent = new Student({
      rollNumber,
      name,
      fatherName,
      dob,
      age,
      address,
      class: className,
      fee: {
        monthly: fee,
        history: [],
        paid: false,
      },
    });

    await newStudent.save();
    res.status(201).json({ message: "Student admitted", rollNumber });
  } catch {
    res.status(500).json({ message: "Admission failed" });
  }
});

// ✅ Add Monthly Fee
router.post("/collect-fee/:rollNumber", auth("operator"), async (req, res) => {
  try {
    const { amount, month, year } = req.body;
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });

    if (!student) return res.status(404).json({ message: "Student not found" });

    student.fee.history.push({ amount, month, year, paidOn: new Date() });
    student.fee.paid = true;

    await student.save();
    res.json({ message: "Fee collected" });
  } catch {
    res.status(500).json({ message: "Fee collection failed" });
  }
});

// ✅ Promote All Students
router.put("/promote", auth("operator"), async (req, res) => {
  try {
    const updated = await Student.updateMany({}, { $inc: { class: 1 } });
    res.json({ message: "All students promoted" });
  } catch {
    res.status(500).json({ message: "Promotion failed" });
  }
});

// ✅ Search Student by Name or Roll Number
router.get("/find-student", auth("operator"), async (req, res) => {
  const { name, rollNumber } = req.query;

  try {
    const query = {};
    if (name) query.name = new RegExp(name, "i");
    if (rollNumber) query.rollNumber = Number(rollNumber);

    const student = await Student.findOne(query);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch {
    res.status(500).json({ message: "Search failed" });
  }
});

// ✅ Delete Student
router.delete("/delete-student/:rollNumber", auth("operator"), async (req, res) => {
  try {
    const deleted = await Student.findOneAndDelete({ rollNumber: req.params.rollNumber });
    if (!deleted) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

// routes/operator.js
router.get("/roll-suggestions", auth("operator"), async (req, res) => {
  const { q } = req.query;
  try {
    const regex = new RegExp("^" + q);
    const studs = await Student.find({ rollNumber: regex }).limit(10).select("rollNumber");
    res.json(studs.map(s => s.rollNumber));
  } catch {
    res.status(500).json({ message: "Error fetching suggestions" });
  }
});


module.exports = router;
