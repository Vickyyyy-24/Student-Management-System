const express = require("express");
const {
    createStudent,
    getAllStudents,
    getStudentById,
    //   updateStudent,
    deleteStudent,
} = require("../controllers/studentController");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.post("/create", upload.single("profileImage"), createStudent);
router.get("/all", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", upload.single("profileImage"), updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
