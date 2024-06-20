const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

router.post("/", authMiddleware, addQuestion);

router.put(
  "/:examId/questions/:questionId",
  authMiddleware,
  roleMiddleware,
  updateQuestion
);

router.delete(
  "/:examId/questions/:questionId",
  authMiddleware,
  roleMiddleware,
  deleteQuestion
);

module.exports = router;
