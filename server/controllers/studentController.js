// controllers/studentController.js
const Student = require("../models/Student");

const generateRollNumber = async () => {
  let roll;
  let exists = true;
  while (exists) {
    roll = Math.floor(100000 + Math.random() * 900000).toString();
    exists = await Student.exists({ rollNumber: roll });
  }
  return roll;
};

exports.addStudent = async (req, res) => {
  try {
    const rollNumber = req.body.rollNumber || await generateRollNumber();

    const exists = await Student.findOne({ rollNumber });
    if (exists) return res.status(400).json({ message: "Roll number already exists" });

    const student = new Student({
      ...req.body,
      rollNumber,
      admissionDate: new Date()
    });

    await student.save();
    res.status(201).json({ message: "Student added", rollNumber });
  } catch {
    res.status(500).json({ message: "Error adding student" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch {
    res.status(500).json({ message: "Error fetching students" });
  }
};

exports.searchStudents = async (req, res) => {
  const { name, rollNumber, query } = req.query;
  try {
    let filter = {};
    if (query) {
      if (!isNaN(query)) filter.rollNumber = query;
      else filter.name = new RegExp(query, "i");
    } else {
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
  } catch {
    res.status(500).json({ message: "Error searching students" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findOneAndDelete({ rollNumber: req.params.rollNumber });
    if (!deleted) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting student" });
  }
};

exports.promoteStudents = async (req, res) => {
  try {
    const all = await Student.find();
    const updated = await Promise.all(
      all.map(async (s) => {
        const curr = parseInt(s.class);
        s.class = isNaN(curr) ? s.class : (curr + 1).toString();
        return await s.save();
      })
    );

    res.json({ message: "Students promoted", count: updated.length });
  } catch {
    res.status(500).json({ message: "Promotion failed" });
  }
};

exports.filterStudents = async (req, res) => {
  const { filter, class: studentClass } = req.query;

  try {
    const base = studentClass ? { class: studentClass } : {};
    const all = await Student.find(base);

    let result = all;
    if (filter === "paid") {
      result = all.filter(s => (s.feePaid || 0) >= (s.totalFee || 0));
    } else if (filter === "pending") {
      result = all.filter(s => (s.feePaid || 0) < (s.totalFee || 0));
    }

    res.json(result);
  } catch {
    res.status(500).json({ message: "Filter failed" });
  }
};
