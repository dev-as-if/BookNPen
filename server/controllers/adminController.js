// controllers/adminController.js
const User = require("../models/User");

exports.getOperators = async (req, res) => {
  try {
    const operators = await User.find({ role: "operator" }).select("-password");
    res.json(operators);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch operators" });
  }
};

exports.addOperator = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username already exists" });

    const operator = new User({ username, password, role: "operator" });
    await operator.save();
    res.status(201).json({ message: "Operator added" });
  } catch {
    res.status(500).json({ message: "Error adding operator" });
  }
};

exports.updateOperator = async (req, res) => {
  const { username, password } = req.body;

  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { username, ...(password && { password }) },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Operator not found" });

    res.json({ message: "Operator updated" });
  } catch {
    res.status(500).json({ message: "Error updating operator" });
  }
};

exports.deleteOperator = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Operator not found" });

    res.json({ message: "Operator deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting operator" });
  }
};
