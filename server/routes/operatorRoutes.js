const express = require("express");
const router = express.Router();
const operatorController = require("../controllers/operatorController");
const auth = require("../middleware/authMiddleware");

// All routes require operator role
router.post("/admit-student", auth("operator"), operatorController.admitStudent);
router.get("/students", auth("operator"), operatorController.getAllStudents);
router.get("/student", auth("operator"), operatorController.searchStudent);
router.put("/promote", auth("operator"), operatorController.promoteStudents);
router.post("/collect-fee/:rollNumber", auth("operator"), operatorController.collectFee);

module.exports = router;
