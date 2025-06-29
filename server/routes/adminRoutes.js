const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");

// Define routes
router.post("/add-operator", auth("admin"), adminController.addOperator);
router.get("/operators", auth("admin"), adminController.getOperators);
router.put("/update-operator/:id", auth("admin"), adminController.updateOperator);
router.delete("/remove-operator/:id", auth("admin"), adminController.deleteOperator);

// ✅ Correct export
module.exports = router;
