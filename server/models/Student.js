// // models/Student.js
// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   rollNumber: { type: String, unique: true },
//   name: String,
//   fatherName: String,
//   dob: Date,
//   address: String,
//   class: String,
//   admissionDate: Date,
//   feeHistory: [{
//     month: String,
//     amount: Number,
//     status: { type: String, enum: ["paid", "pending"] },
//     date: Date
//   }],
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Student", studentSchema);


const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  age: Number,
  dateOfBirth: Date,
  class: { type: String },
  address: String,
  totalFee: Number,
  feePaid: Number,
  admissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
