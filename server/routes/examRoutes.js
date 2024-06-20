const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
} = require("../controllers/examController");

router.post("/", authMiddleware, roleMiddleware, createExam);

router.get("/", authMiddleware, getExams);

router.get("/:id", authMiddleware, getExamById);

router.put("/:id", authMiddleware, roleMiddleware, updateExam);

router.delete("/:id", authMiddleware, roleMiddleware, deleteExam);

module.exports = router;
