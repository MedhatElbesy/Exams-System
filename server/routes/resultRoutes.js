const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  submitExamResult,
  getExamResults,
} = require("../controllers/resultController");

router.post("/:examId", authMiddleware, submitExamResult);

router.get("/:examId", authMiddleware, getExamResults);

module.exports = router;
