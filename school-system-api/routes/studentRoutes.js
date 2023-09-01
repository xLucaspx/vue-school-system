const Router = require("express");
const StudentController = require("../controller/StudentController");

const router = Router();

router
  .get("/students", StudentController.getStudents)
  .get("/students/search?", StudentController.filterStudentsByName)
  .get("/students/:id", StudentController.getStudentById);

module.exports = router;
