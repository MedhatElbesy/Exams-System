const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  submitExamResult,
  getExamResult,
  getAllResults
} = require("../controllers/resultController");

router.post("/:examId", authMiddleware, submitExamResult);

router.get("/", authMiddleware, getAllResults);
router.get("/:examId", authMiddleware, getExamResult);

module.exports = router;
