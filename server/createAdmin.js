const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const existing = await User.findOne({ username: "admin" });
  if (existing) {
    console.log("Admin already exists.");
    return;
  }

  await User.create({
    username: "admin",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Admin created!");
  process.exit();
}

createAdmin();
