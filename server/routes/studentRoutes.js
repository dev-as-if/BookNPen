// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/authMiddleware");
// const {
//   addStudent,
//   suggestRollNumbers,
//   getAllStudents,
//   searchStudent,
//   deleteStudent,
//   promoteStudents,
//   filterStudents,
// } = require("../controllers/studentController");

// // Operator routes
// router.post("/add", auth("operator"), addStudent);
// router.get("/suggest-roll", auth(), suggestRollNumbers);
// router.put("/promote", auth("operator"), promoteStudents);

// // Admin routes
// router.get("/all", auth("admin"), getAllStudents);
// router.get("/search", auth("admin"), searchStudent);
// router.delete("/:rollNumber", auth("admin"), deleteStudent);
// router.get("/filter", auth("admin"), filterStudents);

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const studentController = require("../controllers/studentController");

router.get("/all", auth("admin"), studentController.getAllStudents);
router.delete("/:rollNumber", auth("admin"), studentController.deleteStudent);
router.get("/search", auth("admin"), studentController.searchStudents);
router.get("/filter", auth("admin"), studentController.filterStudents);

router.post("/add", auth("operator"), studentController.addStudent);
router.put("/promote", auth("operator"), studentController.promoteStudents);


// etc...

module.exports = router;

