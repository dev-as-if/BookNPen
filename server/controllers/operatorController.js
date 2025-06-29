const Student = require("../models/Student");

// Admit student
exports.admitStudent = async (req, res) => {
  try {
    const { rollNumber, name, fatherName, age, dob, class: studentClass, address, totalFee } = req.body;

    const exists = await Student.findOne({ rollNumber });
    if (exists) return res.status(400).json({ message: "Roll number already exists" });

    const newStudent = new Student({
      rollNumber,
      name,
      fatherName,
      age,
      dateOfBirth: dob,
      class: studentClass,
      address,
      totalFee,
      feePaid: 0,
      admissionDate: new Date()
    });

    await newStudent.save();
    res.status(201).json({ message: "Student admitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to admit student" });
  }
};

// View all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// Search student
exports.searchStudent = async (req, res) => {
  const { name, rollNumber } = req.query;
  try {
    const query = {};
    if (name) query.name = new RegExp(name, "i");
    if (rollNumber) query.rollNumber = rollNumber;

    const students = await Student.find(query);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

// Promote all
exports.promoteStudents = async (req, res) => {
  try {
    const students = await Student.find();
    for (let student of students) {
      const currentClass = parseInt(student.class);
      const nextClass = isNaN(currentClass) ? student.class : (currentClass + 1).toString();
      student.class = nextClass;
      await student.save();
    }
    res.json({ message: "All students promoted" });
  } catch (err) {
    res.status(500).json({ message: "Promotion failed" });
  }
};

// Collect fee
exports.collectFee = async (req, res) => {
  const { amount } = req.body;
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.feePaid = (student.feePaid || 0) + parseInt(amount);
    await student.save();
    res.json({ message: "Fee collected", feePaid: student.feePaid });
  } catch (err) {
    res.status(500).json({ message: "Fee collection failed" });
  }
};
